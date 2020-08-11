import React, { Component } from 'react';
import { Form, Input, Button, Checkbox, Card ,message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { setToken } from '..//utils/auth';
import { login } from '../services/auth';

import './login.css';

class Login extends Component {

    onFinish = (values) => {
        console.log('Received values of form: ', JSON.stringify(values));
        // setToken(values.username);
        // this.props.history.push('/admin');
        login(values).then(res => { 
            message.info(res.code);
            if(res.code==="success"){
                setToken(res.token);
                this.props.history.push("/admin");
            }
            else    {
                message.info(res.message);
            } 
        }).catch(err => { 
            message.error(err);
        });
    };

    render() {
        return (
            <Card title='Login' className="login-form">
                <Form
                    name="normal_login"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                >
                    <Form.Item
                        name="userName"
                        rules={[{ required: true, message: 'Please input your Username!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your Password!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox>Remember me</Checkbox>
                        </Form.Item>

                        <a className="login-form-forgot" href="">
                            Forgot password
              </a>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Login
              </Button>
                    </Form.Item>
                </Form>
            </Card>
        );
    }
}

export default Login
