"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const targetDirectory = __dirname + "/generated";
const sourceDirectory = __dirname + "/endpoint-schema-definitions";
const schemaDefinitionsJSON = require(__dirname + "/schema-validation-helpers.json");
index_1.configureJsonSchemaGeneration(targetDirectory, sourceDirectory, schemaDefinitionsJSON).compileAll();
//# sourceMappingURL=compile-schema-test.js.map