import * as fs from "fs"
import { writeImports } from "../import-writing-helpers"

export async function writeStubGeneratorsPrefix(targetFile: string, typeRequirements: { [fileName: string]: string[] } ): Promise<void>{
  await fs.writeFileSync(targetFile, "")
  await writeImports(targetFile, typeRequirements)
  await fs.appendFileSync(targetFile, "\nconst jsf = require('json-schema-faker')\n")
  await fs.appendFileSync(targetFile, "jsf.extend('faker', function() {\n" +
    "  return require('faker')\n" +
    "})")
}

export async function writeRequestResponseStubFunctions(targetFile: string, requestStubFunction: string, responseStubFunction: string, title: string): Promise<void> {
  await fs.appendFileSync(targetFile, "\n\n/************************ -- " + title + " -- *****************************/")
  await fs.appendFileSync(targetFile, requestStubFunction)
  await fs.appendFileSync(targetFile, responseStubFunction)
}

