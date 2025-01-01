/**
 * 主进程与渲染进程通信频道定义
 * Definition of communication channels between main process and rendering process
 */
const ipcApiRoute = {
    test: 'controller.example.test',
    remoteManageList: 'controller.remoteManageController.list',
    remoteManageDelete: 'controller.remoteManageController.delete',
    remoteManageSaveOrUpdate: 'controller.remoteManageController.saveOrUpdate',
    remoteAppList: 'controller.remoteManageController.appList',
    remoteAppListUpdate: 'controller.remoteManageController.appListUpdate',
    remoteAppOpen: 'controller.remoteManageController.openExe',

    //os
    selectFolder: 'controller.os.selectFolder',
    selectExe: 'controller.remoteManageController.selectExe',

    // cross
    getCrossUrl: 'controller.cross.getUrl',
}

export {
    ipcApiRoute
}
