#!/usr/bin/env node
import { configureJsonSchemaGeneration } from "./index"

configureJsonSchemaGeneration().then(generator => generator.compileAll())