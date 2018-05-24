import { StubFunctionWriter } from "./src/stubs/stub-function-writer"
import { EndpointDefinition, extractEndpointDefinitionsFromSchema } from "./src/endpoint-schema-parsing"
import { TypescriptTypeWriter } from "./src/types/typescript-type-writer"
import { ApiContractWriter } from './src/api-contract/api-contract-writer'
import { ApiStubWriter } from './src/stubs/api-stub-writer'

const requireDir = require("require-dir")

export { EndpointDefinition } from "./src/endpoint-schema-parsing"

const API_CONTRACT_NAME = "ApiContract"

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


  const typescriptTypeWriter = new TypescriptTypeWriter(endpointTypesFile)
  const apiActionsWriter = new ApiContractWriter(apiContractFile, endpointTypesFile, API_CONTRACT_NAME)
  const apiStubWriter = new ApiStubWriter(apiStubFile, endpointStubsFile, apiContractFile, API_CONTRACT_NAME)
  const stubFunctionsWrite = new StubFunctionWriter(endpointStubsFile, endpointTypesFile)

  return {
    endpointDefinitions,
    rawSchema,
    compileAll: async () => {
      await typescriptTypeWriter.writeFile(endpointDefinitions)
      await stubFunctionsWrite.writeFile(endpointDefinitions)
      await apiActionsWriter.writeFile(endpointDefinitions)
      await apiStubWriter.writeFile(endpointDefinitions)
    }
  }
}
