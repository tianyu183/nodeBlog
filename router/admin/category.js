/**
 * 后台类目管理
 */

const express = require('express');
const category = require('../../middleware/category')

const categoryApp = express();

//类目列表
categoryApp.get('/', category.getList, (req, res)=>{
    let {user, categories} = req;
    res.render('admin/category/index', {user: user, categories: categories});
});

//新增类目
categoryApp.post('/add', category.addCategory, (req, res)=>{
    if(req.insertId){
        res.json({code: 1, msg: '添加成功'});
    } else{
        res.json({code: 0, msg: '添加失败'});
    }
});

//删除类目
categoryApp.get('/del', category.delCategory, (req, res)=>{
    if(req.affectedRows>0){
        res.json({code: 1, msg: '删除成功'});
    } else{
        res.json({code: 0, msg: '删除失败'});
    }
});

//编辑类目名称
categoryApp.post('/setName', category.setCategoryName, (req, res)=>{
    if(req.affectedRows>0){
        res.json({code: 1, msg: '编辑类目名称成功'});
    } else{
        res.json({code: 0, msg: '编辑类目名称失败'});
    }
});

//编辑类目索引
categoryApp.post('/setIndex', category.setCategoryIndex, (req, res)=>{
    if(req.affectedRows>0){
        res.json({code: 1, msg: '编辑类目索引成功'});
    } else{
        res.json({code: 0, msg: '编辑类目索引失败'});
    }
});


module.exports = categoryApp;


