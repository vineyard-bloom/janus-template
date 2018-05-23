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
const import_writing_helpers_1 = require("../import-writing-helpers");
const fs = require("fs");
const file_formatting_writing_helpers_1 = require("../file-formatting-writing-helpers");
class ApiStubWriter {
    constructor(apiStubFile, stubsFile, apiContractFile, apiContractInterfaceName = "ApiContract") {
        this.apiStubFile = apiStubFile;
        this.stubsFile = stubsFile;
        this.apiContractFile = apiContractFile;
        this.apiContractInterfaceName = apiContractInterfaceName;
    }
    writeFile(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.writeImports(endpointDefinitions);
            return this.writeStubApi(endpointDefinitions);
        });
    }
    writeStubApi(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            const stubMethods = endpointDefinitions.map(ed => {
                return `${ed.actionName}: ${extractResponseStubName(ed)}`;
            });
            const classToWrite = `
export const apiStub: ${this.apiContractInterfaceName} = {
  ${stubMethods.join(",\n\t")}
}`;
            yield fs.appendFileSync(this.apiStubFile, classToWrite);
        });
    }
    writeImports(endpointDefinitions) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.writeFileSync(this.apiStubFile, '');
            const stubDependencies = endpointDefinitions.map(extractResponseStubName);
            const imports = {
                [file_formatting_writing_helpers_1.relativePath(this.stubsFile)]: stubDependencies,
                [file_formatting_writing_helpers_1.relativePath(this.apiContractFile)]: [this.apiContractInterfaceName]
            };
            yield import_writing_helpers_1.writeImports(this.apiStubFile, imports);
        });
    }
}
exports.ApiStubWriter = ApiStubWriter;
function extractRequestDataStubName(endpointDefinition) {
    return endpointDefinition.actionName + "RequestDataStub";
}
function extractResponseStubName(endpointDefinition) {
    return endpointDefinition.actionName + "ResponseStub";
}
//# sourceMappingURL=api-stub-file-writer.js.map