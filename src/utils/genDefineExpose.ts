import type { GenMethodsResult } from '../types'
import type { ObjectProperty } from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 defineEmits 文档
export const genDefineExpose = (methodsNode: ObjectProperty): GenMethodsResult => {
  let result: GenMethodsResult = {}

  if (size(methodsNode.leadingComments) > 0) {
    const commentNode = methodsNode?.leadingComments?.[0]
    if (commentNode !== null) {
      const descContent = commentNode?.value?.trim() as string
      if (docIdentifierReg.test(descContent)) {
        const method = {
          name: String(methodsNode.value),
          ...parseComment(commentNode)
        }
        result = method
      }
    }
  }

  return result
}
