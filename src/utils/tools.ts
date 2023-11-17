import type { ParseComment } from '../types'
import type { Comment, SourceLocation } from '@babel/types'
import type { SFCParseResult } from '@vue/compiler-sfc'

import { babelParse, parse } from '@vue/compiler-sfc'
import { size } from 'lodash'
import os from 'os'

let scriptCode = ''

// 解析 SFC
export const parseSFC = (code: string): SFCParseResult => {
  return parse(code)
}

// 解析 JS AST
export const parseScriptAST = (
  code?: string
): ReturnType<typeof babelParse> => {
  scriptCode = code as string
  return babelParse(scriptCode, {
    allowImportExportEverywhere: true,
    sourceType: 'module',
    plugins: ['jsx', 'typescript']
  })
}

// 根据 loc 截取字符
export const getLocContent = (loc: SourceLocation): string => {
  const lines = scriptCode.split(/\r?\n/).filter((lineContent, index) => {
    return index >= loc.start.line - 1 && index <= loc.end.line - 1
  })

  const lastIdx = lines.length - 1
  if (lines.length === 1) {
    const start =
      lines[0].indexOf('?: ') > 0 ? loc.start.column - 1 : loc.start.column
    return lines[0].substring(start, loc.end.column)
  }

  if (lines.length > 0) {
    lines[0] = lines[0].substring(loc.start.column)
    lines[lastIdx] = lines[lastIdx].substring(0, loc.end.column)
  }

  return lines.join(os.EOL)
}

// 解析注释中的文档内容
export const parseComment = (commentNode?: Comment): ParseComment => {
  const result: ParseComment = {}
  const { value } = commentNode ?? {}
  let lines = value?.split(/\r?\n/)

  lines = lines
    ?.map(l => l.trim().replace(/^\*\s*/, ''))
    .filter(i => Boolean(i))

  lines?.forEach(line => {
    const [key, ...desc] = line.split(' ')
    const docKey = key.replace(/^@/, '').replace(/^doc/, 'desc')

    if (docKey === 'param') {
      const [paramName, ...paramDesc] = desc
      const param = {
        name: paramName.trim(),
        desc: paramDesc.join(' ').trim()
      }
      if (size(result.params) > 0 && Array.isArray(result.params)) {
        result?.params?.push(param)
      } else {
        result.params = [param]
      }
    } else if (docKey === 'default') {
      result[docKey] = line.replace('@default', '').trim()
    } else {
      result[docKey] = desc.join(' ').trim()
    }
  })
  return result
}

export const parseComments = (comments?: Comment[]): ParseComment => {
  if (size(comments) === 0) {
    return {}
  }

  let result: ParseComment = {}
  comments?.forEach(item => {
    result = { ...result, ...parseComment(item) }
  })
  return result
}
