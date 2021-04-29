/**
 * 日志数据模型
 */
module.exports = class Tab extends require('./model'){
    /**
     * 获取日志列表
     * @param {integer} id 类目编号
     * @returns {Promise<unknown>}
     */
    static getLogPage(start, size){
        return new Promise((resolve, reject)=>{
            let sql='SELECT handle, `time`, ip FROM `log` ORDER BY `time` DESC LIMIT ?,?';
            this.query(sql, [start, size]).then(results=>{
                resolve(results);
            }).catch(err=>{
                console.log(`获取日志列表失败: ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 获取日志总条目数
     */
    static getLogCount(){
        return new Promise((resolve, reject)=>{
            let sql='SELECT COUNT(*) AS `count` FROM `log`';
            this.query(sql).then(results=>{
                resolve(results[0].count);
            }).catch(err=>{
                console.log(`获取日志总条目数失败: ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 添加日志
     * @returns {Promise<unknown>}
     */
    static addLog(log){
        return new Promise((resolve, reject)=>{
            let sql='INSERT INTO `log` SET ?';
            this.query(sql, log).then(results=>{
                resolve(results.affectedRows);
            }).catch(err=>{
                console.log(`添加日志失败: ${err.message}`);
                reject(err);
            })
        })
    }
}








