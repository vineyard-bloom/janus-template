import { generateApiStub, generateEndpointStubDefinitions } from "./generators/stubs/stub-generating"
import { EndpointDefinition, generateEndpointDefinitionsFromSchema } from "./generators/endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./generators/types/typescript-type-generator"
import { generateEndpointActionsRequirements } from "./generators/api-contract/api-contract-writer"
const requireDir = require("require-dir")

export { EndpointDefinition } from "./generators/endpoint-schema-parsing"

export function configureJsonSchemaGeneration(
  generatedEndpointDefinitionsDirectory = __dirname + "/endpoint-definitions-generated",
  endpointDefinitionsSourceDirectory = __dirname + "/endpoint-definitions",
  schemaHelpersPath = __dirname + "/schema-validation-helpers.json"
): {endpointDefinitions: EndpointDefinition[], rawSchema: {endpoints: any, helpers: any}, compileAll: () => Promise<void>}  {
  const endpointTypesFile = generatedEndpointDefinitionsDirectory + "/endpoint-types.ts"
  const endpointStubsFile = generatedEndpointDefinitionsDirectory + "/endpoint-stubs.ts"
  const apiContractFile = generatedEndpointDefinitionsDirectory + "/api-contract.ts"
  const apiStubFile = generatedEndpointDefinitionsDirectory + "/api-stub.ts"

  const endpointDefinitions = generateEndpointDefinitionsFromSchema(endpointDefinitionsSourceDirectory, schemaHelpersPath)
  const rawSchema = { endpoints: requireDir(endpointDefinitionsSourceDirectory, {recurse: true}), helpers: require(schemaHelpersPath) }

  return {
    endpointDefinitions,
    rawSchema,
    compileAll: async () => {
      await generateTsEndpointTypeDefinitions(endpointTypesFile, endpointDefinitions)
      await generateEndpointStubDefinitions(endpointStubsFile, endpointTypesFile, endpointDefinitions)
      await generateEndpointActionsRequirements(apiContractFile, endpointTypesFile, endpointDefinitions)
      await generateApiStub(apiStubFile, endpointStubsFile, apiContractFile, endpointDefinitions)
    }
  }
}

