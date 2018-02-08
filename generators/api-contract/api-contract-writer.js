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
function generateEndpointActionsRequirements(apiContractFile, typesFile, endpointDefinitions) {
    return __awaiter(this, void 0, void 0, function* () {
        yield fs.writeFileSync(apiContractFile, "");
        const imports = file_formatting_writing_helpers_1.mapEndpointDefinitionsToImports(typesFile, endpointDefinitions);
        yield file_formatting_writing_helpers_1.writeImports(apiContractFile, imports);
        writeAbstractClass(apiContractFile, "ApiActions", endpointDefinitions);
    });
}
exports.generateEndpointActionsRequirements = generateEndpointActionsRequirements;
function writeAbstractClass(apiContractFile, className, endpointActions) {
    return __awaiter(this, void 0, void 0, function* () {
        const interfaceMethods = endpointActions.map(def => {
            return `${def.actionName}: (req: ${def.requestTypeName}) => Promise<${def.responseTypeName}>`;
        });
        const classToWrite = `
export interface ${className} {
  ${interfaceMethods.join("\n\t")}
}`;
        yield fs.appendFileSync(apiContractFile, classToWrite);
    });
}
exports.writeAbstractClass = writeAbstractClass;
//# sourceMappingURL=api-contract-writer.js.map