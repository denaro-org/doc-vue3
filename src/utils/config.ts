import type { Config } from '../types'

export const config: Config = { type: 'json' } // json|md|html

export const docIdentifierReg = /^[\s*]*?@doc/
export const docDefaultIdentifierReg = /^[\s*]*?@default/
