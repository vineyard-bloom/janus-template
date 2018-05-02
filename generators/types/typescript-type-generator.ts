import { EndpointDefinition } from "../parsing/endpoint-schema-parsing"
import { parseJson2Ts } from "./json-schema-to-typescript-formatter"
import { EndpointTypeDef, writeTsTypeDefinitions } from "./typescript-type-writer"
import { replaceAll } from "../file-formatting-writing-helpers"

export async function generateTsEndpointTypeDefinitions(targetFile: string, endpointDefinitions: EndpointDefinition[]): Promise<void> {
  const typeDefs = await mapEndpointDefinitionsToTypeDefs(endpointDefinitions)
  await writeTsTypeDefinitions(targetFile, typeDefs)
}

async function mapEndpointDefinitionsToTypeDefs(endpointDefinitions: EndpointDefinition[]): Promise<EndpointTypeDef[]> {
  return await Promise.all(endpointDefinitions.map(async endpointDef => {
    const {request, requestTypeName, response, responseTypeName, title} = endpointDef
    return {
      requestTsDef: await parseJson2Ts(request, requestTypeName, "Request", "data").then(def => replaceAll(def, ";")),
      responseTsDef: await parseJson2Ts(response, responseTypeName).then(def => replaceAll(def, ";")),
      title: title
    }
  }))
}