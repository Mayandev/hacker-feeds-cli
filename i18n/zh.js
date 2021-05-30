const zh = {
  github: {
    title: 'GitHub 榜单',
    repo: '仓库',
    desc: '描述',
    link: '链接',
    lang: '语言',
    star: '星标',
  },
  hn: {
    outputTitle: 'Hacker News 新闻',
    title: '标题',
    url: '链接',
  },
  ph: {
    title: 'Product Hunt 榜单',
    name: '名称',
    desc: '描述',
    url: '产品介绍',
    website: '产品网址',
    votes: '投票',
  },
  spinner: {
    load: '数据拉取中...',
    fail: '程序错误, 你可以发送邮件至 <phillzou@gmail.com> 联系开发者',
    unUpdate: "数据暂未更新，你可以使用 '-p' 参数查看往日榜单",
  },
  program: {
    hnDesc: '获取 Hacker News 榜单列表',
    hnTop: '获取前 n 条数据',
    phDesc: '获取 Product Hunt 榜单列表',
    phCount: '列表显示个数',
    phPast: '获取过去 n 天的历史数据',
    ghDesc: '获取 GitHub 榜单列表',
    ghSince: '日期统计方式，可支持参数：daily, weekly 和 monthly',
    ghLang: '按照编程语言统计',
    configDesc: '配置此命令行',
    configLang: '配置此命令行语言，自动翻译内容',
    langConfig: '请选择一种语言：',
    help: '显示帮助',
    version: '显示版本号',
  },
};

module.exports = zh;
