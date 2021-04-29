/**
 * 后台日志管理
 */

const express = require('express');
const log = require('../../middleware/log');

const logApp = express();

logApp.get('/', log.getLogCount, (req,res,next)=> {
    let page = {
        p: req.query.p ? req.query.p : 1, //当前页
        count: req.count, //日志总条目数
        size: 5  //每页日志数
    };
    page.total = Math.ceil(page.count / page.size); //总页数
    page.p = page.p>page.total ? page.total : page.p;
    page.p = page.p<1 ? 1 : page.p;
    req.page = page;

    next();
}, log.getLogPage, (req, res)=>{
    let {user, page} = req;
    res.render('admin/log/index', {user: user, page: page});
});




module.exports = logApp;


