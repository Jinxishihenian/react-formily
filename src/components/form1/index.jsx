import React from 'react'
import {createForm} from '@formily/core'
import {FormProvider, FormConsumer, Field} from '@formily/react'
import {
    FormItem, FormLayout, Input, FormButtonGroup, Submit,
} from '@formily/antd-v5'

const form = createForm();

const Form1 = () => {
    return (<div>
        <FormProvider form={form}>
            <FormLayout layout="vertical">
                <Field
                    name="input"
                    title="输入框"
                    required
                    initialValue="Hello world"
                    decorator={[FormItem]}
                    component={[Input]}
                />
            </FormLayout>
            {/*消费者*/}
            <FormConsumer>
                {() => (<div
                        style={{
                            marginBottom: 20, padding: 5, border: '1px dashed #666',
                        }}
                    >
                        实时响应：{form.values.input}
                    </div>)}
            </FormConsumer>
            <FormButtonGroup>
                <Submit onSubmit={console.log}>提交</Submit>
            </FormButtonGroup>
        </FormProvider>
    </div>)
}
export default Form1;