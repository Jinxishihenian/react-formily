import {createForm, onFieldInit, onFieldValueChange} from "@formily/core";
import {Card, ConfigProvider} from "antd";
import {
    DatePicker,
    Form,
    FormButtonGroup,
    FormGrid,
    FormItem,
    Input,
    Reset,
    Select,
    Space,
    Submit,
    TimePicker,
} from "@formily/antd-v5";
import {createSchemaField} from '@formily/react'
// import {InfoCircleOutlined} from '@ant-design/icons';

const form = createForm({
    validateFields: true,
    validateFirst: true,
    // 副作用.
    // 将逻辑进行集中处理.
    effects: () => {
        console.log('初始时就开始加载异步数据源');
        // 刚开始时,数据源加载下拉默认时loading状态.
        // 触发时机:当表单或字段第一次初始化执行(组件挂载后)
        onFieldInit("ywy_yb_pt", (field) => {
            // 初始时加载loading.
            field.loading = true;
            setTimeout(() => {
                console.log('三秒后加载完成');
                // 模拟赋值.
                field.dataSource = [
                    {value: 'wss1', label: 'wss1'},
                    {value: 'wss2', label: 'wss2'},
                    {value: 'wss3', label: 'wss3'},
                    {value: 'wss4', label: 'wss4'},
                    {value: 'wss5', label: 'wss5'},
                    {value: 'wss6', label: 'wss6'},
                ];
                field.loading = false;
            }, 3000);
        });

        onFieldValueChange("format_type", (field) => {
            const format_type = field.query('format_type').value();

            const dynamic_date = field.query('birthday').take();

            if (dynamic_date) {
                dynamic_date.setComponent(format_type === "time" ? "TimePicker" : "DatePicker");
                dynamic_date.value = undefined;
                dynamic_date.componentProps.placeholder = format_type === 'date' ? '请选择日期' : '请选择时间';
            }
        });

        // 它是建立在对字段状态变化的侦测监听上,形势类似Mobx的autorun.
        // onFieldReact("hobby", (field) => {
        //     TODO 只有内部依赖的值变化时才会被监听.
        //     const ywy = field.query('ywy_yb_pt').value(); // 读取依赖字段 ywy_yb_pt
        //     console.log('hobby 被触发，同时 ywy_yb_pt 值为:', ywy);
        // });
    }
});

const SchemaField = createSchemaField({
    components: {
        FormItem,
        Input,
        Select,
        FormGrid,
        DatePicker,
        TimePicker,
        Space,
        FormButtonGroup,
        Submit,
        Reset,
    },
});

const FormSelectInput = props => {
    // const [form] = FormAntd.useForm()
    return (
        <div style={{display: 'flex', justifyContent: 'center', background: '#eee', padding: '40px 0'}}>
            <Card style={{width: '80%'}}>
                <ConfigProvider
                    theme={{
                        components: {
                            Form: {
                                /* 这里是你的组件 token */
                                itemMarginBottom: 0,
                            },
                        },
                    }}
                >
                    <Form
                        form={form}
                        labelCol={7}
                        wrapperCol={16}
                        onAutoSubmit={(value) => {
                            console.log('value');
                            console.log(JSON.stringify(value));
                        }}
                    >
                        <SchemaField>
                            <SchemaField.Void
                                x-component={"FormGrid"}
                                x-component-props={{
                                    maxColumns: 3,
                                    minColumns: 2,
                                }}
                            >
                                {/*同步数据源*/}
                                <SchemaField.String
                                    name={"xj"}
                                    title={"星星级别"}
                                    x-decorator={"FormItem"}
                                    x-component={"Select"}
                                    x-component-props={{
                                        options: [
                                            {value: 1, label: '1星'},
                                            {value: 2, label: '2星'},
                                            {value: 3, label: '3星'},
                                            {value: 4, label: '4星'},
                                        ]
                                    }}
                                    x-decorator-props={{
                                        extra: '下拉同步数据源',
                                    }}
                                />
                                {/*异步数据源,不做搜索*/}
                                {/*<div>异步数据源(最简单的异步数据源)</div>*/}
                                <SchemaField.String
                                    name={"ywy_yb_pt"}
                                    title={"业务员"}
                                    x-decorator={"FormItem"}
                                    x-component={"Select"}
                                    x-component-props={{}}
                                    x-decorator-props={{
                                        extra: '普通的下拉数据源列表(暂未加搜索)',
                                        tooltip: <span>测试文本内容</span>
                                        // rules: [{required: true}],
                                        // tooltip: { title: 'Tooltip with customize icon', icon: <InfoCircleOutlined /> }
                                        // tooltip: {
                                        // title: '测试',
                                        // icon: <span>icon</span>
                                        // }
                                    }}
                                    // x-component-props={{
                                    //     options: [
                                    //         {value: 1, label: '1星'},
                                    //         {value: 2, label: '2星'},
                                    //         {value: 3, label: '3星'},
                                    //         {value: 4, label: '4星'},
                                    //     ]
                                    // }}
                                />
                                <SchemaField.String
                                    name={"ds"}
                                    title={"店铺/商家"}
                                    x-decorator={"FormItem"}
                                    x-component={"Input"}
                                    x-decorator-props={{
                                        extra: '输入搜索/双击出现模特框',
                                    }}
                                    x-component-props={{
                                        onDoubleClick: () => {
                                            alert('我被双击了,出现模态框吧');
                                        },
                                    }}
                                />
                                <SchemaField.String
                                    name={"format_type"}
                                    title={"类型选择"}
                                    x-decorator={"FormItem"}
                                    x-component={"Select"}
                                    enum={[
                                        {label: '时间格式', value: 'time'},
                                        {label: '日期格式', value: 'date'}
                                    ]}
                                    default={"date"}
                                    x-component-props={{
                                        // placement: 'topLeft',
                                    }}
                                />

                                {/*日期数据选择框*/}
                                <SchemaField.String
                                    name={"birthday"}
                                    title={"生产日期"}
                                    x-decorator="FormItem"
                                    x-component="DatePicker"
                                />
                                <SchemaField.Object
                                    name={"actions"}
                                    x-component={"FormButtonGroup"}
                                    x-component-props={{
                                        style: {display: 'flex', justifyContent: 'center', gap: '8px'},
                                    }}
                                >
                                    <SchemaField.Void
                                        name={"submit"}
                                        x-component={"Submit"}
                                        title={"提交"}
                                        x-component-props={{
                                            children: '提交',
                                            type: 'primary'
                                        }}
                                    />
                                    <SchemaField.Void
                                        name={"reset"}
                                        x-component={"Reset"}
                                        x-component-props={{
                                            children: "重置",
                                        }}
                                    />
                                </SchemaField.Object>
                            </SchemaField.Void>
                        </SchemaField>
                    </Form>
                </ConfigProvider>

            </Card>
        </div>


    )
        ;
}

export default FormSelectInput;