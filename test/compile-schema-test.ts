import { configureJsonSchemaGeneration } from "../index"

const targetDirectory = __dirname + "/generated"
const sourceDirectory = __dirname + "/endpoint-schema-definitions"
const schemaDefinitionsJSON = require(__dirname + "/schema-validation-helpers.json")

configureJsonSchemaGeneration(targetDirectory, sourceDirectory, schemaDefinitionsJSON).compileAll()