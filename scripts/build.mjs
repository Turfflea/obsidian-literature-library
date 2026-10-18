import { copyFile, mkdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const manifest = JSON.parse(await readFile(new URL("manifest.json", root), "utf8"));
const pkg = JSON.parse(await readFile(new URL("package.json", root), "utf8"));
if (manifest.version !== pkg.version) throw new Error("Package and manifest versions must match.");
await mkdir(new URL("dist/", root), { recursive: true });
await copyFile(new URL("src/plugin.js", root), new URL("main.js", root));
for (const file of ["main.js", "manifest.json", "styles.css"]) {
  await copyFile(new URL(file, root), new URL(`dist/${file}`, root));
}
console.log(`Built ${manifest.id} ${manifest.version}: ${fileURLToPath(new URL("dist/", root))}`);
