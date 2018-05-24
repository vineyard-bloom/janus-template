import { EndpointDefinition } from "../endpoint-schema-parsing"
import * as fs from "fs"
import { importStatment, relativePath, writeImports } from "../file-formatting-writing-helpers"

export class ApiStubWriter {
  private readonly apiStubFile: string
  private readonly stubFunctionsFile: string
  private readonly apiContractFile: string
  private readonly apiContractInterfaceName: string

  constructor(apiStubFile: string, stubFunctionsFile: string, apiContractFile: string, apiContractInterfaceName: string = "ApiContract") {
    this.apiStubFile = apiStubFile
    this.stubFunctionsFile = stubFunctionsFile
    this.apiContractFile = apiContractFile
    this.apiContractInterfaceName = apiContractInterfaceName
  }

  async writeFile(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await this.writeImports(endpointDefinitions)
    await this.writeStubApi(endpointDefinitions)
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

    const importsFromStubFunctions = importStatment(relativePath(this.stubFunctionsFile), stubDependencies)
    const importsFromApiContract = importStatment(relativePath(this.apiContractFile), [this.apiContractInterfaceName])

    await fs.appendFileSync(this.apiStubFile, importsFromStubFunctions + "\n" + importsFromApiContract + "\n")
  }
}

function extractResponseStubName(endpointDefinition: EndpointDefinition): string {
  return endpointDefinition.actionName + "ResponseStub"
}
