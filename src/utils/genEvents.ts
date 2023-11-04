import type { GenEventsResult } from '../types'
import type { ArrayExpression, ObjectProperty, StringLiteral } from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取事件文档
export const genEvents = (eventsNode: ObjectProperty): GenEventsResult[] => {
  const result: GenEventsResult[] = []
  const { elements } = eventsNode.value as ArrayExpression

  ;(elements as StringLiteral[]).forEach((node) => {
    if (size(node?.leadingComments) > 0) {
      const commentNode = node?.leadingComments?.[0]
      if (size(commentNode) > 0) {
        const descContent = commentNode?.value.trim() as string
        if (docIdentifierReg.test(descContent)) {
          const prop = {
            name: node.value,
            ...parseComment(commentNode)
          }
          result.push(prop)
        }
      }
    }
  })

  return result
}
