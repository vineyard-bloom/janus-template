"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const stub_function_writer_1 = require("./src/stubs/stub-function-writer");
const endpoint_schema_parsing_1 = require("./src/endpoint-schema-parsing");
const typescript_type_writer_1 = require("./src/types/typescript-type-writer");
const api_contract_writer_1 = require("./src/api-contract/api-contract-writer");
const api_stub_writer_1 = require("./src/stubs/api-stub-writer");
const naming_conventions_1 = require("./naming-conventions");
const requireDir = require("require-dir");
function configureJsonSchemaGeneration(targetDirectory, sourceDirectory, schemaDefinitionsJSON, namingConventions = naming_conventions_1.DEFAULT_NAMING_CONVENTIONS) {
    const { apiStubConstName, apiContractInterfaceName } = namingConventions, fileNames = __rest(namingConventions, ["apiStubConstName", "apiContractInterfaceName"]);
    const { typescriptTypeFile, stubFunctionsFile, apiStubFile, apiContractFile } = fullFilePaths(targetDirectory, fileNames);
    const typescriptTypeWriter = new typescript_type_writer_1.TypescriptTypeWriter(typescriptTypeFile);
    const apiActionsWriter = new api_contract_writer_1.ApiContractWriter(apiContractFile, typescriptTypeFile, apiContractInterfaceName);
    const apiStubWriter = new api_stub_writer_1.ApiStubWriter(apiStubFile, stubFunctionsFile, apiContractFile, apiContractInterfaceName, apiStubConstName);
    const stubFunctionsWrite = new stub_function_writer_1.StubFunctionWriter(stubFunctionsFile, typescriptTypeFile);
    const endpointDefinitions = endpoint_schema_parsing_1.extractEndpointDefinitionsFromSchema(sourceDirectory, schemaDefinitionsJSON);
    const rawSchema = { endpoints: requireDir(sourceDirectory, { recurse: true }), schemaDefinitions: schemaDefinitionsJSON };
    return {
        endpointDefinitions,
        rawSchema,
        compileAll: () => __awaiter(this, void 0, void 0, function* () {
            yield typescriptTypeWriter.writeFile(endpointDefinitions);
            yield stubFunctionsWrite.writeFile(endpointDefinitions);
            yield apiActionsWriter.writeFile(endpointDefinitions);
            yield apiStubWriter.writeFile(endpointDefinitions);
        })
    };
}
exports.configureJsonSchemaGeneration = configureJsonSchemaGeneration;
function fullFilePaths(targetDirectory, fileNamingConventions) {
    return {
        typescriptTypeFile: targetDirectory + '/' + fileNamingConventions.typescriptTypeFileName,
        stubFunctionsFile: targetDirectory + '/' + fileNamingConventions.stubFunctionsFileName,
        apiContractFile: targetDirectory + '/' + fileNamingConventions.apiContractFileName,
        apiStubFile: targetDirectory + '/' + fileNamingConventions.apiStubFileName
    };
}
//# sourceMappingURL=index.js.map