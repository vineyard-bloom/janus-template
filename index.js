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
var DirStructure;
(function (DirStructure) {
    DirStructure["TYPES_TARGET"] = "../target/endpoint-types.d.ts";
    DirStructure["STUBS_TARGET"] = "../target/endpoint-stubs.ts";
    DirStructure["SCHEMA_SOURCE"] = "/endpoint-definitions";
    DirStructure["SCHEMA_HELPERS"] = "/generators/parsing/schema-validators.json";
    DirStructure["APICONTRACT_TARGET"] = "../target/api-contract.d.ts";
})(DirStructure || (DirStructure = {}));
function configureJsonSchemaGeneration(endpointSchemaDirectory = absolutePath(DirStructure.SCHEMA_SOURCE), schemaHelpersFile = absolutePath(DirStructure.SCHEMA_HELPERS), typesTargetFile = absolutePath(DirStructure.TYPES_TARGET), stubsTargetFile = absolutePath(DirStructure.STUBS_TARGET), apiContractTargetFile = absolutePath(DirStructure.APICONTRACT_TARGET)) {
    const configuredEndpointDefinitionsFromSchema = () => __awaiter(this, void 0, void 0, function* () { return endpoint_schema_parsing_1.generateEndpointDefinitionsFromSchema(endpointSchemaDirectory, schemaHelpersFile); });
    const configuredCompileTsDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return typescript_type_generator_1.generateTsEndpointTypeDefinitions(typesTargetFile, endpoints); });
    const configuredCompileStubDefinitions = (endpoints) => __awaiter(this, void 0, void 0, function* () { return stub_generating_1.generateEndpointStubDefinitions(stubsTargetFile, typesTargetFile, endpoints); });
    const configuredRawSchema = () => __awaiter(this, void 0, void 0, function* () { return { endpoints: requireDir(endpointSchemaDirectory, { recurse: true }), helpers: require(schemaHelpersFile) }; });
    const configuredCompileApiContract = (endpoints) => __awaiter(this, void 0, void 0, function* () { return api_contract_writer_1.generateEndpointActionsRequirements(apiContractTargetFile, typesTargetFile, endpoints); });
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
function absolutePath(dir) {
    return `${__dirname}${dir}`;
}
//# sourceMappingURL=index.js.map