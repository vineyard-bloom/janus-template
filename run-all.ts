#!/usr/bin/env node

import { configureJsonSchemaGeneration } from "./index"
import { getRootPath } from "./utility/root-directory-sensor"

configureJsonSchemaGeneration(getRootPath()).compileAll()