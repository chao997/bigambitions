# Big Ambitions Wiki

暗色双主题的游戏维基站（Next.js 15 + Tailwind v4 + MDX + next-intl），
内容基于对 Big Ambitions（Hovgaard Games，Steam App ID 1331550）的多源调研，
所有文案为原创撰写，数据经官网 / Steam / Reddit / YouTube 交叉验证（截至 2026-09）。

## 技术栈

- **Next.js 15**（App Router，静态生成）
- **Tailwind CSS v4**（亮/暗双主题；主题色为 NYC 出租车黄 yellow-500/400）
- **next-intl** 多语言（英文 `/`，法/德/葡 `/fr` `/de` `/pt`，内容缺失自动回退英文）
- **MDX** 内容（`content/en`，frontmatter 元数据 + 正文；`next-mdx-remote` 渲染）

## 启动

```bash
npm install
npm run dev    # 开发：http://localhost:3000
npm run build  # 生产构建
npm start      # 生产运行
```

## 页面结构

| 类型 | 路由示例 | 说明 |
| --- | --- | --- |
| 首页 | `/`、`/fr`… | Hero + 预告片 + 更新公告 + 成长路线 + 精选卡片区 + FAQ |
| 文章页 | `/guide`、`/best-business`、`/cinema-layout`… | 一个关键词一页（20 页），title 40-60 字符含关键词，description 140-160 |
| 兑换码 | `/codes` | 游戏无兑换码系统，页面如实标注"暂无" |
| 法律页 | `/privacy-policy`、`/terms-of-service` | 独立粉丝站声明 |

## 目录说明

```
content/en/**.mdx        文章内容（frontmatter: title/description/category/updated…）
messages/{en,fr,de,pt}.json  UI 文案（内容缺失时回退英文）
src/lib/data.ts          首页结构化数据（更新流/成长路线/卡片/FAQ；codes 为空数组=暂无）
src/lib/wiki-nav.ts      侧边栏导航（12 分类 20 词条，对应 keywords.json）
public/images/           自绘 SVG 视觉素材（logo、封面、配图）
```

## 备注

- 主题默认暗色，页头月亮/太阳切换，偏好存 localStorage。
- 兑换码：游戏本身无兑换码系统，站点如实展示"暂无"，绝不编造。
- 关键词分类与页面清单见上级目录 `keywords.json`；数据来源见 `调研内容.md`。
