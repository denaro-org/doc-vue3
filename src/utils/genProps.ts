import { type GenPropsResult } from '../types'
import { docIdentifierReg } from './config'
import { parseComment, getLocContent } from './tools'

// 提取 props 文档
export const genProps = (propsNode): GenPropsResult[] => {
  const result: GenPropsResult[] = []

  propsNode.value.properties.forEach((node) => {
    if (node.leadingComments && node.leadingComments.length) {
      const commentNode = node.leadingComments[0]
      const descContent = commentNode.value.trim()
      if (docIdentifierReg.test(descContent)) {
        const prop = {
          name: node.key.name,
          ...parseComment(commentNode)
        }
        node.value.properties.forEach((item) => {
          const valueNode = item.value
          let value = valueNode.value ?? valueNode.name ?? valueNode.expression?.name
          if (valueNode.type === 'ArrowFunctionExpression') {
            value = getLocContent(valueNode.body.loc)
          } else {
            value = getLocContent(valueNode.loc)
          }
          prop[item.key.name] = value
        })
        result.push(prop)
      }
    }
  })

  return result
}
