'use strict';

const { Service } = require('ee-core');

/**
 * 示例服务（service层为单例）
 * @class
 */
class RemoteManageService extends Service {

  constructor(ctx) {
    super(ctx);
  }

  /**
   * add
   */
  async add(args) {
    let obj = {
      code: 200,
      data:"哈哈哈哈"
    }

    return obj;
  }


  /**
   * update
   */
  async update(args) {
    let obj = {
      code: 200,
      data:"哈哈哈哈"
    }

    return obj;
  }

  /**
   * delete
   */
  async delete(args) {
    let obj = {
      code: 200,
      data:"哈哈哈哈"
    }

    return obj;
  }

  /**
   * 列表
   */
  async list(args) {
    let obj = {
      code: 200,
      data:"哈哈哈哈"
    }

    return obj;
  }
}

RemoteManageService.toString = () => '[class RemoteManageService]';
module.exports = RemoteManageService;
