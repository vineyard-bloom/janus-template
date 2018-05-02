import * as fs from "fs"

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

async function writeImports( targetFile: string, typeRequirements: { [fileName: string]: string[] } ) {
  for ( let i in typeRequirements ){
    const importStatement = importStatment( typeRequirements[i], i )
    await fs.appendFileSync(targetFile, importStatement + "\n")
  }
}

function importStatment(importTypes: string[], fromFile: string ): string {
  return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`
}