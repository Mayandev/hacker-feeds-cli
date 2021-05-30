<div align="center">

# 📰 hacker-feeds-cli

A command line tool for [Hacker News](https://news.ycombinator.com/)、 [Product Hunt](https://www.producthunt.com/) and [GitHub Trending](http://github.com/) feeds.

</div>

## Usage

```bash
# install
> npm install -g hacker-feeds-cli
# command option
> npm help
```

![hfeed-3](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/hfeed-3.png)

## Resource Support

- [GitHub](http://github.com/)
- [Hacker News](https://news.ycombinator.com/)
- [Product Hunt](https://www.producthunt.com/)

| Resource | Sub Command | Parameters | Screenshot |
| --- | --- | --- | --- |
| [GitHub](http://github.com/) | `github` | `-l, --lang`<br>`-s, --since` | ![image-20210530161456461](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530161456461.png) |
| [Product Hunt](https://www.producthunt.com/) | `product` | `-c, --count`<br>`-p, --past` | ![image-20210530163127103](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530163127103.png) |
| [Hacker News](https://news.ycombinator.com/) | `news` | `-t --top` | ![image-20210530163347458](https://mayandev.oss-cn-hangzhou.aliyuncs.com/uPic/image-20210530163347458.png) |

## Language Support

Input sub-command `config` to config cli language.

```bash
> feeds config
? Please select a language(Default EN):  (Use arrow keys)
❯ EN（English）
  ZH（简体中文）
```

Current support:

- English
- 简体中文
- ...

## TODO

- [x] i18n support
- [x] Accept resouce param
- [ ] Hyper link support
- [ ] Support Translate
- [ ] Add more resource（Reddit、V2ex）

## API References

- [Hacker News API](https://github.com/HackerNews/API)
- [Product Hunt API](https://github.com/producthunt/producthunt-api)
