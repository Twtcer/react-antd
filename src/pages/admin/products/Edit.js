import React, { Component } from 'react';
import { Form, Card, Input, InputNumber, Button, Spin, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { add, edit, getOneById } from '../../../services/products';
import { serviceUrl } from '../../../utils/config'


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

    constructor() {
        super();
        this.state = {
            loading: true,
            name: '',
            price: 0,
            id: '',
            imageUrl: ''
        }
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id) {
            this.setState({ id: params.id });
            getOneById(params.id).then(res => {
                debugger
                this.setState({ loading: false, name: res.name, price: res.price });
            });
        }
        else {
            this.setState({ loading: false });
        }
    }

    getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    handleUploadImg = info => {
        if (info.file.status === "uploading") {
            this.setState({ loading: true });
            return;
        }

        if (info.file.status === "done") {
            this.getBase64(info.file.originFileObj, imageUrl => {
                this.setState({
                    imageUrl,
                    loading: false,
                });
            });
        }
    }



    onFinish = (values) => {
        if (this.props.match.params.id) {
            //call add api
            add(values.product).then(res => {
                message.info('add success!');
                this.props.history.push("/admin/products");
            }).catch(err => {
                message.error(`add failed,${err}`);
            });
        }
        else {
            //call edit api
            edit(this.props.match.params.id, values.product).then(res => {
                message.info('modify success!');
                this.props.history.push("/admin/products");
            }).catch(err => {
                message.error(`modify failed,${err}`);
            });
        }
    };
    onFinishFailed = (errorInfo) => {
        console.log('props = ', JSON.stringify(errorInfo));
        message.error('请输入正确的内容');
    };

    onReset = () => {
        // this.formRef.current.resetFields();
    };

    onFill = () => {
        // this.formRef.current.setFieldsValue({
        //   name: 'Hello world!',
        //   price: 999,
        // });
    };

    render() {

        const { loading, name, price, imageUrl } = this.state;
        const uploadButton = (
            <div>
                {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div className="ant-upload-text">Upload</div>
            </div>
        );

        return (
            <Spin tip="loading" spinning={loading}>
                <Card title="商品编辑"
                    extra={
                        <Button size="small" type="default"
                            onClick={() => { this.props.history.push("/admin/products") }}>返回</Button>
                    }>
                    <Form
                        {...layout}
                        name="product"
                        initialValues={{ name, price }}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        validateMessages={validateMessages}
                    >

                        <Form.Item> <Upload
                            name="avatar"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`{}`}
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleUploadImg}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload></Form.Item>

                        <Form.Item name={['product', 'name']} label="名称" rules={[{ required: true }]}><Input placeholder="请输入商品名称" style={{ width: 200 }} /></Form.Item>
                        <Form.Item name={['product', 'price']} label="价格" rules={[{ required: true }, { type: 'number', min: 0, max: 9999 }]}><InputNumber placeholder="请输入价格" /></Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Button htmlType="submit" type="primary">
                                提交
                         </Button>
                            <Button htmlType="submit" type="danger" onClick={this.resetFields}>
                                重置
                         </Button>
                            <Button htmlType="submit" type="default" onClick={this.onFill}>
                                测试填充
                         </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        )
    }
}

export default Edit;
//antd v4 已经废弃 Form.create
// export default Form.create({name:'productEdit'})(Edit);