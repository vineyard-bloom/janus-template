import { generateEndpointStubDefinitions } from "./generators/stubs/stub-generating"
import {
  EndpointDefinition,
  generateEndpointDefinitionsFromSchema
} from "./generators/parsing/endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./generators/types/typescript-type-generator"
import { generateEndpointActionsRequirements, writeAbstractClass } from "./generators/api-contract/api-contract-writer"
const requireDir = require("require-dir")

enum DirStructure {
  TYPES_TARGET = "/target/endpoint-types.d.ts",
  STUBS_TARGET = "/target/endpoint-stubs.ts",
  SCHEMA_SOURCE = "/endpoint-definitions",
  SCHEMA_HELPERS = "/generators/parsing/schema-validators.json",
  APICONTRACT_TARGET = "/target/api-contract.d.ts"
}

export function configureJsonSchemaGeneration(
  endpointSchemaDirectory = absolutePath(DirStructure.SCHEMA_SOURCE),
  schemaHelpersFile = absolutePath(DirStructure.SCHEMA_HELPERS),
  typesTargetFile = absolutePath(DirStructure.TYPES_TARGET),
  stubsTargetFile= absolutePath(DirStructure.STUBS_TARGET),
  apiContractTargetFile= absolutePath(DirStructure.APICONTRACT_TARGET)
){
  const configuredEndpointDefinitionsFromSchema = async () => generateEndpointDefinitionsFromSchema(endpointSchemaDirectory, schemaHelpersFile)
  const configuredCompileTsDefinitions = async (endpoints: EndpointDefinition[]) => generateTsEndpointTypeDefinitions(typesTargetFile, endpoints)
  const configuredCompileStubDefinitions = async (endpoints: EndpointDefinition[]) => generateEndpointStubDefinitions(stubsTargetFile, typesTargetFile, endpoints)
  const configuredRawSchema = async () => { return { endpoints: requireDir(endpointSchemaDirectory, {recurse: true}), helpers: require(schemaHelpersFile) } }
  const configuredCompileApiContract = async (endpoints: EndpointDefinition[]) => generateEndpointActionsRequirements(apiContractTargetFile, typesTargetFile, endpoints)

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

function absolutePath(dir: DirStructure): string {
    return `${__dirname}${dir}`
}