import type { GenPropsResult } from '../types'
import type { Identifier, ObjectExpression, ObjectProperty, SourceLocation, StringLiteral } from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { getLocContent, parseComment } from './tools'

// 提取 props 文档
export const genProps = (propsNode: ObjectProperty): GenPropsResult[] => {
  const result: GenPropsResult[] = []
  const { properties } = propsNode.value as ObjectExpression

  ;(properties as ObjectProperty[]).forEach((node) => {
    if (size(node.leadingComments) > 0) {
      const commentNode = node?.leadingComments?.[0]
      if (size(commentNode) > 0) {
        const descContent = commentNode?.value.trim() as string
        if (docIdentifierReg.test(descContent)) {
          const nodeKey = node.key as Identifier

          const prop: GenPropsResult = {
            name: nodeKey.name,
            ...parseComment(commentNode)
          }

          const nodeValue = node.value as ObjectExpression
          ;(nodeValue.properties as ObjectProperty[]).forEach((item) => {
            const valueNode = item.value
            const itemNodeKey = item.key as Identifier

            let value = (valueNode as StringLiteral)?.value ?? (valueNode as Identifier).name

            if (valueNode?.type === 'ArrowFunctionExpression') {
              value = getLocContent(valueNode?.body?.loc as SourceLocation)
            } else {
              value = getLocContent(valueNode?.loc as SourceLocation)
            }
            prop[itemNodeKey.name] = value
          })

          result.push(prop)
        }
      }
    }
  })

  return result
}
