import type { GenSlotsResult } from '../types'
import type { Comment } from '@babel/types'
import type { AttributeNode, ElementNode, TemplateChildNode } from '@vue/compiler-core'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 slots 文档
export const genSlots = (ast: ElementNode): GenSlotsResult[] => {
  const result: GenSlotsResult[] = []

  ;(function find (node, index?: number, list?: TemplateChildNode[]) {
    if (node.tag === 'slot') {
      const desc = (index !== null && list instanceof Array && list[Number(index) - 2]) as TemplateChildNode

      if (desc !== null && desc?.type === 3) {
        const descContent = desc.content.trim()
        if (docIdentifierReg.test(descContent)) {
          const slot = node.props.filter((prop) => prop.name === 'name')[0] as AttributeNode

          const commentPayload: Comment = {
            type: 'CommentBlock',
            value: descContent
          }

          result.push({
            name: slot?.value?.content,
            ...parseComment(commentPayload)
          })
        }
      }
    }
    if (size(node.children) > 0) {
      node.children.forEach((n, i) => {
        find(n as ElementNode, i, node.children)
      })
    }
  })(ast)

  return result
}
