import { compile } from 'json-schema-to-typescript'

export async function parseJson2Ts(jsonSchema: object, typeName: string, extendsFrom?: string, embeddedWithin?: string): Promise<string> {
  let typeDef = (await compile(jsonSchema, typeName)).replace(jsonSchema2TsAutoGeneratedText,"")

  if(extendsFrom){ typeDef = appendInterfaceExtension(typeDef, extendsFrom) }
  if(embeddedWithin){ typeDef = nestContentIntoProperty(typeDef, embeddedWithin) }

  return typeDef
}

function removeWhiteSpace(text: string): string {
  return text.replace(/\s/g, "")
}

function appendInterfaceExtension(typeDef: string, interfaceName: string): string {
  const typeDefChars = typeDef.split("")
  const definitionBeginning = typeDefChars.findIndex( word => word === "{" )
  typeDefChars.splice(definitionBeginning, 0, `extends ${interfaceName} `)
  return typeDefChars.join("")
}

function nestContentIntoProperty(typeDef: string, propertyName: string): string {
  const typeDefWords = typeDef.split(" ")
  const indentedTypeDef = typeDefWords.map( word => word.replace("\n","\n\t")).join(" ")

  const typeDefChars = indentedTypeDef.split("")
  const definitionBeginning = typeDefChars.findIndex( word => word === "{" )
  typeDefChars.splice(definitionBeginning + 1, 0, `\n\t${propertyName}: {`)
  const definitionEnding = typeDefChars.reverse().findIndex( word => word === "}" )
  typeDefChars.splice(definitionEnding + 1, 0, `}\n`)
  typeDefChars.reverse()
  return typeDefChars.join("")
}

export const jsonSchema2TsAutoGeneratedText = "/**\n" +
  " * This file was automatically generated by json-schema-to-typescript.\n" +
  " * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,\n" +
  " * and run json-schema-to-typescript to regenerate this file.\n" +
  " */"