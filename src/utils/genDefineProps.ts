import { type GenPropsResult } from '../types'
import { docIdentifierReg } from './config'
import { parseComment, getLocContent } from './tools'

// 提取 defineProps 文档
export const genDefineProps = (propsNode): GenPropsResult => {
  let result: GenPropsResult = {}

  if (propsNode.leadingComments && propsNode.leadingComments.length) {
    const commentNode = propsNode.leadingComments[0]
    const descContent = commentNode.value.trim()
    if (docIdentifierReg.test(descContent)) {
      const prop = {
        name: propsNode.key.name,
        ...parseComment(commentNode)
      }
      propsNode.value.properties.forEach((item) => {
        const valueNode = item.value
        if (valueNode) {
          let value = valueNode.value ?? valueNode.name ?? valueNode.expression?.name
          if (valueNode.type === 'ArrowFunctionExpression') {
            value = getLocContent(valueNode.body.loc)
          } else {
            value = getLocContent(valueNode.loc)
          }
          prop[item.key.name] = value
        }
      })
      result = prop
    }
  }

  return result
}

// 提取 defineProps 文档, typescript
export const genDefinePropsTypescript = (propsNode): GenPropsResult[] => {
  const result: GenPropsResult[] = []

  propsNode.members?.forEach(member => {
    if (member.leadingComments && member.leadingComments.length) {
      const commentNode = member.leadingComments[0]
      const descContent = commentNode.value.trim()
      if (docIdentifierReg.test(descContent)) {
        const prop = {
          name: member.key.name,
          type: '',
          default: '',
          desc: '',
          ...parseComment(commentNode)
        }

        let value = ''
        if (member.typeAnnotation.type === 'TSTypeAnnotation') {
          value = getLocContent(member.typeAnnotation.loc)
        }
        prop.desc = value
          .replace(': ', '')
          .replace(/\|/g, '\\|')

        result.push(prop)
      }
    }
  })

  return result
}
