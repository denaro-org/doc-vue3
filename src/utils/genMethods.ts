import {
  type GenMethodsResult
} from '../types'
import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 methods 文档
export const genMethods = (methodsNode): GenMethodsResult[] => {
  const result: GenMethodsResult[] = []

  methodsNode.value.properties.forEach((node) => {
    if (node.leadingComments && node.leadingComments.length) {
      const commentNode = node.leadingComments[0]
      const descContent = commentNode.value.trim()
      if (docIdentifierReg.test(descContent)) {
        const method = {
          name: node.key.name,
          ...parseComment(commentNode)
        }
        result.push(method)
      }
    }
  })

  return result
}
