/**
 * 访问量中间件
 */
const PV = require('../model/pv')

module.exports = {
    /**
     * 获取总访问量
     */
    getTotal: (req, res ,next)=>{
        PV.getTotal().then(result=>{
            req.pvTotal=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取全部访问量
     */
    getAll: (req, res ,next)=>{
        PV.getAll().then(results=>{
            req.pvs=results;
            next();
        }).catch(err=>{
            next(err);
        })
    }


}













