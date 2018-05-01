#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
index_1.configureJsonSchemaGeneration().then(generator => generator.compileAll());
//# sourceMappingURL=compile-internal.js.map