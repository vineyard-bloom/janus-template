import { EndpointDefinition } from "../parsing/endpoint-schema-parsing"
import * as fs from "fs"
import { mapEndpointDefinitionsToImports, writeImports } from "../file-formatting-writing-helpers"


export async function generateEndpointActionsRequirements(apiContractFile: string, typesFile: string, endpointDefinitions: EndpointDefinition[]) {
  await fs.writeFileSync(apiContractFile, "")

  const imports = mapEndpointDefinitionsToImports(typesFile, endpointDefinitions)
  await writeImports(apiContractFile, imports)

  writeAbstractClass(apiContractFile, "ApiActions", endpointDefinitions)
}

export async function writeAbstractClass(apiContractFile: string, className: string, endpointActions: {actionName: string, requestTypeName: string, responseTypeName: string}[]): Promise<void> {

  const interfaceMethods = endpointActions.map(def => {
    return `${def.actionName}: (req: ${def.requestTypeName}) => Promise<${def.responseTypeName}>`
  })

  const classToWrite = `
export interface ${className} {
  ${interfaceMethods.join("\n\t")}
}`

  await fs.appendFileSync(apiContractFile, classToWrite)
}