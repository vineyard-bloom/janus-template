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
const stub_generating_1 = require("./generators/stubs/stub-generating");
const endpoint_schema_parsing_1 = require("./generators/parsing/endpoint-schema-parsing");
const typescript_type_generator_1 = require("./generators/types/typescript-type-generator");
const api_contract_writer_1 = require("./generators/api-contract/api-contract-writer");
const requireDir = require("require-dir");
function configureJsonSchemaGeneration(generatedEndpointDefinitionsDirectory = __dirname + "/endpoint-definitions-generated", endpointDefinitionsSourceDirectory = __dirname + "/endpoint-definitions", schemaHelpersPath = __dirname + "/schema-validation-helpers.json") {
    return __awaiter(this, void 0, void 0, function* () {
        const endpointTypesFile = generatedEndpointDefinitionsDirectory + "/endpoint-types.ts";
        const endpointStubsFile = generatedEndpointDefinitionsDirectory + "/endpoint-stubs.ts";
        const apiContractFile = generatedEndpointDefinitionsDirectory + "/api-contract.ts";
        const configuredEndpointDefinitionsFromSchema = () => __awaiter(this, void 0, void 0, function* () { return endpoint_schema_parsing_1.generateEndpointDefinitionsFromSchema(endpointDefinitionsSourceDirectory, schemaHelpersPath); });
        const configuredCompileTsDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return typescript_type_generator_1.generateTsEndpointTypeDefinitions(endpointTypesFile, endpoints); });
        const configuredCompileStubDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return stub_generating_1.generateEndpointStubDefinitions(endpointStubsFile, endpointTypesFile, endpoints); });
        const configuredRawSchema = () => __awaiter(this, void 0, void 0, function* () { return { endpoints: requireDir(endpointDefinitionsSourceDirectory, { recurse: true }), helpers: require(schemaHelpersPath) }; });
        const configuredCompileApiContract = (endpoints) => __awaiter(this, void 0, void 0, function* () { return api_contract_writer_1.generateEndpointActionsRequirements(apiContractFile, endpointTypesFile, endpoints); });
        const endpointDefinitions = yield configuredEndpointDefinitionsFromSchema();
        return {
            endpointDefinitions,
            rawSchema: configuredRawSchema,
            compileAll: () => __awaiter(this, void 0, void 0, function* () {
                yield configuredCompileTsDefinitions(endpointDefinitions);
                yield configuredCompileStubDefinitions(endpointDefinitions);
                yield configuredCompileApiContract(endpointDefinitions);
            })
        };
    });
}
exports.configureJsonSchemaGeneration = configureJsonSchemaGeneration;
//# sourceMappingURL=index.js.map