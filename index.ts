import { StubFunctionWriter } from "./src/stubs/stub-function-writer"
import { EndpointDefinition, extractEndpointDefinitionsFromSchema } from "./src/endpoint-schema-parsing"
import { TypescriptTypeWriter } from "./src/types/typescript-type-writer"
import { ApiContractWriter } from './src/api-contract/api-contract-writer'
import { ApiStubWriter } from './src/stubs/api-stub-writer'
import { DEFAULT_NAMING_CONVENTIONS, FileNamingConventions, NamingConventions } from './naming-conventions'

const requireDir = require("require-dir")

export { EndpointDefinition } from "./src/endpoint-schema-parsing"

export function configureJsonSchemaGeneration(
  targetDirectory: string,
  sourceDirectory: string,
  schemaDefinitionsJSON: object,
  namingConventions: NamingConventions = DEFAULT_NAMING_CONVENTIONS
): {
  endpointDefinitions: EndpointDefinition[],
  rawSchema: {endpoints: object, schemaDefinitions: object},
  compileAll: () => Promise<void>
}{
  const { apiStubConstName, apiContractInterfaceName, ...fileNames } = namingConventions
  const { typescriptTypeFile, stubFunctionsFile, apiStubFile, apiContractFile } = fullFilePaths(targetDirectory, fileNames)

  const typescriptTypeWriter = new TypescriptTypeWriter(typescriptTypeFile)
  const apiActionsWriter = new ApiContractWriter(apiContractFile, typescriptTypeFile, apiContractInterfaceName)
  const apiStubWriter = new ApiStubWriter(apiStubFile, stubFunctionsFile, apiContractFile, apiContractInterfaceName, apiStubConstName)
  const stubFunctionsWrite = new StubFunctionWriter(stubFunctionsFile, typescriptTypeFile)

  const endpointDefinitions = extractEndpointDefinitionsFromSchema(sourceDirectory, schemaDefinitionsJSON)
  const rawSchema = { endpoints: requireDir(sourceDirectory, {recurse: true}), schemaDefinitions: schemaDefinitionsJSON }

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

function fullFilePaths(targetDirectory: string, fileNamingConventions: FileNamingConventions):
  {
    typescriptTypeFile: string
    stubFunctionsFile: string
    apiContractFile: string
    apiStubFile: string
  }{
  return {
    typescriptTypeFile: targetDirectory + '/' + fileNamingConventions.typescriptTypeFileName,
    stubFunctionsFile: targetDirectory + '/' + fileNamingConventions.stubFunctionsFileName,
    apiContractFile: targetDirectory + '/' + fileNamingConventions.apiContractFileName,
    apiStubFile: targetDirectory + '/' + fileNamingConventions.apiStubFileName
  }
}