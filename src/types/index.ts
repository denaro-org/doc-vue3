export interface Config {
  type: 'json' | 'md' | 'html'
}

export interface Params {
  name?: string
  desc?: string
}

export interface ParseComment {
  params?: Params[]
}

export interface GenSlotsResult extends Params {
  name?: string
}

export interface GenPropsResult extends Params {
  name?: string
  type?: string
  default?: string
}

export interface GenMethodsResult extends Params {
  name?: string
}

export interface GenEventsResult extends Params {
  name?: string
  param?: string
}

export interface MdTable {
  rows?: string[]
  headers?: string[]
}

export interface MdList {
  h2?: string
  blockquote?: string
  table?: MdTable
}

export interface GenJsonResult {
  slots?: GenSlotsResult[]
  props?: GenPropsResult[]
  defineProps?: GenPropsResult[]
 definePropsTypeParameters ?: string
  withDefaults?: GenPropsResult[]
  events?: GenEventsResult[]
  defineEmits?: GenEventsResult[]
  defineEmitsTypeParameters?: string
  methods?: GenMethodsResult[]
  defineExpose?: GenMethodsResult[]
}
