import { generateApiStub, generateEndpointStubDefinitions } from "./generators/stubs/stub-generating"
import { EndpointDefinition, generateEndpointDefinitionsFromSchema } from "./generators/endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./generators/types/typescript-type-generator"
import { generateEndpointActionsRequirements } from "./generators/api-contract/api-contract-writer"
const requireDir = require("require-dir")

export { EndpointDefinition } from "./generators/endpoint-schema-parsing"

export function configureJsonSchemaGeneration(
  targetDirectory: string,
  sourceDirectory: string,
  schemaDefinitionsJSON: object
): {
  endpointDefinitions: EndpointDefinition[],
  rawSchema: {endpoints: object, schemaDefinitions: object},
  compileAll: () => Promise<void>
}{
  const endpointTypesFile = targetDirectory + "/endpoint-types.ts"
  const endpointStubsFile = targetDirectory + "/endpoint-stubs.ts"
  const apiContractFile = targetDirectory + "/api-contract.ts"
  const apiStubFile = targetDirectory + "/api-stub.ts"

  const endpointDefinitions = generateEndpointDefinitionsFromSchema(sourceDirectory, schemaDefinitionsJSON)
  const rawSchema = { endpoints: requireDir(sourceDirectory, {recurse: true}), schemaDefinitions: schemaDefinitionsJSON }

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
