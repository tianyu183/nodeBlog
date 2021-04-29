/**
 * 账号管理中间件
 */
const Account = require('../model/account');

module.exports = {
    /**
     * 获取账号信息
     */
    getAccountInfo: (req, res ,next)=>{
        // console.log(req.user);
        Account.getAccountInfo(req.user.id).then(result=>{
            req.accountInfo=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 修改账号密码
     */
    setAccountPassword: (req, res ,next)=>{
        // console.log(req.body);
        let {id, newPassword}=req.body;
        Account.setAccountPassword(id, newPassword).then(result=>{
            req.affectedRows=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

}











