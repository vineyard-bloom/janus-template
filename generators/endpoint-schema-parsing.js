"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv = require("ajv");
const requireDir = require("require-dir");
const endpointDefinitionJsonSample = {
    title: "sample",
    request: {},
    response: {},
    path: "/",
    verb: "get"
};
//A recursive import here should always be from require-dir and contain only endpoint definition .json files.
function generateEndpointDefinitionsFromSchema(directory, schemaHelperFile) {
    let endpointSchema;
    try {
        endpointSchema = requireDir(directory, { recurse: true });
    }
    catch (e) {
        throw new Error(`Unable to recursively require endpoint schema. Ensure that directory ${directory} ONLY has endpoint .json schema and other directories with the same. \n${e}`);
    }
    return extractEndpointDefinitions(ajv(), endpointSchema, require(schemaHelperFile));
}
exports.generateEndpointDefinitionsFromSchema = generateEndpointDefinitionsFromSchema;
function extractEndpointDefinitions(ajv, recursiveImport, schemaHelpers) {
    let endpointDefinitions = [];
    for (let i in recursiveImport) {
        const thisImport = recursiveImport[i];
        if (isEndpointDefinitionJson(thisImport)) {
            const endpointDefinition = formatEndpointDefinitionFromJson(thisImport, ajv, schemaHelpers);
            endpointDefinitions.push(endpointDefinition);
        }
        else {
            endpointDefinitions = endpointDefinitions.concat(extractEndpointDefinitions(ajv, thisImport, schemaHelpers));
        }
    }
    return endpointDefinitions;
}
function isEndpointDefinitionJson(ob) {
    return Object.keys(endpointDefinitionJsonSample).reduce((acc, key) => {
        return acc && ob.hasOwnProperty(key);
    }, true);
}
function formatEndpointDefinitionFromJson(endpointDefJson, ajv, schemaHelpers) {
    const requestSchema = attachSchemaRefs(endpointDefJson.request, schemaHelpers);
    const responseSchema = attachSchemaRefs(endpointDefJson.response, schemaHelpers);
    const noWhiteSpaceTitle = endpointDefJson.title.replace(" ", "").replace("\n", "").replace("\t", "");
    const actionName = noWhiteSpaceTitle.charAt(0).toLowerCase() + noWhiteSpaceTitle.slice(1);
    return Object.assign(endpointDefJson, {
        request: requestSchema,
        response: responseSchema,
        requestTypeName: noWhiteSpaceTitle + "Request",
        responseTypeName: noWhiteSpaceTitle + "Response",
        actionName,
        requestValidator: ajv.compile(requestSchema),
        responseValidator: ajv.compile(responseSchema)
    });
}
function attachSchemaRefs(schema, schemaRefs) {
    return Object.assign(schema, schemaRefs);
}
//# sourceMappingURL=endpoint-schema-parsing.js.map