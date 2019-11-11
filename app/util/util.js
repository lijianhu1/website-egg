'use strict';
module.exports = {
  Code: {
    ERROR: {
      code: 1,
      msg: 'failed',
    },
    SUCCESS: {
      code: 0,
      msg: 'success',
    },
  },
  async isNull(data, ...fields) {
    let result = {
      code: 0,
      msg: 'success',
    };
    if (Array.isArray(data)) {
      for (let i = 0; i < data.length; i++) {
        const r = verif(data[i]);
        if (r) {
          result = r;
          break;
        }
      }
    } else {
      const r = verif(data);
      if (r) {
        result = r;
      }
    }
    function verif(_data) {
      for (let i = 0; i < fields.length; i++) {
        if (_data[fields[i]] === '' || _data[fields[i]] === null || _data[fields[i]] === undefined) {
          return {
            code: 1,
            msg: `${fields[i]}不能为空！`,
          };
        }
      }
    }
    return result;
  },
};
