import type { GenPropsResult } from '../types'
import type {
  Identifier,
  ObjectExpression,
  ObjectProperty,
  SourceLocation,
  StringLiteral,
  TSPropertySignature,
  TSTypeAnnotation,
  TSTypeLiteral
} from '@babel/types'

import { size } from 'lodash'

import { docIdentifierReg } from './config'
import { getLocContent, parseComment, parseComments } from './tools'

// 提取 defineProps 文档
export const genDefineProps = (propsNode: ObjectProperty): GenPropsResult => {
  let result: GenPropsResult = {}

  if (size(propsNode.leadingComments) > 0) {
    const commentNode = propsNode?.leadingComments?.[0]
    const descContent = commentNode?.value?.trim() as string
    if (docIdentifierReg.test(descContent)) {
      const nodeKey = propsNode.key as Identifier

      const prop: GenPropsResult = {
        name: nodeKey.name,
        ...parseComment(commentNode)
      }
      const valueNode = propsNode.value as ObjectExpression
      ;(valueNode.properties as ObjectProperty[]).forEach((item) => {
        const valueNode = item.value
        const itemNodeKey = item.key as Identifier

        if (size(valueNode) > 0) {
          let value = (valueNode as StringLiteral)?.value ?? (valueNode as Identifier).name
          if (valueNode?.type === 'ArrowFunctionExpression') {
            value = getLocContent(valueNode?.body?.loc as SourceLocation)
          } else {
            value = getLocContent(valueNode?.loc as SourceLocation)
          }

          prop[itemNodeKey.name] = value

          if (itemNodeKey.name === 'type' && value.includes('as')) {
            const [type, tsType] = value.split('as')
            prop.type = type.trim()
            prop.tsType = tsType.trim()
          }
        }
      })
      result = prop
    }
  }

  return result
}

// 提取 defineProps 文档, typescript
export const genDefinePropsTypescript = (propsNode: TSTypeLiteral): GenPropsResult[] => {
  const result: GenPropsResult[] = []

  propsNode.members?.forEach((member) => {
    if (size(member.leadingComments) > 0) {
      const commentNode = member?.leadingComments
      if (commentNode !== null) {
        const stateMember = member as TSPropertySignature
        const prop: GenPropsResult = {
          name: (stateMember.key as Identifier).name,
          ...parseComments(commentNode)
        }

        const typeAnnotation = member.typeAnnotation as TSTypeAnnotation
        if (typeAnnotation?.type === 'TSTypeAnnotation') {
          const tsType = getLocContent(typeAnnotation.loc as SourceLocation)
          prop.tsType = tsType.replace(/\?:/, '').trim()

          if (prop.tsType.startsWith(': ')) {
            prop.required = true
            prop.tsType = prop.tsType.replace(':', '').trim()
          }
        }

        result.push(prop)
      }
    }
  })

  return result
}
