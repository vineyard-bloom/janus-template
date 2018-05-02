import {
  EndpointDefinition
} from "../parsing/endpoint-schema-parsing"
import { writeRequestResponseStubFunctions, writeStubGeneratorsPrefix } from "./stub-file-writer"
import { mapEndpointDefinitionsToImports, replaceAll } from "../file-formatting-writing-helpers"

export async function generateEndpointStubDefinitions (targetFile: string, typesFile : string, endpointDefinitions: EndpointDefinition[]): Promise<EndpointDefinition[]> {
  const imports = mapEndpointDefinitionsToImports(typesFile, endpointDefinitions)
  await writeStubGeneratorsPrefix(targetFile, imports)

  for(let i in endpointDefinitions){
    const {requestStub, responseStub, title} = mapEndpointDefinitionToStubDefs(endpointDefinitions[i])
    await writeRequestResponseStubFunctions(targetFile, requestStub, responseStub, title)
  }
  return endpointDefinitions
}

function mapEndpointDefinitionToStubDefs(endpointDefinition: EndpointDefinition): { requestStub: string, responseStub: string, title: string } {
  const { title, request, response, requestTypeName, responseTypeName } = endpointDefinition
  const writeableTitle = formatStubFunctionName(title)

  const requestStub = formatStubFunction(writeableTitle + "RequestData", request, requestTypeName + "['data']")
  const responseStub = formatStubFunction(writeableTitle + "Response", response, responseTypeName)
  return {requestStub, responseStub, title}
}

function formatStubFunction(title: string, schema: object, returnTypeName: string): string {
  return `\n
export async function ${title}Stub(): Promise<${returnTypeName}> {
  return jsf.resolve(${JSON.stringify(schema).replace(/"/g, '\'')})
}`
}

function formatStubFunctionName(title: string): string {
  const noWhiteSpace = title.replace(" ","").replace("\n","").replace("\t","")
  return noWhiteSpace.charAt(0).toLowerCase() + noWhiteSpace.slice(1)
}