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