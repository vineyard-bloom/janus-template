import { EndpointDefinition } from "./parsing/endpoint-schema-parsing"
import * as fs from "fs"

export function mapEndpointDefinitionsToImports(typesFile: string, endpointDefinitions: EndpointDefinition[]): { [fileName: string]: string[] } {
  const requestTypes = endpointDefinitions.map(def => def.requestTypeName)
  const responseTypes = endpointDefinitions.map(def => def.responseTypeName)
  return { [typesFile.split(".")[0]]: requestTypes.concat(responseTypes) }
}

export async function writeImports( targetFile: string, typeRequirements: { [fileName: string]: string[] } ) {
  for ( let i in typeRequirements ){
    const importStatement = importStatment( typeRequirements[i], i )
    await fs.appendFileSync(targetFile, importStatement + "\n")
  }
}

export function importStatment(importTypes: string[], fromFile: string ): string {
  return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`
}
