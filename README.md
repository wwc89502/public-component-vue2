# public-component-vue2

> 直接复制/下载对应组件代码使用即可

## BaseForm

> 基于 element-ui
> 待完成功能：在线字典

```vue
<base-form
  ref="formData"
  :option="option"
  :model.sync="model"
  @submit="submitHandle"
>
  <template slot="addrSlot"></template>
</base-form>
```

```js
export default {
  data() {
    return {
      option: {}, // 表单 Option
      model: {}, // 表单数据 必填
    }
  },
  methods: {
    /**
     * 表单提交后的执行的方法(如定义了rules，会在验证成功后调用)
     * @param e 表单Ref
     * @param done 提交接口请求成功/失败后主动调用
     */
    submitHandle(e, done) {
      console.log(e.model)
      setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
```

#### option
| 参数   | 说明               | 类型   | 可选值 | 默认值 |
| :----- | :----------------: | :----: | :----: | :----: |
| gutter | 表单Item间左右间距 | number |        | 0     |
| marginBottom | 表单Item下间距 | number |  | 22 |
| span | 表单Item占据的列数，每行总24列 | number | 1~24 | 24 |
| labelPosition | 表单域标签的位置，如果值为left时，则需要设置 label-width | string | right/left/top | right |
| labelWidth | 表单域标签的宽度 默认 | string |        | auto |
| labelSuffix | 表单域标签的后缀 | string |        | — |
| hideRequiredAsterisk | 是否隐藏必填字段的标签旁边的红色星号 | boolean | true/false | false |
| showMessage | 是否显示校验错误信息 | boolean | true/false | true |
| inlineMessage | 是否以行内形式展示校验信息 | boolean | true/false | false |
| statusIcon | 是否在输入框中显示校验结果反馈图标 | boolean | true/false | false |
| validateOnRuleChange | 是否在rules属性改变后立即触发一次验证 | boolean | true/false | true |
| size | 用于控制该表单内组件的尺寸 | string | medium / small / mini | — |
| disabled | 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效 | boolean | true/false |false|
| detail | 详情模式，表单不可编辑 | boolean | true/false | false |
| rangeSeparator | 时间范围组件分隔符 | string |        | 至 |
| column | 表单域列表，详细如下 | array |        | [] |

#### column

* 公用

  * span 该表单Item占据的列数，每行总24列
  
  * label 该表单Item的label
  
  * name 该表单Item的name 

  * rules 该表单Item的校验规则
  
  * type 该表单Item的类型(所有的表单组件，如下)
  
    `radio`/`checkbox`/`number`/`select`/`cascader`/`cascaderPanel`/`switch`/`slider`
    /`time`/`year`/`month`/`date`/`dates`/`week`
    /`datetime`/`timerange`/`daterange`/`datetimerange`/`monthrange`
    /`upload`/`rate`/`color`/`transfer`
  
    特殊的type`slot` ：
  
    > column中type设置为`slot`
    >
    > template中slot设置为`${name}Slot`
  
    ```vue
    <template slot="addrSlot">
      <el-input v-model="form.addr" type="text"></el-input>
    </template>
    
    <script>
    export default {
      data () {
        return {
          option: {
            column: [
              {
                label: '地址',
                name: 'addr',
                type: 'slot'
              },
            ]
          }
        }
      }
    }
    </script>
    ```
    
  * suffix 该表单Item的后缀
  
* 私有
  
  > 大部分属性都可参照element-ui文档，属性键名使用驼峰命名
  >
  > ```
  > text-color --> textColor
  > ```
  >
  > 事件设置属性名为：on+事件名(驼峰命名)
  >
  > ```
  > @change --> onChange
  > ```
  >
  > 子组件方法的使用
  >
  > ```js
  > // 通过 BaseForm的 getRef 方法操作表单内项的方法。
  > // getRef 的参数为 option.column 中 name 对应的值
  > this.$refs.formData.getRef('name')?.focus()
  > ```
  
  
