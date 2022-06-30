import { type GenSlotsResult } from '../types'
import { type ElementNode, type TemplateChildNode } from '@vue/compiler-core'
import { docIdentifierReg } from './config'
import { parseComment } from './tools'

// 提取 slots 文档
export const genSlots = (ast: ElementNode): GenSlotsResult[] => {
  const result: GenSlotsResult[] = [];

  (function find (node, index?: number, list?: TemplateChildNode[]) {
    if (node.tag === 'slot') {
      const desc = index && list?.length && list[index - 2]
      if (desc && desc.type === 3) {
        const descContent = desc.content.trim()
        if (docIdentifierReg.test(descContent)) {
          let slot = (node.props.filter((prop) => prop.name === 'name')[0]) as any
          if (!slot) {
            slot = {
              value: {
                content: 'default'
              }
            }
          }
          result.push({
            name: slot?.value.content,
            ...parseComment({ value: descContent })
          })
        }
      }
    }
    if (node.children && node.children.length) {
      node.children.forEach((n, i) => {
        find(n as ElementNode, i, node.children)
      })
    }
  })(ast)

  return result
}
