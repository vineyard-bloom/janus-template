import { EndpointDefinition } from "../endpoint-schema-parsing"
import * as fs from "fs"
import { importStatment, relativePath } from "../file-formatting-writing-helpers"

export class ApiContractWriter {
  private readonly apiContractFile: string
  private readonly typesFile: string
  private readonly interfaceName: string

  constructor(apiContractFile: string, typesFile: string, apiContractInterfaceName: string = "ApiContract"){
    this.apiContractFile = apiContractFile
    this.typesFile = typesFile
    this.interfaceName = apiContractInterfaceName
  }
  
  async writeFile(endpointDefinitions: EndpointDefinition[]): Promise<void> {
    await fs.writeFileSync(this.apiContractFile, "")
    
    const importTypes = importStatment(
      relativePath(this.typesFile),
      endpointDefinitions.reduce((acc, def) => [ ...acc, def.requestTypeName, def.responseTypeName ], [] as string [])
    )
    await fs.appendFileSync(this.apiContractFile,  importTypes)
    
    const interfaceMethods = interfaceBody(this.interfaceName, endpointDefinitions)
    await fs.appendFileSync(this.apiContractFile,  interfaceMethods)
  }
}

export function interfaceBody (className: string, endpointActions: { actionName: string, requestTypeName: string, responseTypeName: string }[]): string {
  const interfaceMethods = endpointActions.map(def => {
    return `${def.actionName}: (req: ${def.requestTypeName}) => Promise<${def.responseTypeName}>`
  })

  return `
export interface ${className} {
  ${interfaceMethods.join("\n\t")}
}`
}
