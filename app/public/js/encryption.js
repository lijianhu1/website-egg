'use strict';
const fs = require('fs');
const path = require('path');
const NodeRSA = require('node-rsa');
const crypto = require('crypto');
module.exports = {
  /** 生成RSA 密钥 **/
  generateKey() {
    const key = new NodeRSA({ b: 512 });
    key.setOptions({ encryptionScheme: 'pkcs1' });
    const privatePem = key.exportKey('pkcs1-private-pem');
    const publicDer = key.exportKey('pkcs8-public-der');
    const publicDerStr = publicDer.toString('base64');
    // // 保存返回到前端的公钥
    fs.writeFile(path.join('./', 'app/public/pem', 'public.pem'), publicDerStr, err => {
      if (err) throw err;
      console.log('公钥已保存！');
    });
    // 保存私钥
    fs.writeFile(path.join('./', 'app/public/pem', 'private.pem'), privatePem, err => {
      if (err) throw err;
      console.log('私钥已保存！');
    });
  },

  async decrypt(password) {
    const privateKey = fs.readFileSync(path.join('./', 'app/public/pem', 'private.pem'), 'utf8');
    const buffer2 = Buffer.from(password, 'base64');
    const decrypted = crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING, // 注意这里的常量值要设置为RSA_PKCS1_PADDING
    },
    buffer2
    );
    // sha1加密
    const sha1 = crypto.createHash('sha1');
    return sha1.update(decrypted)
      .digest('hex');
  },
  async decryptTem(password) {
    const privateKey = fs.readFileSync(path.join('./', 'app/public/pem', 'private.pem'), 'utf8');
    const buffer2 = Buffer.from(password, 'base64');
    const decrypted = crypto.privateDecrypt({
      key: privateKey,
      padding: crypto.constants.RSA_PKCS1_PADDING, // 注意这里的常量值要设置为RSA_PKCS1_PADDING
    },
    buffer2
    );
    return decrypted.toString('utf8');
  },
};
