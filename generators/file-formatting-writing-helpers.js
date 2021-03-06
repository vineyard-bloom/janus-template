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
function mapEndpointDefinitionsToImports(typesFile, endpointDefinitions) {
    const requestTypes = endpointDefinitions.map(def => def.requestTypeName);
    const responseTypes = endpointDefinitions.map(def => def.responseTypeName);
    return { [typesFile.split(".")[0]]: requestTypes.concat(responseTypes) };
}
exports.mapEndpointDefinitionsToImports = mapEndpointDefinitionsToImports;
function writeImports(targetFile, typeRequirements) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i in typeRequirements) {
            const importStatement = importStatment(typeRequirements[i], i);
            yield fs.appendFileSync(targetFile, importStatement + "\n");
        }
    });
}
exports.writeImports = writeImports;
function importStatment(importTypes, fromFile) {
    return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`;
}
exports.importStatment = importStatment;
//# sourceMappingURL=file-formatting-writing-helpers.js.map