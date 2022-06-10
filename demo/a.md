## slots

| name | desc |
| ---- | ---- |
| customAction | 自定义操作列内容 |
| modal | 弹窗内容 |

## props

| name | type | desc | default | required |
| ---- | ---- | ---- | ------- | -------- |
| crudName | String | 增删改查目标的名称 | "" | false |
| modalFormSchema | Array | 详情弹窗表单字段配置列表 | [] | false |
| modalWidth | String | 详情弹窗宽度 | "1200px" | false |
| modalLabelWidth | String | 详情弹窗表单label宽度 | "300px" | false |
| searchFormSchema | Array | 查询表单字段配置列表 | [] | false |
| colSpan | Number | 查询表单col组件的span属性 | 8 | false |
| columns | Array | 表格列，同 a-table 的 columns 参数 | [] | false |
| rowKey | String \|| null | 表格rowKey 同 a-table 的 rowKey 参数 | "id" | false |
| isSelect | Boolean | 是否可选择 | false | false |
| isDownload | Boolean | 是否可导出 | false | false |
| isDeleteRow | Boolean | 是否可删除单行数据 | false | false |
| isEditRow | Boolean | 是否可编辑单行数据 | false | false |
| isShowRow | Boolean | 是否可查看单行数据 | false | false |
| searchListFunc | Function | 查询列表方法 | () => Promise.resolve() | false |
| searchRowFunc | Function | 查询单行数据方法 | () => Promise.resolve() | false |
| createRowFunc | Function | 添加方法 | () => Promise.resolve() | false |
| updateRowFunc | Function | 更新方法 | () => Promise.resolve() | false |
| deleteRowFunc | Function | 删除方法 | () => Promise.resolve() | false |

## events

| name | desc |
| ---- | ---- |
| downloadClick | 导出按钮点击 |
| createClick | 添加按钮点击 |
| showClick | 查看按钮点击 |
| editClick | 编辑按钮点击 |
| deleteClick | 删除按钮点击 |
| detailChange | 详情数据变更 |

## methods

| name | desc | params | returns |
| ---- | ---- | ------ | ------- |
| create | 添加一行 |  |  |
| edit | 编辑一行 | record: 该行数据 |  |
| show | 查看一行 | record: 该行数据 |  |
| del | 删除一行 | record: 该行数据 |  |

## defineProps
