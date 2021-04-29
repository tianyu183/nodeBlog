const Category=require('../model/category');
/**
 * 文章类目中间件
 */
module.exports= {
    /**
     * 获取文章类目
     * @param req
     * @param res
     * @param next
     */
    getList: (req, res, next) => {
        Category.getList().then(results => {
            req.categories = results;
            next();
        }).catch(err => {
            next(err);
        })
    },
    /**
     * 获取指定编号的类目详情
     * @param req
     * @param res
     * @param next
     */
    getCategoryById: (req, res, next) => {
        let id=req.params.id;
        Category.getCategoryById(id).then(results => {
            req.category = results;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 获取总类目数
     * @param req
     * @param res
     * @param next
     */
    getCategoryCount: (req, res, next) => {
        Category.getCategoryCount().then(result => {
            req.categoryCount = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 新增类目
     */
    addCategory: (req, res, next) => {
        let {name, index}=req.body;
        Category.addCategory(name, index).then(result => {
            req.insertId = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 删除类目
     */
    delCategory: (req, res, next) => {
        Category.delCategory(req.query.id).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 编辑类目名称
     */
    setCategoryName: (req, res, next) => {
        let {id, name}=req.body;
        Category.setCategoryName(id, name).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },

    /**
     * 编辑类目索引
     */
    setCategoryIndex: (req, res, next) => {
        let {id, index}=req.body;
        Category.setCategoryIndex(id, index).then(result => {
            req.affectedRows = result;
            next();
        }).catch(err => {
            next(err);
        })
    },
}