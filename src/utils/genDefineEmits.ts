import type { GenEventsResult } from '../types'
import type { Identifier, StringLiteral, TSPropertySignature, TSTypeLiteral } from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { parseComment, parseComments } from './tools'

// 提取 defineEmits 文档s
export const genDefineEmits = (eventsNode: StringLiteral): GenEventsResult => {
  let result: GenEventsResult = {}

  if (size(eventsNode.leadingComments) > 0) {
    const commentNode = eventsNode?.leadingComments?.[0]
    if (size(commentNode) > 0) {
      const descContent = commentNode?.value.trim() as string
      if (docIdentifierReg.test(descContent)) {
        const prop = {
          name: String(eventsNode.value),
          ...parseComment(commentNode)
        }
        result = prop
      }
    }
  }

  return result
}

// 提取 defineEmits 文档, typescript
export const genDefineEmitsTypescript = (eventsNode: TSTypeLiteral): GenEventsResult[] => {
  const result: GenEventsResult[] = []

  eventsNode.members?.forEach((member) => {
    if (size(member.leadingComments) > 0) {
      const commentNode = member?.leadingComments
      if (commentNode !== null) {
        const stateMember = member as TSPropertySignature
        const prop: GenEventsResult = {
          name: (stateMember.key as Identifier).name,
          ...parseComments(commentNode)
        }
        result.push(prop)
      }
    }
  })

  return result
}
