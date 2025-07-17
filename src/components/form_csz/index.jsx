import React from 'react'
import { createForm } from '@formily/core'
import { createSchemaField, FormProvider } from '@formily/react'
import { FormButtonGroup, Submit, FormItem, Select, DatePicker, TimePicker } from '@formily/antd-v5'


const FormCSZ = () => {
    const form = createForm({
        validateFirst: true
    });

    const SchemaField = createSchemaField({
        components: {
            FormItem, Select, DatePicker, TimePicker,
        },
    })
    return (
        <FormProvider form={form}>
            <SchemaField>
                {/*格式选择 */}
                <SchemaField.String
                    name={"formatType"}
                    title={"格式选择"}
                    x-decorator={"FormItem"}
                    x-component={"Select"}
                    enum={[{ label: '时间格式', value: 'time' }, { label: '日期格式', value: 'date' },]}
                    default={"date"}
                    x-component-props={{
                        placement: 'topLeft',
                    }}
                />
                <div style={{ height: "400px" }} />
                {/*日期/事件选择器*/}
                <SchemaField.Void
                    name={"dynamicDate"}
                    x-reactions={[{
                        dependencies: ['formatType'],
                        fulfill: {
                            schema: {
                                'x-component': '{{$deps[0]==="time"?"TimePicker":"DatePicker"}}'
                            }
                        },
                    }]}
                >
                    <SchemaField.String
                        name={"value"}
                        title={"选择值"}
                        x-decorator={"FormItem"}
                    />
                </SchemaField.Void>
            </SchemaField>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>
                    提交
                </Submit>
            </FormButtonGroup>
        </FormProvider>
    )
}
export default FormCSZ;