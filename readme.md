<a href="https://www.npmjs.com/package/jet-serve"><img src="https://img.shields.io/npm/v/jet-serve.svg" alt="npm-version"></a> <img src="https://img.shields.io/npm/dm/jet-serve.svg" alt="download-num"> <img src="https://img.shields.io/badge/node-%3E=8.16.0-brightgreen.svg" alt="node"> <img src="https://img.shields.io/npm/l/jet-serve.svg" alt="license"> <img src="https://img.shields.io/badge/platform-MacOS%7CLinux%7CWindows-lightgrey.svg" alt="platform">
# Jet-Serve

使用Vue、React构建完成的单页面应用，或是包含html页面的静态资源，Jet-serve 可以帮助你快速搭建网页服务器，浏览、测试你构建完成的页面应用。并且不用在多个浏览器、多个设备间来回切换，假设桌子上有pc、ipad、iphone、android等设备，同时打开了某个页面，你在任何一个终端滚动页面、点击等行为也会同步到其他浏览器和设备中。

![screenshot](https://user-images.githubusercontent.com/9346030/72503942-d3914c80-3877-11ea-9581-7e6336d25eb8.png)

## 全局安装

```bash
yarn global add jet-serve #或者 npm install jet-serve -g
```

## 全局使用

```bash
➜  react-demo git:(master) ✗ jet-serve --help
Usage: index [options]

Options:
  -V, --version          output the version number
  -d --directory [bool]  目录浏览 (default: false)
  -i --index [html]      默认打开页面 (default: "index")
  -p --port [number]     服务器端口 (default: 8080)
  -up --uiport [number]  Browsersync配置端口 (default: 9000)
  -h, --help             output usage information
```

#### 基本功能

```bash
# 在当前目录启动服务 默认打开当前目录下的 index.html 页面
jet-serve

# 在当前目录下的 dist 目录启动服务器 默认打开 dist 目录下的 index.html 页面
jet-serve dist

# 在 /User/furic/wwww/project-demo/dist 目录启动服务
jet-serve /User/furic/wwww/project-demo/dist

# 启动服务器默认打开目录浏览
jet-serve dist --directory # 或者 jet-serve dist -d

# 启动服务器默认打开 demo.html 页面
jet-serve dist --index demo # 或者 jet-serve dist -i demo

# 启动服务器默认打开 qr.html 整合所有页面链接的二维码页面
jet-serve dist --index qr # 或者 jet-serve dist -i qr

```

> 使用 `jet-serve dist --index qr` 默认打开二维码页面，将集合`dist`目录下包含子目录所有 html 页面，并生成链接二维码，可以通过移动终端扫码，同步测试各种平台设备。

#### 使用示例

```bash
➜  project-demo ✗ jet-serve dist -i qr
+---------------------------------------------------+
|                                                   |
|   欢迎使用Jet-Serve静态网页多终端同步测试服务器         |
|                                                   |
+---------------------------------------------------+
[Browsersync] Access URLs:
 --------------------------------------
       Local: http://localhost:8080/
    External: http://10.1.146.239:8080/
 --------------------------------------
          UI: http://localhost:9000
 UI External: http://localhost:9000
 --------------------------------------
[Browsersync] Serving files from: /Users/furic/www/project-demo/dist
[Browsersync] Serving files from: /Users/furic/www/jet-serve/zindex
Serving!
More info see:https://github.com/chanjet-fe/jet-serve
```

![screenshot](https://user-images.githubusercontent.com/9346030/72503940-d3914c80-3877-11ea-931a-fcb7b6aa0b4f.png)

## 项目中本地安装

```bash
yarn add jet-serve -D #或者 npm install jet-serve --save-dev
```

## 项目中本地使用

在项目的`package.json`文件中配置`scripts`。

```json
{
  "name": "project-demo",
  "scripts": {
    "dist-serve": "jet-serve dist"
  },
  "devDependencies": {
    "jet-serve": "^1.0.0"
  }
}
```

执行：
```bash
yarn dist-serve #或者 npm run dist-serve
```

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2020-present, [chanjet-fe](https://github.com/chanjet-fe).
