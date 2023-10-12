globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { a as defineEventHandler } from './nitro/node-server.mjs';
import { fileURLToPath } from 'url';
import * as path from 'path';
import * as fs from 'fs';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'ipx';

const ls_get = defineEventHandler((event) => {
  let errors = [];
  let tree = "";
  let errormsg = "";
  try {
    const treeData = lstree("/home");
    errors = treeData.errors;
    tree = treeData.treeString;
  } catch (error) {
    errormsg = JSON.stringify(error);
  }
  const filename = fileURLToPath(new URL(globalThis._importMeta_.url));
  const dirname = path.dirname(fileURLToPath(new URL(globalThis._importMeta_.url)));
  return {
    errormsg,
    filename,
    dirname,
    tree,
    errors
  };
});
function lstree(dir, indent = "", stringBuffer = [], errors = []) {
  try {
    const files = fs.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path.join(dir, file);
      let isDirectory = false;
      try {
        isDirectory = fs.statSync(filePath).isDirectory();
      } catch (err) {
        errors.push({ path: filePath, message: JSON.stringify(err) });
      }
      stringBuffer.push(indent + file + "\n");
      if (isDirectory) {
        lstree(filePath, indent + " ", stringBuffer, errors);
      }
    });
  } catch (err) {
    errors.push({ path: dir, message: JSON.stringify(err) });
  }
  return { treeString: stringBuffer.join(""), errors };
}

export { ls_get as default };
//# sourceMappingURL=ls.get.mjs.map
