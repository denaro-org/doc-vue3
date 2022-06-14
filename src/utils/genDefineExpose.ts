import {
  type GenMethodsResult
} from '../types'
import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 defineEmits 文档
export const genDefineExpose = (methodsNode): GenMethodsResult => {
  let result: GenMethodsResult = {}

  if (methodsNode.leadingComments && methodsNode.leadingComments.length) {
    const commentNode = methodsNode.leadingComments[0]
    if (commentNode) {
      const descContent = commentNode.value.trim()
      if (docIdentifierReg.test(descContent)) {
        const method = {
          name: methodsNode.key.name,
          ...parseComment(commentNode)
        }
        result = method
      }
    }
  }

  return result
}
