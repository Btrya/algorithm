const superagent = require("superagent");
const fs = require('fs');
const path = require('path');

/** 删除指定目录 */
function removeDir(pathname) {
    const fullPath = path.resolve(__dirname, pathname);
    const process = require('child_process');
    console.log(`${pathname}目录已存在, 准备执行删除`)
    process.execSync(`rm -rf ${fullPath}`);
    console.log(`历史目录${pathname}删除完成`)
}

/**
 * 创建指定目录
 * @returns 
 */
function mkAssetDir(pathname) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(__dirname, pathname);
        if (fs.existsSync(fullPath)) {
            removeDir(pathname);
        }
        fs.mkdirSync(path.resolve(__dirname, pathname))
        console.log(`创建目录${pathname}成功, 准备开始下载资源`); // 这里改成准备下载资源
        return resolve();
    })

}


/** 从字符串中提取key的value */
function getValueListByReg(str, key) {
    const reg = new RegExp(`"${key}":"(.*?)"`, 'g');
    const matchResult = str.match(reg);
    const resList = matchResult.map(item => {
        const res = item.match(/:"(.*?)"/g)
        return RegExp.$1;
    })
    return resList
}

/**
 * 根据url下载资源
 * @param {*} url 资源链接
 * @param {*} name 资源名称
 * @param {*} assetDir 资源存储的路径
 * @returns 
 */
function downloadAsset(url, name, assetDir) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, assetDir, name);
        superagent.get(url).end((err, res) => {
            if (err) {
                return reject(err);

            }
            fs.writeFile(fullPath, res.body, 'binary', (err) => {
                if (err) {
                    return reject(err);
                }
                return resolve();
            })
        })
    })

}

/**
 * 请求url, 其实headers可以直接用一个对象来设置
 * @param {*} url 
 * @param {*} headers 
 * @returns 
 */
function request(url, headers) {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .set(headers)
            .end(async (err, res) => {
                if (err) {
                    reject(`访问失败 - ${err}`);
                } else {
                    resolve(res);
                }
            });
    })

}

module.exports = {
    removeDir,
    mkAssetDir,
    getValueListByReg,
    downloadAsset,
    request
}