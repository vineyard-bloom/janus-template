import * as fs from "fs"

export async function writeImports (targetFile: string, typeRequirements: { [fileName: string]: string[] }) {
  for (let i in typeRequirements) {
    const importStatement = importStatment(typeRequirements[ i ], i)
    await fs.appendFileSync(targetFile, importStatement + "\n")
  }
}

export function importStatment (importTypes: string[], fromFile: string): string {
  return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`
}