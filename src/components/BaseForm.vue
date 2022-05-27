<template>
  <el-form
      v-loading="loading"
      ref="formRef"
      :model="model"
      :label-position="option.labelPosition"
      :label-width="option.labelWidth || 'auto'"
      :label-suffix="option.labelSuffix"
      :hide-required-asterisk="option.hideRequiredAsterisk"
      :show-message="option.detail ? false : option.showMessage"
      :inline-message="option.inlineMessage"
      :status-icon="option.statusIcon"
      :validate-on-rule-change="option.validateOnRuleChange"
      :size="option.size"
      :disabled="option.disabled || option.detail"
      :class="{
        detail: option.detail
      }"
  >
    <el-row :gutter="option.gutter">
      <el-col
          :span="item.span || option.span || 24"
          v-for="item in column"
          :key="item.name"
      >
        <el-form-item
            :prop="item.name"
            :label="item.label"
            :label-width="item.labelWidth"
            :required="item.required"
            :rules="item.rules"
            :error="item.error"
            :show-message="item.showMessage"
            :inline-message="item.inlineMessage"
            :size="item.size"
            :style="{
              marginBottom: `${item.marginBottom || option.marginBottom || 22}px`
            }"
        >
          <div class="flex">
            <template v-if="item.type === 'radio'">
              <el-radio-group
                  :disabled="item.disabled"
                  :fill="item.fill"
                  :text-color="item.textColor"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  @change="elHandle(item.onChange, $event)"
              >
                <template v-if="item.button">
                  <el-radio-button
                      v-for="dict in item.dict"
                      :label="dict.value"
                      :key="dict.value"
                      :disabled="item.disabled"
                  >{{ dict.label }}
                  </el-radio-button>
                </template>
                <template v-else>
                  <el-radio
                      v-for="dict in item.dict"
                      :label="dict.value"
                      :key="dict.value"
                      :disabled="item.disabled"
                      :border="item.border"
                  >{{ dict.label }}
                  </el-radio>
                </template>
              </el-radio-group>
            </template>
            <template v-else-if="item.type === 'checkbox'">
              <el-checkbox-group
                  v-if="model[item.name]"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :min="item.min"
                  :max="item.max"
                  :fill="item.fill"
                  :text-color="item.textColor"
                  @change="elHandle(item.onChange, $event)"
              >
                <template v-if="item.button">
                  <el-checkbox-button
                      v-for="dict in item.dict"
                      :label="dict.value"
                      :key="dict.value"
                      :disabled="item.disabled"
                      :checked="item.checked"
                  >{{ dict.label }}
                  </el-checkbox-button>
                </template>
                <template v-else>
                  <el-checkbox
                      v-for="dict in item.dict"
                      :label="dict.value"
                      :key="dict.value"
                      :disabled="item.disabled"
                      :border="item.border"
                      :checked="item.checked"
                      :indeterminate="item.indeterminate"
                  >{{ dict.label }}
                  </el-checkbox>
                </template>
              </el-checkbox-group>
            </template>
            <template v-else-if="item.type === 'number'">
              <el-input-number
                  v-if="!option.detail"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                  :step-strictly="item.stepStrictly"
                  :precision="item.precision"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
                  :controls="item.controls"
                  :controls-position="item.controlsPosition"
                  @change="elHandle(item.onChange, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-input-number>
              <span class="detail-input" v-else>{{ model[item.name] }}</span>
            </template>
            <template v-else-if="item.type === 'select'">
              <el-select
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :multiple="item.multiple"
                  :disabled="item.disabled"
                  :value-key="item.valueKey"
                  :clearable="item.clearable"
                  :collapse-tags="item.collapseTags"
                  :multiple-limit="item.multipleLimit"
                  :autocomplete="item.autocomplete"
                  :placeholder="item.placeholder"
                  :filterable="item.filterable"
                  :allow-create="item.allowCreate"
                  :filter-method="item.filterMethod"
                  :remote="item.remote"
                  :remote-method="item.remoteMethod"
                  :loading="item.loading"
                  :loading-text="item.loadingText"
                  :no-match-text="item.noMatchText"
                  :no-data-text="item.noDataText"
                  :popper-class="item.popperClass"
                  :reserve-keyword="item.reserveKeyword"
                  :default-first-option="item.defaultFirstOption"
                  :popper-append-to-body="item.popperAppendToBody"
                  :automatic-dropdown="item.automaticDropdown"
                  @change="elHandle(item.onChange, $event)"
                  @visible-change="elHandle(item.onVisibleChange, $event)"
                  @remove-tag="elHandle(item.onRemoveTag, $event)"
                  @clear="elHandle(item.onClear, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              >

                <template v-for="group in item.dict">
                  <el-option-group
                      v-if="group.options"
                      :key="group.label"
                      :label="group.label"
                      :disabled="item.disabled"
                  >
                    <el-option
                        v-for="dict in group.options"
                        :key="dict.value"
                        :disabled="item.disabled"
                        :label="dict.label"
                        :value="item.valueKey ? dict : dict.value"
                    ></el-option>
                  </el-option-group>
                  <el-option
                      v-else
                      :disabled="item.disabled"
                      :label="group.label"
                      :value="item.valueKey ? group : group.value"
                      :key="group.value"
                  ></el-option>
                </template>
              </el-select>
            </template>
            <template v-else-if="item.type === 'cascader'">
              <el-cascader
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :options="item.options"
                  :placeholder="item.placeholder"
                  :clearable="item.clearable"
                  :collapse-tags="item.collapseTags"
                  :separator="item.separator"
                  :filterable="item.filterable"
                  :filter-method="item.filterMethod"
                  :debounce="item.debounce"
                  :before-filter="item.beforeFilter"
                  :popper-class="item.popperClass"
                  :show-all-levels="item.showAllLevels"
                  @change="elHandle(item.onChange, $event)"
                  @visible-change="elHandle(item.onVisibleChange, $event)"
                  @remove-tag="elHandle(item.onRemoveTag, $event)"
                  @expand-change="elHandle(item.onExpandChange	, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-cascader>
            </template>
            <template v-else-if="item.type === 'cascaderPanel'">
              <el-cascader-panel
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :options="item.options"
                  :props="item.props"
                  @change="elHandle(item.onChange, $event)"
                  @expand-change="elHandle(item.onExpandChange, $event)"
              ></el-cascader-panel>
            </template>
            <template v-else-if="item.type === 'switch'">
              <el-switch
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :width="item.width"
                  :active-icon-class="item.activeIconClass"
                  :inactive-icon-class="item.inactiveIconClass"
                  :active-text="item.activeText"
                  :inactive-text="item.inactiveText"
                  :active-value="item.activeValue"
                  :inactive-value="item.inactiveValue"
                  :active-color="item.activeColor"
                  :inactive-color="item.inactiveColor"
                  :validate-event="item.validateEvent"
                  @change="elHandle(item.onChange, $event)"
              ></el-switch>
            </template>
            <template v-else-if="item.type === 'slider'">
              <el-slider
                  :style="{
                    width: item.width || '100%'
                  }"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :marks="item.marks"
                  :min="item.min"
                  :max="item.max"
                  :range="item.range"
                  :step="item.step"
                  :show-input="item.showInput"
                  :show-input-controls="item.showInputControls"
                  :show-stops="item.showStops"
                  :show-tooltip="item.showTooltip"
                  :format-tooltip="item.formatTooltip"
                  :vertical="item.vertical"
                  :height="item.height"
                  :label="item.label"
                  :debounce="item.debounce"
                  @change="elHandle(item.onChange, $event)"
                  @input="elHandle(item.onInput, $event)"
              ></el-slider>
            </template>
            <template v-else-if="item.type === 'time'">
              <el-time-picker
                  v-if="!option.detail"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
                  :readonly="item.readonly"
                  :editable="item.editable"
                  :clearable="item.clearable"
                  :arrow-control="item.arrowControl"
                  :align="item.align"
                  :popper-class="item.popperClass"
                  :picker-options="item.pickerOptions"
                  :value-format="item.valueFormat || getValueFormat(item.type)"
                  :default-value="item.defaultValue"
                  :prefix-icon="item.prefixIcon"
                  :clear-icon="item.clearIcon"
                  @change="elHandle(item.onChange, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-time-picker>
              <span class="detail-input" v-else>{{ model[item.name] }}</span>
            </template>
            <template v-else-if="['year', 'month', 'date', 'dates', 'week', 'datetime'].includes(item.type)">
              <el-date-picker
                  v-if="!option.detail"
                  :type="item.type"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :placeholder="item.placeholder"
                  :readonly="item.readonly"
                  :editable="item.editable"
                  :clearable="item.clearable"
                  :format="item.format"
                  :align="item.align"
                  :popper-class="item.popperClass"
                  :picker-options="item.pickerOptions"
                  :default-value="item.defaultValue"
                  :default-time="item.defaultTime"
                  :value-format="item.valueFormat || getValueFormat(item.type)"
                  :prefix-icon="item.prefixIcon"
                  :clear-icon="item.clearIcon"
                  :validate-event="item.validateEvent"
                  @change="elHandle(item.onChange, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-date-picker>
              <template v-else>
                <span class="detail-input" v-if="item.type === 'week'">{{ getWeek(model[item.name]).label }}</span>
                <span class="detail-input" v-else-if="item.type === 'dates'">{{ model[item.name] && model[item.name].join(', ') }}</span>
                <span class="detail-input" v-else>{{ model[item.name] }}</span>
              </template>
            </template>
            <template v-else-if="item.type === 'timerange'">
              <el-time-picker
                  v-if="!option.detail"
                  is-range
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :range-separator="item.rangeSeparator || option.rangeSeparator || '至'"
                  :start-placeholder="item.startPlaceholder || '开始时间'"
                  :end-placeholder="item.endPlaceholder || '结束时间'"
                  :readonly="item.readonly"
                  :editable="item.editable"
                  :clearable="item.clearable"
                  :arrow-control="item.arrowControl"
                  :align="item.align"
                  :popper-class="item.popperClass"
                  :picker-options="item.pickerOptions"
                  :value-format="item.valueFormat || getValueFormat(item.type)"
                  :default-value="item.defaultValue"
                  :prefix-icon="item.prefixIcon"
                  :clear-icon="item.clearIcon"
                  @change="elHandle(item.onChange, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-time-picker>
              <span class="detail-input" v-else>{{ model[item.name] && model[item.name].join(` ${item.rangeSeparator || option.rangeSeparator || '至'} `) }}</span>
            </template>
            <template v-else-if="['daterange', 'datetimerange', 'monthrange'].includes(item.type)">
              <el-date-picker
                  v-if="!option.detail"
                  :type="item.type"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :range-separator="item.rangeSeparator || option.rangeSeparator || '至'"
                  :start-placeholder="item.startPlaceholder || (item.type === 'monthrange' ? '开始月份' : '开始日期')"
                  :end-placeholder="item.endPlaceholder || (item.type === 'monthrange' ? '结束月份' : '结束日期')"
                  :readonly="item.readonly"
                  :editable="item.editable"
                  :clearable="item.clearable"
                  :format="item.format"
                  :align="item.align"
                  :popper-class="item.popperClass"
                  :picker-options="item.pickerOptions"
                  :default-value="item.defaultValue"
                  :default-time="item.defaultTime"
                  :value-format="item.valueFormat || getValueFormat(item.type)"
                  :unlink-panels="item.unlinkPanels"
                  :prefix-icon="item.prefixIcon"
                  :clear-icon="item.clearIcon"
                  :validate-event="item.validateEvent"
                  @change="elHandle(item.onChange, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @focus="elHandle(item.onFocus, $event)"
              ></el-date-picker>
              <span class="detail-input" v-else>{{ model[item.name] && model[item.name].join(` ${item.rangeSeparator || option.rangeSeparator || '至'} `) }}</span>
            </template>
            <template v-else-if="item.type === 'upload'">
              <el-upload
                  :ref="`${item.name}Ref`"
                  :action="item.action || '/'"
                  :headers="item.headers"
                  :data="item.data"
                  :name="item.name"
                  :with-credentials="item.withCredentials"
                  :show-file-list="item.showFileList"
                  :drag="item.drag"
                  :accept="item.accept"
                  :on-preview="item.onPreview"
                  :on-remove="item.onRemove"
                  :on-success="item.onSuccess"
                  :on-error="item.onError"
                  :on-progress="item.onProgress"
                  :on-change="item.onChange"
                  :on-exceed="item.onExceed"
                  :before-upload="item.beforeUpload"
                  :before-remove="item.beforeRemove"
                  :multiple="item.multiple"
                  :list-type="item.listType"
                  :auto-upload="item.autoUpload"
                  :http-request="item.httpRequest"
                  :limit="item.limit"
                  :file-list="model[item.name]"
                  @clearFiles="elHandle(item.onClearFiles, $event)"
                  @abort="elHandle(item.onAbort, $event)"
                  @submit="elHandle(item.onSubmit, $event)"
              >
                <template v-if="item.listType === 'picture-card'">
                  <i class="el-icon-plus"></i>
                  <div slot="tip" class="el-upload__tip" v-if="item.tip">{{ item.tip }}</div>
                </template>
                <template v-else-if="item.listType === 'picture'">
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip" v-if="item.tip">{{ item.tip }}</div>
                </template>
                <template v-else>
                  <el-button size="small" type="primary">点击上传</el-button>
                  <div slot="tip" class="el-upload__tip" v-if="item.tip">{{ item.tip }}</div>
                </template>
              </el-upload>
            </template>
            <template v-else-if="item.type === 'rate'">
              <el-rate
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :max="item.max"
                  :allow-half="item.allowHalf"
                  :low-threshold="item.lowThreshold"
                  :high-threshold="item.highThreshold"
                  :colors="item.colors"
                  :void-color="item.voidColor"
                  :disabled-void-color="item.disabledVoidColor"
                  :icon-classes="item.iconClasses"
                  :void-icon-class="item.voidIconClass"
                  :disabled-void-icon-class="item.disabledVoidIconClass"
                  :show-text="item.showText"
                  :show-score="item.showScore"
                  :text-color="item.textColor"
                  :texts="item.texts"
                  :score-template="item.scoreTemplate"
                  @change="elHandle(item.onChange, $event)"
              ></el-rate>
            </template>
            <template v-else-if="item.type === 'color'">
              <el-color-picker
                  v-if="!option.detail"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :show-alpha="item.showAlpha"
                  :disabled="item.disabled"
                  :color-format="item.colorFormat"
                  :popper-class="item.popperClass"
                  :predefine="item.predefine"
                  @change="elHandle(item.onChange, $event)"
                  @active-change="elHandle(item.onActiveChange, $event)"
              ></el-color-picker>
              <span class="detail-input" v-else><i :style="{background: model[item.name]}"></i>{{ model[item.name] }}</span>
            </template>
            <template v-else-if="item.type === 'transfer'">
              <el-transfer
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :disabled="item.disabled"
                  :data="item.data"
                  :props="item.props"
                  :filterable="item.filterable"
                  :filter-placeholder="item.filterPlaceholder"
                  :filter-method="item.filterMethod"
                  :target-order="item.targetOrder"
                  :titles="item.titles"
                  :button-texts="item.buttonTexts"
                  :render-content="item.renderContent"
                  :format="item.format"
                  :left-default-checked="item.leftDefaultChecked"
                  :right-default-checked="item.rightDefaultChecked"
                  @change="elHandle(item.onChange, $event)"
                  @left-check-change="elHandle(item.onLeftCheckChange, $event)"
                  @right-check-change="elHandle(item.onRightCheckChange, $event)"
              ></el-transfer>
            </template>
            <template v-else-if="item.type === 'slot'">
              <slot :name="`${item.name}Slot`"></slot>
            </template>
            <template v-else>
              <el-input
                  v-if="!option.detail"
                  :type="item.type || 'text'"
                  :disabled="item.disabled"
                  :ref="`${item.name}Ref`"
                  v-model="model[item.name]"
                  :placeholder="item.placeholder"
                  :maxlength="item.maxlength"
                  :show-word-limit="item.showWordLimit"
                  :clearable="item.clearable"
                  :show-password="item.showPassword"
                  :prefix-icon="item.prefixIcon"
                  :suffix-icon="item.suffixIcon"
                  :rows="item.rows"
                  :autosize="item.autosize"
                  :autocomplete="item.autocomplete"
                  :resize="item.resize"
                  :autofocus="item.autofocus"
                  @change="elHandle(item.onChange, $event)"
                  @focus="elHandle(item.onFocus, $event)"
                  @blur="elHandle(item.onBlur, $event)"
                  @input="elHandle(item.onInput, $event)"
                  @clear="elHandle(item.onClear, $event)"
              ></el-input>
              <span class="detail-input" v-else>{{ model[item.name] }}</span>
            </template>
            <span v-if="item.suffix" class="suffix">{{ item.suffix }}</span>
          </div>
        </el-form-item>
      </el-col>
      <el-col v-if="!option.detail">
        <el-form-item>
          <el-button type="primary" @click="submitForm('formRef')">{{ option.submitText || '提交' }}</el-button>
          <el-button @click="resetForm('formRef')">{{ option.resetText || '重置' }}</el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form>
</template>

<script>
import { getWeekNumber } from "element-ui/src/utils/date-util";
export default {
  props: {
    option: {
      type: Object,
      default() {
        return {}
      }
    },
    model: {
      required: true,
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      loading: false,

      column: [],
    }
  },
  created() {
    this.initForm(false)
    // form-item [placeholder]
    this.column = this.option.column?.map(item => {
      let placeholder = ''
      if (['select', 'date', 'time', 'datetime', 'cascader'].includes(item.type)) {
        placeholder = `请选择${item.label}`
      } else if (['number'].includes(item.type)) {
        placeholder = ''
      } else {
        placeholder = `请输入${item.label}`
      }
      placeholder = item.placeholder || placeholder
      return {
        ...item,
        placeholder
      }
    })

  },
  methods: {
    initForm(isClear) {
      this.option.column?.forEach(item => {
        if (item.type === 'checkbox') {
          let val = isClear ? [] : this.model[item.name]
          this.$emit('update:model', {
            ...this.model,
            [item.name]: val || []
          })
        }
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          this.$emit('submit', this.$refs[formName], () => {
            this.loading = false
          })
        } else {
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.initForm(true)
    },
    getValueFormat(type) {
      let valueFormat = ''
      switch (type) {
        case 'year':
          valueFormat = 'yyyy'
          break
        case 'month':
        case 'monthrange':
          valueFormat = 'yyyy-MM'
          break
        case 'date':
        case 'dates':
        case 'daterange':
          valueFormat = 'yyyy-MM-dd'
          break
        case 'datetime':
        case 'datetimerange':
          valueFormat = 'yyyy-MM-dd HH:mm:ss'
          break
        case 'time':
        case 'timerange':
          valueFormat = 'HH:mm:ss'
          break
      }
      return valueFormat
    },
    elHandle(handle, e) {
      if (handle) handle(e)
    },
    getRef(name) {
      return this.$refs[`${name}Ref`]?.[0]
    },
    getWeek(src) {
      let label = ''
      let value = ''
      if (src) {
        const date = new Date(src)
        value = getWeekNumber(date)
        const year = new Date(date.getTime() - 3 * 24 * 60 * 60 * 1000).getFullYear()
        label = `${year}w${value > 9 ? value : '0' + value}`
      }
      return {
        label,
        value
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  ::v-deep .el-form-item {
    .el-form-item__content {
      .flex {
        display: flex;
        align-items: center;
        min-height: 40px;

        .suffix {
          margin-left: 4px;
        }
      }

      .el-input,
      .el-select {
        display: block;
        width: 100%;

        .el-input__inner {
          display: block;
        }
      }

      .el-date-editor,
      .el-range-editor {
        width: 100%;
      }

      .el-range-editor.el-input__inner {
        display: flex;
      }
    }
    &.el-form-item--medium {
      .el-form-item__content {
        .flex {
          min-height: 36px;
        }
      }
    }
    &.el-form-item--small {
      .el-form-item__content {
        .flex {
          min-height: 32px;
        }
      }
    }
    &.el-form-item--mini {
      .el-form-item__content {
        .flex {
          min-height: 28px;
        }
      }
    }
  }
  &.detail {
    ::v-deep .el-form-item {
      .detail-input {
        padding-left: 15px;
        display: flex;
        align-items: center;
        i {
          width: 12px;
          height: 12px;
          display: inline-block;
          margin-right: 4px;
        }
      }
      .el-radio-button__orig-radio:checked+.el-radio-button__inner {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        box-shadow: -1px 0 0 0 #409eff;
        opacity: .6;
      }
      .el-checkbox-button.is-checked .el-checkbox-button__inner {
        color: #FFF;
        background-color: #409EFF;
        border-color: #409EFF;
        box-shadow: -1px 0 0 0 #8cc5ff;
        opacity: .6;
      }
      .el-cascader,
      .el-select {
        display: inline-block;

        .el-input__inner {
          display: inline-block;
          border: 0;
          color: #333;
          background: transparent;
          resize: none;
          &::placeholder {
            color: transparent;
          }
        }
        .el-input__suffix {
          display: none;
        }
      }
      .el-upload {
        display: none;
      }
      .el-upload__tip {
        display: none;
      }
    }
  }
}
</style>
