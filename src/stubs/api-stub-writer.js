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
class ApiStubWriter {
    constructor(apiStubFile, stubFunctionsFile, apiContractFile, apiContractInterfaceName, apiStubConstName) {
        this.apiStubFile = apiStubFile;
        this.stubFunctionsFile = stubFunctionsFile;
        this.apiContractFile = apiContractFile;
        this.apiContractInterfaceName = apiContractInterfaceName;
        this.apiStubConstName = apiStubConstName;
    }
    writeFile(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.writeImports(endpointDefinitions);
            yield this.writeStubApi(endpointDefinitions);
        });
    }
    writeStubApi(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            const stubMethods = endpointDefinitions.map(ed => {
                return `${ed.actionName}: ${extractResponseStubName(ed)}`;
            });
            const constToWrite = `
export const ${this.apiStubConstName}: ${this.apiContractInterfaceName} = {
  ${stubMethods.join(",\n\t")}
}`;
            yield fs.appendFileSync(this.apiStubFile, constToWrite);
        });
    }
    writeImports(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFileSync(this.apiStubFile, '');
            const stubDependencies = endpointDefinitions.map(extractResponseStubName);
            const importsFromStubFunctions = file_formatting_writing_helpers_1.importStatment(file_formatting_writing_helpers_1.relativePath(this.stubFunctionsFile), stubDependencies);
            const importsFromApiContract = file_formatting_writing_helpers_1.importStatment(file_formatting_writing_helpers_1.relativePath(this.apiContractFile), [this.apiContractInterfaceName]);
            yield fs.appendFileSync(this.apiStubFile, importsFromStubFunctions + "\n" + importsFromApiContract + "\n");
        });
    }
}
exports.ApiStubWriter = ApiStubWriter;
function extractResponseStubName(endpointDefinition) {
    return endpointDefinition.actionName + "ResponseStub";
}
//# sourceMappingURL=api-stub-writer.js.map