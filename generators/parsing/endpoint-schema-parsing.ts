import { Ajv, ValidateFunction } from "ajv"
import * as ajv from 'ajv'
const requireDir = require("require-dir") as any

export type EndpointDefinitionJSON = {
  title: string,
  request: object,
  response: object,
  path: string,
  verb: string
}
export type EndpointDefinition = EndpointDefinitionJSON & {
  requestTypeName: string,
  responseTypeName: string,
  actionName: string,
  requestValidator: ValidateFunction
  responseValidator: ValidateFunction
}

const endpointDefinitionJsonSample: EndpointDefinitionJSON = {
  title: "sample",
  request: {},
  response: {},
  path: "/",
  verb: "get"
}

//A recursive import here should always be from require-dir and contain only endpoint definition .json files.
export function generateEndpointDefinitionsFromSchema(directory: string, schemaHelperFile: string): EndpointDefinition[]{
  let endpointSchema: {[key: string]: object}

  try {
    endpointSchema = requireDir(directory, {recurse: true})
  } catch (e) {
    throw new Error(`Unable to recursively require endpoint schema. Ensure that directory ${directory} ONLY has endpoint .json schema and other directories with the same. \n${e}`)
  }

  return extractEndpointDefinitions( ajv(), endpointSchema, require(schemaHelperFile))
}

function extractEndpointDefinitions(ajv: ajv.Ajv, recursiveImport: {[key: string]: object}, schemaHelpers: object): EndpointDefinition[] {
  let endpointDefinitions = [] as EndpointDefinition[]
  for (let i in recursiveImport ) {
    const thisImport = recursiveImport[i]
    if(isEndpointDefinitionJson(thisImport)){
      const endpointDefinition = formatEndpointDefinitionFromJson(thisImport as EndpointDefinitionJSON, ajv, schemaHelpers)
      endpointDefinitions.push(
        endpointDefinition
      )
    } else {
      endpointDefinitions = endpointDefinitions.concat(extractEndpointDefinitions(ajv, thisImport as {[key: string]: object}, schemaHelpers))
    }
  }
  return endpointDefinitions
}

function isEndpointDefinitionJson(ob: object): boolean {
  return Object.keys(endpointDefinitionJsonSample).reduce( (acc, key) => {
    return acc && ob.hasOwnProperty(key)
  }, true )
}

function formatEndpointDefinitionFromJson(endpointDefJson: EndpointDefinitionJSON, ajv: Ajv, schemaHelpers: object): EndpointDefinition {
  const requestSchema = attachSchemaRefs(endpointDefJson.request, schemaHelpers)
  const responseSchema = attachSchemaRefs(endpointDefJson.response, schemaHelpers)

  const noWhiteSpaceTitle = endpointDefJson.title.replace(" ","").replace("\n","").replace("\t","")

  return Object.assign( endpointDefJson, {
      request: requestSchema,
      response: responseSchema,
      requestTypeName: noWhiteSpaceTitle + "Request",
      responseTypeName: noWhiteSpaceTitle + "Response",
      actionName: noWhiteSpaceTitle.charAt(0).toLowerCase() + noWhiteSpaceTitle.slice(1),
      requestValidator: ajv.compile(requestSchema),
      responseValidator: ajv.compile(responseSchema)
    }
  )
}

function attachSchemaRefs(schema: object, schemaRefs: object){
  return Object.assign(schema, schemaRefs)
}

