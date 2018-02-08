#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
if (process.argv.length < 3) {
    throw new Error("Need to pass in current path as argument!");
}
const projectPath = process.argv[2];
index_1.configureJsonSchemaGeneration(projectPath).compileAll();
//# sourceMappingURL=run-all.js.map