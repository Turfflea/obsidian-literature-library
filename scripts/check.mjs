import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
const versions = JSON.parse(await readFile(new URL("versions.json", root), "utf8"));
const source = await readFile(new URL("src/main.js", root), "utf8");
assert.match(manifest.id, /^[a-z0-9]+(?:-[a-z0-9]+)*$/);
assert.ok(!manifest.id.includes("obsidian"));
assert.match(manifest.version, /^\d+\.\d+\.\d+$/);
assert.equal(pkg.version, manifest.version);
assert.equal(versions[manifest.version], manifest.minAppVersion);
assert.ok(manifest.description.length <= 250 && manifest.description.endsWith("."));
assert.equal(typeof manifest.isDesktopOnly, "boolean");
assert.ok(source.includes('const title = this.frontmatter(state.info)?.title;'));
assert.ok(source.includes('apiUrl: ""'));
for (const file of ["README.md", "LICENSE", "manifest.json", "styles.css", "src/main.js"]) {
  const data = await readFile(new URL(file, root));
  assert.ok(data.length > 0, `${file} must not be empty.`);
  assert.notEqual(data.subarray(0, 3).toString("hex"), "efbbbf", `${file} must use UTF-8 without BOM.`);
}
console.log("Manifest, required files, title naming, and release defaults checked.");
