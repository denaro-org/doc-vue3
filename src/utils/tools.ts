import { parse, type SFCParseResult, babelParse } from '@vue/compiler-sfc'
import os from 'os'
import { ParseComment } from '../types'

let scriptCode = ''

// 解析 SFC
export const parseSFC = (code: string): SFCParseResult => {
  return parse(code)
}

// 解析 JS AST
export const parseScriptAST = (code) => {
  scriptCode = code
  return babelParse(scriptCode, {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  })
}

// 根据 loc 截取字符
export const getLocContent = (loc) => {
  const lines = scriptCode.split(/\r?\n/).filter((lineContent, index) => {
    return index >= loc.start.line - 1 && index <= loc.end.line - 1
  })

  const lastIdx = lines.length - 1
  if (lines.length === 1) {
    return lines[0].substring(loc.start.column, loc.end.column)
  }

  if (lines.length) {
    lines[0] = lines[0].substring(loc.start.column)
    lines[lastIdx] = lines[lastIdx].substring(0, loc.end.column)
  }

  return lines.join(os.EOL)
}

// 解析注释中的文档内容
export const parseComment = (commentNode): ParseComment => {
  const result: ParseComment = {}
  const { value } = commentNode
  let lines = value.split(/\r?\n/)
  lines = lines.map((l) => l.trim().replace(/^\*\s*/, '')).filter((i) => !!i)
  lines.forEach((line) => {
    const [key, ...desc] = line.split(' ')
    const docKey = key.replace(/^@/, '').replace(/^doc/, 'desc')

    if (docKey === 'param') {
      const [paramName, ...paramDesc] = desc
      const param = {
        name: paramName.trim(),
        desc: paramDesc.join(' ').trim()
      }
      if (result.params) {
        result.params.push(param)
      } else {
        result.params = [param]
      }
    } else {
      result[docKey] = desc.join(' ').trim()
    }
  })
  return result
}
