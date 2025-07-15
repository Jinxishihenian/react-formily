import React from 'react'
import {createForm} from '@formily/core'
import {createSchemaField} from '@formily/react'
import {Form, FormItem, Input, Password, Submit} from '@formily/antd-v5'
import {Tabs, Card} from 'antd'
import * as ICONS from '@ant-design/icons'
import {VerifyCode} from './VerifyCode'

const Form3 = () => {
    const normalForm = createForm({
        validateFirst: true
    });
    const phoneForm = createForm({
        validateFirst: true
    });
    const SchemaField = createSchemaField({
        components: {
            FormItem, Input, Password, VerifyCode,
        },
        scope: {
            icon(name) {
                return React.createElement(ICONS[name])
            }
        },
    });

    const normalSchema = {
        type: 'object', properties: {
            username: {
                type: 'string',
                title: '用户名',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                    perfix: "{{icon('UserOutlined')}}",
                },
            }, password: {
                type: 'string',
                title: '密码',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                    perfix: "{{icon('UserOutlined')}}",
                },
            }
        }
    }

    const phoneSchema = {
        type: 'object',
        properties: {
            phone: {
                type: 'string',
                title: '手机号',
                required: true,
                'x-validator': 'phone',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
                'x-component-props': {
                    prefix: "{{icon('PhoneOutlined')}}",
                }
            },
            verifyCode: {
                type: 'string',
                title: '验证码',
                required: true,
                'x-decorator': 'FormItem',
                'x-component': 'VerifyCode',
                'x-component-props': {
                    prefix: "{{icon('LockOutlined')}}",
                },
                'x-reactions': [{
                    dependencies: ['.phone#value', '.phone#value'], fulfill: {
                        state: {
                            'component[1].readyPost': '{{$deps[0] && $deps[1]}}',
                            'component[1].phoneNumber': '{{$deps[0]}}',
                        }
                    }
                }],
            }
        }
    }

    return (<div
        style={{
            display: 'flex', justifyContent: 'center', background: '#eee', padding: '40px 0',
        }}
    >
        <Card style={{width: 400}}>
            <Tabs style={{overflow: 'visible', marginTop: -10}}>
                <Tabs.TabPane key={"1"} tab={"账号登录"}>
                    <Form
                        form={normalForm}
                        layout={"vertical"}
                        size={"large"}
                        onAutoSubmit={console.log}
                    >
                        <SchemaField schema={normalSchema}/>
                        <Submit block size={"large"}>
                            登录
                        </Submit>
                    </Form>
                </Tabs.TabPane>
                <Tabs.TabPane key={"2"} tab={"手机号登录"}>
                    <Form
                        form={phoneForm}
                        layout={"vertical"}
                        size={"large"}
                        onAutoSubmit={console.log}
                    >
                        <SchemaField schema={phoneSchema}/>
                        <Submit block size={"large"}>
                            登录
                        </Submit>
                    </Form>
                </Tabs.TabPane>
            </Tabs>
        </Card>
    </div>)
}
export default Form3;