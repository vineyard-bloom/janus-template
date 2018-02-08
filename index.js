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
const directory_structure_1 = require("./config/directory-structure");
const requireDir = require("require-dir");
function configureJsonSchemaGeneration(projectRootDirectory = __dirname, currentRootDirectory = __dirname, directoryStructure = directory_structure_1.ConfiguredDirectoryStructure) {
    const { TYPES_TARGET, STUBS_TARGET, SCHEMA_SOURCE, SCHEMA_HELPERS, APICONTRACT_TARGET } = directory_structure_1.prependRootPaths(projectRootDirectory, currentRootDirectory, directoryStructure);
    const configuredEndpointDefinitionsFromSchema = () => __awaiter(this, void 0, void 0, function* () { return endpoint_schema_parsing_1.generateEndpointDefinitionsFromSchema(SCHEMA_SOURCE, SCHEMA_HELPERS); });
    const configuredCompileTsDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return typescript_type_generator_1.generateTsEndpointTypeDefinitions(TYPES_TARGET, endpoints); });
    const configuredCompileStubDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return stub_generating_1.generateEndpointStubDefinitions(STUBS_TARGET, TYPES_TARGET, endpoints); });
    const configuredRawSchema = () => __awaiter(this, void 0, void 0, function* () { return { endpoints: requireDir(SCHEMA_SOURCE, { recurse: true }), helpers: require(SCHEMA_HELPERS) }; });
    const configuredCompileApiContract = (endpoints) => __awaiter(this, void 0, void 0, function* () { return api_contract_writer_1.generateEndpointActionsRequirements(APICONTRACT_TARGET, TYPES_TARGET, endpoints); });
    return {
        getEndpointDefs: () => __awaiter(this, void 0, void 0, function* () { return yield configuredEndpointDefinitionsFromSchema(); }),
        compileAll: () => __awaiter(this, void 0, void 0, function* () {
            const endpointDefs = yield configuredEndpointDefinitionsFromSchema();
            yield configuredCompileTsDefinitions(endpointDefs);
            yield configuredCompileStubDefinitions(endpointDefs);
            yield configuredCompileApiContract(endpointDefs);
            return endpointDefs;
        })
    };
}
exports.configureJsonSchemaGeneration = configureJsonSchemaGeneration;
//# sourceMappingURL=index.js.map