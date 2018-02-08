import { generateEndpointStubDefinitions } from "./generators/stubs/stub-generating"
import {
  EndpointDefinition,
  generateEndpointDefinitionsFromSchema
} from "./generators/parsing/endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./generators/types/typescript-type-generator"
import { generateEndpointActionsRequirements, writeAbstractClass } from "./generators/api-contract/api-contract-writer"
import { ConfiguredDirectoryStructure, DirectoryStructure, prependRootPaths } from "./config/directory-structure"

const requireDir = require("require-dir")

export function configureJsonSchemaGeneration(
  projectRootDirectory = __dirname,
  currentRootDirectory = __dirname,
  directoryStructure: DirectoryStructure = ConfiguredDirectoryStructure,
){
  const {
    TYPES_TARGET,
    STUBS_TARGET,
    SCHEMA_SOURCE,
    SCHEMA_HELPERS,
    APICONTRACT_TARGET
  } = prependRootPaths(projectRootDirectory, currentRootDirectory, directoryStructure)

  const configuredEndpointDefinitionsFromSchema = async () => generateEndpointDefinitionsFromSchema(SCHEMA_SOURCE, SCHEMA_HELPERS)
  const configuredCompileTsDefinitions = async (endpoints: EndpointDefinition[]) => generateTsEndpointTypeDefinitions(TYPES_TARGET, endpoints)
  const configuredCompileStubDefinitions = async (endpoints: EndpointDefinition[]) => generateEndpointStubDefinitions(STUBS_TARGET, TYPES_TARGET, endpoints)
  const configuredRawSchema = async () => { return { endpoints: requireDir(SCHEMA_SOURCE, {recurse: true}), helpers: require(SCHEMA_HELPERS) } }
  const configuredCompileApiContract = async (endpoints: EndpointDefinition[]) => generateEndpointActionsRequirements(APICONTRACT_TARGET, TYPES_TARGET, endpoints)

  return {
    getEndpointDefs: async () => await configuredEndpointDefinitionsFromSchema(),
    compileAll: async () => {
      const endpointDefs = await configuredEndpointDefinitionsFromSchema()
      await configuredCompileTsDefinitions(endpointDefs)
      await configuredCompileStubDefinitions(endpointDefs)
      await configuredCompileApiContract(endpointDefs)
      return endpointDefs
    }
  }
}


