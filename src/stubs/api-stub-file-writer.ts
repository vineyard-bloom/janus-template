import { EndpointDefinition } from "../endpoint-schema-parsing"
import { writeImports } from "../import-writing-helpers"
import * as fs from "fs"
import { relativePath } from "../file-formatting-writing-helpers"

export class ApiStubWriter {
  private readonly apiStubFile: string
  private readonly stubsFile: string
  private readonly apiContractFile: string
  private readonly apiContractInterfaceName: string

  constructor(apiStubFile: string, stubsFile: string, apiContractFile: string, apiContractInterfaceName: string = "ApiContract") {
    this.apiStubFile = apiStubFile
    this.stubsFile = stubsFile
    this.apiContractFile = apiContractFile
    this.apiContractInterfaceName = apiContractInterfaceName
  }

  async writeFile(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await this.writeImports(endpointDefinitions)
    return this.writeStubApi(endpointDefinitions)
  }

  private async writeStubApi(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    const stubMethods = endpointDefinitions.map(ed => {
      return `${ed.actionName}: ${extractResponseStubName(ed)}`
    })

    const classToWrite = `
export const apiStub: ${this.apiContractInterfaceName} = {
  ${stubMethods.join(",\n\t")}
}`

    await fs.appendFileSync(this.apiStubFile, classToWrite)
  }

  private async writeImports(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await fs.writeFileSync(this.apiStubFile, '')
    const stubDependencies = endpointDefinitions.map(extractResponseStubName)
    const imports = {
      [relativePath(this.stubsFile)]: stubDependencies,
      [relativePath(this.apiContractFile)]: [this.apiContractInterfaceName]
    }
    await writeImports(this.apiStubFile, imports)
  }
}

function extractRequestDataStubName(endpointDefinition: EndpointDefinition): string {
  return endpointDefinition.actionName + "RequestDataStub"
}

function extractResponseStubName(endpointDefinition: EndpointDefinition): string {
  return endpointDefinition.actionName + "ResponseStub"
}
