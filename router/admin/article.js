/**
 * 后台文章管理
 */

const express = require('express');
const article = require('../../middleware/article');
const category = require('../../middleware/category');
const log = require('../../middleware/log');  //引入日志模型

const articleApp = express();

//加载列表页--分页之前
/*articleApp.get('/', [article.getPage, article.getArticleCount], (req, res)=>{

    let {user, pageList, articleCount}=req;
    //因需要有分页功能，所以封装pageList
    let size = 5; //每页显示五条
    let page={};
    page.list = pageList;
    page.count = articleCount; //总条数
    page.total = Math.ceil(page.count / size); //总页数
    //当前页号
    page.p = req.query.p ? req.query.p : 1;
    page.p = page.p>page.total ? page.total : page.p;
    page.p = page.p<1 ? 1 : page.p;

    res.render('admin/article/index', {user: user, page: page});
});*/

//加载列表页--分页以后
articleApp.get('/', article.getArticleCount, (req, res, next)=>{
    let {articleCount}=req;

    let size = 5; //每页显示五条
    req.page={};
    req.page.count = articleCount; //总条数
    req.page.total = Math.ceil(req.page.count / size); //总页数
    //当前页号
    req.page.p = req.query.p ? req.query.p : 1;
    req.page.p = req.page.p>req.page.total ? req.page.total : req.page.p;
    req.page.p = req.page.p<1 ? 1 : req.page.p;

    res.start = (req.page.p -1)*size;
    res.size = size;

    next();
}, [article.getPage, category.getList], (req, res)=>{
    let {user, pageList, page, categories}=req;
    let {category_id, hot} = req.query;
    page.list = pageList;
    res.render('admin/article/index', {user: user, page: page, categories: categories, category_id: category_id, hot: hot})
});

//设置热门路由推荐
articleApp.get('/setHot', article.setHot, (req, res)=>{
    //因设置路由是异步操作，故不直接渲染页面，而返回json
    if(req.affectedRows>0){
        res.json({code:1, msg: '设置成功'});
    } else{
        res.json({code:0, msg: '设置失败'});
    }
});

//添加显示博文页
articleApp.get('/add', category.getList, (req,res)=>{
    let {user, categories}=req;
    res.render('admin/article/add', {user: user, categories: categories, code: ''});
});

//ckeditor上传 --解决编辑器图片上传问题
articleApp.post('/ckeditor', (req, res)=>{
    if(req.uploadUrl) {
        res.json({  //图片上传成功后返回json数据
            uploaded: true,
            url: req.uploadUrl
        })
    } else{
        res.json({
            uploaded: false,
            err: { message: '上传失败'}
        })
    }
});

//添加博文
articleApp.post('/add', [article.addArticle, category.getList], (req, res,next)=>{
    console.log(req.ip)
    let {user, categories}=req;
    if(req.insertId){ //添加成功
        res.render('admin/article/add', {user: user, categories: categories, code: 1 });
    } else{ //添加失败
        res.render('admin/article/add', {user: user, categories: categories, code: 2 });
    }
}, log.addLog, (req, res,next)=>{
    req.log={  //日志
        time: new Date(),
        handle: '添加博文',
        ip: req.ip.split(':')[3]
    }
});

//删除文章
articleApp.get('/del', article.delArticle, (req, res)=>{
    if(req.affectedRows>0){
        res.json({code: 1, msg: '删除文章成功'});
    } else{
        res.json({code: 2, msg: '删除文章失败'});
    }
});

//文章编辑
articleApp.get('/edit/:id', [category.getList, article.getArticleById], (req, res)=>{
    let {user, categories, article}=req;
    res.render('admin/article/edit', {user: user, categories: categories, article: article});
});
articleApp.post('/edit', [article.editArticle, category.getList], (req, res)=>{
    let {user, categories}=req;
    if(req.affectedRows>0){ //编辑成功
        res.render('admin/alert', {code: true, title: '成功提示', message: '文章编辑成功', url: '/admin/article/'});
    } else{ //编辑失败
        res.render('admin/alert', {code: false, title: '失败提示', message: '文章编辑失败', url: '/admin/article/'+req.body.id});
    }
});









module.exports = articleApp;


