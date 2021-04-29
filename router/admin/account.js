/**
 * 后台账户管理
 */

const express = require('express');
const account = require('../../middleware/account')

const accountApp = express();

/*accountApp.get('/', (req, res)=>{
    res.render('admin/account/index', {user: req.user})
});*/

//获取账号信息
accountApp.get('/', account.getAccountInfo, (req, res)=>{
    let {user, accountInfo}=req;
    res.render('admin/account/index', {user: user, accountInfo: accountInfo})
});

//修改密码
accountApp.post('/setPassword', [account.setAccountPassword,account.getAccountInfo], (req, res)=>{
    let {user, accountInfo}=req;
    if(req.affectedRows>0){ //修改密码成功
        res.render('admin/account/index', {user: user, accountInfo: accountInfo, code: 1 });
    } else{ //修改密码失败
        res.render('admin/account/index', {user: user, accountInfo: accountInfo, code: 2 });
    }
});


module.exports = accountApp;


