import * as ajv from "ajv"
import { Ajv, ValidateFunction } from "ajv"
import * as fs from 'fs'
import * as path from 'path'

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

export function extractEndpointDefinitionsFromSchema(directory: string, schemaDefinitionsJSON: object): EndpointDefinition[]{
  return extractArrayOfJsonFromDirectory(directory)
    .map(validateEndpointDefinitionJson)
    .map(endpointDefinitionJson => formatEndpointDefinitionFromJson(
      endpointDefinitionJson, ajv(), schemaDefinitionsJSON
    ))
}

function extractArrayOfJsonFromDirectory(dir: string): object[] {
  const { pass: directories, fail: files } = partition(
    fs.readdirSync(dir), folderContent => fs.statSync(path.join(dir, folderContent)).isDirectory()
  )

  const fileContents = files.map( file => require(path.join(dir,file)) )
  return fileContents.concat(directories.reduce( (acc, subDirectory) => {
    return acc.concat(extractArrayOfJsonFromDirectory(path.join(dir,subDirectory)))
  }, [] as object[]))
}

const JsonSchemaSchema = require(__dirname + '/validation/endpoint-schema.json')
const JsonSchemaValidator = ajv().compile(JsonSchemaSchema)
function validateEndpointDefinitionJson(ob: object): EndpointDefinitionJSON {
 if(JsonSchemaValidator(ob) as boolean){
   return ob as EndpointDefinitionJSON
 } else {
   throw new Error(`The following is an improper endpoint-definition. AJV error: ${JSON.stringify(JsonSchemaValidator.errors)}. \n ${JSON.stringify(ob, (k,v)=> v, '\t')}.`)
 }
}

function formatEndpointDefinitionFromJson(endpointDefJson: EndpointDefinitionJSON, ajv: Ajv, schemaHelpers: object): EndpointDefinition {
  const { title, request, response } = endpointDefJson

  const requestSchema = attachSchemaRefs(request, schemaHelpers)
  const responseSchema = attachSchemaRefs(response, schemaHelpers)
  const actionName = title.charAt(0).toLowerCase() + title.slice(1)

  return Object.assign( endpointDefJson, {
      request: requestSchema,
      response: responseSchema,
      requestTypeName: title + "Request",
      responseTypeName: title + "Response",
      actionName,
      requestValidator: ajv.compile(requestSchema),
      responseValidator: ajv.compile(responseSchema)
    }
  )
}

function attachSchemaRefs(schema: object, schemaRefs: object){
  return Object.assign(schema, schemaRefs)
}

function partition<T>(array: T[], isValid: (t:T) => boolean): {pass: T[], fail: T[]} {
  return array.reduce((acc, elem) => {
    const { pass, fail } = acc
    return isValid(elem) ? { pass: [...acc.pass, elem], fail } : { pass, fail: [...acc.fail, elem] }
  }, { pass: [], fail: [] } as {pass: T[], fail: T[]});
}