/**
 * 日志中间件
 */
const Log = require('../model/log')

module.exports = {
    /**
     * 获取日志列表
     */
    getLogPage: (req, res ,next)=>{
        let {p, size}=req.page;
        Log.getLogPage((p-1)*size, size).then(result=>{
            req.page.list=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取日志总条目数
     */
    getLogCount: (req, res ,next)=>{
        Log.getLogCount().then(result=>{
            req.count=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 添加日志
     */
    addLog: (req, res ,next)=>{
        Log.addLog(req.log).then(result=>{
            req.affectedRows=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

}



