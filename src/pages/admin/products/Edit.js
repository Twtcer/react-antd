import React, { Component } from 'react';
import { Form, Card, Input, InputNumber, Button } from 'antd';

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
};

const validateMessages = {
    required: '${label} is required!',
    types: {
        number: '${label} is not a validate number!'
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};

class Edit extends Component {

    componentDidMount(){
      console.log(this.props.match.params);
      //console.log(this.props.history.location.state);//隐式传参
    }

    onFinish = (values) => {
        console.log(JSON.stringify(values));
    };
      onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    render() {
        return (
            <Card title="商品编辑" 
            extra={
            <Button size="small" type="default" 
             onClick={()=>{this.props.history.push("/admin/products")}}>返回</Button>
             }>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }} 
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                    validateMessages={validateMessages}
                >
                    <Form.Item name={['product', 'title']} label="名称" rules={[{ required: true }]}><Input  style={{width:200}}/></Form.Item>
                    <Form.Item name={['product', 'price']} label="价格" rules={[{ required: true },{ type: 'number', min: 0, max: 9999 }]}><InputNumber /></Form.Item>

                    <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button htmlType="submit" type="primary">
                            提交
                         </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Edit;
//antd v4 已经废弃 Form.create
// export default Form.create({name:'productEdit'})(Edit);