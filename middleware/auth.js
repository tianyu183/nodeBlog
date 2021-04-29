/**
 * 权限子应用
 */

module.exports= {
    /**
     * 从session中读取用户
     * @param req
     * @param res
     * @param next
     */
    getUser: (req, res, next)=>{
        //从session中读取数据
        req.user=req.session.user;
        next();
    },

    /**
     * 权限管理：是否允许用户进入后台管理页
     */
    allowToAdmin: (req, res, next)=>{
        let user = req.session.user;
        if(user){
            req.user = user;
            next();
        }else{ //如果用户不存在，直接跳转到用户登录页
            res.redirect('/login');
        }
    }

}


















