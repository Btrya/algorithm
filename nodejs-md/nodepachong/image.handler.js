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

function runImg(keyword, counts, assetDir) {
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