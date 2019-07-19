# 通用表单组件使用文档

## 使用方式

1. 引入组件

`import commonForm from '@/components/form/CommonForm'`

2. 定义JSON参数

```javascript
const formOptions =  [
    // form item config...
];
const formConfig = {
    modal: 'horizontal',
    onSubmit(v) {
        // form submit...
    },
    validate: {
        // form validate...
    }
};
```

> 注意：参数顺序决定各组件排列顺序

> formConfig.onSubmit说明：若传递此参数，点击submit按钮后将执行此方法；若不传递此参数，将使用Button（submit类型）的onClick方法代替。

> formConfig.validate说明：此参数用于表单校验，以需要校验组件的`name`参数为key；rules参数可以为一个(组)正则表达式，也可以为一个(组)函数；msg参数可以为一条错误信息，也可以为一组错误信息；onError和onSuccess分别为验证错误和验证通过的回调。

3. 定义标签

`<common-form :options="formOptions" @onChange="onFormUpdated" :formConfig="formConfig"></common-form>`

## 通用组件CommonForm参数说明

| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| options | Array | [] | 表单项配置 |
| onChange | Function | null | 表单值变化回调 |
| formConfig | Object | {} | 表单配置参数 |
| formConfig.enctype | String | null | 暂时不需配置 |
| formConfig.modal | String | null | 表单排列方式，默认为纵向排列，当值为`horizontal`时label和表单横向排列，当值为`inline`时表单同行排列 |
| formConfig.onSubmit | Function | null | 表单提交动作 |
| formConfig.validate | Object | {} | 表单验证规则 |

## 表单项配制公共参数

> 表单项配置公共参数为各表单组件必须的参数，在此统一说明。

| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| name | String | '' | 表单组件name，将作为回调对象的key |
| title | String | '' | 表单组件title，是显示在界面上的label文字 |
| require | Boolean | false | 标记此项是否是必填项，若为true则将显示*标识 |
| type | String | '' | 用于设置当前配置项使用的组件 |
| autoErrorMsg | Boolean | true | 用于设置当组件值没有通过验证时，是否自动开启错误视觉标识 |

## Text组件<文本输入框>参数说明

| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| value | String | '' | 文本框value |
| placeHolder | String | '' | 文本框placeHolder |
| disabled | Boolean | false | 是否禁用文本框 |
| clearable | Boolean | false | 是否启用一键清除功能 |
| extClass | String | '' | 自定义扩展class |
| fetchSuggestions | Boolean | false | 是否启用输入建议 |
| triggerOnFocus | Boolean | true | 当启用输入建议时，是否在组件获得焦点时打开输入建议 |
| options | Object[] | [] | 输入建议待选项 |
| onChange | Function | null | 文本框的值变化时将调用 |

## Textarea组件<文本域>参数说明

| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| value | String | '' | 文本域value |
| disabled | String | '' | 是否禁用文本域 |
| placeHolder | String | '' | 文本域placeHolder |
| onChange | Function | null | 文本域的值变化时将调用|

## Radio组件<单选框>参数说明
| prop | type | default | describe |
| ---- | ---- | ------- | -------- |
| value | String | '' | 单选框value |
| disabled | Boolean | false | 是否禁用单选框 |
| options | Object[] | [] | 单选框选项，当值为一维数组时单选项为一组，当值为二级数组时，单选项为多组 |
| onChange | Function | null | 单选框的值变化时将调用，若明确返回false将阻止用户选择，可在此对用户选择进行验证 |

**options 示例**

```javascript
// 单组
[{
    key: 1,
    value: '前端',
    label: '前端',
    disabled: true,
    checked: true
}, {
   key: 2,
   value: '后端',
   label: '后端',
   checked: true
}]

// 多组
[
    [{
        key: 1,
        value: '前端',
        label: '前端',
        disabled: true,
        checked: true
    }],
    [{
        key: 2,
        value: '后端',
        label: '后端',
        checked: true
    }]
]
```

> 注意：目前单选框非HTML表单控件，故提交表单时并不会提交单选框数据!!!

## CheckBox组件<多选框>参数说明

 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | String[] | [] | 多选框value |
 | disabled | Boolean | false | 是否禁用多选框 |
 | options | Object[] | [] | 多选框选项，当值为一维数组时单选项为一组，当值为二级数组时，单选项为多组 |
 | onChange | Function | null | 多选框的值变化时将调用，若明确返回false将阻止用户选择，可在此对用户选择进行验证 |

 > 多选框options结构与单选框一致

 > 注意：目前多选框非HTML表单控件，故提交表单时并不会提交单选框数据!!!

 ## InputButton组件<表单按钮>参数说明

 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | type | String | button | 按钮类型，可选为`submit` |
 | style | String | default | 按钮样式，可选有`default` |
 | text | String | button | 按钮文字，可以是HTML标签 |
 | ghost | Boolean | false | 是否是幽灵按钮<边框按钮> |
 | value | String | '' | 按钮value |
 | disabled | Boolean | false | 是否禁用按钮 |
 | onClick | Function | null | 点击按钮时调用，当按钮类型为`submit`时， |

 > 注意：当按钮类型为`submit`时，点击按钮后，onClick事件会接收表单值作为参数。

 > 注意：text属性可以传递HTML标签进行渲染。

 ## Select组件<下拉选框>参数说明
 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | String|number|Array | '' | 下拉选框value，多选框时为数组 |
 | placeHolder | String | '' | 下拉选框placeHolder |
 | disabled | Boolean | false | 是否禁用下拉选框 |
 | multiple | Boolean | false | 是否启用多选 |
 | collapseTags | Boolean|Number | false | 是否需要折叠多选标签 |
 | checkAll | Boolean | true | 是否启用一键全选功能 |
 | clearable | Boolean | true | 是否启用一键清除功能 |
 | filterable | Boolean | false | 是否启用选项检索功能 |
 | beforeChanged | Function | null | 下拉选框值即将变化时调用 |
 | onChange | Function | null | 下拉选框值变化时调用 |
 | options | Object[] | [] | 下拉选框选项 |

 ## InputNumber组件<数字输入框>参数说明
 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | Number | 0 | 数字输入框值 |
 | step | Number|Float | 1 | 数字输入框+/-步长 |
 | min | Number|Float | 0 | 数字输入框最小值 |
 | max | Number|Float | Infinity | 数字输入框最大值 |
 | size | String | '' | 数字输入框尺寸，可选`small``middle``large` |
 | disabled | Boolean | false | 是否禁用数字输入框 |
 | onChange | Function | null | 数字输入框值变化回调 |

  ## InputRange组件<范围>参数说明
 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | Array | [] | 范围选框value |
 | placeHolder | Array | ['', ''] | 范围选框placeHolder |
 | disabled | Boolean | false | 是否禁用范围选框 |
 | onChange | Function | null | 范围选框值变化时调用 |
 | onStartBlur | Function | null | 范围起始框失去焦点时调用 |
 | onEndBlur | Function | null | 范围终止框失去焦点时调用 |

  ## DateTime组件<时间日期选择器>参数说明
 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | String|Date | '' | 时间日期选择器value，默认当前时间，可以是一个Date对象也可以是一个可以被Date识别的时间字符串 |
 | format | String | 'yyyy-MM-dd HH:mm:ss' | 时间日期选择器时间格式 |
 | readonly | Boolean | false | 时间日期选择器是否是只读的 |
 | disabled | Boolean | false | 是否禁用时间日期选择器 |
 | editable | Boolean | true | 是否可以手动输入时间日期选择器的时间 |
 | onChange | Function | null | 时间日期选择器值变化时回调 |

 ## DateRange组件<时间日期范围>参数说明
 | prop | type | default | describe |
 | ---- | ---- | ------- | -------- |
 | value | String | '' | 范围选择器value，默认当前时间 |
 | curDateTime | String|Date| '' | 范围选择器开始时间，可以是一个Date对象也可以是一个可以被Date识别的时间字符串 |
 | tarDateTime | String|Date | '' | 范围选择器结束时间，可以是一个Date对象也可以是一个可以被Date识别的时间字符串 |
 | splitStr | String | null | 是否禁用范围选择器 |
 | readonly | Boolean | null | 范围选择器是否只读 |
 | disabled | Boolean | null | 是否禁用范围选择器 |
 | editable | Boolean | null | 是否可以手动输入范围选择器的时间 |
 | format | String | 'yyyy-MM-dd HH:mm:ss' | 范围选择器时间格式 |
 | onChange | Function | null | 范围选择器值变化时回调 |

