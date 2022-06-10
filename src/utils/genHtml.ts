import { marked } from 'marked'
import { genMd } from './genMd'

export const genHtml = (code: string): string => {
  return marked.parse(genMd(code))
}
