"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => LiteratureLibraryPlugin
});
module.exports = __toCommonJS(main_exports);
var import_obsidian10 = require("obsidian");

// src/settings.ts
var ROLE_KEY = "lit-role";
var FILE_KEY_PREFIX = "lit-file-";
var DEFAULT_TRANSLATE_PROMPT = `\u4F60\u662F\u4E13\u4E1A\u7684\u5B66\u672F\u8BBA\u6587\u7FFB\u8BD1\u3002\u8BF7\u628A\u7528\u6237\u7ED9\u51FA\u7684 Markdown \u683C\u5F0F\u8BBA\u6587\u7247\u6BB5\u7FFB\u8BD1\u6210\u7B80\u4F53\u4E2D\u6587\u3002
\u8981\u6C42\uFF1A
1. \u4FDD\u6301 Markdown \u7ED3\u6784\u4E0D\u53D8\uFF1A\u6807\u9898\u5C42\u7EA7\u3001\u5217\u8868\u3001\u8868\u683C\u3001\u5F15\u7528\u7F16\u53F7\u3001\u811A\u6CE8\u3002
2. \u516C\u5F0F\uFF08$...$\u3001$$...$$\u3001\\(...\\)\u3001\\[...\\]\uFF09\u3001\u4EE3\u7801\u3001\u56FE\u7247\u94FE\u63A5\u3001HTML \u6807\u7B7E\u539F\u6837\u4FDD\u7559\uFF0C\u4E0D\u8981\u7FFB\u8BD1\u6216\u6539\u52A8\u5176\u4E2D\u7684\u5185\u5BB9\u3002
3. \u4E13\u4E1A\u672F\u8BED\u9996\u6B21\u51FA\u73B0\u65F6\uFF0C\u5728\u4E2D\u6587\u540E\u7528\u62EC\u53F7\u4FDD\u7559\u82F1\u6587\u539F\u6587\u3002
4. \u4EBA\u540D\u3001\u671F\u520A\u540D\u3001\u53C2\u8003\u6587\u732E\u6761\u76EE\u4FDD\u6301\u539F\u6587\u3002
5. \u53EA\u8F93\u51FA\u8BD1\u6587\uFF0C\u4E0D\u8981\u6DFB\u52A0\u89E3\u91CA\uFF0C\u4E5F\u4E0D\u8981\u7528\u4EE3\u7801\u5757\u5305\u88F9\u3002`;
var DEFAULT_SETTINGS = {
  libraryFolder: "\u6587\u732E\u5E93",
  uncategorizedFolder: "\u672A\u5206\u7C7B\u6587\u732E",
  libraryColor: "#c27c0e",
  assetsFolder: "assets",
  infoFileName: "_\u6587\u732E\u4FE1\u606F",
  slots: [
    { id: "pdf", name: "\u539F\u6587 PDF", extensions: ["pdf"], color: "#e5534b", suffix: "", template: "", multiple: false },
    { id: "ocr", name: "OCR \u7ED3\u679C", extensions: ["md"], color: "#3b82f6", suffix: " - OCR", template: "", multiple: false },
    { id: "zh", name: "\u4E2D\u6587\u7FFB\u8BD1", extensions: ["md"], color: "#10b981", suffix: " - \u4E2D\u6587\u7FFB\u8BD1", template: "", multiple: false },
    { id: "note", name: "\u7B14\u8BB0", extensions: ["md"], color: "#d97706", suffix: " - \u7B14\u8BB0", template: "", multiple: false }
  ],
  openOrder: ["note", "pdf", "ocr", "zh"],
  nameOrder: ["pdf", "ocr", "zh", "note"],
  missingAction: "fallback",
  openMode: "single",
  splitLeftSlot: "pdf",
  splitRightSlot: "note",
  autoRename: true,
  groupSameName: true,
  convertHtmlImages: true,
  metadataOnImport: true,
  crossrefEmail: "",
  ocr: {
    apiUrl: "",
    tokenSecret: "",
    extraParams: "{}",
    sourceSlot: "pdf",
    targetSlot: "ocr",
    autoOnImport: false
  },
  translate: {
    baseUrl: "",
    apiKeySecret: "",
    model: "",
    prompt: DEFAULT_TRANSLATE_PROMPT,
    chunkChars: 3e3,
    concurrency: 2,
    sourceSlot: "ocr",
    targetSlot: "zh",
    autoAfterOcr: false
  }
};
function clone(v) {
  return JSON.parse(JSON.stringify(v));
}
function normalizeOrder(order, slots) {
  const ids = slots.map((s) => s.id);
  const seen = /* @__PURE__ */ new Set();
  const out = [];
  if (Array.isArray(order)) {
    for (const id of order) {
      if (typeof id === "string" && ids.includes(id) && !seen.has(id)) {
        seen.add(id);
        out.push(id);
      }
    }
  }
  for (const id of ids) if (!seen.has(id)) out.push(id);
  return out;
}
function normalizeSettings(raw) {
  const d = clone(DEFAULT_SETTINGS);
  const s = Object.assign(d, raw ?? {});
  s.ocr = Object.assign(clone(DEFAULT_SETTINGS.ocr), raw?.ocr ?? {});
  s.translate = Object.assign(clone(DEFAULT_SETTINGS.translate), raw?.translate ?? {});
  if (!Array.isArray(s.slots) || !s.slots.length) s.slots = clone(DEFAULT_SETTINGS.slots);
  const used = /* @__PURE__ */ new Set();
  s.slots = s.slots.filter((x) => x && typeof x.id === "string" && x.id).filter((x) => used.has(x.id) ? false : (used.add(x.id), true)).map((x) => ({
    id: x.id,
    name: x.name || x.id,
    extensions: (Array.isArray(x.extensions) ? x.extensions : []).map((e) => String(e).toLowerCase().replace(/^\./, "").trim()).filter(Boolean),
    color: x.color || "#888888",
    suffix: x.suffix ?? "",
    template: x.template ?? "",
    multiple: !!x.multiple
  }));
  s.openOrder = normalizeOrder(s.openOrder, s.slots);
  s.nameOrder = normalizeOrder(s.nameOrder, s.slots);
  s.libraryFolder = (s.libraryFolder || DEFAULT_SETTINGS.libraryFolder).replace(/^\/+|\/+$/g, "");
  s.assetsFolder = (s.assetsFolder || DEFAULT_SETTINGS.assetsFolder).replace(/^\/+|\/+$/g, "");
  s.infoFileName = (s.infoFileName || DEFAULT_SETTINGS.infoFileName).replace(/\.md$/i, "");
  s.translate.chunkChars = Math.max(500, Number(s.translate.chunkChars) || 3e3);
  s.translate.concurrency = Math.min(8, Math.max(1, Number(s.translate.concurrency) || 1));
  return s;
}

// src/settings-tab.ts
var import_obsidian = require("obsidian");
var LitSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  get s() {
    return this.plugin.settings;
  }
  async save(redraw = false) {
    this.s.openOrder = normalizeOrder(this.s.openOrder, this.s.slots);
    this.s.nameOrder = normalizeOrder(this.s.nameOrder, this.s.slots);
    await this.plugin.saveSettings();
    if (redraw) this.display();
  }
  // Folders are created when the tab closes, not per keystroke, to avoid half-typed folder names.
  hide() {
    void this.plugin.ensureLibraryFolders();
  }
  display() {
    const el = this.containerEl;
    el.empty();
    el.addClass("lit-settings");
    new import_obsidian.Setting(el).setName("\u6587\u732E\u5E93").setHeading();
    new import_obsidian.Setting(el).setName("\u6587\u732E\u5E93\u6587\u4EF6\u5939").setDesc("\u76F8\u5BF9\u4E8E\u4ED3\u5E93\u6839\u76EE\u5F55\u3002\u4FEE\u6539\u540E\u4F1A\u65B0\u5EFA\u5BF9\u5E94\u6587\u4EF6\u5939\uFF1B\u5DF2\u6709\u7684\u65E7\u6587\u4EF6\u5939\u4E0D\u4F1A\u88AB\u79FB\u52A8\uFF08\u5728\u6587\u4EF6\u5217\u8868\u91CC\u76F4\u63A5\u91CD\u547D\u540D\u6587\u732E\u5E93\u6587\u4EF6\u5939\uFF0C\u63D2\u4EF6\u4F1A\u81EA\u52A8\u8DDF\u968F\uFF09\u3002").addText(
      (t) => t.setValue(this.s.libraryFolder).onChange(async (v) => {
        this.s.libraryFolder = v.trim() || "\u6587\u732E\u5E93";
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u9ED8\u8BA4\u5206\u7C7B\u6587\u4EF6\u5939").setDesc("\u6587\u732E\u5E93\u4E0B\u81EA\u52A8\u521B\u5EFA\u7684\u5206\u7C7B\uFF0C\u7528\u6765\u653E\u672A\u5206\u7C7B\u7684\u6587\u732E\u3002").addText(
      (t) => t.setValue(this.s.uncategorizedFolder).onChange(async (v) => {
        this.s.uncategorizedFolder = v.trim() || "\u672A\u5206\u7C7B\u6587\u732E";
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u6587\u732E\u5E93\u989C\u8272").addColorPicker(
      (c) => c.setValue(this.s.libraryColor).onChange(async (v) => {
        this.s.libraryColor = v;
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u56FE\u7247\u6587\u4EF6\u5939\u540D").setDesc("\u6587\u732E\u91CC\u7B14\u8BB0\u7C98\u8D34\u7684\u56FE\u7247\u3001OCR \u63D0\u53D6\u7684\u56FE\u7247\u90FD\u653E\u5728\u300C\u6587\u732E/\u6B64\u6587\u4EF6\u5939\u300D\u4E0B\u3002").addText(
      (t) => t.setValue(this.s.assetsFolder).onChange(async (v) => {
        this.s.assetsFolder = v.trim() || "assets";
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u6587\u732E\u4FE1\u606F\u6587\u4EF6\u540D").setDesc("\u6BCF\u7BC7\u6587\u732E\u91CC\u5B58\u653E\u6807\u9898\u3001\u4F5C\u8005\u3001DOI \u7B49\u5143\u6570\u636E\u7684 Markdown \u6587\u4EF6\uFF08\u4E0D\u542B .md\uFF09\u3002").addText(
      (t) => t.setValue(this.s.infoFileName).onChange(async (v) => {
        this.s.infoFileName = v.trim() || "_\u6587\u732E\u4FE1\u606F";
        await this.save();
      })
    );
    this.renderSlots(el);
    this.renderOrders(el);
    this.renderBehaviour(el);
    this.renderOcr(el);
    this.renderTranslate(el);
  }
  renderSlots(el) {
    new import_obsidian.Setting(el).setName("\u6587\u732E\u7EC4\u6210\u90E8\u5206").setDesc("\u6BCF\u7BC7\u6587\u732E\u7531\u8FD9\u4E9B\u90E8\u5206\u7EC4\u6210\u3002Markdown \u6587\u4EF6\u7528\u5C5E\u6027 lit-role \u8BB0\u5F55\u81EA\u5DF1\u5C5E\u4E8E\u54EA\u4E2A\u90E8\u5206\uFF0C\u6240\u4EE5\u4FEE\u6539 ID \u4F1A\u8BA9\u5DF2\u6709\u6587\u4EF6\u5931\u53BB\u5BF9\u5E94\u5173\u7CFB\u3002").setHeading();
    this.s.slots.forEach((slot, idx) => {
      const box = el.createDiv("lit-slot-setting");
      box.style.setProperty("--lit-slot-color", slot.color);
      new import_obsidian.Setting(box).setName(slot.name).setDesc(`ID\uFF1A${slot.id}`).addColorPicker(
        (c) => c.setValue(slot.color).onChange(async (v) => {
          slot.color = v;
          box.style.setProperty("--lit-slot-color", v);
          await this.save();
        })
      ).addExtraButton(
        (b) => b.setIcon("trash-2").setTooltip("\u5220\u9664\u8FD9\u4E2A\u90E8\u5206").onClick(async () => {
          if (this.s.slots.length <= 1) return;
          this.s.slots.splice(idx, 1);
          await this.save(true);
        })
      );
      new import_obsidian.Setting(box).setName("\u540D\u79F0").addText(
        (t) => t.setValue(slot.name).onChange(async (v) => {
          slot.name = v.trim() || slot.id;
          await this.save();
        })
      );
      new import_obsidian.Setting(box).setName("ID").setDesc("\u53EA\u80FD\u7528\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001- \u548C _\u3002").addText((t) => {
        t.setValue(slot.id);
        t.inputEl.addEventListener("blur", async () => {
          const v = t.getValue().trim().toLowerCase();
          if (!/^[a-z0-9_-]+$/.test(v) || this.s.slots.some((x) => x !== slot && x.id === v)) {
            t.setValue(slot.id);
            return;
          }
          if (v !== slot.id) this.renameSlotId(slot, v);
          await this.save(true);
        });
      });
      new import_obsidian.Setting(box).setName("\u6587\u4EF6\u6269\u5C55\u540D").setDesc("\u7528\u9017\u53F7\u5206\u9694\uFF0C\u4F8B\u5982 pdf \u6216 md\u3002").addText(
        (t) => t.setValue(slot.extensions.join(", ")).onChange(async (v) => {
          slot.extensions = v.split(/[,，\s]+/).map((x) => x.toLowerCase().replace(/^\./, "").trim()).filter(Boolean);
          await this.save();
        })
      );
      new import_obsidian.Setting(box).setName("\u6587\u4EF6\u540D\u540E\u7F00").setDesc("\u63D2\u4EF6\u65B0\u5EFA\u8FD9\u4E2A\u6587\u4EF6\u65F6\u52A0\u5728\u6587\u732E\u540D\u540E\u9762\uFF0C\u4F8B\u5982\u300C - \u7B14\u8BB0\u300D\uFF1B\u63A8\u5BFC\u6587\u732E\u540D\u65F6\u4F1A\u53BB\u6389\u3002").addText(
        (t) => t.setValue(slot.suffix).onChange(async (v) => {
          slot.suffix = v;
          await this.save();
        })
      );
      if (slot.extensions.includes("md")) {
        new import_obsidian.Setting(box).setName("\u6A21\u677F").setDesc("\u65B0\u5EFA\u65F6\u4F7F\u7528\u7684\u6A21\u677F\u6587\u4EF6\u8DEF\u5F84\uFF08\u53EF\u9009\uFF09\u3002\u652F\u6301 {{title}} {{paper}} {{date}} {{time}}\u3002").addText(
          (t) => t.setPlaceholder("\u6A21\u677F/\u6587\u732E\u7B14\u8BB0.md").setValue(slot.template).onChange(async (v) => {
            slot.template = v.trim();
            await this.save();
          })
        );
      }
      new import_obsidian.Setting(box).setName("\u5141\u8BB8\u591A\u4E2A\u6587\u4EF6").setDesc("\u4F8B\u5982\u8865\u5145\u6750\u6599\u3002").addToggle(
        (t) => t.setValue(slot.multiple).onChange(async (v) => {
          slot.multiple = v;
          await this.save();
        })
      );
    });
    new import_obsidian.Setting(el).addButton(
      (b) => b.setButtonText("\u6DFB\u52A0\u7EC4\u6210\u90E8\u5206").onClick(async () => {
        let n = this.s.slots.length + 1;
        while (this.s.slots.some((x) => x.id === `part${n}`)) n++;
        this.s.slots.push({ id: `part${n}`, name: `\u65B0\u90E8\u5206 ${n}`, extensions: ["md"], color: "#8b5cf6", suffix: ` - \u90E8\u5206${n}`, template: "", multiple: false });
        await this.save(true);
      })
    );
  }
  renameSlotId(slot, id) {
    const old = slot.id;
    const swap = (x) => x === old ? id : x;
    slot.id = id;
    this.s.openOrder = this.s.openOrder.map(swap);
    this.s.nameOrder = this.s.nameOrder.map(swap);
    this.s.splitLeftSlot = swap(this.s.splitLeftSlot);
    this.s.splitRightSlot = swap(this.s.splitRightSlot);
    this.s.ocr.sourceSlot = swap(this.s.ocr.sourceSlot);
    this.s.ocr.targetSlot = swap(this.s.ocr.targetSlot);
    this.s.translate.sourceSlot = swap(this.s.translate.sourceSlot);
    this.s.translate.targetSlot = swap(this.s.translate.targetSlot);
  }
  renderOrder(el, title, desc, key) {
    new import_obsidian.Setting(el).setName(title).setDesc(desc).setHeading();
    const order = this.s[key];
    order.forEach((id, i) => {
      const slot = this.s.slots.find((x) => x.id === id);
      if (!slot) return;
      const row = new import_obsidian.Setting(el).setName(`${i + 1}. ${slot.name}`);
      row.nameEl.style.setProperty("--lit-slot-color", slot.color);
      row.nameEl.addClass("lit-order-name");
      row.addExtraButton(
        (b) => b.setIcon("arrow-up").setDisabled(i === 0).onClick(async () => {
          [order[i - 1], order[i]] = [order[i], order[i - 1]];
          await this.save(true);
        })
      ).addExtraButton(
        (b) => b.setIcon("arrow-down").setDisabled(i === order.length - 1).onClick(async () => {
          [order[i + 1], order[i]] = [order[i], order[i + 1]];
          await this.save(true);
        })
      );
    });
  }
  renderOrders(el) {
    this.renderOrder(el, "\u6253\u5F00\u4F18\u5148\u7EA7", "\u5355\u51FB\u6587\u732E\u65F6\uFF0C\u6253\u5F00\u6392\u5728\u6700\u524D\u9762\u4E14\u5DF2\u5B58\u5728\u7684\u90E8\u5206\u3002", "openOrder");
    this.renderOrder(el, "\u547D\u540D\u4F18\u5148\u7EA7", "文献名优先使用文献信息中非空的 title；没有可用标题时，按以下顺序使用已有部分的文件名。", "nameOrder");
  }
  slotDropdown(setting, value, onChange) {
    setting.addDropdown((d) => {
      for (const s of this.s.slots) d.addOption(s.id, s.name);
      d.setValue(value).onChange(onChange);
    });
  }
  renderBehaviour(el) {
    new import_obsidian.Setting(el).setName("\u6253\u5F00\u4E0E\u5BFC\u5165").setHeading();
    new import_obsidian.Setting(el).setName("\u9996\u9009\u90E8\u5206\u7F3A\u5931\u65F6").setDesc("\u6253\u5F00\u4F18\u5148\u7EA7\u7B2C\u4E00\u4F4D\uFF08\u6216\u5206\u5C4F\u53F3\u4FA7\uFF09\u7684\u90E8\u5206\u8FD8\u4E0D\u5B58\u5728\u65F6\u600E\u4E48\u529E\u3002\u53EA\u5BF9 Markdown \u90E8\u5206\u6709\u6548\u3002").addDropdown(
      (d) => d.addOption("fallback", "\u6309\u4F18\u5148\u7EA7\u6253\u5F00\u4E0B\u4E00\u4E2A").addOption("create", "\u7528\u6A21\u677F\u65B0\u5EFA\u5E76\u6253\u5F00").setValue(this.s.missingAction).onChange(async (v) => {
        this.s.missingAction = v;
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u6253\u5F00\u65B9\u5F0F").addDropdown(
      (d) => d.addOption("single", "\u5355\u4E2A\u6587\u4EF6").addOption("split", "\u5DE6\u53F3\u5206\u5C4F").setValue(this.s.openMode).onChange(async (v) => {
        this.s.openMode = v;
        await this.save(true);
      })
    );
    if (this.s.openMode === "split") {
      this.slotDropdown(new import_obsidian.Setting(el).setName("\u5206\u5C4F\u5DE6\u4FA7"), this.s.splitLeftSlot, async (v) => {
        this.s.splitLeftSlot = v;
        await this.save();
      });
      this.slotDropdown(new import_obsidian.Setting(el).setName("\u5206\u5C4F\u53F3\u4FA7"), this.s.splitRightSlot, async (v) => {
        this.s.splitRightSlot = v;
        await this.save();
      });
    }
    const toggle = (name, desc, get, set) => new import_obsidian.Setting(el).setName(name).setDesc(desc).addToggle(
      (t) => t.setValue(get()).onChange(async (v) => {
        set(v);
        await this.save();
      })
    );
    toggle("\u81EA\u52A8\u91CD\u547D\u540D\u6587\u732E", "文献信息或文件变化后，优先使用非空的 title 更新文献名；没有可用标题时，按命名优先级更新。", () => this.s.autoRename, (v) => this.s.autoRename = v);
    toggle("\u540C\u540D\u6587\u4EF6\u5F52\u4E3A\u4E00\u7BC7", "\u540C\u65F6\u62D6\u8FDB\u5206\u7C7B\u7684\u6587\u4EF6\u5982\u679C\u540C\u540D\uFF08\u53BB\u6389\u540E\u7F00\u540E\uFF09\uFF0C\u5408\u5E76\u6210\u4E00\u7BC7\u6587\u732E\u3002", () => this.s.groupSameName, (v) => this.s.groupSameName = v);
    toggle(
      "\u8F6C\u6362 HTML \u56FE\u7247\u6807\u7B7E",
      "\u628A\u5BFC\u5165\u7684 Markdown \u91CC\u7684 <img src=\u2026> \u6539\u6210 Markdown \u56FE\u7247\u8BED\u6CD5\uFF0CObsidian \u624D\u80FD\u663E\u793A\u76F8\u5BF9\u8DEF\u5F84\u7684\u56FE\u7247\u3002",
      () => this.s.convertHtmlImages,
      (v) => this.s.convertHtmlImages = v
    );
    toggle("\u5BFC\u5165\u540E\u81EA\u52A8\u8BC6\u522B\u6587\u732E\u4FE1\u606F", "\u4ECE PDF \u6216 OCR \u6587\u672C\u91CC\u627E DOI / arXiv \u7F16\u53F7\uFF0C\u67E5\u5230\u540E\u586B\u5165\u6587\u732E\u4FE1\u606F\u7684\u7A7A\u767D\u9879\u3002", () => this.s.metadataOnImport, (v) => this.s.metadataOnImport = v);
    new import_obsidian.Setting(el).setName("Crossref \u8054\u7CFB\u90AE\u7BB1").setDesc("\u53EF\u9009\u3002\u586B\u5199\u540E Crossref \u4F1A\u628A\u8BF7\u6C42\u653E\u8FDB\u66F4\u7A33\u5B9A\u7684\u300C\u793C\u8C8C\u300D\u961F\u5217\u3002").addText(
      (t) => t.setValue(this.s.crossrefEmail).onChange(async (v) => {
        this.s.crossrefEmail = v.trim();
        await this.save();
      })
    );
  }
  renderOcr(el) {
    const o = this.s.ocr;
    new import_obsidian.Setting(el).setName("PaddleOCR").setHeading();
    new import_obsidian.Setting(el).setName("API \u5730\u5740").setDesc("\u767E\u5EA6 AI Studio \u7684 layout-parsing \u63A5\u53E3\u5730\u5740\u3002").addText(
      (t) => t.setValue(o.apiUrl).onChange(async (v) => {
        o.apiUrl = v.trim();
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u8BBF\u95EE\u4EE4\u724C").setDesc("\u4FDD\u5B58\u5728 Obsidian \u7684\u94A5\u5319\u4E32\uFF08Keychain\uFF09\u91CC\uFF0C\u4E0D\u4F1A\u4EE5\u660E\u6587\u5199\u8FDB\u63D2\u4EF6\u914D\u7F6E\u3002").addComponent(
      (c) => new import_obsidian.SecretComponent(this.app, c).setValue(o.tokenSecret).onChange(async (v) => {
        o.tokenSecret = v;
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u989D\u5916\u53C2\u6570\uFF08JSON\uFF09").setDesc('\u4F1A\u5408\u5E76\u8FDB\u8BF7\u6C42\u4F53\uFF0C\u4F8B\u5982 {"useDocUnwarping": false}\u3002').addTextArea(
      (t) => t.setValue(o.extraParams).onChange(async (v) => {
        o.extraParams = v;
        await this.save();
      })
    );
    this.slotDropdown(new import_obsidian.Setting(el).setName("OCR \u6765\u6E90"), o.sourceSlot, async (v) => {
      o.sourceSlot = v;
      await this.save();
    });
    this.slotDropdown(new import_obsidian.Setting(el).setName("OCR \u7ED3\u679C\u5B58\u4E3A"), o.targetSlot, async (v) => {
      o.targetSlot = v;
      await this.save();
    });
    new import_obsidian.Setting(el).setName("\u5BFC\u5165 PDF \u540E\u81EA\u52A8 OCR").setDesc("\u4F1A\u6D88\u8017 AI Studio \u7684\u6BCF\u65E5\u989D\u5EA6\u3002").addToggle(
      (t) => t.setValue(o.autoOnImport).onChange(async (v) => {
        o.autoOnImport = v;
        await this.save();
      })
    );
  }
  renderTranslate(el) {
    const t = this.s.translate;
    new import_obsidian.Setting(el).setName("\u7FFB\u8BD1").setDesc("\u4EFB\u4F55\u517C\u5BB9 OpenAI Chat Completions \u7684\u670D\u52A1\u90FD\u53EF\u4EE5\uFF0C\u4F8B\u5982 OpenAI\u3001DeepSeek\u3001\u901A\u4E49\u5343\u95EE\u3001Kimi\u3001\u672C\u5730 Ollama\u3002").setHeading();
    new import_obsidian.Setting(el).setName("\u63A5\u53E3\u5730\u5740").setDesc("\u586B\u5230 /v1 \u4E3A\u6B62\uFF0C\u4F8B\u5982 https://api.deepseek.com/v1\u3002").addText(
      (x) => x.setPlaceholder("https://api.openai.com/v1").setValue(t.baseUrl).onChange(async (v) => {
        t.baseUrl = v.trim();
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("API Key").setDesc("\u4FDD\u5B58\u5728 Obsidian \u7684\u94A5\u5319\u4E32\u91CC\u3002\u672C\u5730\u670D\u52A1\u4E0D\u9700\u8981\u65F6\u53EF\u4EE5\u7559\u7A7A\u3002").addComponent(
      (c) => new import_obsidian.SecretComponent(this.app, c).setValue(t.apiKeySecret).onChange(async (v) => {
        t.apiKeySecret = v;
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u6A21\u578B").addText(
      (x) => x.setPlaceholder("deepseek-chat").setValue(t.model).onChange(async (v) => {
        t.model = v.trim();
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u7FFB\u8BD1\u63D0\u793A\u8BCD").addTextArea((x) => {
      x.setValue(t.prompt).onChange(async (v) => {
        t.prompt = v || DEFAULT_TRANSLATE_PROMPT;
        await this.save();
      });
      x.inputEl.rows = 8;
      x.inputEl.addClass("lit-wide-textarea");
    }).addExtraButton(
      (b) => b.setIcon("rotate-ccw").setTooltip("\u6062\u590D\u9ED8\u8BA4").onClick(async () => {
        t.prompt = DEFAULT_TRANSLATE_PROMPT;
        await this.save(true);
      })
    );
    new import_obsidian.Setting(el).setName("\u6BCF\u6BB5\u5B57\u6570").setDesc("\u957F\u6587\u4F1A\u6309\u7A7A\u884C\u5207\u6210\u8FD9\u4E48\u957F\u7684\u6BB5\u843D\u5206\u522B\u7FFB\u8BD1\u3002").addText(
      (x) => x.setValue(String(t.chunkChars)).onChange(async (v) => {
        t.chunkChars = Math.max(500, Number(v) || 3e3);
        await this.save();
      })
    );
    new import_obsidian.Setting(el).setName("\u5E76\u53D1\u6570").addSlider(
      (x) => x.setLimits(1, 8, 1).setValue(t.concurrency).setDynamicTooltip().onChange(async (v) => {
        t.concurrency = v;
        await this.save();
      })
    );
    this.slotDropdown(new import_obsidian.Setting(el).setName("\u7FFB\u8BD1\u6765\u6E90"), t.sourceSlot, async (v) => {
      t.sourceSlot = v;
      await this.save();
    });
    this.slotDropdown(new import_obsidian.Setting(el).setName("\u8BD1\u6587\u5B58\u4E3A"), t.targetSlot, async (v) => {
      t.targetSlot = v;
      await this.save();
    });
    new import_obsidian.Setting(el).setName("OCR \u5B8C\u6210\u540E\u81EA\u52A8\u7FFB\u8BD1").addToggle(
      (x) => x.setValue(t.autoAfterOcr).onChange(async (v) => {
        t.autoAfterOcr = v;
        await this.save();
      })
    );
  }
};

// src/library.ts
var import_obsidian2 = require("obsidian");

// src/pure.ts
function stripSuffix(basename, suffix) {
  if (suffix && basename.length > suffix.length && basename.endsWith(suffix)) {
    return basename.slice(0, basename.length - suffix.length).trim();
  }
  return basename.trim();
}
function sanitizeFileName(name) {
  return name.replace(/[\\/:*?"<>|#^[\]]/g, "-").replace(/\s+/g, " ").trim().replace(/[. ]+$/, "").slice(0, 180);
}
function matchesWithCounter(current, desired) {
  if (current === desired) return true;
  if (!current.startsWith(desired + " (")) return false;
  return /^ \(\d+\)$/.test(current.slice(desired.length));
}
function availableName(base, exists) {
  if (!exists(base)) return base;
  for (let i = 2; i < 1e4; i++) {
    const c = `${base} (${i})`;
    if (!exists(c)) return c;
  }
  return `${base} (${Date.now()})`;
}
function splitExt(name) {
  const i = name.lastIndexOf(".");
  if (i <= 0) return { stem: name, ext: "" };
  return { stem: name.slice(0, i), ext: name.slice(i + 1) };
}
function resolveRelative(dir, ref) {
  const parts = dir ? dir.split("/").filter(Boolean) : [];
  for (const seg of ref.split("/")) {
    if (seg === "" || seg === ".") continue;
    if (seg === "..") {
      if (!parts.length) return null;
      parts.pop();
    } else parts.push(seg);
  }
  return parts.join("/");
}
function dirname(path) {
  const i = path.lastIndexOf("/");
  return i < 0 ? "" : path.slice(0, i);
}
function isExternalRef(ref) {
  return /^([a-z][a-z0-9+.-]*:|\/\/|#)/i.test(ref) || ref.startsWith("/");
}
function safeDecode(s) {
  try {
    return decodeURI(s);
  } catch {
    return s;
  }
}
function cleanRef(raw) {
  let r = raw.trim();
  if (r.startsWith("<") && r.endsWith(">")) r = r.slice(1, -1);
  return safeDecode(r);
}
var MD_IMG = /(!\[[^\]]*\]\()(<[^>]+>|[^)\s]+)((?:\s+"[^"]*")?\))/g;
var HTML_IMG = /<img\b[^>]*>/gi;
var DIV_IMG = /<div\b[^>]*>\s*(<img\b[^>]*>)\s*<\/div>/gi;
function attr(tag, name) {
  const m = tag.match(new RegExp(`\\b${name}\\s*=\\s*("([^"]*)"|'([^']*)'|([^\\s>]+))`, "i"));
  if (!m) return null;
  return m[2] ?? m[3] ?? m[4] ?? null;
}
function extractLocalImageRefs(md) {
  const out = /* @__PURE__ */ new Set();
  for (const m of md.matchAll(MD_IMG)) {
    const r = cleanRef(m[2]);
    if (!isExternalRef(r)) out.add(r);
  }
  for (const m of md.matchAll(HTML_IMG)) {
    const src = attr(m[0], "src");
    if (src) {
      const r = cleanRef(src);
      if (!isExternalRef(r)) out.add(r);
    }
  }
  return [...out];
}
function encodeLinkPath(path) {
  return path.replace(/ /g, "%20").replace(/\(/g, "%28").replace(/\)/g, "%29");
}
function rewriteImageRefs(md, map, convertHtml) {
  const fix = (raw) => {
    const r = cleanRef(raw);
    const key = r.replace(/^\.\//, "");
    return map[r] ?? map[key] ?? null;
  };
  const tagToMd = (tag) => {
    const src = attr(tag, "src");
    if (!src) return tag;
    const alt = (attr(tag, "alt") ?? "").replace(/[[\]]/g, "");
    const target = fix(src) ?? cleanRef(src);
    if (isExternalRef(target) && !/^https?:/i.test(target)) return tag;
    return `![${alt}](${encodeLinkPath(target)})`;
  };
  let out = md;
  if (convertHtml) {
    out = out.replace(DIV_IMG, (_m, img) => tagToMd(img));
    out = out.replace(HTML_IMG, tagToMd);
  } else {
    out = out.replace(HTML_IMG, (tag) => {
      const src = attr(tag, "src");
      const f = src ? fix(src) : null;
      return f ? tag.replace(src, encodeLinkPath(f)) : tag;
    });
  }
  out = out.replace(MD_IMG, (m, a, src, c) => {
    const f = fix(src);
    return f ? `${a}${encodeLinkPath(f)}${c}` : m;
  });
  return out;
}
function findDoi(text) {
  const re = /\b(10\.\d{4,9}\/[-._;()/:a-z0-9<>]+[a-z0-9])/gi;
  for (const m of text.matchAll(re)) {
    let doi = m[1];
    while (doi.endsWith(")") && (doi.match(/\(/g)?.length ?? 0) < (doi.match(/\)/g)?.length ?? 0)) {
      doi = doi.slice(0, -1);
    }
    doi = doi.replace(/[.,;:]+$/, "");
    if (doi.length > 8) return doi;
  }
  return null;
}
function findArxiv(text) {
  const m = text.match(/arxiv(?:\.org\/(?:abs|pdf)\/|\s*:\s*|\s+)(\d{4}\.\d{4,5})(v\d+)?/i);
  return m ? m[1] : null;
}
function stripTags(s) {
  return s.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}
function parseCrossrefWork(w) {
  const meta = {};
  if (Array.isArray(w?.title) && w.title[0]) meta.title = stripTags(String(w.title[0]));
  if (Array.isArray(w?.author)) {
    meta.authors = w.author.map((a) => a.given || a.family ? [a.given, a.family].filter(Boolean).join(" ") : a.name).filter(Boolean);
  }
  const dp = w?.issued?.["date-parts"]?.[0]?.[0] ?? w?.published?.["date-parts"]?.[0]?.[0];
  if (typeof dp === "number") meta.year = dp;
  if (Array.isArray(w?.["container-title"]) && w["container-title"][0]) meta.journal = stripTags(String(w["container-title"][0]));
  if (w?.DOI) meta.doi = String(w.DOI);
  if (w?.URL) meta.url = String(w.URL);
  if (w?.abstract) meta.abstract = stripTags(String(w.abstract)).replace(/^Abstract\s*/i, "");
  return meta;
}
function parseArxivAtom(xml) {
  const entry = xml.querySelector("entry");
  if (!entry) return null;
  const text = (sel) => entry.querySelector(sel)?.textContent?.replace(/\s+/g, " ").trim() ?? "";
  const title = text("title");
  if (!title || /^Error$/i.test(title)) return null;
  const meta = { title };
  meta.authors = [...entry.querySelectorAll("author > name")].map((n) => n.textContent?.trim() ?? "").filter(Boolean);
  const published = text("published");
  if (published) meta.year = Number(published.slice(0, 4));
  const id = text("id");
  if (id) meta.url = id;
  const summary = text("summary");
  if (summary) meta.abstract = summary;
  const doi = entry.getElementsByTagName("arxiv:doi")[0]?.textContent?.trim();
  if (doi) meta.doi = doi;
  meta.journal = "arXiv";
  return meta;
}
function splitMarkdown(text, maxChars) {
  const lines = text.split("\n");
  const chunks = [];
  let cur = [];
  let len = 0;
  let inFence = false;
  let inMath = false;
  for (const line of lines) {
    const t = line.trim();
    if (/^(```|~~~)/.test(t)) inFence = !inFence;
    else if (!inFence) {
      const dollars = (t.match(/\$\$/g) ?? []).length;
      if (dollars % 2 === 1) inMath = !inMath;
    }
    cur.push(line);
    len += line.length + 1;
    if (!inFence && !inMath && t === "" && len >= maxChars) {
      const c = cur.join("\n").trim();
      if (c) chunks.push(c);
      cur = [];
      len = 0;
    }
  }
  const rest = cur.join("\n").trim();
  if (rest) chunks.push(rest);
  return chunks;
}
function needsTranslation(chunk) {
  const stripped = chunk.replace(MD_IMG, "").replace(/!\[\[[^\]]*\]\]/g, "").replace(HTML_IMG, "").replace(/<\/?div[^>]*>/gi, "").replace(/^[-*_\s]+$/gm, "");
  return /[\p{L}]/u.test(stripped);
}
function unwrapFence(s) {
  const m = s.trim().match(/^```(?:markdown|md)?\s*\n([\s\S]*?)\n```$/i);
  return m ? m[1] : s.trim();
}

// src/library.ts
var Library = class {
  constructor(plugin) {
    this.plugin = plugin;
  }
  get app() {
    return this.plugin.app;
  }
  get settings() {
    return this.plugin.settings;
  }
  get root() {
    return (0, import_obsidian2.normalizePath)(this.settings.libraryFolder);
  }
  relParts(path) {
    const root = this.root;
    if (path === root) return [];
    if (!path.startsWith(root + "/")) return null;
    return path.slice(root.length + 1).split("/");
  }
  kindOf(file) {
    const parts = this.relParts(file.path);
    if (!parts) return null;
    const folder = file instanceof import_obsidian2.TFolder;
    if (parts.length === 0) return folder ? "root" : null;
    if (parts.length === 1) return folder ? "category" : null;
    if (parts.length === 2) return folder ? "paper" : "category-file";
    if (parts.length === 3) return "paper-child";
    return "deep";
  }
  isPaper(file) {
    return !!file && file instanceof import_obsidian2.TFolder && this.relParts(file.path)?.length === 2;
  }
  paperPathOf(path) {
    const parts = this.relParts(path);
    if (!parts || parts.length < 3) return null;
    return `${this.root}/${parts[0]}/${parts[1]}`;
  }
  paperOf(file) {
    const p = this.paperPathOf(file.path);
    if (!p) return null;
    const f = this.app.vault.getAbstractFileByPath(p);
    return f instanceof import_obsidian2.TFolder ? f : null;
  }
  slot(id) {
    return this.settings.slots.find((s) => s.id === id);
  }
  slotsForExt(ext) {
    const e = ext.toLowerCase();
    return this.settings.slots.filter((s) => s.extensions.includes(e));
  }
  acceptsExt(ext) {
    return this.slotsForExt(ext).length > 0;
  }
  isInfoFile(file) {
    return file instanceof import_obsidian2.TFile && file.name === `${this.settings.infoFileName}.md` && this.relParts(file.path)?.length === 3;
  }
  infoPath(paper) {
    return (0, import_obsidian2.normalizePath)(`${paper.path}/${this.settings.infoFileName}.md`);
  }
  getInfo(paper) {
    const f = this.app.vault.getAbstractFileByPath(this.infoPath(paper));
    return f instanceof import_obsidian2.TFile ? f : null;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  frontmatter(file) {
    if (!file) return void 0;
    return this.app.metadataCache.getFileCache(file)?.frontmatter;
  }
  /** Non-markdown files cannot carry frontmatter, so their slot is recorded in the info file as `lit-file-<slot>`. */
  readFileMapping(info) {
    const byName = /* @__PURE__ */ new Map();
    const fm = this.frontmatter(info);
    if (!fm) return byName;
    for (const [k, v] of Object.entries(fm)) {
      if (!k.startsWith(FILE_KEY_PREFIX)) continue;
      const slotId = k.slice(FILE_KEY_PREFIX.length);
      const names = Array.isArray(v) ? v : [v];
      for (const n of names) if (typeof n === "string" && n) byName.set(n, slotId);
    }
    return byName;
  }
  roleOf(file) {
    const r = this.frontmatter(file)?.[ROLE_KEY];
    return typeof r === "string" && this.slot(r) ? r : null;
  }
  getState(paper) {
    const state = { folder: paper, bySlot: /* @__PURE__ */ new Map(), unassigned: [], others: [], info: null };
    for (const s of this.settings.slots) state.bySlot.set(s.id, []);
    state.info = this.getInfo(paper);
    const mapping = this.readFileMapping(state.info);
    const auto = [];
    const children = [...paper.children].sort((a, b) => a.name.localeCompare(b.name));
    for (const child of children) {
      if (!(child instanceof import_obsidian2.TFile)) {
        state.others.push(child);
        continue;
      }
      if (child === state.info) continue;
      const ext = child.extension.toLowerCase();
      if (ext === "md") {
        const role = this.roleOf(child);
        if (role) state.bySlot.get(role).push(child);
        else if (this.acceptsExt("md")) state.unassigned.push(child);
        else state.others.push(child);
        continue;
      }
      const mapped = mapping.get(child.name);
      if (mapped && this.slot(mapped)) {
        state.bySlot.get(mapped).push(child);
        continue;
      }
      if (this.acceptsExt(ext)) auto.push(child);
      else state.others.push(child);
    }
    for (const f of auto) {
      const candidates = this.slotsForExt(f.extension);
      const free = candidates.find((s) => s.multiple || state.bySlot.get(s.id).length === 0) ?? candidates[0];
      state.bySlot.get(free.id).push(f);
    }
    return state;
  }
  has(state, slotId) {
    return (state.bySlot.get(slotId)?.length ?? 0) > 0;
  }
  first(state, slotId) {
    return state.bySlot.get(slotId)?.[0] ?? null;
  }
  nameFromFile(file, slot) {
    return sanitizeFileName(stripSuffix(file.basename, slot.suffix));
  }
  desiredName(state) {
    const title = this.frontmatter(state.info)?.title;
    if (typeof title === "string" && title.trim()) {
      const name = sanitizeFileName(title);
      if (name) return name;
    }
    for (const id of this.settings.nameOrder) {
      const slot = this.slot(id);
      const f = this.first(state, id);
      if (slot && f) {
        const n = this.nameFromFile(f, slot);
        if (n) return n;
      }
    }
    return null;
  }
  /** Free path `<dir>/<stem>[ (n)].<ext>` (or a folder path when ext is empty). */
  availablePath(dir, stem, ext) {
    const vault = this.app.vault;
    const name = availableName(sanitizeFileName(stem) || "\u672A\u547D\u540D", (c) => {
      const p = (0, import_obsidian2.normalizePath)(`${dir}/${ext ? `${c}.${ext}` : c}`);
      return !!vault.getAbstractFileByPath(p);
    });
    return (0, import_obsidian2.normalizePath)(`${dir}/${ext ? `${name}.${ext}` : name}`);
  }
  availablePathForName(dir, fileName) {
    const { stem, ext } = splitExt(fileName);
    return this.availablePath(dir, stem, ext);
  }
  async ensureFolder(path) {
    const p = (0, import_obsidian2.normalizePath)(path);
    const existing = this.app.vault.getAbstractFileByPath(p);
    if (existing instanceof import_obsidian2.TFolder) return existing;
    if (existing) throw new Error(`\u300C${p}\u300D\u5DF2\u5B58\u5728\u4E14\u4E0D\u662F\u6587\u4EF6\u5939`);
    const parts = p.split("/");
    let cur = "";
    for (const part of parts) {
      cur = cur ? `${cur}/${part}` : part;
      if (!this.app.vault.getAbstractFileByPath(cur)) {
        try {
          await this.app.vault.createFolder(cur);
        } catch (e) {
          if (!this.app.vault.getAbstractFileByPath(cur)) throw e;
        }
      }
    }
    return this.app.vault.getAbstractFileByPath(p);
  }
};

// src/papers.ts
var import_obsidian3 = require("obsidian");
var PaperOps = class {
  constructor(plugin) {
    this.plugin = plugin;
    /** Paths the plugin creates itself; the importer must not treat them as user drops. */
    this.selfCreated = /* @__PURE__ */ new Set();
    this.splitLeaf = null;
    this.splitLeftLeaf = null;
    this.renaming = /* @__PURE__ */ new Set();
  }
  get app() {
    return this.plugin.app;
  }
  get lib() {
    return this.plugin.library;
  }
  get settings() {
    return this.plugin.settings;
  }
  async ensureInfo(paper) {
    const existing = this.lib.getInfo(paper);
    if (existing) return existing;
    const path = this.lib.infoPath(paper);
    this.selfCreated.add(path);
    const content = [
      "---",
      "lit-type: paper",
      'title: ""',
      "authors: []",
      "year: ",
      'journal: ""',
      'doi: ""',
      'url: ""',
      `added: ${(0, import_obsidian3.moment)().format("YYYY-MM-DD")}`,
      "---",
      "",
      "## \u6458\u8981",
      ""
    ].join("\n");
    return this.app.vault.create(path, content);
  }
  async assignRole(file, slot) {
    const paper = this.lib.paperOf(file);
    if (file.extension.toLowerCase() === "md") {
      await this.app.fileManager.processFrontMatter(file, (fm) => {
        if (slot) fm[ROLE_KEY] = slot.id;
        else delete fm[ROLE_KEY];
      });
      return;
    }
    if (!paper) return;
    const info = await this.ensureInfo(paper);
    await this.app.fileManager.processFrontMatter(info, (fm) => {
      for (const key2 of Object.keys(fm)) {
        if (!key2.startsWith(FILE_KEY_PREFIX)) continue;
        const v = fm[key2];
        const list = (Array.isArray(v) ? v : [v]).filter((n) => n !== file.name);
        if (!list.length) delete fm[key2];
        else fm[key2] = Array.isArray(v) ? list : list[0];
      }
      if (!slot) return;
      const key = FILE_KEY_PREFIX + slot.id;
      if (slot.multiple) {
        const cur = fm[key];
        const list = Array.isArray(cur) ? cur : cur ? [cur] : [];
        if (!list.includes(file.name)) list.push(file.name);
        fm[key] = list;
      } else fm[key] = file.name;
    });
  }
  /** Keeps non-md mappings in the info file in sync when such a file is renamed inside its paper. */
  async renameMapping(paper, oldName, newName) {
    const info = this.lib.getInfo(paper);
    if (!info) return;
    const mapping = this.lib.readFileMapping(info);
    if (!mapping.has(oldName)) return;
    await this.app.fileManager.processFrontMatter(info, (fm) => {
      for (const key of Object.keys(fm)) {
        if (!key.startsWith(FILE_KEY_PREFIX)) continue;
        const v = fm[key];
        if (Array.isArray(v)) fm[key] = v.map((n) => n === oldName ? newName : n);
        else if (v === oldName) fm[key] = newName;
      }
    });
  }
  async createSlotFile(paper, slot) {
    if (!slot.extensions.includes("md")) return null;
    const path = this.lib.availablePath(paper.path, `${paper.name}${slot.suffix}`, "md");
    let body = "";
    if (slot.template) {
      const tpl = this.app.vault.getAbstractFileByPath((0, import_obsidian3.normalizePath)(slot.template.endsWith(".md") ? slot.template : `${slot.template}.md`));
      if (tpl instanceof import_obsidian3.TFile) {
        const info = this.lib.frontmatter(this.lib.getInfo(paper)) ?? {};
        body = (await this.app.vault.read(tpl)).replace(/\{\{\s*title\s*\}\}/g, String(info.title || paper.name)).replace(/\{\{\s*paper\s*\}\}/g, paper.name).replace(/\{\{\s*date\s*\}\}/g, (0, import_obsidian3.moment)().format("YYYY-MM-DD")).replace(/\{\{\s*time\s*\}\}/g, (0, import_obsidian3.moment)().format("HH:mm"));
      } else new import_obsidian3.Notice(`\u627E\u4E0D\u5230\u6A21\u677F\uFF1A${slot.template}`);
    }
    this.selfCreated.add(path);
    const file = await this.app.vault.create(path, body);
    await this.assignRole(file, slot);
    return file;
  }
  resolvePrimary(state) {
    for (const id of this.settings.openOrder) {
      const f = this.lib.first(state, id);
      if (f) return f;
    }
    return state.unassigned[0] ?? null;
  }
  async firstOrCreate(paper, state, slotId) {
    const existing = this.lib.first(state, slotId);
    if (existing) return existing;
    const slot = this.lib.slot(slotId);
    if (this.settings.missingAction === "create" && slot?.extensions.includes("md")) {
      return this.createSlotFile(paper, slot);
    }
    return null;
  }
  leafAlive(leaf) {
    if (!leaf) return false;
    let alive = false;
    this.app.workspace.iterateAllLeaves((l) => {
      if (l === leaf) alive = true;
    });
    return alive;
  }
  async openPaper(paper, newTab = false) {
    const state = this.lib.getState(paper);
    if (this.settings.openMode === "split") {
      const leftId = this.settings.splitLeftSlot;
      const rightId = this.settings.splitRightSlot;
      const left = this.lib.first(state, leftId) ?? this.resolvePrimary({ ...state, bySlot: withoutSlot(state, rightId) });
      const right = await this.firstOrCreate(paper, state, rightId);
      if (left && right && left !== right) {
        const ws = this.app.workspace;
        let rightLeaf = this.leafAlive(this.splitLeaf) ? this.splitLeaf : null;
        let leftLeaf = this.leafAlive(this.splitLeftLeaf) && this.splitLeftLeaf !== rightLeaf ? this.splitLeftLeaf : null;
        if (!leftLeaf) {
          leftLeaf = ws.getLeaf(newTab ? "tab" : false);
          if (leftLeaf === rightLeaf) leftLeaf = ws.createLeafBySplit(rightLeaf, "vertical", true);
        }
        await leftLeaf.openFile(left);
        if (!rightLeaf) rightLeaf = ws.createLeafBySplit(leftLeaf, "vertical");
        this.splitLeftLeaf = leftLeaf;
        this.splitLeaf = rightLeaf;
        await rightLeaf.openFile(right);
        ws.setActiveLeaf(rightLeaf, { focus: true });
        return;
      }
      const only = left ?? right;
      if (only) {
        await this.app.workspace.getLeaf(newTab ? "tab" : false).openFile(only);
        return;
      }
    } else {
      const firstId = this.settings.openOrder[0];
      let target = firstId ? await this.firstOrCreate(paper, state, firstId) : null;
      if (!target) target = this.resolvePrimary(state);
      if (target) {
        await this.app.workspace.getLeaf(newTab ? "tab" : false).openFile(target);
        return;
      }
    }
    new import_obsidian3.Notice(`\u300C${paper.name}\u300D\u91CC\u8FD8\u6CA1\u6709\u4EFB\u4F55\u6587\u732E\u6587\u4EF6`);
  }
  async openSlot(paper, slotId) {
    const f = this.lib.first(this.lib.getState(paper), slotId);
    if (!f) return false;
    await this.app.workspace.getLeaf(false).openFile(f);
    return true;
  }
  /** Lets the user pick a file from disk and stores it in the paper as the given slot. */
  importFromDisk(paper, slot) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = slot.extensions.map((e) => `.${e}`).join(",");
    input.addEventListener("change", async () => {
      const f = input.files?.[0];
      if (!f) return;
      try {
        const path = this.lib.availablePathForName(paper.path, f.name);
        this.selfCreated.add(path);
        const file = await this.app.vault.createBinary(path, await f.arrayBuffer());
        await this.assignRole(file, slot);
        this.plugin.importer.afterSlotAdded(paper, file, slot);
      } catch (e) {
        console.error(e);
        new import_obsidian3.Notice(`\u5BFC\u5165\u5931\u8D25\uFF1A${e.message}`);
      }
    });
    input.click();
  }
  hasExternalLinks(paper) {
    const prefix = paper.path + "/";
    const resolved = this.app.metadataCache.resolvedLinks;
    for (const src in resolved) {
      if (src.startsWith(prefix)) continue;
      for (const target in resolved[src]) if (target.startsWith(prefix)) return true;
    }
    return false;
  }
  /** Renames the paper folder after the info title, falling back to the highest-priority slot file. */
  async syncName(paper, force = false) {
    if (!force && !this.settings.autoRename) return;
    if (this.renaming.has(paper.path)) return;
    const desired = this.lib.desiredName(this.lib.getState(paper));
    if (!desired || matchesWithCounter(paper.name, desired)) return;
    const parent = paper.parent?.path ?? "";
    const target = this.lib.availablePath(parent, desired, "");
    if (target === paper.path) return;
    this.renaming.add(paper.path);
    try {
      if (this.hasExternalLinks(paper)) await this.app.fileManager.renameFile(paper, target);
      else await this.app.vault.rename(paper, target);
    } catch (e) {
      console.error(e);
      new import_obsidian3.Notice(`\u91CD\u547D\u540D\u6587\u732E\u5931\u8D25\uFF1A${e.message}`);
    } finally {
      this.renaming.delete(paper.path);
    }
  }
};
function withoutSlot(state, slotId) {
  const m = new Map(state.bySlot);
  m.set(slotId, []);
  return m;
}

// src/importer.ts
var import_obsidian5 = require("obsidian");

// src/modals.ts
var import_obsidian4 = require("obsidian");
var SlotPickerModal = class extends import_obsidian4.Modal {
  constructor(app, heading, desc, slots, skipLabel, resolve) {
    super(app);
    this.heading = heading;
    this.desc = desc;
    this.slots = slots;
    this.skipLabel = skipLabel;
    this.resolve = resolve;
    this.done = false;
  }
  onOpen() {
    this.titleEl.setText(this.heading);
    if (this.desc) this.contentEl.createEl("p", { text: this.desc, cls: "lit-modal-desc" });
    const box = this.contentEl.createDiv("lit-role-buttons");
    for (const slot of this.slots) {
      const b = box.createEl("button", { cls: "lit-role-button" });
      b.style.setProperty("--lit-slot-color", slot.color);
      b.createSpan({ cls: "lit-dot is-filled" });
      b.createSpan({ text: slot.name });
      b.addEventListener("click", () => this.finish(slot));
    }
    const skip = this.contentEl.createDiv("lit-role-skip");
    skip.createEl("button", { text: this.skipLabel }).addEventListener("click", () => this.finish(null));
  }
  finish(s) {
    this.done = true;
    this.resolve(s);
    this.close();
  }
  onClose() {
    this.contentEl.empty();
    if (!this.done) this.resolve(null);
  }
};
function pickSlot(app, heading, desc, slots, skipLabel) {
  return new Promise((resolve) => new SlotPickerModal(app, heading, desc, slots, skipLabel, resolve).open());
}
var TextPromptModal = class extends import_obsidian4.Modal {
  constructor(app, heading, initial, resolve) {
    super(app);
    this.heading = heading;
    this.initial = initial;
    this.resolve = resolve;
    this.done = false;
  }
  onOpen() {
    this.titleEl.setText(this.heading);
    let value = this.initial;
    const submit = () => {
      this.done = true;
      this.resolve(value.trim() || null);
      this.close();
    };
    new import_obsidian4.Setting(this.contentEl).addText((t) => {
      t.setValue(value).onChange((v) => value = v);
      t.inputEl.style.width = "100%";
      t.inputEl.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          e.preventDefault();
          submit();
        }
      });
      window.setTimeout(() => t.inputEl.focus(), 0);
    });
    new import_obsidian4.Setting(this.contentEl).addButton((b) => b.setButtonText("\u786E\u5B9A").setCta().onClick(submit));
  }
  onClose() {
    this.contentEl.empty();
    if (!this.done) this.resolve(null);
  }
};
function promptText(app, heading, initial = "") {
  return new Promise((resolve) => new TextPromptModal(app, heading, initial, resolve).open());
}
function metaSummary(m) {
  const authors = m.authors?.length ? m.authors.length > 3 ? `${m.authors.slice(0, 3).join(", ")} \u7B49` : m.authors.join(", ") : "";
  return [authors, m.year, m.journal].filter(Boolean).join(" \xB7 ");
}
var CandidateModal = class extends import_obsidian4.SuggestModal {
  constructor(app, items, resolve) {
    super(app);
    this.items = items;
    this.resolve = resolve;
    this.done = false;
    this.setPlaceholder("\u9009\u62E9\u5339\u914D\u7684\u6587\u732E\uFF08Esc \u53D6\u6D88\uFF09");
  }
  getSuggestions(query) {
    const q = query.toLowerCase();
    return this.items.filter((m) => !q || (m.title ?? "").toLowerCase().includes(q));
  }
  renderSuggestion(m, el) {
    el.createDiv({ text: m.title ?? "(\u65E0\u6807\u9898)" });
    el.createEl("small", { text: [metaSummary(m), m.doi].filter(Boolean).join(" \xB7 "), cls: "lit-suggest-sub" });
  }
  onChooseSuggestion(m) {
    this.done = true;
    this.resolve(m);
  }
  onClose() {
    super.onClose();
    window.setTimeout(() => {
      if (!this.done) this.resolve(null);
    }, 0);
  }
};
function pickCandidate(app, items) {
  return new Promise((resolve) => new CandidateModal(app, items, resolve).open());
}
var ConfirmMetaModal = class extends import_obsidian4.Modal {
  constructor(app, meta, source, resolve) {
    super(app);
    this.meta = meta;
    this.source = source;
    this.resolve = resolve;
    this.done = false;
  }
  onOpen() {
    this.titleEl.setText("\u5199\u5165\u6587\u732E\u4FE1\u606F\uFF1F");
    this.contentEl.createEl("p", { text: `\u6765\u6E90\uFF1A${this.source}`, cls: "lit-modal-desc" });
    const rows = [
      ["\u6807\u9898", this.meta.title],
      ["\u4F5C\u8005", this.meta.authors?.join(", ")],
      ["\u5E74\u4EFD", this.meta.year ? String(this.meta.year) : void 0],
      ["\u671F\u520A", this.meta.journal],
      ["DOI", this.meta.doi],
      ["arXiv", this.meta.arxiv],
      ["\u94FE\u63A5", this.meta.url],
      ["\u6458\u8981", this.meta.abstract ? this.meta.abstract.slice(0, 300) + (this.meta.abstract.length > 300 ? "\u2026" : "") : void 0]
    ];
    const table = this.contentEl.createEl("table", { cls: "lit-meta-table" });
    for (const [k, v] of rows) {
      if (!v) continue;
      const tr = table.createEl("tr");
      tr.createEl("th", { text: k });
      tr.createEl("td", { text: v });
    }
    new import_obsidian4.Setting(this.contentEl).addButton((b) => b.setButtonText("\u53D6\u6D88").onClick(() => this.close())).addButton(
      (b) => b.setButtonText("\u5199\u5165").setCta().onClick(() => {
        this.done = true;
        this.resolve(true);
        this.close();
      })
    );
  }
  onClose() {
    this.contentEl.empty();
    if (!this.done) this.resolve(false);
  }
};
function confirmMeta(app, meta, source) {
  return new Promise((resolve) => new ConfirmMetaModal(app, meta, source, resolve).open());
}

// src/importer.ts
var CATEGORY_DEBOUNCE = 1200;
var PAPER_DEBOUNCE = 800;
var Importer = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.categoryQueue = /* @__PURE__ */ new Map();
    this.categoryTimers = /* @__PURE__ */ new Map();
    this.paperQueue = /* @__PURE__ */ new Map();
    this.paperTimers = /* @__PURE__ */ new Map();
    this.nameTimers = /* @__PURE__ */ new Map();
    this.modalChain = Promise.resolve();
  }
  get app() {
    return this.plugin.app;
  }
  get lib() {
    return this.plugin.library;
  }
  get ops() {
    return this.plugin.papers;
  }
  get settings() {
    return this.plugin.settings;
  }
  unload() {
    for (const t of [...this.categoryTimers.values(), ...this.paperTimers.values(), ...this.nameTimers.values()]) window.clearTimeout(t);
  }
  /** Role prompts are serialized so several drops never stack modals on top of each other. */
  ask(fn) {
    const next = this.modalChain.then(fn, fn);
    this.modalChain = next.catch(() => void 0);
    return next;
  }
  // ---- vault events -------------------------------------------------------
  onCreate(file) {
    const parts = this.lib.relParts(file.path);
    if (!parts) return;
    this.plugin.explorer.refresh();
    if (parts.length >= 2) this.bumpCategory(parts[0]);
    if (this.ops.selfCreated.delete(file.path)) {
      this.scheduleName(file);
      return;
    }
    if (!(file instanceof import_obsidian5.TFile)) return;
    if (parts.length === 2) this.queueCategory(file);
    else if (parts.length === 3 && !this.lib.isInfoFile(file)) this.queuePaperChild(file);
    else this.scheduleName(file);
  }
  onRename(file, oldPath) {
    if (file instanceof import_obsidian5.TFolder && oldPath === this.lib.root) {
      this.plugin.settings.libraryFolder = file.path;
      void this.plugin.saveSettings();
    }
    const inLib = !!this.lib.relParts(file.path) || !!this.lib.relParts(oldPath);
    if (!inLib) return;
    this.plugin.explorer.refresh();
    const oldDir = dirname(oldPath);
    const partOfFolderRename = !this.app.vault.getAbstractFileByPath(oldDir) && oldDir !== dirname(file.path);
    const parts = this.lib.relParts(file.path);
    if (file instanceof import_obsidian5.TFile && parts && !partOfFolderRename) {
      if (parts.length === 2 && oldDir !== dirname(file.path)) this.queueCategory(file);
      if (parts.length === 3 && file.extension.toLowerCase() !== "md") {
        const paper = this.lib.paperOf(file);
        const oldName = oldPath.slice(oldDir.length + 1);
        if (paper && oldDir === paper.path) void this.ops.renameMapping(paper, oldName, file.name);
      }
    }
    this.scheduleNameByPath(oldPath);
    this.scheduleName(file);
  }
  onDelete(file) {
    if (!this.lib.relParts(file.path)) return;
    this.plugin.explorer.refresh();
    this.scheduleNameByPath(file.path);
  }
  onMetadataChanged(file) {
    if (!this.lib.relParts(file.path)) return;
    this.plugin.explorer.refresh();
    this.scheduleName(file);
  }
  // ---- naming -------------------------------------------------------------
  scheduleName(file) {
    const p = this.lib.isPaper(file) ? file.path : this.lib.paperPathOf(file.path);
    if (p) this.scheduleNamePath(p);
  }
  scheduleNameByPath(path) {
    const p = this.lib.paperPathOf(path);
    if (p) this.scheduleNamePath(p);
  }
  scheduleNamePath(paperPath) {
    window.clearTimeout(this.nameTimers.get(paperPath));
    this.nameTimers.set(
      paperPath,
      window.setTimeout(() => {
        this.nameTimers.delete(paperPath);
        const f = this.app.vault.getAbstractFileByPath(paperPath);
        if (this.lib.isPaper(f)) void this.ops.syncName(f);
      }, 500)
    );
  }
  // ---- roles --------------------------------------------------------------
  async readRole(file) {
    const cached = this.lib.roleOf(file);
    if (cached) return this.lib.slot(cached) ?? null;
    if (file.extension.toLowerCase() !== "md") return null;
    try {
      const info = (0, import_obsidian5.getFrontMatterInfo)(await this.app.vault.cachedRead(file));
      if (!info.exists) return null;
      const role = (0, import_obsidian5.parseYaml)(info.frontmatter)?.[ROLE_KEY];
      return typeof role === "string" ? this.lib.slot(role) ?? null : null;
    } catch {
      return null;
    }
  }
  /** Returns the slot for a new file, asking when it is ambiguous. `undefined` means the user skipped. */
  async decideSlot(file, skipLabel, occupied) {
    const existing = await this.readRole(file);
    if (existing) return existing;
    let candidates = this.lib.slotsForExt(file.extension);
    if (!candidates.length) return void 0;
    if (file.extension.toLowerCase() !== "md") {
      const free = candidates.filter((s) => s.multiple || !occupied?.has(s.id));
      if (candidates.length === 1) return candidates[0];
      if (free.length === 1) return free[0];
      if (free.length) candidates = free;
    }
    const picked = await this.ask(
      () => pickSlot(this.app, `\u300C${file.name}\u300D\u662F\u8FD9\u7BC7\u6587\u732E\u7684\u54EA\u4E2A\u90E8\u5206\uFF1F`, file.path, candidates, skipLabel)
    );
    return picked ?? void 0;
  }
  // ---- files dropped into a paper ---------------------------------------
  queuePaperChild(file) {
    const paperPath = this.lib.paperPathOf(file.path);
    if (!paperPath) return;
    const set = this.paperQueue.get(paperPath) ?? /* @__PURE__ */ new Set();
    set.add(file);
    this.paperQueue.set(paperPath, set);
    window.clearTimeout(this.paperTimers.get(paperPath));
    this.paperTimers.set(
      paperPath,
      window.setTimeout(() => {
        this.paperTimers.delete(paperPath);
        const files = [...this.paperQueue.get(paperPath) ?? []];
        this.paperQueue.delete(paperPath);
        void this.processPaperChildren(paperPath, files).catch((e) => {
          console.error(e);
          new import_obsidian5.Notice(`\u5904\u7406\u65B0\u6587\u4EF6\u5931\u8D25\uFF1A${e.message}`);
        });
      }, PAPER_DEBOUNCE)
    );
  }
  async processPaperChildren(paperPath, files) {
    const paper = this.app.vault.getAbstractFileByPath(paperPath);
    if (!this.lib.isPaper(paper)) return;
    for (const file of files) {
      if (this.app.vault.getAbstractFileByPath(file.path) !== file || file.parent !== paper) continue;
      if (!this.lib.acceptsExt(file.extension)) continue;
      if (file.extension.toLowerCase() === "md" && file.stat.size === 0 && !this.lib.roleOf(file)) continue;
      const state = this.lib.getState(paper);
      const occupied = new Set([...state.bySlot.entries()].filter(([, v]) => v.some((f) => f !== file)).map(([k]) => k));
      const slot = await this.decideSlot(file, "\u4E0D\u5C5E\u4E8E\u4EFB\u4F55\u90E8\u5206", occupied);
      if (!slot) continue;
      await this.ops.assignRole(file, slot);
      if (file.extension.toLowerCase() === "md") await this.convertHtmlImages(file);
      this.afterSlotAdded(paper, file, slot);
    }
    this.scheduleNamePath(paper.path);
  }
  /** Follow-up work once a file landed in a slot: name sync and optional OCR / metadata. */
  afterSlotAdded(paper, file, slot) {
    this.scheduleNamePath(paper.path);
    this.plugin.explorer.refresh();
    const ocr = this.settings.ocr;
    if (slot.id === ocr.sourceSlot && ocr.autoOnImport) {
      window.setTimeout(() => {
        const p = this.lib.paperOf(file) ?? paper;
        const state = this.lib.getState(p);
        if (!this.lib.has(state, ocr.targetSlot)) void this.plugin.pipeline.runOcr(p);
      }, 1500);
    }
    if (this.settings.metadataOnImport) {
      window.setTimeout(() => void this.plugin.metadata.autoDetect(this.lib.paperOf(file) ?? paper), 2e3);
    }
  }
  async convertHtmlImages(file) {
    if (!this.settings.convertHtmlImages) return;
    const text = await this.app.vault.read(file);
    if (!/<img\b/i.test(text)) return;
    const out = rewriteImageRefs(text, {}, true);
    if (out !== text) await this.app.vault.modify(file, out);
  }
  // ---- files dropped into a category -------------------------------------
  queueCategory(file) {
    const parts = this.lib.relParts(file.path);
    if (!parts || parts.length !== 2) return;
    const cat = parts[0];
    const set = this.categoryQueue.get(cat) ?? /* @__PURE__ */ new Set();
    set.add(file);
    this.categoryQueue.set(cat, set);
    this.bumpCategory(cat);
  }
  /** Any create under the category (e.g. images of a dropped folder still copying) postpones the batch. */
  bumpCategory(cat) {
    if (!this.categoryQueue.has(cat)) return;
    window.clearTimeout(this.categoryTimers.get(cat));
    this.categoryTimers.set(
      cat,
      window.setTimeout(() => {
        this.categoryTimers.delete(cat);
        const files = [...this.categoryQueue.get(cat) ?? []];
        this.categoryQueue.delete(cat);
        void this.processCategoryBatch(`${this.lib.root}/${cat}`, files).catch((e) => {
          console.error(e);
          new import_obsidian5.Notice(`\u65B0\u5EFA\u6587\u732E\u5931\u8D25\uFF1A${e.message}`);
        });
      }, CATEGORY_DEBOUNCE)
    );
  }
  async processCategoryBatch(categoryPath, files) {
    const vault = this.app.vault;
    const live = files.filter((f) => vault.getAbstractFileByPath(f.path) === f && f.parent?.path === categoryPath);
    const items = [];
    for (const file of live.sort((a, b) => a.name.localeCompare(b.name))) {
      if (!this.lib.acceptsExt(file.extension)) continue;
      const slot = await this.decideSlot(file, "\u4E0D\u4F5C\u4E3A\u6587\u732E\uFF0C\u4FDD\u6301\u539F\u6837");
      if (slot) items.push({ file, slot });
    }
    if (!items.length) return;
    const groups = [];
    for (const it of items) {
      const key = this.lib.nameFromFile(it.file, it.slot);
      const g = this.settings.groupSameName ? groups.find((x) => x.key === key && (it.slot.multiple || !x.items.some((y) => y.slot.id === it.slot.id))) : void 0;
      if (g) g.items.push(it);
      else groups.push({ key, items: [it] });
    }
    const emptied = /* @__PURE__ */ new Set();
    for (const g of groups) {
      const name = this.groupName(g.items) ?? g.key;
      const folderPath = this.lib.availablePath(categoryPath, name, "");
      this.ops.selfCreated.add(folderPath);
      const paper = await this.lib.ensureFolder(folderPath);
      await this.ops.ensureInfo(paper);
      for (const it of g.items) {
        const fromDir = it.file.parent?.path ?? categoryPath;
        if (it.file.extension.toLowerCase() === "md") await this.moveReferencedImages(it.file, fromDir, folderPath, emptied);
        const target = this.lib.availablePathForName(folderPath, it.file.name);
        await vault.rename(it.file, target);
        await this.ops.assignRole(it.file, it.slot);
        if (it.file.extension.toLowerCase() === "md") await this.convertHtmlImages(it.file);
      }
      for (const it of g.items) this.afterSlotAdded(paper, it.file, it.slot);
      new import_obsidian5.Notice(`\u5DF2\u65B0\u5EFA\u6587\u732E\u300C${paper.name}\u300D`);
    }
    await this.removeEmptyFolders(emptied, categoryPath);
    this.plugin.explorer.refresh();
  }
  groupName(items) {
    for (const id of this.settings.nameOrder) {
      const it = items.find((x) => x.slot.id === id);
      if (it) return this.lib.nameFromFile(it.file, it.slot);
    }
    return null;
  }
  /** Moves images a dropped markdown file references (e.g. an OCR `imgs/` folder) into the new paper, keeping their relative layout. */
  async moveReferencedImages(md, fromDir, toDir, emptied) {
    const vault = this.app.vault;
    const refs = extractLocalImageRefs(await vault.cachedRead(md));
    for (const ref of refs) {
      const src = resolveRelative(fromDir, ref);
      if (!src || !src.startsWith(fromDir + "/")) continue;
      const f = vault.getAbstractFileByPath(src);
      if (!(f instanceof import_obsidian5.TFile)) continue;
      const rel = src.slice(fromDir.length + 1);
      const dest = `${toDir}/${rel}`;
      if (vault.getAbstractFileByPath(dest)) continue;
      await this.lib.ensureFolder(dirname(dest));
      let d = dirname(src);
      while (d.length > fromDir.length) {
        emptied.add(d);
        d = dirname(d);
      }
      await vault.rename(f, dest);
    }
  }
  async removeEmptyFolders(paths, stopAt) {
    const sorted = [...paths].filter((p) => p.startsWith(stopAt + "/")).sort((a, b) => b.length - a.length);
    for (const p of sorted) {
      const f = this.app.vault.getAbstractFileByPath(p);
      if (f instanceof import_obsidian5.TFolder && f.children.length === 0) {
        try {
          await this.app.fileManager.trashFile(f);
        } catch (e) {
          console.warn("literature-library: could not remove empty folder", p, e);
        }
      }
    }
  }
  /** Manual role assignment from the context menu. */
  async chooseRole(file) {
    const candidates = this.lib.slotsForExt(file.extension);
    const slots = candidates.length ? candidates : this.settings.slots;
    const picked = await this.ask(() => pickSlot(this.app, `\u628A\u300C${file.name}\u300D\u8BBE\u4E3A\u2026`, "", slots, "\u6E05\u9664\uFF08\u4E0D\u5C5E\u4E8E\u4EFB\u4F55\u90E8\u5206\uFF09"));
    await this.ops.assignRole(file, picked);
    const paper = this.lib.paperOf(file);
    if (paper && picked) this.afterSlotAdded(paper, file, picked);
    else this.scheduleName(file);
  }
};

// src/explorer.ts
var import_obsidian6 = require("obsidian");
var MARK = "lit-touched";
var CLASSES = [MARK, "lit-library", "lit-category", "lit-uncategorized", "lit-paper", "lit-paper-active", "lit-slot-file", "lit-unassigned", "lit-info-file", "lit-assets"];
var INJECTED = [".lit-icon", ".lit-dots", ".lit-badge", ".lit-ghosts"];
var ExplorerDecorator = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.hooked = /* @__PURE__ */ new WeakSet();
    this.refresh = (0, import_obsidian6.debounce)(() => this.refreshNow(), 120, true);
  }
  get app() {
    return this.plugin.app;
  }
  get lib() {
    return this.plugin.library;
  }
  views() {
    return this.app.workspace.getLeavesOfType("file-explorer").map((l) => l.view).filter((v) => v && typeof v.fileItems === "object");
  }
  hook(view) {
    if (this.hooked.has(view)) return;
    this.hooked.add(view);
    this.plugin.registerDomEvent(view.containerEl, "click", (e) => this.onClick(e, view), { capture: true });
  }
  refreshNow() {
    const active = this.app.workspace.getActiveFile();
    const activePaper = active ? this.lib.paperPathOf(active.path) : null;
    const states = /* @__PURE__ */ new Map();
    for (const view of this.views()) {
      this.hook(view);
      for (const path in view.fileItems) {
        const item = view.fileItems[path];
        if (!item?.el || !item.selfEl) continue;
        try {
          this.decorate(view, item, activePaper, states);
        } catch (e) {
          console.error("literature-library: decorate failed", path, e);
        }
      }
    }
  }
  clean(item) {
    if (!item.el.hasClass(MARK)) return;
    for (const c of CLASSES) {
      item.el.removeClass(c);
      item.selfEl.removeClass(c);
    }
    for (const sel of INJECTED) item.el.querySelectorAll(`:scope > ${sel}, :scope > .tree-item-self > ${sel}`).forEach((n) => n.remove());
    item.el.style.removeProperty("--lit-slot-color");
    item.el.style.removeProperty("--lit-library-color");
    delete item.el.dataset.litSig;
  }
  cleanupAll() {
    for (const view of this.views()) for (const path in view.fileItems) this.clean(view.fileItems[path]);
  }
  icon(item, name) {
    let el = item.selfEl.querySelector(":scope > .lit-icon");
    if (el?.dataset.icon === name) return;
    if (!el) {
      el = createDiv("lit-icon");
      item.selfEl.insertBefore(el, item.innerEl);
    }
    el.empty();
    el.removeClass("lit-slot-mark");
    el.dataset.icon = name;
    (0, import_obsidian6.setIcon)(el, name);
  }
  slotMark(item) {
    let el = item.selfEl.querySelector(":scope > .lit-icon");
    if (el?.dataset.icon === "slot") return;
    if (!el) {
      el = createDiv("lit-icon");
      item.selfEl.insertBefore(el, item.innerEl);
    }
    el.empty();
    el.dataset.icon = "slot";
    el.addClass("lit-slot-mark");
    el.createSpan({ cls: "lit-dot is-filled" });
  }
  badge(item, text, title = "") {
    let el = item.selfEl.querySelector(":scope > .lit-badge");
    if (!text) {
      el?.remove();
      return;
    }
    if (!el) el = item.selfEl.createDiv("lit-badge");
    if (el.textContent !== text) el.setText(text);
    el.title = title;
  }
  state(paper, cache) {
    let s = cache.get(paper.path);
    if (!s) {
      s = this.lib.getState(paper);
      cache.set(paper.path, s);
    }
    return s;
  }
  decorate(view, item, activePaper, cache) {
    const file = item.file;
    const kind = this.lib.kindOf(file);
    const settings = this.plugin.settings;
    if (!kind || kind === "deep" || kind === "category-file") {
      this.clean(item);
      return;
    }
    item.el.addClass(MARK);
    item.el.style.setProperty("--lit-library-color", settings.libraryColor);
    if (kind === "root") {
      item.el.addClass("lit-library");
      this.icon(item, "library");
      return;
    }
    if (kind === "category") {
      item.el.addClass("lit-category");
      const unc = file.name === settings.uncategorizedFolder;
      item.el.toggleClass("lit-uncategorized", unc);
      this.icon(item, unc ? "inbox" : "folder-open");
      return;
    }
    if (kind === "paper" && file instanceof import_obsidian6.TFolder) {
      this.decoratePaper(view, item, file, this.state(file, cache), activePaper === file.path);
      return;
    }
    if (kind === "paper-child") {
      const paper = file.parent;
      if (!this.lib.isPaper(paper)) return this.clean(item);
      const st = this.state(paper, cache);
      item.el.removeClass("lit-slot-file", "lit-unassigned", "lit-info-file", "lit-assets");
      item.el.style.removeProperty("--lit-slot-color");
      if (file instanceof import_obsidian6.TFolder) {
        if (file.name === settings.assetsFolder) {
          item.el.addClass("lit-assets");
          this.icon(item, "image");
        }
        return;
      }
      if (file === st.info) {
        item.el.addClass("lit-info-file");
        this.icon(item, "info");
        this.badge(item, "\u4FE1\u606F");
        return;
      }
      for (const slot of settings.slots) {
        if (st.bySlot.get(slot.id)?.includes(file)) {
          item.el.addClass("lit-slot-file");
          item.el.style.setProperty("--lit-slot-color", slot.color);
          this.slotMark(item);
          this.badge(item, slot.name);
          return;
        }
      }
      if (st.unassigned.includes(file)) {
        item.el.addClass("lit-unassigned");
        this.badge(item, "\u672A\u5206\u914D", "\u70B9\u51FB\u8BBE\u7F6E\u8FD9\u4E2A\u6587\u4EF6\u5C5E\u4E8E\u54EA\u4E2A\u90E8\u5206");
        return;
      }
      this.badge(item, null);
      item.selfEl.querySelector(":scope > .lit-icon")?.remove();
    }
  }
  decoratePaper(view, item, paper, st, active) {
    const settings = this.plugin.settings;
    item.el.addClass("lit-paper");
    item.selfEl.toggleClass("lit-paper-active", active);
    this.icon(item, "book-open-text");
    const sig = JSON.stringify([
      paper.path,
      settings.slots.map((s) => [s.id, s.name, s.color, st.bySlot.get(s.id)?.length ?? 0]),
      st.unassigned.length
    ]);
    if (item.el.dataset.litSig === sig) return;
    item.el.dataset.litSig = sig;
    let dots = item.selfEl.querySelector(":scope > .lit-dots");
    if (!dots) dots = item.selfEl.createDiv("lit-dots");
    dots.empty();
    for (const slot of settings.slots) {
      const n = st.bySlot.get(slot.id)?.length ?? 0;
      const d = dots.createSpan({ cls: "lit-dot" });
      d.toggleClass("is-filled", n > 0);
      d.dataset.slot = slot.id;
      d.style.setProperty("--lit-slot-color", slot.color);
      d.title = `${slot.name}\uFF1A${n > 0 ? "\u5DF2\u6709" : "\u7F3A\u5931"}`;
    }
    let ghosts = item.el.querySelector(":scope > .lit-ghosts");
    const missing = settings.slots.filter((s) => !st.bySlot.get(s.id)?.length);
    if (!missing.length) ghosts?.remove();
    else {
      if (!ghosts) ghosts = item.el.createDiv("tree-item-children nav-folder-children lit-ghosts");
      ghosts.empty();
      for (const slot of missing) {
        const row = ghosts.createDiv("tree-item nav-file lit-ghost");
        row.dataset.slot = slot.id;
        row.dataset.paper = paper.path;
        const self = row.createDiv("tree-item-self nav-file-title is-clickable lit-ghost-title");
        self.style.setProperty("--lit-slot-color", slot.color);
        self.createDiv({ cls: "tree-item-inner nav-file-title-content", text: slot.name });
        self.createDiv({ cls: "lit-badge", text: "\u7F3A\u5931" });
      }
    }
    view.tree?.infinityScroll?.invalidate(item, true);
  }
  onClick(evt, view) {
    const target = evt.target;
    if (!target || evt.button !== 0) return;
    const ghost = target.closest(".lit-ghost");
    if (ghost) {
      evt.preventDefault();
      evt.stopPropagation();
      const paper2 = this.app.vault.getAbstractFileByPath(ghost.dataset.paper ?? "");
      if (this.lib.isPaper(paper2)) this.ghostMenu(evt, paper2, ghost.dataset.slot ?? "");
      return;
    }
    const unassigned = target.closest(".lit-unassigned .lit-badge");
    if (unassigned) {
      const path = unassigned.closest(".nav-file-title")?.dataset.path;
      const f = path ? this.app.vault.getAbstractFileByPath(path) : null;
      if (f instanceof import_obsidian6.TFile) {
        evt.preventDefault();
        evt.stopPropagation();
        void this.plugin.importer.chooseRole(f);
      }
      return;
    }
    const title = target.closest(".nav-folder-title");
    if (!title || target.closest(".collapse-icon")) return;
    if (evt.shiftKey || evt.altKey || evt.metaKey) return;
    const paper = this.app.vault.getAbstractFileByPath(title.dataset.path ?? "");
    if (!this.lib.isPaper(paper) || view.fileBeingRenamed) return;
    evt.preventDefault();
    const dot = target.closest(".lit-dot");
    if (dot?.dataset.slot) {
      const slotId = dot.dataset.slot;
      void this.plugin.papers.openSlot(paper, slotId).then((ok) => {
        if (!ok) this.ghostMenu(evt, paper, slotId);
      });
      return;
    }
    void this.plugin.papers.openPaper(paper, evt.ctrlKey);
  }
  ghostMenu(evt, paper, slotId) {
    const slot = this.lib.slot(slotId);
    if (!slot) return;
    const st = this.lib.getState(paper);
    const menu = new import_obsidian6.Menu();
    menu.addItem((i) => i.setTitle(`\u300C${slot.name}\u300D\u7F3A\u5931`).setIsLabel(true));
    if (slot.extensions.includes("md")) {
      menu.addItem(
        (i) => i.setTitle(slot.template ? "\u7528\u6A21\u677F\u65B0\u5EFA" : "\u65B0\u5EFA\u7A7A\u767D\u6587\u4EF6").setIcon("file-plus").onClick(async () => {
          const f = await this.plugin.papers.createSlotFile(paper, slot);
          if (f) {
            await this.app.workspace.getLeaf(false).openFile(f);
            this.plugin.importer.afterSlotAdded(paper, f, slot);
          }
        })
      );
    }
    menu.addItem(
      (i) => i.setTitle("\u4ECE\u7535\u8111\u5BFC\u5165\u6587\u4EF6\u2026").setIcon("upload").onClick(() => this.plugin.papers.importFromDisk(paper, slot))
    );
    const s = this.plugin.settings;
    if (slot.id === s.ocr.targetSlot && this.lib.has(st, s.ocr.sourceSlot)) {
      menu.addItem(
        (i) => i.setTitle("\u8FD0\u884C PaddleOCR").setIcon("scan-text").onClick(() => void this.plugin.pipeline.runOcr(paper))
      );
    }
    if (slot.id === s.translate.targetSlot && this.lib.has(st, s.translate.sourceSlot)) {
      menu.addItem(
        (i) => i.setTitle("\u8FD0\u884C\u7FFB\u8BD1").setIcon("languages").onClick(() => void this.plugin.pipeline.runTranslate(paper))
      );
    }
    menu.showAtMouseEvent(evt);
  }
};

// src/metadata.ts
var import_obsidian7 = require("obsidian");
var BAD_PDF_TITLE = /^(microsoft (word|powerpoint)|untitled|document\d*$|.*\.(docx?|pdf|tex|dvi)$)/i;
var MetadataService = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.inFlight = /* @__PURE__ */ new Set();
  }
  get app() {
    return this.plugin.app;
  }
  get lib() {
    return this.plugin.library;
  }
  async pdfText(file) {
    const pdfjs = await (0, import_obsidian7.loadPdfJs)();
    const data = new Uint8Array(await this.app.vault.readBinary(file));
    const doc = await pdfjs.getDocument({ data }).promise;
    try {
      const meta = await doc.getMetadata().catch(() => null);
      const title = typeof meta?.info?.Title === "string" ? meta.info.Title.trim() : null;
      const parts = [];
      for (let i = 1; i <= Math.min(2, doc.numPages); i++) {
        const page = await doc.getPage(i);
        const tc = await page.getTextContent();
        parts.push(tc.items.map((it) => (it.str ?? "") + (it.hasEOL ? "\n" : " ")).join(""));
      }
      return { text: parts.join("\n"), title };
    } finally {
      await doc.destroy();
    }
  }
  async collect(paper) {
    const st = this.lib.getState(paper);
    const out = { text: "", pdfTitle: null, mdHeading: null };
    const pdf = [...st.bySlot.values()].flat().find((f) => f.extension.toLowerCase() === "pdf");
    if (pdf) {
      try {
        const r = await this.pdfText(pdf);
        out.text += r.text + "\n";
        out.pdfTitle = r.title;
      } catch (e) {
        console.warn("literature-library: pdf text extraction failed", e);
      }
    }
    const mds = [...st.bySlot.values()].flat().filter((f) => f.extension.toLowerCase() === "md");
    const order = [this.plugin.settings.ocr.targetSlot, this.plugin.settings.translate.targetSlot];
    mds.sort((a, b) => rank(this.lib.roleOf(a), order) - rank(this.lib.roleOf(b), order));
    for (const md of mds.slice(0, 2)) {
      const raw = await this.app.vault.cachedRead(md);
      const body = raw.slice((0, import_obsidian7.getFrontMatterInfo)(raw).contentStart, 8e3);
      out.text += body + "\n";
      if (!out.mdHeading) {
        const h = body.match(/^#{1,2}\s+(.{10,300})$/m);
        if (h) out.mdHeading = h[1].replace(/[*_`]/g, "").trim();
      }
    }
    return out;
  }
  crossrefQs() {
    const email = this.plugin.settings.crossrefEmail.trim();
    return email ? `mailto=${encodeURIComponent(email)}` : "";
  }
  async lookupDoi(doi) {
    const qs = this.crossrefQs();
    const res = await (0, import_obsidian7.requestUrl)({ url: `https://api.crossref.org/works/${encodeURIComponent(doi)}${qs ? `?${qs}` : ""}`, throw: false });
    if (res.status !== 200) return null;
    const meta = parseCrossrefWork(res.json?.message);
    meta.doi = meta.doi ?? doi;
    return meta;
  }
  async lookupArxiv(id) {
    const res = await (0, import_obsidian7.requestUrl)({ url: `https://export.arxiv.org/api/query?id_list=${encodeURIComponent(id)}`, throw: false });
    if (res.status !== 200) return null;
    const meta = parseArxivAtom(new DOMParser().parseFromString(res.text, "application/xml"));
    if (meta) meta.arxiv = id;
    return meta;
  }
  async searchCrossref(query) {
    const qs = this.crossrefQs();
    const url = `https://api.crossref.org/works?rows=6&query.bibliographic=${encodeURIComponent(query.slice(0, 400))}${qs ? `&${qs}` : ""}`;
    const res = await (0, import_obsidian7.requestUrl)({ url, throw: false });
    if (res.status !== 200) return [];
    return (res.json?.message?.items ?? []).map((w) => parseCrossrefWork(w)).filter((m) => m.title);
  }
  async byIdentifier(c) {
    const doi = findDoi(c.text) ?? findDoi(c.text.replace(/\s+/g, ""));
    if (doi) {
      const meta = await this.lookupDoi(doi);
      if (meta) return { meta, source: `DOI ${doi}\uFF08Crossref\uFF09` };
    }
    const arxiv = findArxiv(c.text);
    if (arxiv) {
      const meta = await this.lookupArxiv(arxiv);
      if (meta) return { meta, source: `arXiv ${arxiv}` };
    }
    return null;
  }
  titleGuess(c) {
    if (c.pdfTitle && c.pdfTitle.length >= 15 && !BAD_PDF_TITLE.test(c.pdfTitle)) return c.pdfTitle;
    if (c.mdHeading) return c.mdHeading;
    const line = c.text.split("\n").map((l) => l.trim()).find((l) => l.length >= 20 && l.length <= 300 && /[a-z]/i.test(l));
    return line ?? null;
  }
  infoIsFilled(paper) {
    const fm = this.lib.frontmatter(this.lib.getInfo(paper));
    return !!(fm && (typeof fm.doi === "string" && fm.doi || typeof fm.title === "string" && fm.title));
  }
  /** Silent run after import: only trusts DOI / arXiv hits and only fills empty fields. */
  async autoDetect(paper) {
    if (!this.lib.isPaper(paper) || this.inFlight.has(paper.path) || this.infoIsFilled(paper)) return;
    this.inFlight.add(paper.path);
    try {
      const hit = await this.byIdentifier(await this.collect(paper));
      if (hit && this.lib.isPaper(paper)) {
        await this.write(paper, hit.meta, false);
        new import_obsidian7.Notice(`\u5DF2\u8BC6\u522B\u300C${paper.name}\u300D\u7684\u6587\u732E\u4FE1\u606F\uFF1A${hit.source}`);
      }
    } catch (e) {
      console.warn("literature-library: metadata auto-detect failed", e);
    } finally {
      this.inFlight.delete(paper.path);
    }
  }
  /** Manual run from the menu: confirms before writing and offers a title search as fallback. */
  async detectInteractive(paper) {
    if (this.inFlight.has(paper.path)) return;
    this.inFlight.add(paper.path);
    const notice = new import_obsidian7.Notice(`\u6B63\u5728\u8BC6\u522B\u300C${paper.name}\u300D\u7684\u6587\u732E\u4FE1\u606F\u2026`, 0);
    try {
      const c = await this.collect(paper);
      let hit = await this.byIdentifier(c);
      if (!hit) {
        const q = this.titleGuess(c);
        if (!q) {
          notice.hide();
          new import_obsidian7.Notice("\u6CA1\u6709\u627E\u5230 DOI\u3001arXiv \u7F16\u53F7\u6216\u53EF\u7528\u4E8E\u641C\u7D22\u7684\u6807\u9898\uFF0C\u8BF7\u5728\u6587\u732E\u4FE1\u606F\u91CC\u624B\u52A8\u586B\u5199\u3002");
          return;
        }
        const items = await this.searchCrossref(q);
        notice.hide();
        if (!items.length) {
          new import_obsidian7.Notice("Crossref \u6CA1\u6709\u627E\u5230\u5339\u914D\u7684\u6587\u732E\uFF0C\u8BF7\u624B\u52A8\u586B\u5199\u3002");
          return;
        }
        const picked = await pickCandidate(this.app, items);
        if (!picked) return;
        let full = picked;
        if (picked.doi) full = await this.lookupDoi(picked.doi) ?? picked;
        hit = { meta: full, source: `Crossref \u6807\u9898\u641C\u7D22\u300C${q.slice(0, 60)}\u300D` };
      }
      notice.hide();
      if (await confirmMeta(this.app, hit.meta, hit.source)) {
        await this.write(paper, hit.meta, true);
        new import_obsidian7.Notice("\u6587\u732E\u4FE1\u606F\u5DF2\u5199\u5165");
      }
    } catch (e) {
      console.error(e);
      new import_obsidian7.Notice(`\u8BC6\u522B\u5931\u8D25\uFF1A${e.message}`);
    } finally {
      notice.hide();
      this.inFlight.delete(paper.path);
    }
  }
  async write(paper, meta, overwrite) {
    const info = await this.plugin.papers.ensureInfo(paper);
    await this.app.fileManager.processFrontMatter(info, (fm) => {
      const set = (k, v) => {
        if (v === void 0 || v === null || v === "" || Array.isArray(v) && !v.length) return;
        const cur = fm[k];
        const empty = cur === void 0 || cur === null || cur === "" || Array.isArray(cur) && !cur.length;
        if (overwrite || empty) fm[k] = v;
      };
      set("title", meta.title);
      set("authors", meta.authors);
      set("year", meta.year);
      set("journal", meta.journal);
      set("doi", meta.doi);
      set("arxiv", meta.arxiv);
      set("url", meta.url);
    });
    if (meta.abstract) {
      const abs = meta.abstract;
      await this.app.vault.process(info, (text) => {
        const start = (0, import_obsidian7.getFrontMatterInfo)(text).contentStart;
        const head = text.slice(0, start);
        const body = text.slice(start);
        const m = body.match(/^##[ \t]*摘要[ \t]*$/m);
        if (!m) return `${head}${body.trimEnd()}

## \u6458\u8981

${abs}
`;
        const after = body.slice(m.index + m[0].length);
        const nextHeading = after.search(/^#{1,6}\s/m);
        const section = nextHeading < 0 ? after : after.slice(0, nextHeading);
        if (section.trim() && !overwrite) return text;
        const rest = nextHeading < 0 ? "" : after.slice(nextHeading);
        return `${head}${body.slice(0, m.index + m[0].length)}

${abs}
${rest ? `
${rest}` : ""}`;
      });
    }
  }
};
function rank(role, order) {
  const i = role ? order.indexOf(role) : -1;
  return i < 0 ? 99 : i;
}

// src/pipeline.ts
var import_obsidian8 = require("obsidian");
var IMAGE_EXTS = ["png", "jpg", "jpeg", "bmp", "tiff", "tif", "webp"];
var Pipeline = class {
  constructor(plugin) {
    this.plugin = plugin;
    this.running = /* @__PURE__ */ new Set();
  }
  get app() {
    return this.plugin.app;
  }
  get lib() {
    return this.plugin.library;
  }
  get settings() {
    return this.plugin.settings;
  }
  secret(id) {
    if (!id) return null;
    return this.app.secretStorage.getSecret(id);
  }
  async lock(key, fn) {
    if (this.running.has(key)) {
      new import_obsidian8.Notice("\u8FD9\u7BC7\u6587\u732E\u5DF2\u7ECF\u6709\u4EFB\u52A1\u5728\u8FDB\u884C\u4E2D");
      return null;
    }
    this.running.add(key);
    try {
      return await fn();
    } finally {
      this.running.delete(key);
    }
  }
  async writeBinary(path, data) {
    const existing = this.app.vault.getAbstractFileByPath(path);
    if (existing instanceof import_obsidian8.TFile) await this.app.vault.modifyBinary(existing, data);
    else {
      await this.lib.ensureFolder(dirname(path));
      await this.app.vault.createBinary(path, data);
    }
  }
  async fetchImage(value) {
    if (/^https?:\/\//i.test(value)) return (await (0, import_obsidian8.requestUrl)({ url: value })).arrayBuffer;
    return (0, import_obsidian8.base64ToArrayBuffer)(value.replace(/^data:[^,]*,/, ""));
  }
  async runOcr(paper) {
    const s = this.settings.ocr;
    const token = this.secret(s.tokenSecret);
    if (!s.apiUrl || !token) {
      new import_obsidian8.Notice("\u8BF7\u5148\u5728\u63D2\u4EF6\u8BBE\u7F6E\u91CC\u586B\u5199 PaddleOCR \u7684 API \u5730\u5740\u5E76\u9009\u62E9\u4EE4\u724C\uFF08\u5BC6\u94A5\uFF09");
      return null;
    }
    const source = this.lib.first(this.lib.getState(paper), s.sourceSlot);
    const target = this.lib.slot(s.targetSlot);
    if (!source || !target) {
      new import_obsidian8.Notice("\u6CA1\u6709\u53EF OCR \u7684\u6587\u4EF6\uFF0C\u6216 OCR \u76EE\u6807\u90E8\u5206\u4E0D\u5B58\u5728");
      return null;
    }
    const ext = source.extension.toLowerCase();
    if (ext !== "pdf" && !IMAGE_EXTS.includes(ext)) {
      new import_obsidian8.Notice(`PaddleOCR \u4E0D\u652F\u6301 .${ext} \u6587\u4EF6`);
      return null;
    }
    return this.lock(`ocr:${paper.path}`, async () => {
      const notice = new import_obsidian8.Notice(`\u6B63\u5728 OCR\u300C${source.name}\u300D\u2026\uFF08\u5927\u6587\u4EF6\u53EF\u80FD\u9700\u8981\u51E0\u5206\u949F\uFF09`, 0);
      try {
        let extra = {};
        try {
          extra = s.extraParams.trim() ? JSON.parse(s.extraParams) : {};
        } catch {
          throw new Error("\u201C\u989D\u5916\u53C2\u6570\u201D\u4E0D\u662F\u5408\u6CD5\u7684 JSON");
        }
        const body = JSON.stringify({ file: (0, import_obsidian8.arrayBufferToBase64)(await this.app.vault.readBinary(source)), fileType: ext === "pdf" ? 0 : 1, ...extra });
        const res = await (0, import_obsidian8.requestUrl)({
          url: s.apiUrl,
          method: "POST",
          headers: { Authorization: `token ${token}`, "Content-Type": "application/json" },
          body,
          throw: false
        });
        if (res.status === 401 || res.status === 403) throw new Error("\u4EE4\u724C\u65E0\u6548\u6216\u65E0\u6743\u9650\uFF08401/403\uFF09");
        if (res.status === 429) throw new Error("\u4ECA\u65E5\u989D\u5EA6\u5DF2\u7528\u5B8C\uFF08429\uFF09");
        if (res.status >= 400) throw new Error(`HTTP ${res.status}\uFF1A${res.text.slice(0, 200)}`);
        const results = res.json?.result?.layoutParsingResults;
        if (!Array.isArray(results) || !results.length) throw new Error("\u8FD4\u56DE\u7ED3\u679C\u91CC\u6CA1\u6709 layoutParsingResults");
        const texts = [];
        const images = {};
        for (const r of results) {
          texts.push(r?.markdown?.text ?? "");
          Object.assign(images, r?.markdown?.images ?? {});
        }
        const imgDir = (0, import_obsidian8.normalizePath)(`${this.settings.assetsFolder}/ocr`);
        const map = {};
        let i = 0;
        for (const [rel, value] of Object.entries(images)) {
          notice.setMessage(`\u6B63\u5728\u4FDD\u5B58 OCR \u56FE\u7247 ${++i}/${Object.keys(images).length}\u2026`);
          const clean = rel.replace(/^\.?\//, "");
          const relTarget = `${imgDir}/${clean}`;
          try {
            await this.writeBinary((0, import_obsidian8.normalizePath)(`${paper.path}/${relTarget}`), await this.fetchImage(value));
            map[rel] = relTarget;
            map[clean] = relTarget;
          } catch (e) {
            console.warn("literature-library: OCR image failed", rel, e);
          }
        }
        const md = rewriteImageRefs(texts.join("\n\n"), map, true);
        const path = this.lib.availablePath(paper.path, `${paper.name}${target.suffix}`, "md");
        this.plugin.papers.selfCreated.add(path);
        const file = await this.app.vault.create(path, `---
${ROLE_KEY}: ${target.id}
---

${md}
`);
        notice.hide();
        new import_obsidian8.Notice(`OCR \u5B8C\u6210\uFF1A${file.name}`);
        this.plugin.importer.afterSlotAdded(paper, file, target);
        if (this.settings.translate.autoAfterOcr && this.settings.translate.sourceSlot === target.id) {
          window.setTimeout(() => void this.runTranslate(paper), 800);
        }
        return file;
      } catch (e) {
        notice.hide();
        console.error(e);
        new import_obsidian8.Notice(`OCR \u5931\u8D25\uFF1A${e.message}`, 8e3);
        return null;
      }
    });
  }
  async chat(text) {
    const t = this.settings.translate;
    const key = this.secret(t.apiKeySecret);
    const url = `${t.baseUrl.trim().replace(/\/+$/, "")}/chat/completions`;
    let lastErr = null;
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await (0, import_obsidian8.requestUrl)({
          url,
          method: "POST",
          headers: { "Content-Type": "application/json", ...key ? { Authorization: `Bearer ${key}` } : {} },
          body: JSON.stringify({
            model: t.model,
            messages: [
              { role: "system", content: t.prompt },
              { role: "user", content: text }
            ],
            stream: false
          }),
          throw: false
        });
        if (res.status === 401 || res.status === 403) throw Object.assign(new Error("API Key \u65E0\u6548\uFF08401/403\uFF09"), { fatal: true });
        if (res.status >= 400) throw new Error(`HTTP ${res.status}\uFF1A${res.text.slice(0, 200)}`);
        const content = res.json?.choices?.[0]?.message?.content;
        if (typeof content !== "string") throw new Error("\u8FD4\u56DE\u7ED3\u679C\u91CC\u6CA1\u6709 choices[0].message.content");
        return unwrapFence(content);
      } catch (e) {
        lastErr = e;
        if (e.fatal) break;
        await sleep(1500 * (attempt + 1));
      }
    }
    throw lastErr ?? new Error("\u7FFB\u8BD1\u5931\u8D25");
  }
  async runTranslate(paper) {
    const t = this.settings.translate;
    if (!t.baseUrl.trim() || !t.model.trim()) {
      new import_obsidian8.Notice("\u8BF7\u5148\u5728\u63D2\u4EF6\u8BBE\u7F6E\u91CC\u586B\u5199\u7FFB\u8BD1\u63A5\u53E3\u5730\u5740\u548C\u6A21\u578B\u540D");
      return null;
    }
    const source = this.lib.first(this.lib.getState(paper), t.sourceSlot);
    const target = this.lib.slot(t.targetSlot);
    if (!source || source.extension.toLowerCase() !== "md" || !target) {
      new import_obsidian8.Notice("\u6CA1\u6709\u53EF\u7FFB\u8BD1\u7684 Markdown \u6587\u4EF6\uFF0C\u6216\u7FFB\u8BD1\u76EE\u6807\u90E8\u5206\u4E0D\u5B58\u5728");
      return null;
    }
    return this.lock(`tr:${paper.path}`, async () => {
      const raw = await this.app.vault.read(source);
      const chunks = splitMarkdown(raw.slice((0, import_obsidian8.getFrontMatterInfo)(raw).contentStart), t.chunkChars);
      const out = new Array(chunks.length);
      const notice = new import_obsidian8.Notice(`\u6B63\u5728\u7FFB\u8BD1\u300C${source.name}\u300D0/${chunks.length}\u2026`, 0);
      let done = 0;
      let next = 0;
      let failed = null;
      const worker = async () => {
        while (!failed && next < chunks.length) {
          const i = next++;
          try {
            out[i] = needsTranslation(chunks[i]) ? await this.chat(chunks[i]) : chunks[i];
          } catch (e) {
            failed = e;
            return;
          }
          notice.setMessage(`\u6B63\u5728\u7FFB\u8BD1\u300C${source.name}\u300D${++done}/${chunks.length}\u2026`);
        }
      };
      await Promise.all(Array.from({ length: Math.min(t.concurrency, chunks.length) }, worker));
      notice.hide();
      if (failed) {
        new import_obsidian8.Notice(`\u7FFB\u8BD1\u5931\u8D25\uFF08\u5DF2\u5B8C\u6210 ${done}/${chunks.length}\uFF09\uFF1A${failed.message}`, 8e3);
        return null;
      }
      const path = this.lib.availablePath(paper.path, `${paper.name}${target.suffix}`, "md");
      this.plugin.papers.selfCreated.add(path);
      const file = await this.app.vault.create(path, `---
${ROLE_KEY}: ${target.id}
---

${out.join("\n\n")}
`);
      new import_obsidian8.Notice(`\u7FFB\u8BD1\u5B8C\u6210\uFF1A${file.name}`);
      this.plugin.importer.afterSlotAdded(paper, file, target);
      return file;
    });
  }
};
function sleep(ms) {
  return new Promise((r) => window.setTimeout(r, ms));
}

// src/attachments.ts
var import_obsidian9 = require("obsidian");

// node_modules/monkey-around/dist/index.mjs
function around(obj, factories) {
  const removers = Object.keys(factories).map((key) => around1(obj, key, factories[key]));
  return removers.length === 1 ? removers[0] : function() {
    removers.forEach((r) => r());
  };
}
function around1(obj, method, createWrapper) {
  const inherited = obj[method], hadOwn = obj.hasOwnProperty(method), original = hadOwn ? inherited : function() {
    return Object.getPrototypeOf(obj)[method].apply(this, arguments);
  };
  let current = createWrapper(original);
  if (inherited)
    Object.setPrototypeOf(current, inherited);
  Object.setPrototypeOf(wrapper, current);
  obj[method] = wrapper;
  return remove;
  function wrapper(...args) {
    if (current === original && obj[method] === wrapper)
      remove();
    return current.apply(this, args);
  }
  function remove() {
    if (obj[method] === wrapper) {
      if (hadOwn)
        obj[method] = original;
      else
        delete obj[method];
    }
    if (current === original)
      return;
    current = original;
    Object.setPrototypeOf(wrapper, inherited || Function);
  }
}

// src/attachments.ts
function patchAttachmentLocation(plugin) {
  const vault = plugin.app.vault;
  if (typeof vault.getAvailablePathForAttachments !== "function" || typeof vault.getAvailablePath !== "function") {
    console.warn("literature-library: attachment API not found; images keep Obsidian's default location");
    return;
  }
  plugin.register(
    around(vault, {
      getAvailablePathForAttachments(orig) {
        return async function(filename, extension, sourceFile) {
          try {
            const paper = sourceFile ? plugin.library.paperOf(sourceFile) : null;
            if (paper) {
              const dir = (0, import_obsidian9.normalizePath)(`${paper.path}/${plugin.settings.assetsFolder}`);
              await plugin.library.ensureFolder(dir);
              const safe = filename.replace(/[\\/:*?"<>|#^[\]]/g, "-").slice(0, 200) || "image";
              return vault.getAvailablePath(`${dir}/${safe}`, extension);
            }
          } catch (e) {
            console.error("literature-library: attachment path", e);
          }
          return orig.call(this, filename, extension, sourceFile);
        };
      }
    })
  );
}

// src/main.ts
var LiteratureLibraryPlugin = class extends import_obsidian10.Plugin {
  async onload() {
    this.settings = normalizeSettings(await this.loadData());
    this.library = new Library(this);
    this.papers = new PaperOps(this);
    this.importer = new Importer(this);
    this.explorer = new ExplorerDecorator(this);
    this.metadata = new MetadataService(this);
    this.pipeline = new Pipeline(this);
    this.addSettingTab(new LitSettingTab(this.app, this));
    patchAttachmentLocation(this);
    this.registerCommands();
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file) => this.fileMenu(menu, file)));
    this.app.workspace.onLayoutReady(async () => {
      await this.ensureLibraryFolders();
      const { vault, metadataCache, workspace } = this.app;
      this.registerEvent(vault.on("create", (f) => this.importer.onCreate(f)));
      this.registerEvent(vault.on("rename", (f, old) => this.importer.onRename(f, old)));
      this.registerEvent(vault.on("delete", (f) => this.importer.onDelete(f)));
      this.registerEvent(metadataCache.on("changed", (f) => this.importer.onMetadataChanged(f)));
      this.registerEvent(metadataCache.on("resolved", () => this.explorer.refresh()));
      this.registerEvent(workspace.on("layout-change", () => this.explorer.refresh()));
      this.registerEvent(workspace.on("file-open", () => this.explorer.refresh()));
      this.explorer.refreshNow();
    });
  }
  onunload() {
    this.importer?.unload();
    this.explorer?.cleanupAll();
  }
  async saveSettings() {
    await this.saveData(this.settings);
    this.explorer.refresh();
  }
  async ensureLibraryFolders() {
    try {
      await this.library.ensureFolder(this.library.root);
      if (this.settings.uncategorizedFolder) {
        await this.library.ensureFolder((0, import_obsidian10.normalizePath)(`${this.library.root}/${this.settings.uncategorizedFolder}`));
      }
    } catch (e) {
      new import_obsidian10.Notice(`\u65E0\u6CD5\u521B\u5EFA\u6587\u732E\u5E93\u6587\u4EF6\u5939\uFF1A${e.message}`);
    }
    this.explorer.refresh();
  }
  activePaper() {
    const f = this.app.workspace.getActiveFile();
    return f ? this.library.paperOf(f) : null;
  }
  paperCommand(id, name, run) {
    this.addCommand({
      id,
      name,
      checkCallback: (checking) => {
        const p = this.activePaper();
        if (!p) return false;
        if (!checking) void run(p);
        return true;
      }
    });
  }
  registerCommands() {
    this.paperCommand("detect-metadata", "\u8BC6\u522B\u5F53\u524D\u6587\u732E\u7684\u4FE1\u606F", (p) => this.metadata.detectInteractive(p));
    this.paperCommand("run-ocr", "\u5BF9\u5F53\u524D\u6587\u732E\u8FD0\u884C PaddleOCR", (p) => this.pipeline.runOcr(p));
    this.paperCommand("run-translate", "\u7FFB\u8BD1\u5F53\u524D\u6587\u732E", (p) => this.pipeline.runTranslate(p));
    this.paperCommand("open-info", "\u6253\u5F00\u5F53\u524D\u6587\u732E\u7684\u6587\u732E\u4FE1\u606F", async (p) => {
      const info = await this.papers.ensureInfo(p);
      await this.app.workspace.getLeaf(false).openFile(info);
    });
    this.paperCommand("rename-by-priority", "\u6309\u547D\u540D\u4F18\u5148\u7EA7\u91CD\u547D\u540D\u5F53\u524D\u6587\u732E", (p) => this.papers.syncName(p, true));
  }
  async createPaper(category) {
    const name = await promptText(this.app, "\u65B0\u5EFA\u6587\u732E\uFF1A\u8F93\u5165\u6587\u732E\u540D");
    if (!name) return;
    const path = this.library.availablePath(category.path, name, "");
    this.papers.selfCreated.add(path);
    const paper = await this.library.ensureFolder(path);
    await this.papers.ensureInfo(paper);
  }
  fileMenu(menu, file) {
    const kind = this.library.kindOf(file);
    if (!kind) return;
    if (kind === "root" && file instanceof import_obsidian10.TFolder) {
      menu.addItem(
        (i) => i.setTitle("\u65B0\u5EFA\u6587\u732E\u5206\u7C7B").setIcon("folder-plus").setSection("action").onClick(async () => {
          const name = await promptText(this.app, "\u65B0\u5EFA\u5206\u7C7B\uFF1A\u8F93\u5165\u540D\u79F0");
          if (name) await this.library.ensureFolder(this.library.availablePath(file.path, name, ""));
        })
      );
    }
    if (kind === "category" && file instanceof import_obsidian10.TFolder) {
      menu.addItem(
        (i) => i.setTitle("\u65B0\u5EFA\u7A7A\u767D\u6587\u732E").setIcon("book-plus").setSection("action").onClick(() => void this.createPaper(file))
      );
    }
    if (kind === "paper" && file instanceof import_obsidian10.TFolder) {
      const st = this.library.getState(file);
      const s = this.settings;
      menu.addItem((i) => i.setTitle("\u6253\u5F00\u6587\u732E").setIcon("book-open-text").setSection("action").onClick(() => void this.papers.openPaper(file)));
      menu.addItem(
        (i) => i.setTitle("\u6253\u5F00\u6587\u732E\u4FE1\u606F").setIcon("info").setSection("action").onClick(async () => {
          const info = await this.papers.ensureInfo(file);
          await this.app.workspace.getLeaf(false).openFile(info);
        })
      );
      menu.addItem((i) => i.setTitle("\u8BC6\u522B\u6587\u732E\u4FE1\u606F\uFF08DOI / arXiv / \u6807\u9898\uFF09").setIcon("search").setSection("action").onClick(() => void this.metadata.detectInteractive(file)));
      if (this.library.has(st, s.ocr.sourceSlot)) {
        menu.addItem(
          (i) => i.setTitle(this.library.has(st, s.ocr.targetSlot) ? "\u91CD\u65B0\u8FD0\u884C PaddleOCR" : "\u8FD0\u884C PaddleOCR").setIcon("scan-text").setSection("action").onClick(() => void this.pipeline.runOcr(file))
        );
      }
      if (this.library.has(st, s.translate.sourceSlot)) {
        menu.addItem(
          (i) => i.setTitle(this.library.has(st, s.translate.targetSlot) ? "\u91CD\u65B0\u7FFB\u8BD1" : "\u7FFB\u8BD1").setIcon("languages").setSection("action").onClick(() => void this.pipeline.runTranslate(file))
        );
      }
      menu.addItem((i) => i.setTitle("\u6309\u547D\u540D\u4F18\u5148\u7EA7\u91CD\u547D\u540D").setIcon("text-cursor-input").setSection("action").onClick(() => void this.papers.syncName(file, true)));
    }
    if (kind === "paper-child" && file instanceof import_obsidian10.TFile && !this.library.isInfoFile(file)) {
      menu.addItem((i) => i.setTitle("\u8BBE\u7F6E\u4E3A\u6587\u732E\u7684\u54EA\u4E2A\u90E8\u5206\u2026").setIcon("tags").setSection("action").onClick(() => void this.importer.chooseRole(file)));
    }
  }
};
