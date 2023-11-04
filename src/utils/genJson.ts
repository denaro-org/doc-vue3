import type { GenJsonResult } from '../types'
import type {
  ArrayExpression,
  CallExpression,
  Identifier,
  ObjectExpression,
  ObjectProperty,
  StringLiteral,
  TSTypeLiteral
} from '@babel/types'
import type { ElementNode } from '@vue/compiler-core'

import traverse from '@babel/traverse'
import { forEach, size, uniqBy } from 'lodash'

import { genDefineEmits, genDefineEmitsTypescript } from './genDefineEmits'
import { genDefineExpose } from './genDefineExpose'
import { genDefineProps, genDefinePropsTypescript } from './genDefineProps'
import { genEvents } from './genEvents'
import { genMethods } from './genMethods'
import { genProps } from './genProps'
import { genSlots } from './genSlots'
import { parseScriptAST, parseSFC } from './tools'

export const traverseDefineComponent = (callNode: CallExpression, json: GenJsonResult): GenJsonResult => {
  const argNode = callNode.arguments[0] as ObjectExpression

  if (argNode.type !== 'ObjectExpression') return json

  argNode.properties.forEach((optionNode) => {
    const stateOptionNode = optionNode as ObjectProperty
    const { name: optionNodeName } = stateOptionNode.key as Identifier

    switch (optionNodeName) {
      case 'props':
        json.props = genProps(stateOptionNode)
        break
      case 'methods':
        json.methods = genMethods(stateOptionNode)
        break
      case 'emits':
        json.events = genEvents(stateOptionNode)
        break
      default:
        break
    }
  })
  return json
}

export const traverseDefineProps = (callNode: CallExpression, json: GenJsonResult): GenJsonResult => {
  const argNode = callNode.arguments[0] as ObjectExpression
  json.defineProps = []

  callNode?.typeParameters?.params?.forEach((optionNode) => {
    json.defineProps = genDefinePropsTypescript(optionNode as TSTypeLiteral)

    if (optionNode?.type === 'TSTypeReference') {
      json.definePropsTypeParameters = (optionNode?.typeName as Identifier)?.name
    }
  })

  argNode?.properties?.forEach((optionNode) => {
    json.defineProps?.push(genDefineProps(optionNode as ObjectProperty))
  })

  json.defineProps = uniqBy(json.defineProps, 'name').filter((item) => Object.keys(item).length)

  return json
}

export const traverseDefineEmits = (callNode: CallExpression, json: GenJsonResult): GenJsonResult => {
  const argNode = callNode.arguments[0] as ArrayExpression
  json.defineEmits = []

  callNode?.typeParameters?.params?.forEach((optionNode) => {
    json.defineEmits = genDefineEmitsTypescript(optionNode as TSTypeLiteral)

    if (optionNode?.type === 'TSTypeReference') {
      json.defineEmitsTypeParameters = (optionNode?.typeName as Identifier)?.name
    }
  })

  if (argNode?.type === 'ArrayExpression') {
    (argNode?.elements as StringLiteral[]).forEach((optionNode) => {
      json.defineEmits?.push(genDefineEmits(optionNode))
    })
  }

  json.defineEmits = uniqBy(json.defineEmits, 'name').filter((item) => Object.keys(item).length)

  return json
}

export const traverseDefineExpose = (callNode: CallExpression, json: GenJsonResult): GenJsonResult => {
  const argNode = callNode.arguments[0] as ObjectExpression
  json.defineExpose = []

  argNode?.properties?.forEach((optionNode) => {
    json.defineExpose?.push(genDefineExpose(optionNode as ObjectProperty))
  })

  json.defineExpose = uniqBy(json.defineExpose, 'name').filter((item) => Object.keys(item).length)

  return json
}

export const genJson = (code: string): GenJsonResult => {
  const { template, script, scriptSetup } = parseSFC(code).descriptor

  const json: GenJsonResult = { slots: genSlots(template?.ast as ElementNode) }

  try {
    if ((script?.content ?? scriptSetup?.content) !== null) {
      const scriptAST = parseScriptAST(script?.content ?? scriptSetup?.content)
      traverse(scriptAST, {
        CallExpression (p) {
          const callNode: CallExpression = p.node
          const { name: callNodeName } = callNode.callee as Identifier
          switch (callNodeName) {
            case 'defineComponent':
              traverseDefineComponent(callNode, json)
              break

            case 'defineProps':
              traverseDefineProps(callNode, json)
              break

            case 'defineEmits':
              traverseDefineEmits(callNode, json)
              break

            case 'defineExpose':
              traverseDefineExpose(callNode, json)
              break

            default:
              break
          }
        }
      })
    }
  } catch (e) {
    throw new Error('解析失败，请检查代码是否符合规范')
  }

  const resultJson = {}
  forEach(json, (value, key) => {
    if (size(value) > 0) {
      resultJson[key] = value
    }
  })

  return resultJson
}
