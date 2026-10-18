# Literature Library 文献库

Manage each academic paper as one collapsible entry in Obsidian's file explorer. Keep the original PDF, OCR result, Chinese translation, notes, and metadata together as ordinary files.

[中文说明](#中文说明)

## Features

- A library → category → paper structure with one folder per paper.
- Configurable file components, extensions, labels, colors, and templates.
- Drag supported files into a category to create paper entries automatically.
- Open a paper using your preferred component order, including a two-pane layout.
- Name paper folders from a nonempty `title` in the metadata file, falling back to the configured file naming order.
- Look up metadata through Crossref or arXiv.
- Optional PaddleOCR-compatible document recognition with local image downloads.
- Optional translation through a user-configured service compatible with the OpenAI chat completions format.

## Requirements

- Desktop Obsidian 1.11.4 or later, as declared in the current manifest.
- OCR and translation require separately configured services. These may require an account, API credentials, usage quotas, or payment from the service provider.
- The initial release has not been checked on every supported desktop platform.

## Installation

Until the plugin is listed in Community plugins:

1. Download `main.js`, `manifest.json`, and `styles.css` from a release.
2. Create `<vault>/<configuration-folder>/plugins/literature-library/`. The default configuration folder is `.obsidian`.
3. Place the three files in that folder.
4. Restart Obsidian and enable **Literature Library 文献库** under **Settings → Community plugins**.

## Quick start

1. Enable the plugin. It creates a `文献库` library and an `未分类文献` category by default.
2. Drag a PDF into a category, or create a paper through the category's context menu.
3. Expand the paper to access its PDF, OCR, translation, and note components.
4. Open `_文献信息.md` to review or edit the title, authors, year, journal, DOI, and URL.
5. Configure opening order, file naming order, templates, OCR, and translation in the plugin settings.

When **automatic paper renaming** is enabled, editing or detecting a nonempty metadata `title` renames the paper folder to a filename-safe form of that title. Clearing the title restores the configured file naming rules. The context menu also provides a manual rename command.

## Files and metadata

Default layout:

```text
文献库/
  未分类文献/
    Example paper/
      Example paper.pdf
      Example paper - OCR.md
      Example paper - 中文翻译.md
      Example paper - 笔记.md
      _文献信息.md
      assets/
```

Markdown components use the `lit-role` frontmatter property. Non-Markdown files are mapped through `lit-file-*` properties in the metadata file. Leave these mappings to the plugin. Component names, suffixes, library paths, and the metadata filename are configurable.

Importing files into a category moves them into the newly created paper folder. Automatic naming can rename paper folders. Keep normal backups of your vault.

## Network use, accounts, and costs

Local organization and reading do not require an external account. Network access is used for these optional or configurable features:

| Feature | Destination | Data sent |
| --- | --- | --- |
| Metadata lookup | `api.crossref.org` and `export.arxiv.org` | Extracted DOI, arXiv identifier, or a bibliographic query. Crossref requests include the contact email if you configure one. |
| PaddleOCR-compatible recognition | The OCR service URL you enter | The selected PDF or image file and the service credentials needed for that request. Images returned as remote URLs are downloaded from the supplied locations. |
| Translation | The translation service URL you enter | Markdown text chunks, the configured prompt and model, and service credentials if configured. |

**Automatic metadata recognition after import is enabled by default.** Disable **导入后自动识别文献信息** in the plugin settings if you do not want automatic identifier lookups. OCR on import and translation after OCR are disabled by default.

OCR and translation are not bundled services. Configure your own endpoint and credentials, and review that provider's privacy policy, quotas, and charges before sending documents. The plugin does not implement analytics or advertising. Remote providers handle submitted data under their own policies.

API credentials are selected from Obsidian Secret Storage. Do not publish your plugin `data.json`, vault, notes, PDFs, or credentials with the project.

## Development

The current source entry is the readable JavaScript recovered from the installed version. It retains module comments from an earlier TypeScript build; the original TypeScript project was not available when this release project was prepared. There are no bundled runtime dependencies beyond Obsidian's supplied API.

With Node.js 18 or later:

```sh
npm run check
npm run build
```

The build copies `src/main.js` to `main.js` and writes the three installation assets to `dist/`. No dependency installation is needed. Checks cover syntax, manifest fields, required files, and release defaults; they do not replace running the plugin in Obsidian.

## 中文说明

每篇文献对应一个文件夹，把 PDF、OCR、中文翻译、笔记和文献信息放在一起，并在文件列表里显示为可折叠条目。

1. 启用插件后，把 PDF 拖进文献库的某个分类。
2. 打开 `_文献信息.md`，填写或核对标题、作者、年份、期刊和 DOI。
3. 开启“自动重命名文献”后，非空的 `title` 最优先作为文献名；标题为空时，按设置中的文件命名顺序取名。
4. 在设置里调整组成部分、打开顺序、命名顺序和笔记模板。
5. OCR 和翻译需要自行填写服务地址并选择密钥；这些服务可能需要注册、额度或付费。

导入后自动识别文献信息默认开启，会向 Crossref 或 arXiv 发送识别出的 DOI 或 arXiv 编号；手动标题搜索会发送查询词。可以在设置中关闭自动识别。OCR 会把所选 PDF 或图片发送到你配置的服务，翻译会发送待翻译文本，请先确认服务方的数据处理规则。

## License

MIT © 2026 Truffle. See [LICENSE](LICENSE).
