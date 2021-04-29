/**
 * 首页子应用（首页路由）
 */

const express = require('express');
const article = require('../middleware/article');
const category = require('../middleware/category');
const auth = require('../middleware/auth');

//首页子应用
const indexApp = express();

indexApp.use(auth.getUser);

// Get 请求--加载首页页面
// get()第一个参数是路由(路径)， 第二个参数是需要调用的函数（可省）， 第三个是回调函数
indexApp.get('/', [article.getHot, article.getList, category.getList], (req, res)=>{
    let {hots, articles, categories, user}=req;
    // res.render('index', {hots:req.hots, articles: req.articles});
    //index是指views下的index.html
    res.render('index', {hots:hots, articles: articles, categories: categories, user: user});
});




module.exports = indexApp;  //向外暴露模块


