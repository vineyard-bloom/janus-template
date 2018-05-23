import { generateApiStub, generateEndpointStubDefinitions } from "./stubs/stub-generating"
import { EndpointDefinition, extractEndpointDefinitionsFromSchema } from "./endpoint-schema-parsing"
import { generateTsEndpointTypeDefinitions } from "./types/typescript-type-generator"
import { ApiContractWriter } from './api-contract/api-contract-writer'

const requireDir = require("require-dir")

export { EndpointDefinition } from "./endpoint-schema-parsing"

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

  const endpointDefinitions = extractEndpointDefinitionsFromSchema(sourceDirectory, schemaDefinitionsJSON)
  const rawSchema = { endpoints: requireDir(sourceDirectory, {recurse: true}), schemaDefinitions: schemaDefinitionsJSON }

  const apiActionsWriter = new ApiContractWriter(apiContractFile, endpointTypesFile)

  return {
    endpointDefinitions,
    rawSchema,
    compileAll: async () => {
      await generateTsEndpointTypeDefinitions(endpointTypesFile, endpointDefinitions)
      await generateEndpointStubDefinitions(endpointStubsFile, endpointTypesFile, endpointDefinitions)
      await apiActionsWriter.writeApiContract(endpointDefinitions)
      await generateApiStub(apiStubFile, endpointStubsFile, apiContractFile, endpointDefinitions)
    }
  }
}
