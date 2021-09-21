## 一、 初始化项目

`npm init`

## 二、 安装需要的npm包

`yarn add superagent cheerio`

* superagent 模拟浏览器端发请求, 比如登录 https://www.npmjs.com/package/superagent
* cheerio 解析静态html https://www.npmjs.com/package/cheerio

## 三、 修改package.json script

1. package.json
```json
"scripts": {
    "start": "node index.js"
},
```

2. index.js

`console.log('路白')`

3. 运行一下试试

`npm run start`

## 四、引入需要的包, 简单访问一下百度测试一下

可以看到访问www.baidu.com的结果可以从res获取到, 而整个网站的html可以通过res.text获取.

```js
const superagent = require("superagent");
const cheerio = require("cheerio");


superagent.get('http://www.baidu.com/').end((err, res) => {
    if (err) {
        console.log(`访问失败 - ${err}`)
    } else {
        console.log(res.text);
    }
});
```

## 五、解析获取到的html

通过cheerio.load可以解析出咱们获取到的html, 然后操作各种元素.

比如咱们试一下拿到百度网站的meta标签内容:

```js
const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require('fs');


superagent.get('http://www.baidu.com').end((err, res) => {
    if (err) {
        console.log(`访问失败 - ${err}`)
    } else {
        const htmlText = res.text;
        const $ = cheerio.load(htmlText);
        $('meta').each((index, ele) => {
            console.log(index);
            console.log($(ele).attr('content'));
        })
    }
});
```

## 六、抓取百度图片

新建 image.handler.js 文件, 专门处理图片逻辑.

1. 检查url

百度搜索一下"哈哈", 看一下url有什么变化？

可以看到比较重要的就是下面的这些字段

https://image.baidu.com/search/index?tn=baiduimage&word=%B9%FE%B9%FE&ie=gbk


tn=baiduimage 百度图片
word=encode('哈哈')
ie=gbk 应该是指内容编码格式

2. 检查DOM结构

我们要做的是下载图片, 那么现在有个问题, 我们如何拿到图片的Url?

右键查看网页源代码, 这里查看到的就是我们能直接通过superagent爬取到的内容. 

查找可以发现, 图片的url是一个叫做objURL的字段, 所以我们待会可以通过正则来匹配到它们. 

```
/"objURL":"(.*?)",/g
```

3. 写代码 访问百度图片

```js
const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require('fs');

const word = '哈哈';

superagent
    .get(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(word)}`)
    .end((err, res) => {
        if (err) {
            console.log(`访问失败 - ${err}`)
        } else {
            const htmlText = res.text;
            const $ = cheerio.load(htmlText);
            console.log(htmlText);
        }
    });
```

运行一下试试

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="utf-8">
    <title>百度安全验证</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-status-bar-style" content="black">
    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0">
    <meta name="format-detection" content="telephone=no, email=no">
    <link rel="shortcut icon" href="https://www.baidu.com/favicon.ico" type="image/x-icon">
    <link rel="icon" sizes="any" mask href="https://www.baidu.com/img/baidu.svg">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge">
    <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests">
    <link rel="stylesheet" href="https://ppui-static-wap.cdn.bcebos.com/static/touch/css/api/mkdjump_0635445.css" />
</head>
<body>
    <div class="timeout hide">
        <div class="timeout-img"></div>
        <div class="timeout-title">网络不给力，请稍后重试</div>
        <button type="button" class="timeout-button">返回首页</button>
    </div>
    <div class="timeout-feedback hide">
        <div class="timeout-feedback-icon"></div>
        <p class="timeout-feedback-title">问题反馈</p>
    </div>

<script src="https://wappass.baidu.com/static/machine/js/api/mkd.js"></script>
<script src="https://ppui-static-wap.cdn.bcebos.com/static/touch/js/mkdjump_fbb9952.js"></script>
</body>
</html>
```

怎么好像不太对劲啊? 怎么出来一个百度安全验证?
盲猜是遇到了百度的反爬策略了. 

怎么办? 最大程度模拟浏览器行为!! 咱们把request headers也补上试试.

4. 添加请求头

去浏览器network面板, 把这些请求头的值都复制下来.

```js
const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require('fs');

const word = '哈哈';

const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'
}


superagent
    .get(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(word)}`)
    .set('Accept', headers['Accept'])
    .set('Accept-Encoding', headers['Accept-Encoding'])
    .set('Accept-Language', headers['Accept-Language'])
    .set('Cache-Control', headers['Cache-Control'])
    .set('Connection', headers['Connection'])
    .set('User-Agent', headers['User-Agent'])
    .set('sec-ch-ua', headers['sec-ch-ua'])
    .end((err, res) => {
        if (err) {
            console.log(`访问失败 - ${err}`)
        } else {
            const htmlText = res.text;
            const $ = cheerio.load(htmlText);
            console.log(htmlText);
        }
    });
```

发现可以了, 美滋滋!

5. 获取imgurlList

```js
const htmlText = res.text;
const $ = cheerio.load(htmlText);
const imageMatches = htmlText.match(/"objURL":"(.*?)",/g);
const imageUrlList = imageMatches.map(item => {
    const imageUrl = item.match(/:"(.*?)",/g)
    return RegExp.$1;
})

console.log(imageUrlList);
```

6. 获取图片的标题列表

```js
const titleMatches = htmlText.match(/"fromPageTitle":"(.*?)",/g);
const titleList = titleMatches.map(item => {
    const title = item.match(/:"(.*?)",/g)
    return RegExp.$1;
})

console.log(titleList);
```

7. 提取公共函数

是不是觉得获取图片url和获取title的代码几乎一模一样, 咱们封装一下

注意这里要写动态的正则表达式了, 因为咱们要传入动态的key

```js
function getValueListByReg(str, key) {
    const reg = new RegExp(`"${key}":"(.*?)"`, 'g');
    const matchResult = str.match(reg);
    const resList = matchResult.map(item => {
        const res = item.match(/:"(.*?)"/g)
        return RegExp.$1;
    })
    return resList
}


const htmlText = res.text;
const $ = cheerio.load(htmlText);

const imageUrlList = getValueListByReg(htmlText, 'objURL')
console.log(imageUrlList);

const titleList = getValueListByReg(htmlText, 'fromPageTitle')
console.log(titleList);
```

8. 去重标题中的冗余内容

可以看到, 咱们获取到的title里是包含html标签的, 咱们通过正则把它去掉.

```js
const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));
console.log(titleList);
```

9. 创建images目录存储图片

```js
function mkImageDir(pathname) {
    const fullPath = path.resolve(__dirname, pathname);
    if (fs.existsSync(fullPath)) {
        console.log(`${pathname}目录已存在, 跳过此步骤`);
        return;
    }
    fs.mkdirSync(path.resolve(__dirname, pathname));
    console.log(`创建目录${pathname}成功`);
}
```

```js
const htmlText = res.text;
const $ = cheerio.load(htmlText);

const imageUrlList = getValueListByReg(htmlText, 'objURL')
console.log(imageUrlList);

const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));
console.log(titleList);

mkImageDir('images');
```

10. 下载图片images目录

```js
function downloadImage(url, name, index) {
    const fullPath = path.join(__dirname, 'images', `${index}-${name}.png`);
    if (fs.existsSync(fullPath)) {
        console.log(`文件已存在, 跳过此步骤：${name}`);
        return;
    }
    superagent.get(url).end((err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        fs.writeFile(fullPath, res.body, 'binary', (err) => {
            if (err) {
                console.log(err);
                return;
            }
            console.log(`下载成功 ${url}`);
        })
    })
}
```

```js
const htmlText = res.text;
const $ = cheerio.load(htmlText);

const imageUrlList = getValueListByReg(htmlText, 'objURL')
const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));

mkImageDir('images');

imageUrlList.forEach((url, index) => {
    downloadImage(url, titleList[index], index)
});
```

11. 加个进度条?

安装一个第三方包 cli-progress

```js
const superagent = require("superagent");
const cheerio = require("cheerio");
const fs = require('fs');
const path = require('path');

const cliProgress = require('cli-progress');

const bar1 = new cliProgress.SingleBar({
    clearOnComplete: false
}, cliProgress.Presets.shades_classic);

let total = 0;
let succeed = 0;

const word = '哈哈';

const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'
}

function mkImageDir(pathname) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(__dirname, pathname);
        if (fs.existsSync(fullPath)) {
            return reject(`${pathname}目录已存在, 跳过此步骤`);
        }
        fs.mkdirSync(path.resolve(__dirname, pathname))
        console.log(`创建目录${pathname}成功, 准备开始下载图片`);
        return resolve();
    })

}

function downloadImage(url, name, index) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, 'images', `${index}-${name}.png`);
        if (fs.existsSync(fullPath)) {
            return reject(`文件已存在, 跳过此步骤：${name}`)
        }
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

function getValueListByReg(str, key) {
    const reg = new RegExp(`"${key}":"(.*?)"`, 'g');
    const matchResult = str.match(reg);
    const resList = matchResult.map(item => {
        const res = item.match(/:"(.*?)"/g)
        return RegExp.$1;
    })
    return resList
}


superagent
    .get(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(word)}`)
    .set('Accept', headers['Accept'])
    .set('Accept-Encoding', headers['Accept-Encoding'])
    .set('Accept-Language', headers['Accept-Language'])
    .set('Cache-Control', headers['Cache-Control'])
    .set('Connection', headers['Connection'])
    .set('User-Agent', headers['User-Agent'])
    .set('sec-ch-ua', headers['sec-ch-ua'])
    .end(async (err, res) => {
        if (err) {
            console.log(`访问失败 - ${err}`)
        } else {
            const htmlText = res.text;
            const $ = cheerio.load(htmlText);

            const imageUrlList = getValueListByReg(htmlText, 'objURL')
            const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));
            total = imageUrlList.length;

            try {
                await mkImageDir('images');

                bar1.start(total, 0);

                imageUrlList.forEach((url, index) => {
                    downloadImage(url, titleList[index], index)
                        .then(() => {
                            succeed++;
                            bar1.update(succeed);
                        })
                        .then(() => {
                            if (succeed === total) {
                                bar1.stop();
                                console.log('恭喜！图片下载完成！')
                            }
                        })
                });
            } catch (e) {
                console.log(e);
            }
        }
    });
```

12. 已存在images先删除, 再创建

```js
function removeDir(pathname) {
    const fullPath = path.resolve(__dirname, pathname);
    const process = require('child_process');
    console.log(`${pathname}目录已存在, 准备执行删除`)
    process.execSync(`rm -rf ${fullPath}`);
    console.log(`历史目录${pathname}删除完成`)
}

function mkImageDir(pathname) {
    return new Promise((resolve, reject) => {
        const fullPath = path.resolve(__dirname, pathname);
        if (fs.existsSync(fullPath)) {
            removeDir(pathname);
        }
        fs.mkdirSync(path.resolve(__dirname, pathname))
        console.log(`创建目录${pathname}成功, 准备开始下载图片`);
        return resolve();
    })

}
```

13. 通过cli来输入关键词?


* 安装 inquirer, commander

`yarn add commander inquirer --registry=https://registry.npm.taobao.org`

* 初始化交互的问题.

```js
#!/usr/bin/env node

const fs = require('fs');
const inquirer = require('inquirer');
const commander = require('commander');
const {
    runImg
} = require('./image.handler.js');

const initQuestions = [{
        type: 'checkbox',
        name: 'channels',
        message: '请选择想要搜索的渠道',
        choices: [{
                name: '百度图片',
                value: 'images'
            },
            {
                name: '百度视频',
                value: 'video'
            }
        ]
    },
    {
        type: 'input',
        name: 'keyword',
        message: '请输入想要搜索的关键词',
    }
];

inquirer.prompt(initQuestions).then(result => {
    // {"channel":["images"],"keyword":"哈哈哈哈"}
    const {
        channels,
        keyword
    } = result;

    for (let channel of channels) {
        switch (channel) {
            case 'images': {
                runImg(keyword);
                break;
            }
        }
    }
})
```

* 把刚才的图片处理导出成函数, 接收cli的输入

```js
function runImg(keyword) {
    superagent
        .get(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(keyword)}`)
        .set('Accept', headers['Accept'])
        .set('Accept-Encoding', headers['Accept-Encoding'])
        .set('Accept-Language', headers['Accept-Language'])
        .set('Cache-Control', headers['Cache-Control'])
        .set('Connection', headers['Connection'])
        .set('User-Agent', headers['User-Agent'])
        .set('sec-ch-ua', headers['sec-ch-ua'])
        .end(async (err, res) => {
            if (err) {
                console.log(`访问失败 - ${err}`)
            } else {
                const htmlText = res.text;
                const $ = cheerio.load(htmlText);

                const imageUrlList = getValueListByReg(htmlText, 'objURL')
                const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));
                total = imageUrlList.length;

                try {
                    await mkImageDir('images');

                    bar1.start(total, 0);

                    imageUrlList.forEach((url, index) => {
                        downloadImage(url, titleList[index], index)
                            .then(() => {
                                succeed++;
                                bar1.update(succeed);
                            })
                            .then(() => {
                                if (succeed === total) {
                                    bar1.stop();
                                    console.log('恭喜！图片下载完成！')
                                }
                            })
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        });
}

module.exports = {
    runImg
}
```

14. 自定义爬取图片的数量?

刚才可以发现, 我们每次只能爬取30张图片, 那么怎么才能爬取更多, 或者自定义多少张呢?

咱们去浏览器里里看一下, 真正用户浏览的时候是怎样加载更多图片的?

可以发现, 第一次确实就加载了30张图片, 但是随着用户滚动条的下拉, 会出现一个xhr请求.

https://image.baidu.com/search/acjson?tn=resultjson_com&logid=9421724892812703529&ipn=rj&ct=201326592&is=&fp=result&queryWord=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87+%E7%88%AC%E8%99%AB&cl=2&lm=-1&ie=utf-8&oe=utf-8&adpicid=&st=&z=&ic=&hd=&latest=&copyright=&word=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87+%E7%88%AC%E8%99%AB&s=&se=&tab=&width=&height=&face=&istype=&qc=&nc=1&fr=&expermode=&nojc=&pn=90&rn=30&gsm=5a&1629990261224=

精简一下

https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&fp=result&queryWord=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87+%E7%88%AC%E8%99%AB&ie=utf-8&oe=utf-8&word=%E7%99%BE%E5%BA%A6%E5%9B%BE%E7%89%87+%E7%88%AC%E8%99%AB&pn=90&rn=30&1629990261224=

大概可以看出来 

word和queryWorld都是查询的关键词
pn应该是startCursor
rn应该是pageSize
gsm是pn的16进制
最后应该是拼了个时间戳, 防止缓存

gogogogogog开始写代码！！

15. 首先要接收用户收入的count参数

```js
const initQuestions = [{
        type: 'checkbox',
        name: 'channels',
        message: '请选择想要搜索的渠道',
        choices: [{
                name: '百度图片',
                value: 'images'
            },
            {
                name: '百度视频',
                value: 'video'
            }
        ]
    },
    {
        type: 'input',
        name: 'keyword',
        message: '请输入想要搜索的关键词',
    },
    {
        type: 'number',
        name: 'counts',
        message: '请输入要下载图片的数量x, 最小30',
    },
];

inquirer.prompt(initQuestions).then(result => {
    // {"channel":["images"],"keyword":"哈哈哈哈", "counts": 2}
    const {
        channels,
        keyword,
        counts
    } = result;

    for (let channel of channels) {
        switch (channel) {
            case 'images': {
                runImg(keyword, counts);
                break;
            }
        }
    }
})
```

```js
// 添加一个参数 counts
function runImg(keyword, counts) { }
```

16. 梳理逻辑

先把之前的请求封装一下, 因为set header是可以复用的.

```js
function request(url) {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .set('Accept', headers['Accept'])
            .set('Accept-Encoding', headers['Accept-Encoding'])
            .set('Accept-Language', headers['Accept-Language'])
            .set('Cache-Control', headers['Cache-Control'])
            .set('Connection', headers['Connection'])
            .set('User-Agent', headers['User-Agent'])
            .set('sec-ch-ua', headers['sec-ch-ua'])
            .end(async (err, res) => {
                if (err) {
                    reject(`访问失败 - ${err}`);
                } else {
                    resolve(res);
                }
            });
    })

}

function runImg(keyword, counts) {
    request(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(keyword)}`)
        .then(async (res) => {
            const htmlText = res.text;
            const $ = cheerio.load(htmlText);

            const imageUrlList = getValueListByReg(htmlText, 'objURL')
            const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));

            // 为了方便和后续json数据结合, 修改为同一个数组
            const allImageUrls = imageUrlList.map((imgUrl, index) => ({
                imgUrl,
                title: titleList[index]
            }));

            total = allImageUrls.length;


            try {
                await mkImageDir('images');

                bar1.start(total, 0);

                allImageUrls.forEach((item, index) => {
                    downloadImage(item.imgUrl, item.title, index)
                        .then(() => {
                            succeed++;
                            bar1.update(succeed);
                        })
                        .then(() => {
                            if (succeed === total) {
                                bar1.stop();
                                console.log('恭喜！图片下载完成！')
                            }
                        })
                });
            } catch (e) {
                console.log(e);
            }
        })
}
```

17. 写递归请求, 请求自定义数量

```js
async function getImageByPage(start, total, word) {
    let allImages = [];
    while (start < total) {
        const size = Math.min(60, total - start); // 限制每次最大请求60
        const res = await request(`https://image.baidu.com/search/acjson?tn=resultjson_com&ipn=rj&fp=result&queryWord=${encodeURIComponent(word)}&ie=utf-8&oe=utf-8&word=${encodeURIComponent(word)}&pn=${start}&rn=${size}&${Date.now()}=`);
        allImages = allImages.concat(res.data);
        start = start + size;
    }
    return allImages;
}
```

```js
runImg

const imageUrlList = getValueListByReg(htmlText, 'objURL')
const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));

// 为了方便和后续json数据结合, 修改为同一个数组
let allImageUrls = imageUrlList.map((imgUrl, index) => ({
    imgUrl,
    title: titleList[index]
}));

const firstPageCount = allImageUrls.length;

if (counts > firstPageCount) {
    // 如果要下载的图片数量大于初始的已请求的数量, 就再去请求补足counts
    const restImgUrls = await getImageByPage(firstPageCount, counts, keyword);
    const formatImgUrls = restImgUrls.filter(item => item.middleURL).map(item => ({
        imgUrl: item.middleURL,
        title: item.fromPageTitle.replace("<strong>", '').replace("</strong>", '')
    }));
    allImageUrls = allImageUrls.concat(formatImgUrls)
}

total = allImageUrls.length;
```

运行一下看看！！！

发现似乎并没有如期自定义加载图片, 哪里出了问题呢?


18. debug

在image.handler.js里添加一行执行代码

`runImg('猫咪', 90)`

然后在各个请求以及数据处理的位置打好断点, 开启调试模式.

我们通过调试可以发现是请求 https://image.baidu.com/search/acjson 接口的时候, 反爬了. 

接口里返回的信息并没有我们想要的数据, 而是有一行 Forbid spider access 提示.

其实还是咱们的请求模拟的不够真实. 

咱们把能加的参数都加上, 然后看一下request header, 发现其实Accept和之前是不一样的, 需要改一下

```js
// 加了Accept2
const headers = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept2': 'text/plain, */*; q=0.01',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'
}

// 加了传参, 默认采用原来的
function request(url, AcceptKey = 'Accept') {
    return new Promise((resolve, reject) => {
        superagent
            .get(url)
            .set('Accept', headers[AcceptKey])
            .set('Accept-Encoding', headers['Accept-Encoding'])
            .set('Accept-Language', headers['Accept-Language'])
            .set('Cache-Control', headers['Cache-Control'])
            .set('Connection', headers['Connection'])
            .set('User-Agent', headers['User-Agent'])
            .set('sec-ch-ua', headers['sec-ch-ua'])
            .end(async (err, res) => {
                if (err) {
                    reject(`访问失败 - ${err}`);
                } else {
                    resolve(res);
                }
            });
    })

}

async function getImageByPage(start, total, word) {
    let allImages = [];
    while (start < total) {
        const size = Math.min(60, total - start); // 限制每次最大请求60
        // 把能加的参数都加上
        const res = await request(`https://image.baidu.com/search/acjson?tn=resultjson_com&cl=2&lm=-1&logid=9421724892812703529&ipn=rj&ct=201326592&fp=result&nc=1&queryWord=${encodeURIComponent(word)}&ie=utf-8&oe=utf-8&word=${encodeURIComponent(word)}&pn=${start}&gsm=${(start).toString(16)}&rn=${size}&${Date.now()}=`, 'Accept2');
        // 数据从res.text里接收, 是一个字符串, 需要解析一下
        allImages = allImages.concat((JSON.parse(res.text)).data);
        start = start + size;
    }
    return allImages;
}


function downloadImage(url, name, index) {
    return new Promise((resolve, reject) => {
        const fullPath = path.join(__dirname, 'images', `${index}-${name}.png`);
        // 因为每次都会删除文件夹, 这里也就没必要判断文件是否存在了.
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

```

19. 再次尝试
    
可以发现我们已经可以自定义图片数量下载了！！！

20.  爬取百度视频

老样子, 先看一下浏览器上访问的行为.

https://www.baidu.com/sf/vsearch?pd=video&tn=vsearch&lid=b03615b600039e99&ie=utf-8&wd=%E7%8C%AB%E5%92%AA&rsv_spt=7&rsv_bp=1&f=8&oq=%E7%8C%AB%E5%92%AA&rsv_pq=b03615b600039e99&rsv_t=bcceeiPZ2j7KATKqFay9Xo1SDlqOtI0P35OBqzckihKlArj8YEhdELFZa%2FfdpeddE98V

可以看到首先请求了一个html, 然后随着下拉又请求了一个分页接口. 

到这里应该就了解了, 这其实是和百度图片一样的处理. 

咱们这次换一种方式, 只请求接口, 不再请求第一个Html.

同样需要 分页请求/下载资源/保存资源, 是不是和images有太多相似的地方?

所以咱们把刚才images里面的一些公用方法都提取出来.

* **新建一个common.js**

```js
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
```

* **修改image.handler.js里的调用方式**

```js
const cliProgress = require('cli-progress');
const {
    mkAssetDir,
    downloadAsset,
    request,
    getValueListByReg
} = require('./common.js')

const bar1 = new cliProgress.SingleBar({
    clearOnComplete: false
}, cliProgress.Presets.shades_classic);

let total = 0;
let succeed = 0;

// 请求html时的headers
const headers_defalult = {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'
}

// 请求json接口时的headers
const headers_json = {
    ...headers_defalult,
    'Accept': 'text/plain, */*; q=0.01'
}

async function getImageByPage(start, total, word) {
    let allImages = [];
    while (start < total) {
        const size = Math.min(60, total - start); // 限制每次最大请求60
        // 调用common.js request, 传入headers_json
        const res = await request(`https://image.baidu.com/search/acjson?tn=resultjson_com&cl=2&lm=-1&logid=9421724892812703529&ipn=rj&ct=201326592&fp=result&nc=1&queryWord=${encodeURIComponent(word)}&ie=utf-8&oe=utf-8&word=${encodeURIComponent(word)}&pn=${start}&gsm=${(start).toString(16)}&rn=${size}&${Date.now()}=`, headers_json);
        allImages = allImages.concat((JSON.parse(res.text)).data);
        start = start + size;
    }
    return allImages;
}

function runImg(keyword, counts) {
    // 调用common.js request, 传入headers_default
    request(`http://image.baidu.com/search/index?tn=baiduimage&ie=utf-8&word=${encodeURIComponent(keyword)}`, headers_defalult)
        .then(async (res) => {
            const htmlText = res.text;

            const imageUrlList = getValueListByReg(htmlText, 'objURL')
            const titleList = getValueListByReg(htmlText, 'fromPageTitle').map(item => item.replace("<strong>", '').replace("<\\/strong>", ''));

            // 为了方便和后续json数据结合, 修改为同一个数组
            let allImageUrls = imageUrlList.map((imgUrl, index) => ({
                imgUrl,
                title: titleList[index]
            }));

            const firstPageCount = allImageUrls.length;

            if (counts > firstPageCount) {
                // 如果要下载的图片数量大于初始的已请求的数量, 就再去请求补足counts
                const restImgUrls = await getImageByPage(firstPageCount, counts, keyword);
                const formatImgUrls = restImgUrls.filter(item => item.middleURL).map(item => ({
                    imgUrl: item.middleURL,
                    title: item.fromPageTitle.replace("<strong>", '').replace("</strong>", '')
                }));
                allImageUrls = allImageUrls.concat(formatImgUrls)
            }

            total = allImageUrls.length;


            try {
                // 声明常量, 存储资源目录
                const assetDir = 'images';
                await mkAssetDir(assetDir);

                bar1.start(total, 0);

                allImageUrls.forEach((item, index) => {
                    // 调用downloadAsset
                    downloadAsset(item.imgUrl, `${index}-${item.title}.png`, assetDir)
                        .then(() => {
                            succeed++;
                            bar1.update(succeed);
                        })
                        .then(() => {
                            if (succeed === total) {
                                bar1.stop();
                                console.log('恭喜！图片下载完成！')
                            }
                        })
                });
            } catch (e) {
                console.log(e);
            }
        })
}

module.exports = {
    runImg
}
```

* 运行一下, 保证原有服务没问题


* **新建video.handler.js**


视频这里有点不一样, 我们要先从搜索结果里获取到详情页链接, 然后获取详情页中的视频链接.

```js
const cheerio = require('cheerio');
const {
    mkAssetDir,
    downloadAsset,
    request,
    getValueListByReg
} = require('./common.js')

// 请求html时的headers
const headers_defalult = {
    'Accept': '*/*',
    'Accept-Encoding': 'gzip, deflate, br',
    'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.159 Safari/537.36',
    'sec-ch-ua': '"Chromium";v="92", " Not A;Brand";v="99", "Google Chrome";v="92"'
}

const headers_detail = {
    ...headers_defalult,
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
    'Upgrade-Insecure-Requests': '1'
}

async function getVideoDataByPage(start, total, word, videoUrlList = []) {
    const size = 10; // 每次请求10
    const detailPageUrls = [];

    // 因为咱们打算只取好看视频的, 也就是拿到的url可能不符合条件, 所以这里要利用detailPageUrls.length来做循环判断
    while (detailPageUrls.length < total) {
        const res = await request(`https://www.baidu.com/sf/vsearch?pd=video&tn=vsearch&lid=b03615b600039e99&ie=utf-8&wd=${encodeURIComponent(word)}&rsv_spt=7&rsv_bp=1&f=8&oq=${encodeURIComponent(word)}&rsv_pq=b03615b600039e99&rsv_t=bcceeiPZ2j7KATKqFay9Xo1SDlqOtI0P35OBqzckihKlArj8YEhdELFZa%2FfdpeddE98V&async=1&pn=${start}`, headers_defalult);
        const $ = cheerio.load(res.text);
        // video_small_intro 下的a标签, 点击会进入视频详情页, 在详情页才能获取到真正的视频链接
        $('.video_small_intro a').each((index, ele) => {
            // 拿到想要的数量后就return
            if (detailPageUrls.length === total) {
                return;
            }

            // 抓到的详情页会包含各种网站, 比如好看视频, bilibili, 微博等. 因为不同的网站DOM结构是不一样的, 咱们这里只抓取百度好看视频的.
            const href = $(ele).attr('href');
            if (href.indexOf('haokan.baidu.com') > -1) {
                detailPageUrls.push(href);
            }
        });
        start = start + size;
    }
    for (let item of detailPageUrls) {
        const res = await request(item, headers_detail);
        const htmlText = res.text;
        // 获取视频链接
        const videoUrls = getValueListByReg(htmlText, 'playurl');
        const $ = cheerio.load(htmlText);
        // 获取视频标题
        const title = $('title').text();
        videoUrlList.push({
            url: videoUrls[0].replaceAll('\\/', '/'), // 解析出来的url是带反斜杠的
            title
        });
    }

    return videoUrlList;
}

getVideoDataByPage(0, 10, '哈哈哈').then(console.log);
```

接下来下载视频

```js
async function runVideo(keyword, counts) {
    try {

        const allVideoList = await getVideoDataByPage(0, counts, keyword)
        const total = allVideoList.length;
        // 声明常量, 存储资源目录
        const assetDir = 'videos';
        await mkAssetDir(assetDir);

        bar1.start(counts, 0);

        allVideoList.forEach((item, index) => {
            // 调用downloadAsset
            downloadAsset(item.url, `${index}-${item.title}.mp4`, assetDir)
                .then(() => {
                    succeed++;
                    bar1.update(succeed);
                })
                .then(() => {
                    if (succeed === total) {
                        bar1.stop();
                        console.log('恭喜！视频下载完成！')
                    }
                })
        });
    } catch (e) {
        console.log(e);
    }
}

runVideo('猫咪', 10)

```

1.  使用commander 分别配置视频和图片命令

咱们不再一次性运行文件, 让用户选择了. 

而是分别把视频处理和图片处理指向两个命令.


```js
#!/usr/bin/env node

const inquirer = require('inquirer');
const {
    program
} = require('commander');
const {
    runImg
} = require('./image.handler.js');
const {
    runVideo
} = require('./video.handler.js');

// -V 自动被注册, node index.js -V即可查看版本号
program.version('0.0.1');

// -h 自动被注册, node index.js -h即可查看帮助, 查看所有命令
program
    .option('-v, --video', '爬取百度视频')
    .option('-i, --image', '爬取百度图片')

program.parse(process.argv);

const options = program.opts();

if (options.video) {
    const initQuestions = [{
            type: 'input',
            name: 'keyword',
            message: '请输入想要搜索的视频关键词',
        },
        {
            type: 'number',
            name: 'counts',
            message: '请输入要下载视频的数量, 占用资源较多, 建议数量少一点',
            default: 5
        },
        {
            type: 'input',
            name: 'assetDir',
            message: '请输入视频资源存储的文件夹名称',
            default: 'videos'
        },
    ];

    inquirer.prompt(initQuestions).then(result => {
        const {
            assetDir,
            keyword,
            counts
        } = result;
        // 添加一个参数 assetDir, 通过命令行控制存储位置
        runVideo(keyword, counts, assetDir);
    })
} else if (options.image) {
    const initQuestions = [{
            type: 'input',
            name: 'keyword',
            message: '请输入想要搜索的图片关键词',
        },
        {
            type: 'number',
            name: 'counts',
            message: '请输入要下载图片的数量x, 总数 = x * 30',
            default: 1
        },
        {
            type: 'input',
            name: 'assetDir',
            message: '请输入图片资源存储的文件夹名称',
            default: 'images'
        },
    ];

    inquirer.prompt(initQuestions).then(result => {
        const {
            assetDir,
            keyword,
            counts
        } = result;
        // 添加一个参数 assetDir, 通过命令行控制存储位置
        runImg(keyword, counts * 30, assetDir);
    })
}
```

2. 还不够！！通过npm link, 配置全局命令

package.json 添加bin脚本

```js
   "bin": {
        "btrya-crawler": "index.js"
    },
```

在当前根目录下运行 `npm run link` 就大功告成了！！


之后我们可以在任何地方通过以下命令来运行程序了

```
btrya-crawler -V
btrya-crawler -v
btrya-crawler -i
```