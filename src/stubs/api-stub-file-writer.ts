import { EndpointDefinition } from "../endpoint-schema-parsing"
import { writeImports } from "../import-writing-helpers"
import * as fs from "fs"
import { relativePath } from "../file-formatting-writing-helpers"

export class ApiStubFileWriter {
  private readonly targetFile: string
  private readonly stubDependenciesFile: string
  private readonly apiContractDependenciesFile: string

  constructor(targetFile: string, stubDependenciesFile: string, apiContractDependenciesFile: string) {
    this.targetFile = targetFile
    this.stubDependenciesFile = stubDependenciesFile
    this.apiContractDependenciesFile = apiContractDependenciesFile
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
export const apiStub: ApiActions = {
  ${stubMethods.join(",\n\t")}
}`

    await fs.appendFileSync(this.targetFile, classToWrite)
  }

  private async writeImports(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await fs.writeFileSync(this.targetFile, '')
    const stubDependencies = endpointDefinitions.map(extractResponseStubName)
    const imports = {
      [relativePath(this.stubDependenciesFile)]: stubDependencies,
      [relativePath(this.apiContractDependenciesFile)]: ['ApiActions']
    }
    await writeImports(this.targetFile, imports)
  }
}

function extractRequestDataStubName(endpointDefinition: EndpointDefinition): string {
  return endpointDefinition.actionName + "RequestDataStub"
}

function extractResponseStubName(endpointDefinition: EndpointDefinition): string {
  return endpointDefinition.actionName + "ResponseStub"
}
