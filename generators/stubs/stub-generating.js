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
const stub_file_writer_1 = require("./stub-file-writer");
const file_formatting_writing_helpers_1 = require("../file-formatting-writing-helpers");
function generateEndpointStubDefinitions(targetFile, typesFile, endpointDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        const imports = file_formatting_writing_helpers_1.mapEndpointDefinitionsToImports(typesFile, endpointDefinitions);
        yield stub_file_writer_1.writeStubGeneratorsPrefix(targetFile, imports);
        for (let i in endpointDefinitions) {
            const { requestStub, responseStub, title } = mapEndpointDefinitionToStubDefs(endpointDefinitions[i]);
            yield stub_file_writer_1.writeRequestResponseStubFunctions(targetFile, requestStub, responseStub, title);
        }
        return endpointDefinitions;
    });
}
exports.generateEndpointStubDefinitions = generateEndpointStubDefinitions;
function mapEndpointDefinitionToStubDefs(endpointDefinition) {
    const { title, request, response, requestTypeName, responseTypeName } = endpointDefinition;
    const writeableTitle = formatStubFunctionName(title);
    const requestStub = formatStubFunction(writeableTitle + "RequestData", request, requestTypeName + "['data']");
    const responseStub = formatStubFunction(writeableTitle + "Response", response, responseTypeName);
    return { requestStub, responseStub, title };
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
//# sourceMappingURL=stub-generating.js.map