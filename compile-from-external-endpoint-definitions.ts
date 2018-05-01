#!/usr/bin/env node
import { configureJsonSchemaGeneration } from "./index"

if(process.argv.length < 3) {
  throw new Error("Need to pass in current path as argument!")
}

const projectPath = process.argv[2]
configureJsonSchemaGeneration(projectPath, projectPath).compileAll()