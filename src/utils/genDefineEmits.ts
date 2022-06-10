import { type GenEventsResult } from '../types'
import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 defineEmits 文档
export const genDefineEmits = (eventsNode): GenEventsResult => {
  let result: GenEventsResult = {}

  if (eventsNode.leadingComments && eventsNode.leadingComments.length) {
    const commentNode = eventsNode.leadingComments[0]
    const descContent = commentNode.value.trim()
    if (docIdentifierReg.test(descContent)) {
      const prop = {
        name: eventsNode.value,
        ...parseComment(commentNode)
      }
      result = prop
    }
  }

  return result
}

// 提取 defineEmits 文档, typescript
export const genDefineEmitsTypescript = (eventsNode): GenEventsResult => {
  let result: GenEventsResult = {}

  eventsNode.members?.forEach(member => {
    if (member.leadingComments && member.leadingComments.length) {
      const commentNode = member.leadingComments[0]
      const descContent = commentNode.value.trim()
      if (docIdentifierReg.test(descContent)) {
        const prop = {
          name: member.parameters[0].typeAnnotation.typeAnnotation.literal.value,
          ...parseComment(commentNode)
        }
        result = prop
      }
    }
  })

  return result
}
