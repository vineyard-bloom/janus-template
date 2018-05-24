"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const file_formatting_writing_helpers_1 = require("../file-formatting-writing-helpers");
class ApiContractWriter {
    constructor(apiContractFile, typesFile, apiContractInterfaceName = "ApiContract") {
        this.apiContractFile = apiContractFile;
        this.typesFile = typesFile;
        this.interfaceName = apiContractInterfaceName;
    }
    writeFile(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFileSync(this.apiContractFile, "");
            const importTypes = file_formatting_writing_helpers_1.importStatment(file_formatting_writing_helpers_1.relativePath(this.typesFile), endpointDefinitions.reduce((acc, def) => [...acc, def.requestTypeName, def.responseTypeName], []));
            yield fs.appendFileSync(this.apiContractFile, importTypes + "\n");
            const interfaceMethods = interfaceBody(this.interfaceName, endpointDefinitions);
            yield fs.appendFileSync(this.apiContractFile, interfaceMethods);
        });
    }
}
exports.ApiContractWriter = ApiContractWriter;
function interfaceBody(className, endpointActions) {
    const interfaceMethods = endpointActions.map(def => {
        return `${def.actionName}: (req: ${def.requestTypeName}) => Promise<${def.responseTypeName}>`;
    });
    return `
export interface ${className} {
  ${interfaceMethods.join("\n\t")}
}`;
}
exports.interfaceBody = interfaceBody;
//# sourceMappingURL=api-contract-writer.js.map