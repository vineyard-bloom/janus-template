export interface DirectoryStructure {
  TYPES_TARGET: string,
  STUBS_TARGET: string,
  APICONTRACT_TARGET: string,

  SCHEMA_SOURCE: string,
  SCHEMA_HELPERS: string,
}

export const ConfiguredDirectoryStructure: DirectoryStructure = {
  TYPES_TARGET: "/endpoint-definitions-generated/endpoint-types.d.ts",
  STUBS_TARGET: "/endpoint-definitions-generated/endpoint-stubs.ts",
  APICONTRACT_TARGET: "/endpoint-definitions-generated/api-contract.d.ts",

  SCHEMA_SOURCE: "/endpoint-definitions",
  SCHEMA_HELPERS: "/schema-validation-helpers.json"
}

export function prependRootPaths(targetRootDirectory: string, endpointDefinitionsSourceDirectory: string, schemaHelpersDirectory: string, directoryStructure: DirectoryStructure): DirectoryStructure {
  return {
    TYPES_TARGET: prependPath(targetRootDirectory, directoryStructure.TYPES_TARGET),
    STUBS_TARGET: prependPath(targetRootDirectory, directoryStructure.STUBS_TARGET),
    APICONTRACT_TARGET: prependPath(targetRootDirectory, directoryStructure.APICONTRACT_TARGET),

    SCHEMA_SOURCE: prependPath(endpointDefinitionsSourceDirectory, directoryStructure.SCHEMA_SOURCE),
    SCHEMA_HELPERS: prependPath(schemaHelpersDirectory, directoryStructure.SCHEMA_HELPERS)
  }
}

function prependPath(prependDir: string, dir: string): string {
  return `${prependDir}${dir}`
}
