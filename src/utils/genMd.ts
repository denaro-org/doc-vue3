import {
  type MdTable,
  type MdList
} from '../types'
import { genJson } from './genJson'
import json2md from 'json2md'

export const genMd = (code: string): string => {
  const json = genJson(code)
  // console.log(json)
  const mdList: MdList[] = []

  Object.keys(json).forEach(key => {
    !['defineEmitsTypeParameters', 'definePropsTypeParameters'].includes(key) && mdList.push({ h2: key })
    if (['defineEmitsTypeParameters', 'definePropsTypeParameters'].includes(key) && json[key]) {
      mdList.push({ blockquote: `types:【${json[key]}】` })
    } else {
      const docs = json[key]
      if (docs && docs.length) {
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
            table.headers = ['name', 'type', 'desc', 'default', 'required']
            break
          case 'methods':
          case 'defineExpose':
            table.headers = ['name', 'desc', 'params', 'returns']
            break
          default:
            break
        }
        docs.forEach(doc => {
          if (['methods', 'defineExpose'].includes(key) && doc.params && doc.params.length) {
            doc.params = doc.params.map(param => {
              return `${param.name}: ${param.desc}`
            }).join('</br>')
          }
          doc.params = doc.params || ''
          doc.default = doc.default || ''
          doc.required = doc.required || 'false'
          doc.type = doc.type || ''
          doc.returns = doc.returns || ''
          table.rows && table.rows.push(doc)
        })
      }
    }
  })

  return json2md(mdList)
}
