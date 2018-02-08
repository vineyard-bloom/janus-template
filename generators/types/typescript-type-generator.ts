import { EndpointDefinition } from "../parsing/endpoint-schema-parsing"
import { parseJson2Ts } from "./json-schema-to-typescript-formatter"
import { EndpointTypeDef, writeTsTypeDefinitions } from "./typescript-type-writer"

export async function generateTsEndpointTypeDefinitions(targetFile: string, endpointDefinitions: EndpointDefinition[]): Promise<void> {
  const typeDefs = await mapEndpointDefinitionsToTypeDefs(endpointDefinitions)
  await writeTsTypeDefinitions(targetFile, typeDefs)
}

async function mapEndpointDefinitionsToTypeDefs(endpointDefinitions: EndpointDefinition[]): Promise<EndpointTypeDef[]> {
  return await Promise.all(endpointDefinitions.map(async endpointDef => {
    const {request, requestTypeName, response, responseTypeName, title} = endpointDef
    return {
      requestTsDef: await parseJson2Ts(request, requestTypeName, "Request", "data"),
      responseTsDef: await parseJson2Ts(response, responseTypeName),
      title: title
    }
  }))
}