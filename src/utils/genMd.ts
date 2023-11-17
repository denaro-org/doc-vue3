import type { MdList, MdTable } from '../types'

import json2md from 'json2md'
import { size } from 'lodash'

import { genJson } from './genJson'

export const genMd = (code: string): string => {
  const json = genJson(code)
  const mdList: MdList[] = []

  Object.keys(json).forEach(key => {
    mdList.push({ h2: key })

    if (
      ['defineEmitsTypeParameters', 'definePropsTypeParameters'].includes(
        key
      ) &&
      json[key] !== null
    ) {
      mdList.push({ blockquote: `types:【${json[key] as string}】` })
    } else {
      const docs = json[key]
      if (size(docs) > 0) {
        const table: MdTable = { rows: [] }
        mdList.push({ table })
        switch (key) {
          case 'slots':
          case 'events':
          case 'defineEmits':
            table.headers = ['name', 'desc']
            break
          case 'props':
          case 'defineProps':
            table.headers = [
              'name',
              'type',
              'tsType',
              'required',
              'desc',
              'default'
            ]
            break
          case 'methods':
          case 'defineExpose':
            table.headers = ['name', 'desc', 'params', 'returns']
            break
          default:
            break
        }
        if (Array.isArray(docs)) {
          docs.forEach(doc => {
            if (doc === undefined) return

            if (
              ['methods', 'defineExpose'].includes(key) &&
              size(doc.params) > 0 &&
              Array.isArray(doc.params)
            ) {
              doc.params = doc?.params
                ?.map(param => {
                  return `${param.name}: ${param.desc}`
                })
                .join('</br>')
            }
            doc.params = doc.params ?? '-'
            doc.default = doc.default ?? '-'
            doc.required = String(doc.required) ?? 'false'
            doc.type = doc.type ?? '-'
            doc.tsType = doc.tsType ?? '-'
            doc.returns = doc.returns ?? '-'
            table.rows?.push(doc)
          })
        }
      }
    }
  })

  return Array.isArray(mdList) ? json2md(mdList) : ''
}
