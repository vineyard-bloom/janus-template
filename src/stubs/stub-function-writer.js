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
const file_formatting_writing_helpers_1 = require("../file-formatting-writing-helpers");
const fs = require("fs");
class StubFunctionWriter {
    constructor(stubFunctionsFile, typesFile) {
        this.stubFunctionsFile = stubFunctionsFile;
        this.typesFile = typesFile;
    }
    writeFile(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFileSync(this.stubFunctionsFile, "");
            const importTypes = file_formatting_writing_helpers_1.importStatment(file_formatting_writing_helpers_1.relativePath(this.typesFile), endpointDefinitions.reduce((acc, def) => [...acc, def.requestTypeName, def.responseTypeName], []));
            yield fs.appendFileSync(this.stubFunctionsFile, importTypes);
            yield fs.appendFileSync(this.stubFunctionsFile, StubFunctionWriter.prefix);
            for (let i in endpointDefinitions) {
                const stubFunctions = formatRequestResponseStubFunctions(endpointDefinitions[i]);
                yield fs.appendFileSync(this.stubFunctionsFile, stubFunctions);
            }
        });
    }
}
StubFunctionWriter.prefix = "\nconst jsf = require('json-schema-faker')\n" +
    "jsf.extend('faker', function() {\n" +
    "  return require('faker')\n" +
    "})";
exports.StubFunctionWriter = StubFunctionWriter;
function formatRequestResponseStubFunctions(endpointDefinition) {
    const { title, request, response, requestTypeName, responseTypeName } = endpointDefinition;
    const writeableTitle = formatStubFunctionName(title);
    const requestStub = formatStubFunction(writeableTitle + "RequestData", request, requestTypeName + "['data']");
    const responseStub = formatStubFunction(writeableTitle + "Response", response, responseTypeName);
    return "\n\n/************************ -- " + title + " -- *****************************/\n" +
        requestStub + "\n" +
        responseStub;
}
function formatStubFunction(title, schema, returnTypeName) {
    return `\n
export async function ${title}Stub(): Promise<${returnTypeName}> {
  return jsf.resolve(${JSON.stringify(schema).replace(/"/g, '\'')})
}`;
}
function formatStubFunctionName(title) {
    const noWhiteSpace = title.replace(" ", "").replace("\n", "").replace("\t", "");
    return noWhiteSpace.charAt(0).toLowerCase() + noWhiteSpace.slice(1);
}
//# sourceMappingURL=stub-function-writer.js.map