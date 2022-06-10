#!/usr/bin/env node

import fs from 'fs'
import { docVue3, config } from '../src'
import minimist from 'minimist'

const argv = minimist(process.argv.slice(2))
const inputFilePath = argv._[0]
const outputFilePath = argv._[1]

let type = outputFilePath.split('.').pop().trim()
type = /^(json|md|html)$/.test(type) ? type : config.type

const code = fs.readFileSync(inputFilePath).toString()
const result = (docVue3(code, { type })) as any

fs.writeFileSync(
  outputFilePath || `${inputFilePath}.${type}`,
  type === 'json' ? JSON.stringify(result, null, 2) : result
)
