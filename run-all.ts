#!/usr/bin/env node

import { configureJsonSchemaGeneration } from "./index"

configureJsonSchemaGeneration().compileAll()