'use strict';
const fs = require('fs');
// node.js 路径操作对象
const path = require('path');
const Controller = require('egg').Controller;
// 异步二进制 写入流
const awaitWriteStream = require('await-stream-ready').write;
// 管道读入一个虫洞。
const sendToWormhole = require('stream-wormhole');
const md5 = require('md5');
const tool = require('../public/js/tool');
const { Code } = require('../util/util');
class HomeController extends Controller {
  async index() {
    const { ctx } = this;
    ctx.body = 'hi, egg';
  }
  async fileUpload() {
    const { ctx, config } = this;
    const stream = await ctx.getFileStream();
    // 新建一个文件名
    const filename = md5(stream.filename) + path
      .extname(stream.filename)
      .toLocaleLowerCase();
    // 文件生成绝对路径
    // 当然这里这样市不行的，因为你还要判断一下是否存在文件路径
    await tool.dirExists(path.join(config.baseDir, 'app/public/uploads'));
    const target = path.join(config.baseDir, 'app/public/uploads', filename);
    // 生成一个文件写入 文件流
    const writeStream = fs.createWriteStream(target);
    try {
      // 异步把文件流 写入
      await awaitWriteStream(stream.pipe(writeStream));
    } catch (err) {
      // 如果出现错误，关闭管道
      await sendToWormhole(stream);
      throw err;
    }
    // 文件响应
    ctx.status = 200;
    ctx.body = Object.assign({}, Code.SUCCESS, { data: filename });
  }
}

module.exports = HomeController;
