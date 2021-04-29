/**
 * 用户中间件
 */
const User = require('../model/user')

module.exports = {
    /**
     * 获取用户最后一次登陆的时间
     */
    lastLoginTime: (req, res ,next)=>{
        User.lastLoginTime().then(result=>{
            req.lastLoginTime=result;
            next();
        }).catch(err=>{
            next(err);
        })
    }


}









