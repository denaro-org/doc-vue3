import { type GenEventsResult } from '../types'
import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取事件文档
export const genEvents = (eventsNode): GenEventsResult[] => {
  const result: GenEventsResult[] = []

  eventsNode.value.elements.forEach((node) => {
    if (node.leadingComments && node.leadingComments.length) {
      const commentNode = node.leadingComments[0]
      if (commentNode) {
        const descContent = commentNode.value.trim()
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
