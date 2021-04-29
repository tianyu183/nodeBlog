/**
 * 账号数据模型
 */
module.exports = class Account extends require('./model'){
    /**
     * 获取账号信息
     * @param {integer} id 账号编号
     */
    static getAccountInfo(id){
        return new Promise((resolve, reject)=>{
            let sql="SELECT `id`, `username`, `password` FROM `user` WHERE `id`=?";
            this.query(sql, id).then(results=>{
                resolve(results[0]);
            }).catch(err=>{
                console.log(`获取账号信息失败: ${err.message}`);
                reject(err);
            })
        })
    }

    /**
     * 修改账号密码
     * @param {integer} id 账号编号
     * @param {string} password 账号密码
     */
    static setAccountPassword(id, password){
        return new Promise((resolve, reject)=>{
            let sql="UPDATE `user` SET `password`=? WHERE id=?";
            this.query(sql, [password, id]).then(results=>{
                resolve(results.affectedRows);
            }).catch(err=>{
                console.log(`修改账号密码失败: ${err.message}`);
                reject(err);
            })
        })
    }


}





