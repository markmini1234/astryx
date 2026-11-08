# Astryx for DeepSeek Harness

[English](README.md) | 中文

`dsh-plugin-astryx` 把 [Meta Astryx 设计系统](https://github.com/meta/astryx) 的两项核心能力带进 DeepSeek Harness：

- 一个 Web 主题：把 Astryx Neutral 中经过审查的颜色、字体、圆角和层次映射到 DSH 的 `--dsw-*` token；
- 一个内嵌的 `astryx` 技能：让 DSH Agent 按 Astryx CLI 的文档先行工作流构建界面。

这个插件遵守 DSH 的插件边界，不在 DSH 内再启动一套 React 组件运行时。DSH Web 继续使用自己的组件和布局，插件提供视觉 token 与 Agent 侧的 Astryx 知识。

## 功能

**Web 主题**

- Astryx Neutral 的明暗表面、文字、边框、状态、控件、菜单、代码块和滚动条。
- Figtree 字体，使用随包分发的 OFL 字体文件，不请求外部字体服务，并保留系统字体回退。
- 把 Astryx 的 `6 / 10 / 12 / 16 / 20 / 28px` 形状尺度映射到 DSH 的控件、面板和页面圆角。
- 把 Astryx 的低、中、高阴影特征映射到 DSH 的 shadow ramp。
- 所有样式都是 Cordis effect；关闭插件或卸载时立即恢复 DSH 原生主题。

**Agent 技能**

- 向 DSH 技能目录注册一个可由模型按需加载的 `astryx` 技能。
- 技能要求 Agent 使用项目本地 Astryx CLI 或 `npx @astryxdesign/cli@0.7.11`，在修改前阅读组件文档，优先使用模板，遵守 token 与无障碍规则，并明确报告 CLI 失败。
- 技能正文随包分发，进入技能目录不依赖网络请求。

## 要求

- DeepSeek Harness `>= 0.2.2-rc.1 < 0.3.0`
- Web profile（视觉主题需要）
- DSH skill registry（`@deepseek-ai/dsh-skill`，Agent 技能需要）

插件不会向你的产品项目安装 Astryx。Agent 使用技能构建 Astryx 应用时，会按照项目所用版本的 CLI 文档安装依赖。

## 安装

构建可分发 tarball：

```sh
npm install
npm run build
npm pack
```

安装到 DSH Web profile：

```sh
dsh plugin --profile web add ./dsh-plugin-astryx-0.1.0.tgz
```

仓库里已经提交了 `lib/`，所以也可以直接从 GitHub 安装，不需要先构建：

```sh
dsh plugin --profile web add github:markmini1234/astryx
```

本地开发时，构建完成后也可以用链接方式安装：

```sh
dsh plugin --profile web add /absolute/path/to/dsh-plugin-astryx
```

刷新 Web UI。插件默认启用，并在 Plugins 页面显示为 **Astryx 设计系统**。关闭插件会同时移除主题覆盖和技能注册。

## 开发

```sh
npm install
npm run typecheck
npm run build
npm test
```

## 设计

源码审阅、token 映射和已知差异见 [docs/DESIGN.md](docs/DESIGN.md)。

## 已知限制

- 当前版本只移植 Astryx Neutral；Butter、Chocolate、Matcha、Stone、Gothic 和 Y2K 还不能选择。
- DSH Web 不是 Astryx 组件树。Agent 可以通过技能使用 Astryx 组件 API、组合模式和图标体系，但 DSH 外壳仍由 DSH 自己的 primitive 渲染。
- 主题映射的是语义角色，并未覆盖 Astryx Neutral 的所有静态调色板变量和组件级覆盖。
- 技能中的备用 CLI 版本固定以保证可复现。升级 Astryx CLI 时需要有意修改 `skills/astryx/SKILL.md`。

## 许可

插件代码使用 MIT 许可。Figtree 使用 SIL Open Font License，许可正文在 [`assets/Figtree-OFL.txt`](assets/Figtree-OFL.txt)。
