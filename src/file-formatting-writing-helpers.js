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
function mapEndpointDefinitionsToReqResTypeImports(typesFilePath, endpointDefinitions) {
    const requestTypes = endpointDefinitions.map(def => def.requestTypeName);
    const responseTypes = endpointDefinitions.map(def => def.responseTypeName);
    return { [relativePath(typesFilePath)]: requestTypes.concat(responseTypes) };
}
exports.mapEndpointDefinitionsToReqResTypeImports = mapEndpointDefinitionsToReqResTypeImports;
function writeImports(targetFile, typeRequirements) {
    return __awaiter(this, void 0, void 0, function* () {
        for (let i in typeRequirements) {
            const importStatement = importStatment(i, typeRequirements[i]);
            yield fs.appendFileSync(targetFile, importStatement + "\n");
        }
    });
}
exports.writeImports = writeImports;
function importStatment(fromFile, importTypes) {
    return `import {\n\t${importTypes.join(", \n\t")} \n} from '${fromFile}'`;
}
exports.importStatment = importStatment;
function relativePath(filePath) {
    const dirs = filePath.split('/');
    const file = dirs[dirs.length - 1];
    const [fileName, extension] = file.split('.');
    return './' + fileName;
}
exports.relativePath = relativePath;
function replaceAll(source, replace, replaceWith = "") {
    return source.split(replace).join("");
}
exports.replaceAll = replaceAll;
function interfaceMethods(className, endpointActions) {
    const interfaceMethods = endpointActions.map(def => {
        return `${def.actionName}: (req: ${def.requestTypeName}) => Promise<${def.responseTypeName}>`;
    });
    return `
export interface ${className} {
  ${interfaceMethods.join("\n\t")}
}`;
}
exports.interfaceMethods = interfaceMethods;
//# sourceMappingURL=file-formatting-writing-helpers.js.map