## slots

| name | desc |
| ---- | ---- |
| customAction | 自定义操作列内容 |
| modal | 弹窗内容 |

## defineProps

| name | type | tsType | required | desc | default |
| ---- | ---- | ------ | -------- | ---- | ------- |
| crudName | - | string | true | 增删改查目标的名称 | '' |
| modalFormSchema | - | unknown[] | undefined | 详情弹窗表单字段配置列表 | () => [] |
| modalWidth | - | string | undefined | 详情弹窗宽度 | '1200px' |
| modalLabelWidth | - | string | undefined | 详情弹窗表单label宽度 | '300px' |
| searchFormSchema | - | unknown[] | undefined | 查询表单字段配置列表 | () => [] |
| colSpan | - | number | undefined | 查询表单col组件的span属性 | 8 |
| columns | - | unknown[] | undefined | 表格列，同 a-table 的 columns 参数 | () => [] |
| rowKey | - | string \| null | undefined | 表格rowKey 同 a-table 的 rowKey 参数 | 'id' |
| isSelect | - | boolean | undefined | 是否可选择 | false |
| isDownload | - | boolean | undefined | 是否可导出 | false |
| isDeleteRow | - | boolean | undefined | 是否可删除单行数据 | false |
| isEditRow | - | boolean | undefined | 是否可编辑单行数据 | false |
| isShowRow | - | boolean | undefined | 是否可查看单行数据 | false |
| searchListFunc | - | () => Promise<void> | undefined | 查询列表方法 | () => Promise.resolve() |
| searchRowFunc | - | () => Promise<void> | undefined | 查询单行数据方法 | () => Promise.resolve() |
| createRowFunc | - | () => Promise<void> | undefined | 添加方法 | () => Promise.resolve() |
| updateRowFunc | - | () => Promise<void> | undefined | 更新方法 | () => Promise.resolve() |
| deleteRowFunc | - | () => Promise<void> | undefined | 删除方法 | () => Promise.resolve() |

## defineEmits

| name | desc |
| ---- | ---- |
| downloadClick | 导出按钮点击 |
| createClick | 添加按钮点击 |
| showClick | 查看按钮点击 |
| editClick | 编辑按钮点击 |
| deleteClick | 删除按钮点击 |
| detailChange | 详情数据点击 |
