/**
 * Copyright (c) 2020, chanjet-fe, https://github.com/chanjet-fe.
 * Jet-Serve静态网页多终端同步测试服务器
 */
'use strict';

const { promisify } = require('util');
const program = require('commander');
const path = require('path');
const chalk = require('chalk');
const bs = require('browser-sync');
const fs = require('graceful-fs');
const Handlebars = require('Handlebars');
const globby = require('globby');
const localIp = require('fez-local-ip');
const boxen = require('boxen');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

program
  .version(require(path.join(__dirname, 'package.json')).version)
  .option('-d --directory [bool]', '目录浏览', false)
  .option('-i --index [html]', '默认打开页面', 'index')
  .option('-p --port [number]', '服务器端口', 8080)
  .option('-up --uiport [number]', 'Browsersync配置端口', 9000)
  .parse(process.argv);

const projectDir = path.resolve(process.cwd(), program.args[0] || '');

const existsIndex = fs.existsSync(path.join(projectDir, program.index + '.html'));

const startServer = () => {
  return new Promise(resolve => {
    const bsConfig = {
      watch: false,
      socket: {
        namespace: 'jet-serve'
      },
      server: {
        baseDir: [projectDir],
        index: program.index + '.html',
        directory: program.directory || (!existsIndex && program.index !== 'qr')
      },
      ui: {
        port: program.uiport
      },
      port: program.port,
      startPath: '/'
    }
    program.index === 'qr' && bsConfig.server.baseDir.push(path.join(__dirname, 'zindex'));
    bs.init(bsConfig, () => {
      console.log(chalk.green('Serving!'));
      console.log(chalk.gray('More info see:https://github.com/chanjet-fe/jet-serve'));
      resolve();
    });
  });
}

const createQrHtml = async () => {

  const renderData = {
    "projectName": projectDir.split(path.sep).pop(),
    "projectPages": [],
    "ip": localIp.getLocalIP4()
  };

  const htmlFilePath = await globby([path.join(projectDir, '**/*.html')]);
  htmlFilePath.map((file) => {
    renderData.projectPages.push(path.relative(projectDir, file))
  })

  const htmlSource = await readFile(path.join(__dirname, 'lib/qr.hbs'), 'utf-8');
  const htmlTemp = Handlebars.compile(htmlSource);
  const qrHtmlSource = htmlTemp(renderData);
  await writeFile(path.join(__dirname, 'zindex/qr.html'), qrHtmlSource);
}

(async () => {
  let message = chalk.cyan('欢迎使用Jet-Serve静态网页多终端同步测试服务器');
  console.log(boxen(message, {
    padding: 1,
    borderColor: 'white',
    margin: 0,
    borderStyle: 'classic'
  }));
  program.index === 'qr' && await createQrHtml();
  await startServer();
})();
