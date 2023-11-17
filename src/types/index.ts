export interface Config {
  type: 'json' | 'md' | 'html'
}

export interface Params {
  desc?: string
  name?: string
}

type ParseCommentParams = Record<
  string,
  string | undefined | boolean | Params[]
>

export interface ParseComment extends ParseCommentParams {
  params?: Params[] | string
}

export interface GenSlotsResult extends ParseComment {
  name?: string
}

export interface GenPropsResult extends ParseComment, ParseCommentParams {
  default?: string
  name?: string
  required?: boolean
  tsType?: string
  type?: string
}

export interface GenMethodsResult extends ParseComment {
  name?: string
}

export interface GenEventsResult extends ParseComment {
  name?: string
  param?: string
}

type GenResult =
  | GenEventsResult[]
  | GenMethodsResult[]
  | GenPropsResult[]
  | GenSlotsResult[]

export interface MdTable {
  headers?: string[]
  rows?: GenResult
}

export interface MdList {
  blockquote?: string
  h2?: string
  table?: MdTable
}

type ResultValue = GenResult | undefined | string

export interface GenJsonResult extends Record<string, ResultValue> {
  defineEmits?: GenEventsResult[]
  defineEmitsTypeParameters?: string
  defineExpose?: GenMethodsResult[]
  defineProps?: GenPropsResult[]
  definePropsTypeParameters?: string
  events?: GenEventsResult[]
  methods?: GenMethodsResult[]
  props?: GenPropsResult[]
  slots?: GenSlotsResult[]
  withDefaults?: GenPropsResult[]
}
