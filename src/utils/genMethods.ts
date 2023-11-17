import type { GenMethodsResult } from '../types'
import type { Identifier, ObjectExpression, ObjectProperty } from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 methods 文档
export const genMethods = (methodsNode: ObjectProperty): GenMethodsResult[] => {
  const result: GenMethodsResult[] = []
  const { properties } = methodsNode.value as ObjectExpression

  ;(properties as ObjectProperty[]).forEach(node => {
    if (size(node.leadingComments) > 0) {
      const commentNode = node?.leadingComments?.[0]
      if (size(commentNode) > 0) {
        const descContent = commentNode?.value.trim() as string
        if (docIdentifierReg.test(descContent)) {
          const nodeKey = node.key as Identifier

          const method = {
            name: nodeKey.name,
            ...parseComment(commentNode)
          }
          result.push(method)
        }
      }
    }
  })

  return result
}
