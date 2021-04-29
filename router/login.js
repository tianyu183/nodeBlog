/**
 * 登录子应用
 */

const express = require('express');
// const login = require('../middleware/login'); //因登录功能较简单，不需要处理其他东西，因此不需要中间件
const User = require('../model/user'); //直接引入用户数据模型
const log = require('../middleware/log');  //引入日志模型


//登录子应用
const loginApp=express();

//加载登录页
loginApp.get('/', (req, res)=>{
    res.render('login', {msg: ''});
});

//实现登陆操作--直接将用户登录的功能写到此处
loginApp.post('/', (req, res, next) => {
    // console.log(req.ip);  //::ffff:127.0.0.1
    let {username, password}=req.body;
    User.login(username, password).then(result => {
        if(result){
            req.log={  //日志
                time: new Date(),
                handle: '登录',
                ip: req.ip.split(':')[3]
            }
            log.addLog(req, res, next);

            req.session.user = result; //session存储（key=value键值对）
            res.redirect('/');
        }else{
            res.render('login', {msg: '登录失败！ 用户名或密码错误'})
        }
    }).catch(err => {
        next(err);
    })
});


module.exports = loginApp;











