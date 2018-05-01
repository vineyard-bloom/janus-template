import { generateEndpointStubDefinitions } from "./generators/stubs/stub-generating"
import { EndpointDefinition, generateEndpointDefinitionsFromSchema } from "./generators/parsing/endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./generators/types/typescript-type-generator"
import { generateEndpointActionsRequirements } from "./generators/api-contract/api-contract-writer"
const requireDir = require("require-dir")

export { EndpointDefinition } from "./generators/parsing/endpoint-schema-parsing"

export async function configureJsonSchemaGeneration(
  generatedEndpointDefinitionsDirectory = __dirname + "/endpoint-definitions-generated",
  endpointDefinitionsSourceDirectory = __dirname + "/endpoint-definitions",
  schemaHelpersPath = __dirname + "/schema-validation-helpers.json"
){
  const endpointTypesFile = generatedEndpointDefinitionsDirectory + "/endpoint-types.ts"
  const endpointStubsFile = generatedEndpointDefinitionsDirectory + "/endpoint-stubs.ts"
  const apiContractFile = generatedEndpointDefinitionsDirectory + "/api-contract.ts"


  const configuredEndpointDefinitionsFromSchema = async () => generateEndpointDefinitionsFromSchema(endpointDefinitionsSourceDirectory, schemaHelpersPath)
  const configuredCompileTsDefinitions = async (endpoints: EndpointDefinition[]) => generateTsEndpointTypeDefinitions(endpointTypesFile, endpoints)
  const configuredCompileStubDefinitions = async (endpoints: EndpointDefinition[]) => generateEndpointStubDefinitions(endpointStubsFile, endpointTypesFile, endpoints)
  const configuredRawSchema = async () => { return { endpoints: requireDir(endpointDefinitionsSourceDirectory, {recurse: true}), helpers: require(schemaHelpersPath) } }
  const configuredCompileApiContract = async (endpoints: EndpointDefinition[]) => generateEndpointActionsRequirements(apiContractFile, endpointTypesFile, endpoints)

  const endpointDefinitions = await configuredEndpointDefinitionsFromSchema()

  return {
    endpointDefinitions,
    rawSchema: configuredRawSchema,
    compileAll: async () => {
      await configuredCompileTsDefinitions(endpointDefinitions)
      await configuredCompileStubDefinitions(endpointDefinitions)
      await configuredCompileApiContract(endpointDefinitions)
    }
  }
}

