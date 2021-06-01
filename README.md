<div align="center">

# 📰 hacker-feeds-cli

A command line tool for [Hacker News](https://news.ycombinator.com/)、 [Product Hunt](https://www.producthunt.com/) and [GitHub Trending](http://github.com/trending) feeds.

[![](https://shields.io/badge/Reddit-FF4500?logo=reddit&style=flat-square&logoColor=white)](https://www.reddit.com/)[![](https://shields.io/badge/GitHub%20Trending-black?logo=GitHub&style=flat-square&logoColor=white)](http://github.com/trending) [![](https://shields.io/badge/Hacker%20News-f0652f?logo=y%20combinator&style=flat-square&logoColor=white)](https://news.ycombinator.com/) [![](https://shields.io/badge/Product%20Hunt-da552f?logo=Product%20Hunt&style=flat-square&logoColor=white)](https://www.producthunt.com/)

</div>

## Usage

```bash
# install
> npm install -g hacker-feeds-cli
# command option
> hfeeds help
# hf for short
> hf news
```

![hfeed-3](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/hfeed-3.png)

## Resource Support

- [GitHub](http://github.com/)
- [Hacker News](https://news.ycombinator.com/)
- [Product Hunt](https://www.producthunt.com/)
- [Reddit](https://www.reddit.com/)

| Resource | Sub Command | Parameters | Screenshot |
| --- | --- | --- | --- |
| [GitHub](http://github.com/) | `github` | `-l, --lang`<br>`-s, --since` | ![image-20210530161456461](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530161456461.png) |
| [Product Hunt](https://www.producthunt.com/) | `product` | `-c, --count`<br>`-p, --past` | ![image-20210530163127103](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530163127103.png) |
| [Hacker News](https://news.ycombinator.com/) | `news` | `-t --top` | ![image-20210530163347458](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530163347458.png) |
| [Reddit](https://www.reddit.com/) | `reddit` | `-t --topic`<br>`-s --sort` | !![CUAGzP](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/CUAGzP.png) |

## Language Support

Input sub-command `config` to config cli language.

```bash
> feeds config
? Please select a language(Default EN):  (Use arrow keys)
  EN（English）
❯ ZH（简体中文）
```

![hfeeds-4](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/hfeeds-4.png)

## TODO

- [x] i18n support
- [x] Accept resouce param
- [ ] Hyper link support
- [ ] Support Translate
- [ ] Add more resource（V2ex）

## API References

- [Hacker News API](https://github.com/HackerNews/API)
- [Product Hunt API](https://github.com/producthunt/producthunt-api)
