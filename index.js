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
const stub_function_writer_1 = require("./src/stubs/stub-function-writer");
const endpoint_schema_parsing_1 = require("./src/endpoint-schema-parsing");
const typescript_type_writer_1 = require("./src/types/typescript-type-writer");
const api_contract_writer_1 = require("./src/api-contract/api-contract-writer");
const api_stub_writer_1 = require("./src/stubs/api-stub-writer");
const requireDir = require("require-dir");
const API_CONTRACT_NAME = "ApiContract";
function configureJsonSchemaGeneration(targetDirectory, sourceDirectory, schemaDefinitionsJSON) {
    const endpointTypesFile = targetDirectory + "/endpoint-types.ts";
    const endpointStubsFile = targetDirectory + "/endpoint-stubs.ts";
    const apiContractFile = targetDirectory + "/api-contract.ts";
    const apiStubFile = targetDirectory + "/api-stub.ts";
    const endpointDefinitions = endpoint_schema_parsing_1.extractEndpointDefinitionsFromSchema(sourceDirectory, schemaDefinitionsJSON);
    const rawSchema = { endpoints: requireDir(sourceDirectory, { recurse: true }), schemaDefinitions: schemaDefinitionsJSON };
    const typescriptTypeWriter = new typescript_type_writer_1.TypescriptTypeWriter(endpointTypesFile);
    const apiActionsWriter = new api_contract_writer_1.ApiContractWriter(apiContractFile, endpointTypesFile, API_CONTRACT_NAME);
    const apiStubWriter = new api_stub_writer_1.ApiStubWriter(apiStubFile, endpointStubsFile, apiContractFile, API_CONTRACT_NAME);
    const stubFunctionsWrite = new stub_function_writer_1.StubFunctionWriter(endpointStubsFile, endpointTypesFile);
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
//# sourceMappingURL=index.js.map