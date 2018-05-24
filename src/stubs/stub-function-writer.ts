import { EndpointDefinition } from "../endpoint-schema-parsing"
import { importStatment, relativePath } from "../file-formatting-writing-helpers"
import * as fs from 'fs'

export class StubFunctionWriter {
  private static readonly prefix: string = "\nconst jsf = require('json-schema-faker')\n" +
    "jsf.extend('faker', function() {\n" +
    "  return require('faker')\n" +
    "})"

  private readonly stubFunctionsFile: string
  private readonly typesFile: string

  constructor(stubFunctionsFile: string, typesFile: string){
    this.stubFunctionsFile = stubFunctionsFile
    this.typesFile = typesFile
  }

  async writeFile(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await fs.writeFileSync(this.stubFunctionsFile, "")

    const importTypes = importStatment(
      relativePath(this.typesFile),
      endpointDefinitions.reduce((acc, def) => [ ...acc, def.requestTypeName, def.responseTypeName ], [] as string [])
    )
    await fs.appendFileSync(this.stubFunctionsFile,  importTypes)
    await fs.appendFileSync(this.stubFunctionsFile, StubFunctionWriter.prefix)

    for(let i in endpointDefinitions){
      const stubFunctions = formatRequestResponseStubFunctions(endpointDefinitions[i])
      await fs.appendFileSync(this.stubFunctionsFile, stubFunctions)
    }
  }
}

function formatRequestResponseStubFunctions(endpointDefinition: EndpointDefinition): string {
  const { title, request, response, requestTypeName, responseTypeName } = endpointDefinition
  const writeableTitle = formatStubFunctionName(title)

  const requestStub = formatStubFunction(writeableTitle + "RequestData", request, requestTypeName + "['data']")
  const responseStub = formatStubFunction(writeableTitle + "Response", response, responseTypeName)

  return "\n\n/************************ -- " + title + " -- *****************************/\n" +
    requestStub + "\n" +
    responseStub
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