"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfiguredDirectoryStructure = {
    TYPES_TARGET: "/target/endpoint-types.d.ts",
    STUBS_TARGET: "/target/endpoint-stubs.ts",
    APICONTRACT_TARGET: "/target/api-contract.d.ts",
    SCHEMA_SOURCE: "/endpoint-definitions",
    SCHEMA_HELPERS: "/generators/parsing/schema-validators.json"
};
function prependRootPaths(projectPath, rootPath, directoryStructure) {
    return {
        TYPES_TARGET: prependPath(projectPath, directoryStructure.TYPES_TARGET),
        STUBS_TARGET: prependPath(projectPath, directoryStructure.STUBS_TARGET),
        APICONTRACT_TARGET: prependPath(projectPath, directoryStructure.APICONTRACT_TARGET),
        SCHEMA_SOURCE: prependPath(rootPath, directoryStructure.SCHEMA_SOURCE),
        SCHEMA_HELPERS: prependPath(rootPath, directoryStructure.SCHEMA_HELPERS)
    };
}
exports.prependRootPaths = prependRootPaths;
function prependPath(prependDir, dir) {
    return `${prependDir}${dir}`;
}
//# sourceMappingURL=directory-structure.js.map