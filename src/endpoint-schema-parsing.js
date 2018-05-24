"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv = require("ajv");
const fs = require("fs");
const path = require("path");
function extractEndpointDefinitionsFromSchema(directory, schemaDefinitionsJSON) {
    return extractArrayOfJsonFromDirectory(directory)
        .map(validateEndpointDefinitionJson)
        .map(endpointDefinitionJson => formatEndpointDefinitionFromJson(endpointDefinitionJson, ajv(), schemaDefinitionsJSON));
}
exports.extractEndpointDefinitionsFromSchema = extractEndpointDefinitionsFromSchema;
function extractArrayOfJsonFromDirectory(dir) {
    const { pass: directories, fail: files } = partition(fs.readdirSync(dir), folderContent => fs.statSync(path.join(dir, folderContent)).isDirectory());
    const fileContents = files.map(file => require(path.join(dir, file)));
    return fileContents.concat(directories.reduce((acc, subDirectory) => {
        return acc.concat(extractArrayOfJsonFromDirectory(path.join(dir, subDirectory)));
    }, []));
}
const JsonSchemaSchema = require(__dirname + '/validation/endpoint-schema.json');
const JsonSchemaValidator = ajv().compile(JsonSchemaSchema);
function validateEndpointDefinitionJson(ob) {
    if (JsonSchemaValidator(ob)) {
        return ob;
    }
    else {
        throw new Error(`The following is an improper endpoint-definition. AJV error: ${JSON.stringify(JsonSchemaValidator.errors)}. \n ${JSON.stringify(ob, (k, v) => v, '\t')}.`);
    }
}
function formatEndpointDefinitionFromJson(endpointDefJson, ajv, schemaHelpers) {
    const { title, request, response } = endpointDefJson;
    const requestSchema = attachSchemaRefs(request, schemaHelpers);
    const responseSchema = attachSchemaRefs(response, schemaHelpers);
    const actionName = title.charAt(0).toLowerCase() + title.slice(1);
    return Object.assign(endpointDefJson, {
        request: requestSchema,
        response: responseSchema,
        requestTypeName: title + "Request",
        responseTypeName: title + "Response",
        actionName,
        requestValidator: ajv.compile(requestSchema),
        responseValidator: ajv.compile(responseSchema)
    });
}
function attachSchemaRefs(schema, schemaRefs) {
    return Object.assign(schema, schemaRefs);
}
function partition(array, isValid) {
    return array.reduce((acc, elem) => {
        const { pass, fail } = acc;
        return isValid(elem) ? { pass: [...acc.pass, elem], fail } : { pass, fail: [...acc.fail, elem] };
    }, { pass: [], fail: [] });
}
//# sourceMappingURL=endpoint-schema-parsing.js.map