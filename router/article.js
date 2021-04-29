/**
 * 文章子应用
 */
const express = require('express');
const article = require('../middleware/article');
const category = require('../middleware/category');
const auth = require('../middleware/auth');

//文章子应用
const articleApp=express();



/*articleApp.get('/list/:id', [article.getListByCategoryId, category.getList, category.getCategoryById], (req, res)=>{
    let {articles, categories, category} = req;
    res.render('list', {articles: articles, categories: categories, category: category});
});*/

articleApp.use(category.getList, auth.getUser);

articleApp.get('/list/:id', [article.getListByCategoryId, category.getCategoryById], (req, res)=>{
    let {articles, categories, category, user} = req;
    res.render('list', {articles: articles, categories: categories, category: category, user:user});
});

//文章详情页
articleApp.get('/:id', [article.getArticleById, article.getTabs, article.getPreArticle, article.getNextArticle], (req, res)=>{
    let {categories, article, tabs, preArticle, nextArticle, user}=req;
    res.render('article', {categories: categories, article: article, tabs: tabs, preArticle: preArticle, nextArticle: nextArticle, user: user})

});

module.exports = articleApp;












