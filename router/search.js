/**
 * 搜索子应用
 */

const express = require('express');
const article = require('../middleware/article');
const category = require('../middleware/category');
const auth = require('../middleware/auth');

//文章子应用
const searchApp=express();

searchApp.get('/', [article.getListByKeyword, category.getList, auth.getUser], (req, res)=>{
    let {articles, categories, user} = req;
    res.render('search', {articles: articles, categories: categories, keyword: req.query.keyword, user: user});
});

module.exports = searchApp;

