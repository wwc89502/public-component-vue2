<template>
  <div id="app">
    <base-form
        ref="formData"
        :option="option"
        :model.sync="form"
        @submit="submitHandle"
    >
      <div slot="addrSlot">
        <el-date-picker
            type="date"
            v-model="form.addr"
            value-format="yyyy-MM-dd"
        ></el-date-picker>
      </div>
    </base-form>
    <div>
      详情模式：
      <el-switch v-model="option.detail"></el-switch>
    </div>
  </div>
</template>

<script>
import BaseForm from '@/components/BaseForm'

export default {
  name: 'App',
  components: {
    BaseForm,
  },
  data() {
    return {
      option: {
        detail: false,
        column: [
          {
            span: 12,
            label: '姓名',
            name: 'name',
            type: 'text',
            maxlength: 8,
            showWordLimit: true,
            placeholder: '输入姓名啊！',
            rules: [
              {required: true, message: '请输入姓名', trigger: 'blur'}
            ]
          },
          {
            span: 12,
            label: '面积',
            name: 'area',
            type: 'text',
            suffix: '㎡',
          },
          {
            span: 12,
            label: '性别',
            name: 'gender',
            type: 'radio',
            button: true,
            dict: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              },
              {
                label: '保密',
                value: 3
              },
            ],
          },
          {
            span: 12,
            label: '性别',
            name: 'gender1',
            type: 'radio',
            dict: [
              {
                label: '男',
                value: 1
              },
              {
                label: '女',
                value: 2
              },
              {
                label: '保密',
                value: 3
              },
            ],
          },
          {
            span: 12,
            label: '学历',
            name: 'education',
            type: 'select',
            dict: [
              {
                label: '大学本科',
                value: 5
              },
              {
                label: '大专',
                value: 4
              },
              {
                label: '高中',
                value: 3
              },
              {
                label: '初中',
                value: 2
              },
              {
                label: '小学',
                value: 1
              }
            ]
          },
          {
            span: 12,
            label: '城市',
            name: 'city',
            type: 'select',
            valueKey: 'value',
            dict: [{
              label: '热门城市',
              options: [{
                value: 'Shanghai',
                label: '上海'
              }, {
                value: 'Beijing',
                label: '北京'
              }]
            }, {
              label: '城市名',
              options: [{
                value: 'Chengdu',
                label: '成都'
              }, {
                value: 'Shenzhen',
                label: '深圳'
              }, {
                value: 'Guangzhou',
                label: '广州'
              }, {
                value: 'Dalian',
                label: '大连'
              }]
            }],
            rules: [
              {required: true, message: '请选择学历', trigger: 'change'}
            ]
          },
          {
            label: 'switch',
            name: 'n2',
            type: 'switch'
          },
          {
            span: 24,
            label: 'checkbox',
            name: 'n1',
            button: true,
            type: 'checkbox',
            max: 2,
            dict: [
              {
                label: '大学本科',
                value: 5
              },
              {
                label: '大专',
                value: 4
              },
              {
                label: '高中',
                value: 3
              },
              {
                label: '初中',
                value: 2
              },
              {
                label: '小学',
                value: 1
              },
            ]
          },
          {
            span: 24,
            label: 'checkbox',
            name: 'n1c',
            type: 'checkbox',
            dict: [
              {
                label: '大学本科',
                value: 5
              },
              {
                label: '大专',
                value: 4
              },
              {
                label: '高中',
                value: 3
              },
              {
                label: '初中',
                value: 2
              },
              {
                label: '小学',
                value: 1
              },
            ]
          },
          {
            label: 'cascader',
            name: 'cascader',
            type: 'cascader',
            props: {multiple: true},
            options: [{
              value: 1,
              label: '东南',
              children: [{
                value: 2,
                label: '上海',
                children: [
                  {value: 3, label: '普陀'},
                  {value: 4, label: '黄埔'},
                  {value: 5, label: '徐汇'}
                ]
              }, {
                value: 7,
                label: '江苏',
                children: [
                  {value: 8, label: '南京'},
                  {value: 9, label: '苏州'},
                  {value: 10, label: '无锡'}
                ]
              }, {
                value: 12,
                label: '浙江',
                children: [
                  {value: 13, label: '杭州'},
                  {value: 14, label: '宁波'},
                  {value: 15, label: '嘉兴'}
                ]
              }]
            }, {
              value: 17,
              label: '西北',
              children: [{
                value: 18,
                label: '陕西',
                children: [
                  {value: 19, label: '西安'},
                  {value: 20, label: '延安'}
                ]
              }, {
                value: 21,
                label: '新疆维吾尔族自治区',
                children: [
                  {value: 22, label: '乌鲁木齐'},
                  {value: 23, label: '克拉玛依'}
                ]
              }]
            }]
          },
          {
            label: 'cascaderPanel',
            name: 'cascaderPanel',
            type: 'cascaderPanel',
            props: {multiple: true},
            options: [{
              value: 1,
              label: '东南',
              children: [{
                value: 2,
                label: '上海',
                children: [
                  {value: 3, label: '普陀'},
                  {value: 4, label: '黄埔'},
                  {value: 5, label: '徐汇'}
                ]
              }, {
                value: 7,
                label: '江苏',
                children: [
                  {value: 8, label: '南京'},
                  {value: 9, label: '苏州'},
                  {value: 10, label: '无锡'}
                ]
              }, {
                value: 12,
                label: '浙江',
                children: [
                  {value: 13, label: '杭州'},
                  {value: 14, label: '宁波'},
                  {value: 15, label: '嘉兴'}
                ]
              }]
            }, {
              value: 17,
              label: '西北',
              children: [{
                value: 18,
                label: '陕西',
                children: [
                  {value: 19, label: '西安'},
                  {value: 20, label: '延安'}
                ]
              }, {
                value: 21,
                label: '新疆维吾尔族自治区',
                children: [
                  {value: 22, label: '乌鲁木齐'},
                  {value: 23, label: '克拉玛依'}
                ]
              }]
            }]
          },
          {
            label: 'slider',
            name: 'slider',
            type: 'slider'
          },
          {
            label: 'year',
            name: 'year',
            type: 'year'
          },
          {
            label: 'month',
            name: 'month',
            type: 'month'
          },
          {
            label: 'date',
            name: 'n3',
            type: 'date'
          },
          {
            label: 'week',
            name: 'week',
            type: 'week',
            pickerOptions: {
              firstDayOfWeek: 1
            }
          },
          {
            label: 'datetime',
            name: 'datetime',
            type: 'datetime'
          },
          {
            label: 'dates',
            name: 'dates',
            type: 'dates'
          },
          {
            label: 'time',
            name: 'n4',
            type: 'time'
          },
          {
            label: 'datetime',
            name: 'n9',
            type: 'datetime'
          },
          {
            span: 24,
            label: 'textarea',
            name: 'n5',
            type: 'textarea'
          },
          {
            label: 'daterange',
            name: 'n6',
            type: 'daterange',
            rangeSeparator: '~'
          },
          {
            label: 'monthrange',
            name: 'n7',
            type: 'monthrange'
          },
          {
            label: 'timerange',
            name: 'n8',
            type: 'timerange'
          },
          {
            span: 10,
            label: 'datetimerange',
            name: 'n10',
            type: 'datetimerange'
          },
          {
            span: 6,
            label: 'color',
            name: 'n11',
            type: 'color',
            showAlpha: true
          },
          {
            label: 'rate',
            name: 'rate',
            type: 'rate',
          },
          {
            label: 'transfer',
            name: 'transfer',
            type: 'transfer',
          },
          {
            label: 'number',
            name: 'n12',
            type: 'number',
          },
          {
            label: 'upload',
            name: 'n13',
            type: 'upload',
            listType: 'text',
            limit: 1,
            tip: '只能上传jpg/png文件，且不超过500kb'
          },
          {
            label: '地址',
            name: 'addr',
            type: 'slot'
          },
        ]
      },
      form: {}
    }
  },
  mounted() {
    this.$refs.formData.getRef('name')?.focus()
  },
  methods: {
    submitHandle(e, done) {
      console.log(e.model)
      setTimeout(() => {
        done()
      }, 1000)
    }
  }
}
</script>
<style>
body {
  margin: 0;
}

#app {
  padding: 20px;
}
</style>
