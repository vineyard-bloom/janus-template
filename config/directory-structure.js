"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguredDirectoryStructure = {
    TYPES_TARGET: "/endpoint-definitions-generated/endpoint-types.d.ts",
    STUBS_TARGET: "/endpoint-definitions-generated/endpoint-stubs.ts",
    APICONTRACT_TARGET: "/endpoint-definitions-generated/api-contract.d.ts",
    SCHEMA_SOURCE: "/endpoint-definitions",
    SCHEMA_HELPERS: "/schema-validation-helpers.json"
};
function prependRootPaths(targetRootDirectory, endpointDefinitionsSourceDirectory, schemaHelpersDirectory, directoryStructure) {
    return {
        TYPES_TARGET: prependPath(targetRootDirectory, directoryStructure.TYPES_TARGET),
        STUBS_TARGET: prependPath(targetRootDirectory, directoryStructure.STUBS_TARGET),
        APICONTRACT_TARGET: prependPath(targetRootDirectory, directoryStructure.APICONTRACT_TARGET),
        SCHEMA_SOURCE: prependPath(endpointDefinitionsSourceDirectory, directoryStructure.SCHEMA_SOURCE),
        SCHEMA_HELPERS: prependPath(schemaHelpersDirectory, directoryStructure.SCHEMA_HELPERS)
    };
}
exports.prependRootPaths = prependRootPaths;
function prependPath(prependDir, dir) {
    return `${prependDir}${dir}`;
}
//# sourceMappingURL=directory-structure.js.map