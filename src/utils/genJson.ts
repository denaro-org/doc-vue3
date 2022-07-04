import { type GenJsonResult } from '../types'
import { parseSFC, parseScriptAST } from './tools'
import { type ElementNode } from '@vue/compiler-core'
import { genSlots } from './genSlots'
import traverse from '@babel/traverse'
import { genProps } from './genProps'
import { genMethods } from './genMethods'
import { genEvents } from './genEvents'
import { genDefineProps, genDefinePropsTypescript } from './genDefineProps'
import { genDefineEmits, genDefineEmitsTypescript } from './genDefineEmits'
import { genDefineExpose } from './genDefineExpose'
import { uniqBy, unionBy, forEach } from 'lodash'

export const genJson = (code: string): GenJsonResult => {
  const { template, script, scriptSetup } = parseSFC(code).descriptor
  const scriptAST = parseScriptAST(script?.content || scriptSetup?.content)
  const json: GenJsonResult = {
    slots: genSlots((template?.ast as ElementNode))
  }

  traverse(scriptAST, {
    CallExpression (p) {
      const callNode = p.node
      if (callNode.callee.name === 'defineComponent') {
        const argNode = callNode.arguments[0]
        argNode.properties.forEach((optionNode) => {
          switch (optionNode.key.name) {
            case 'props':
              json.props = genProps(optionNode)
              break
            case 'methods':
              json.methods = genMethods(optionNode)
              break
            case 'emits':
              json.events = genEvents(optionNode)
              break
            default:
              break
          }
        })
      }

      if (callNode.callee.name === 'defineProps') {
        const argNode = callNode.arguments[0]
        json.defineProps = []

        json.definePropsTypeParameters = callNode?.typeParameters?.params
          ?.find(i => i.type === 'TSTypeReference')?.typeName.name

        callNode?.typeParameters?.params?.forEach((optionNode) => {
          json.defineProps = genDefinePropsTypescript(optionNode)
        })

        argNode?.properties?.forEach((optionNode) => {
          json.defineProps?.push(genDefineProps(optionNode))
        })

        json.defineProps = uniqBy(json.defineProps, 'name')
          .filter(item => Object.keys(item).length)
      }

      if (callNode.callee.name === 'defineEmits') {
        const argNode = callNode.arguments[0]
        json.defineEmits = []

        json.defineEmitsTypeParameters = callNode?.typeParameters?.params
          ?.find(i => i.type === 'TSTypeReference')?.typeName.name

        callNode?.typeParameters.params.forEach((optionNode) => {
          json.defineEmits?.push(genDefineEmitsTypescript(optionNode))
        })

        argNode?.elements.forEach((optionNode) => {
          json.defineEmits?.push(genDefineEmits(optionNode))
        })

        json.defineEmits = uniqBy(json.defineEmits, 'name')
          .filter(item => Object.keys(item).length)
      }

      if (callNode.callee.name === 'defineExpose') {
        const argNode = callNode.arguments[0]
        json.defineExpose = []

        argNode?.properties.forEach((optionNode) => {
          json.defineExpose?.push(genDefineExpose(optionNode))
        })
      }
    }
  })

  json.defineProps = unionBy(json.withDefaults, json.defineProps, 'name')
  delete json.withDefaults
  if (!json.defineEmitsTypeParameters) delete json.defineEmitsTypeParameters

  const resultJson = {}
  forEach(json, (value, key) => {
    if (value && value.length) {
      resultJson[key] = value
    }
  })

  return resultJson
}
