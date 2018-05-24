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
const json_schema_to_typescript_formatter_1 = require("./json-schema-to-typescript-formatter");
const file_formatting_writing_helpers_1 = require("../file-formatting-writing-helpers");
const fs = require("fs");
class TypescriptTypeWriter {
    constructor(typesFile) {
        this.typesFile = typesFile;
    }
    writeFile(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFileSync(this.typesFile, TypescriptTypeWriter.prefix);
            const typeDefs = yield typeDefinitions(endpointDefinitions);
            yield Promise.all(typeDefs.map((def) => __awaiter(this, void 0, void 0, function* () {
                yield fs.appendFileSync(this.typesFile, formatDefinitionForWriting(def));
            })));
        });
    }
}
TypescriptTypeWriter.prefix = "import { Request } from 'vineyard-lawn'\n\n" + json_schema_to_typescript_formatter_1.jsonSchema2TsAutoGeneratedText;
exports.TypescriptTypeWriter = TypescriptTypeWriter;
function formatDefinitionForWriting(typeDefinition) {
    const { requestTsDef, responseTsDef, title } = typeDefinition;
    return "\n\n/************************ -- " + title + " -- *****************************/\n" +
        requestTsDef + "\n" +
        responseTsDef;
}
function typeDefinitions(endpointDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield Promise.all(endpointDefinitions.map((endpointDef) => __awaiter(this, void 0, void 0, function* () {
            const { request, requestTypeName, response, responseTypeName, title } = endpointDef;
            return {
                requestTsDef: yield json_schema_to_typescript_formatter_1.parseJson2Ts(request, requestTypeName, "Request", "data").then(def => file_formatting_writing_helpers_1.replaceAll(def, ";")),
                responseTsDef: yield json_schema_to_typescript_formatter_1.parseJson2Ts(response, responseTypeName).then(def => file_formatting_writing_helpers_1.replaceAll(def, ";")),
                title: title
            };
        })));
    });
}
//# sourceMappingURL=typescript-type-writer.js.map