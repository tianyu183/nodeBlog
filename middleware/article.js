
const Article=require('../model/article');
const Tab=require('../model/tab');
/**
 * 文章中间件
 */
module.exports={
    /**
     * 获取热门文章
     * @param req
     * @param res
     * @param next
     */
    getHot: (req, res, next)=>{
        Article.getHot(3).then(results=>{
            req.hots=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取最新文章
     * @param req
     * @param res
     * @param next
     */
    getList: (req, res, next)=>{
        Article.getList().then(results=>{
            req.articles=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取指定类目下的文章列表
     * @param req
     * @param res
     * @param next
     */
    getListByCategoryId: (req, res, next)=>{
        let id=req.params.id;
        Article.getListByCategoryId(id).then(results=>{
            req.articles=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取指定关键词的文章列表
     * @param req
     * @param res
     * @param next
     */
    getListByKeyword: (req, res, next)=>{
        let keyword=req.query.keyword;
        Article.getListByKeyword(keyword).then(results=>{
            req.articles=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取指定文章的详情
     * @param req
     * @param res
     * @param next
     */
    getArticleById: (req, res, next)=>{
        let id=req.params.id;
        Article.getArticleById(id).then(result=>{
            req.article=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取指定文章的标签列表
     * @param req
     * @param res
     * @param next
     */
    getTabs: (req, res, next)=>{
        let id=req.params.id;
        Tab.getTabListByArticleId(id).then(results=>{
            req.tabs=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取上一篇文章
     * @param req
     * @param res
     * @param next
     */
    getPreArticle: (req, res, next)=>{
        let id=req.params.id;
        Article.getPreArticleById(id).then(result=>{
            req.preArticle=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取下一篇文章
     * @param req
     * @param res
     * @param next
     */
    getNextArticle: (req, res, next)=>{
        let id=req.params.id;
        Article.getNextArticleById(id).then(result=>{
            req.nextArticle=result;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 获取总博文数
     * @param req
     * @param res
     * @param next
     */
    /*getArticleCount: (req, res, next) => {
        Article.getArticleCount().then(result => {
            req.articleCount = result;
            next();
        }).catch(err => {
            next(err);
        })
    },*/
    getArticleCount: (req, res, next) => {
        Article.getArticleCount(req.query.category_id, req.query.hot).then(result => {
            req.articleCount = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取指定页的文章列表
     */
    /*getPage: (req, res, next)=>{
        Article.getPage(res.start, res.size).then(results=>{
            req.pageList=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },*/
    getPage: (req, res, next)=>{
        Article.getPage(res.start, res.size, req.query.category_id, req.query.hot).then(results=>{
            req.pageList=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 设置热门推荐
     * @param req
     * @param res
     * @param next
     */
    setHot: (req, res, next)=>{
        let {id, hot} = req.query;
        Article.setHot(id, hot).then(results=>{
            req.affectedRows=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 添加博文
     */
    addArticle: (req, res, next)=>{
        /*console.log('添加博文', req);
        console.log(req.uploadUrl);*/
        let {title, content, hot, category_id}=req.body;
        let article={
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : null
        }
        Article.addArticle(article).then(results=>{
            req.insertId=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 删除文章
     * @param req
     * @param res
     * @param next
     */
    delArticle: (req, res, next)=>{
        let {id} = req.query;
        Article.delArticle(id).then(results=>{
            req.affectedRows=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },

    /**
     * 编辑博文
     */
    editArticle: (req, res, next)=>{
        let {title, content, hot, category_id, thumbnail, id}=req.body;
        let article={
            title: title,
            content: content,
            hot: hot ? 1 : 0,
            category_id: category_id,
            thumbnail: req.uploadUrl ? req.uploadUrl : thumbnail, //若重新上传缩略图，则取最新的值，否则取之前的值
            id: id
        }
        Article.editArticle(article).then(results=>{
            req.affectedRows=results;
            next();
        }).catch(err=>{
            next(err);
        })
    },
}







