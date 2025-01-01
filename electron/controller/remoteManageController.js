'use strict';

const {Controller} = require('ee-core');
const Storage = require('ee-core/storage');
const _ = require('lodash');
const Log = require('ee-core/log');
const Services = require('ee-core/services');
const {nativeTheme} = require("electron");
const {exec} = require('child_process');
const shortid = require('shortid')

/**
 * 远程管理
 *
 * 所有方法接收两个参数
 * @param args 前端传的参数
 * @param event - ipc通信时才有值。详情见：控制器文档
 *
 * @class
 */
class RemoteManageController extends Controller {

    constructor(ctx) {
        super(ctx);

        this.jsonFile = 'data';
        this.db = Storage.connection(this.jsonFile).db.get('remote');
        this.appDb = Storage.connection(this.jsonFile).db.get('remoteApp');
    }

    /**
     * add
     */
    async saveOrUpdate(args) {
        let result = {
            code: 200,
            data: null
        }
        const {id, name, addr, remoteType, username, password} = JSON.parse(args);

        let saveOrUpdateData = {id, name, addr, remoteType, username, password};

        if (id) {
            //根据name查找key，如果key存在则更新
            const idExistIndex = this.db.value().findIndex(v => v.id === id);
            if (idExistIndex !== -1) {
                this.db.find({id: id}).assign(saveOrUpdateData).write();
            } else {
                saveOrUpdateData.id = shortid.generate();
                this.db.push(saveOrUpdateData).write();
            }
        } else {
            saveOrUpdateData.id = shortid.generate();
            this.db.push(saveOrUpdateData).write();
        }
        return result;
    }

    /**
     * delete
     */
    async delete(args) {
        let result = {
            code: 200,
            data: null
        }
        const {id} = args;
        this.db.remove({id: id}).write();
        return result;
    }


    /**
     * 列表
     */
    async list() {
        const result = {
            code: 200,
            data: null,
        };
        result.data = this.db.value();

        return result;
    }

    /**
     * 列表
     */
    async appList() {
        const result = {
            code: 200,
            data: null,
        };
        result.data = this.appDb.value();

        return result;
    }

    /**
     * 列表
     */
    async appListUpdate(args) {
        let result = {
            code: 200,
            data: null
        }
        const config = JSON.parse(args);
        console.log('config', config)

        const entries = Object.entries(config);

        for (const [key, value] of entries) {
            this.appDb.find({name: key}).assign({path: value}).write();
        }
        return result;
    }

    /**
     * 执行命令
     * @param args
     * @returns {string}
     */
    openExe(args) {
        const result = {
            code: 200
        }
        const {id} = args;
        const remote = this.db.value().find(v => v.id === id);
        console.log('remote', remote)

        if (remote.remoteType === 'ssh') {
            const appConfig = this.appDb.get("xshell").value();
            console.log('appConfig', appConfig)
            //构造调用命令行
            const execParameter = '\"' + appConfig.path + '"' + ' -url ssh://' + remote.username + ":" + remote.password + '@' + remote.addr;
            console.log('execParameter', execParameter)
            exec(`${execParameter}`, (error, stdout, stderr) => {
                if (error) {
                    console.error(`error: ${error}`);
                    return;
                }
                console.log(`info：${stdout}`);
                if (stderr) {
                    console.log(`info error：${stderr}`);
                }
            });
        }

        return result;
    }
}

RemoteManageController.toString = () => '[class RemoteManageController]';
module.exports = RemoteManageController;
