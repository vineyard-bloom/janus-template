"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const import_writing_helpers_1 = require("../import-writing-helpers");
function writeStubGeneratorsPrefix(targetFile, typeRequirements) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFileSync(targetFile, "");
        yield import_writing_helpers_1.writeImports(targetFile, typeRequirements);
        yield fs.appendFileSync(targetFile, "\nconst jsf = require('json-schema-faker')\n");
        yield fs.appendFileSync(targetFile, "jsf.extend('faker', function() {\n" +
            "  return require('faker')\n" +
            "})");
    });
}
exports.writeStubGeneratorsPrefix = writeStubGeneratorsPrefix;
function writeRequestResponseStubFunctions(targetFile, requestStubFunction, responseStubFunction, title) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.appendFileSync(targetFile, "\n\n/************************ -- " + title + " -- *****************************/");
        yield fs.appendFileSync(targetFile, requestStubFunction);
        yield fs.appendFileSync(targetFile, responseStubFunction);
    });
}
exports.writeRequestResponseStubFunctions = writeRequestResponseStubFunctions;
//# sourceMappingURL=stub-file-writer.js.map