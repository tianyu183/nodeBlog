/**
 * 入口模块
 */
const express = require('express');
const session = require('cookie-session'); //用于记录登陆状态
const multer = require('multer'); //支持上传功能的插件
const path = require('path');
const fs = require('fs');

//创建主应用
const app = express(); //创建网址服务器

//上传配置  ---上传配置应在静态资源配置之前
const upload = multer({
    dest: './static/upload',  //上传后的存储目录
    limits: {
        fileSize: 1024*1024*2 //单个文件大小限制在2MB以内
    }
})


//模板引擎的设置
//view engine是默认模板的配置项
app.set('view engine', 'html');  //使用html模板
//第一个参数是固定的views,是express固定的配置,第二个views是文件夹的名字,
//第二个参数是位置,path模块需要引入
app.set('views', `${__dirname}/views`); //模板引擎所在的目录
//表示要渲染后缀为html文件时,使用ejs模板引擎
//告诉框架使用什么模板引擎渲染什么后缀的模板文件
//第一个参数是模板的后缀,第二个参数是模板的引擎
//express框架可以使用多个模板引擎
app.engine('html', require('ejs').renderFile); //用ejs来渲染模板

//静态资源的配置
app.use(express.static('static'));

//Post请求处理
app.use(express.urlencoded({extended: true}));

//session配置
app.use(session({
    keys: ['secret'],
    maxAge: 1000*60*30 //session会话时间保持30分钟，并不会自动延时，每隔30分钟会让你登录一次
}));
//session延期配置
app.use((req, res, next)=>{
    //当用户点击时每隔一分钟进行延时（maxAge）
    req.session.nowInMinutes = Math.floor(Date.now()/60e3); //60e3等价于60000毫秒，即60秒
    next();
});


/**
 * 前台
 */
//post请求， 调用首页子应用
// app.use('/', require('./router/index'));
// app.use('/index', require('./router/index'));
app.use(/\/(index)?/, require('./router/index')); //正则表达式，(index)表示index这个单词可有可无

//调用文章子应用
app.use('/article', require('./router/article'));

//调用搜索子应用
app.use('/search', require('./router/search'));

//调用登录子应用
app.use('/login', require('./router/login'));


/**
 * 后台
 */
//进入后台的权限验证
// '/admin/?*' ---?代表0或1个，表示前面的/可有可无。 *表示匹配admin下的任意路径
app.use('/admin/?*', require('./middleware/auth').allowToAdmin);

//上传操作
// '/admin/*' 匹配admin下的任一路径
app.post('/admin/*', upload.single('upload'), (req, res, next)=>{
    //上传成功后的文件对象
    let {file}=req;
    if(file){
        //file.originalname 是指文件的原名称
        let extname=path.extname(file.originalname); //得到文件原始的后缀名
        //file.path 是指上传后的文件路径
        fs.renameSync(file.path, file.path+extname); //文件的重命名
        //file.filename 是指上传后的文件名
        req.uploadUrl= '/upload/' + file.filename +extname
    }
    next();
});


//调用后台首页
app.use(/\/admin\/(index)?/, require('./router/admin/index'));

//调用后台的文章管理
app.use('/admin/article', require('./router/admin/article'));

//调用后台的类目管理
app.use('/admin/category', require('./router/admin/category'));

//调用后台的日志管理
app.use('/admin/log', require('./router/admin/log'));

//调用后台的账户管理
app.use('/admin/account', require('./router/admin/account'));


//退出登录
app.get('/user/logout', (req, res)=>{
    req.session.user=null;
    res.render('login', {msg: '退出成功'})
});
//render方法执行了多个操作
//1.拼接了模板的路径
//2.拼接了模板的后缀
//3.将模板和数据连接
//4.直接将结果返回给数据,都不要使用send了
//第一个参数是模板的名字,第二个参数是模板的对象


app.listen(3000); //监听服务器端口
console.log('服务器响应成功');


//1.控制台输入 node index.js
//2.打开游览器在地址栏输入 127.0.0.1:3000


