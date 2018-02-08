#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("./index");
const root_directory_sensor_1 = require("./utility/root-directory-sensor");
index_1.configureJsonSchemaGeneration(root_directory_sensor_1.getRootPath()).compileAll();
//# sourceMappingURL=run-all.js.map