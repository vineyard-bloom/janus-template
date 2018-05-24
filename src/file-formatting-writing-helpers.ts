import * as fs from "fs"

export async function writeImports( targetFile: string, typeRequirements: { [fileName: string]: string[] } ) {
  for ( let i in typeRequirements ){
    const importStatement = importStatment(i, typeRequirements[ i ])
    await fs.appendFileSync(targetFile, importStatement + "\n")
  }
}

export function importStatment (fromFile: string, importTypes: string[]): string {
  return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`
}

export function relativePath(filePath: string): string {
  const dirs = filePath.split('/')
  const file = dirs[dirs.length - 1]
  const [ fileName, extension ] = file.split('.')
  return './' + fileName
}

export function replaceAll(source: string, replace: string, replaceWith: string = ""): string {
  return source.split(replace).join("")
}