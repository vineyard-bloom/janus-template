import { EndpointDefinition } from "../endpoint-schema-parsing"
import * as fs from "fs"
import { importStatment, interfaceMethods, relativePath } from "../file-formatting-writing-helpers"

export class ApiContractWriter {
  private readonly apiContractFile: string
  private readonly typesFile: string
  private readonly interfaceName: string

  constructor(apiContractFile: string, typesFile: string, apiContractInterfaceName: string = "ApiContract"){
    this.apiContractFile = apiContractFile
    this.typesFile = typesFile
    this.interfaceName = apiContractInterfaceName
  }
  
  async writeFile(endpointDefinitions: EndpointDefinition[]) {
    await fs.writeFileSync(this.apiContractFile, "")
    
    const importTypes = importStatment(relativePath(this.typesFile), endpointDefinitions.reduce((acc, def) => {
      return [ ...acc, def.requestTypeName, def.responseTypeName ]
    }, [] as string []))
    await fs.appendFileSync(this.apiContractFile,  importTypes)
    
    const methods = interfaceMethods(this.interfaceName, endpointDefinitions)
    await fs.appendFileSync(this.apiContractFile,  methods)
  }
}

