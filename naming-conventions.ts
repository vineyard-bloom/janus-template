export const DEFAULT_NAMING_CONVENTIONS: NamingConventions = {
  typescriptTypeFileName: 'endpoint-types.ts',
  stubFunctionsFileName: 'endpoint-stubs.ts',
  apiContractFileName: 'api-contract.ts',
  apiStubFileName: 'api-stub.ts',
  apiContractInterfaceName: 'ApiContract',
  apiStubConstName: 'apiStub'
}

export interface NamingConventions extends FileNamingConventions{
  apiContractInterfaceName: string
  apiStubConstName: string
}

export interface FileNamingConventions {
  typescriptTypeFileName: string
  stubFunctionsFileName: string
  apiContractFileName: string
  apiStubFileName: string,
}
