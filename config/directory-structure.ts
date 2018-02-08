export interface DirectoryStructure {
  TYPES_TARGET: string,
  STUBS_TARGET: string,
  APICONTRACT_TARGET: string,

  SCHEMA_SOURCE: string,
  SCHEMA_HELPERS: string,
}

export const ConfiguredDirectoryStructure: DirectoryStructure = {
  TYPES_TARGET: "/target/endpoint-types.d.ts",
  STUBS_TARGET: "/target/endpoint-stubs.ts",
  APICONTRACT_TARGET: "/target/api-contract.d.ts",

  SCHEMA_SOURCE: "/endpoint-definitions",
  SCHEMA_HELPERS: "/generators/parsing/schema-validators.json"
}

export function prependRootPaths(projectPath: string, rootPath: string, directoryStructure: DirectoryStructure): DirectoryStructure {
  return {
    TYPES_TARGET: prependPath(projectPath, directoryStructure.TYPES_TARGET),
    STUBS_TARGET: prependPath(projectPath, directoryStructure.STUBS_TARGET),
    APICONTRACT_TARGET: prependPath(projectPath, directoryStructure.APICONTRACT_TARGET),

    SCHEMA_SOURCE: prependPath(rootPath, directoryStructure.SCHEMA_SOURCE),
    SCHEMA_HELPERS: prependPath(rootPath, directoryStructure.SCHEMA_HELPERS)
  }
}

function prependPath(prependDir: string, dir: string): string {
  return `${prependDir}${dir}`
}
