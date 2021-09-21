const cliProgress = require('cli-progress');
const cheerio = require('cheerio');
const {
  mkAssetDir,
  downloadAsset,
  request,
  getValueListByReg
} = require('./common.js')

const bar1 = new cliProgress.SingleBar({
  clearOnComplete: false
}, cliProgress.Presets.shades_classic);

let succeed = 0;

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

async function runVideo(keyword, counts, assetDir) {
  try {

    const allVideoList = await getVideoDataByPage(0, counts, keyword)
    const total = allVideoList.length;
    // 声明常量, 存储资源目录
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

module.exports = {
  runVideo
}