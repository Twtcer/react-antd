import React, { Component } from 'react';
import { Form, Card, Input, InputNumber, Button, Spin,Space, Upload, message } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { add, edit, getOneById } from '../../../services/products';
import { serviceUrl } from '../../../utils/config';
import BraftEditor from 'braft-editor';
import 'braft-editor/dist/index.css';


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

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            imageUrl: '',
            formRef: React.createRef(),
            editorState: BraftEditor.createEditorState(null), 
        }
    }

    componentDidMount() {
        const params = this.props.match.params;
        if (params.id) {
            this.setState({ id: params.id });
            getOneById(params.id).then(res => {    
                this.setState({ loading: false, imageUrl: res.coverImg, editorState: BraftEditor.createEditorState(res.content) });
                this.state.formRef.current.setFieldsValue({
                    name: res.name,
                    price: res.price,
                    imageUrl: res.coverImg
                });
            });
        }
        else {
            this.setState({ loading: false });
        }
    }

    //富文本编辑器
    handleEditorChange = (editorState) => {  
        this.setState({ editorState: editorState });
        // this.state.formRef.setFieldsValue({
        //     content: editorState
        // });
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
            this.setState({
                        imageUrl: info.file.response.info,
                        loading: false,
                    }); 
            // this.getBase64(info.file.originFileObj, imageUrl => {
            //     this.setState({
            //         imageUrl,
            //         loading: false,
            //     });
            // });
        }
    }



    onFinish = (values) => {
        debugger
        const { imageUrl, editorState } = this.state;
        if (!this.props.match.params.id) { 
            //call add api    
            add({...values,coverImg:imageUrl,content:editorState.toHTML()}).then(res => {
                // message.info('add success!');
                this.props.history.push("/admin/products");
            }).catch(err => {
                message.error(`add failed,${err}`);
            });
        }
        else {
            //call edit api
            edit(this.props.match.params.id, {...values,coverImg:imageUrl,content:editorState.toHTML()}).then(res => {
                // message.info('modify success!');
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
        this.state.formRef.current.resetFields();
        this.setState({imageUrl:''});
    };

    onFill = () => {
        this.state.formRef.current.setFieldsValue({
          name: '测试商品0012222',
          price: 999,
          content: '<p>test</p>'
        });
    };

    resetFields=()=>{
        this.state.formRef.current.resetFields();
    }

    render() { 
        const { loading, imageUrl, formRef , editorState} = this.state; 
        console.log('reder:'+JSON.stringify(formRef)); 
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
                        // {...layout}
                        name="product" 
                        ref={formRef}
                        onFinish={this.onFinish}
                        onFinishFailed={this.onFinishFailed}
                        validateMessages={validateMessages}
                    >  
                        <Form.Item name="name" label="名称" rules={[{ required: true }]}><Input placeholder="请输入商品名称" /></Form.Item>
                        <Form.Item name="price" label="价格" rules={[{ required: true }, { type: 'number', min: 0, max: 9999 }]}><InputNumber placeholder="请输入价格" /></Form.Item>

                        <Form.Item label="主图" rules={[{ required: true }]}> 
                        <Upload  
                            name="file"
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={`${serviceUrl}api/v1/common/file_upload`}
                            // beforeUpload={this.beforeUpload}
                            onChange={(info)=>this.handleUploadImg(info)}
                        >
                            {imageUrl ? <img src={`${serviceUrl}${imageUrl}`} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                        </Upload></Form.Item>

                        <Form.Item label="详情" rules={[{required: true}]}>
                        <BraftEditor 
                            value={editorState} 
                            onChange={(e) => this.handleEditorChange(e)} 
                            placeholder="请填写描述内容"
                            />
                        </Form.Item>

                        <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                            <Space>
                                <Button htmlType="submit" type="primary">
                                    提交
                                </Button>

                                <Button htmlType="button" type="danger" onClick={this.resetFields}>
                                重置
                                </Button>
 
                                <Button htmlType="button"  onClick={this.onFill}>
                                测试数据
                         </Button>

                                <Button htmlType="link" type="default" onClick={() => { this.props.history.push("/admin/products") }}>
                                    返回
                             </Button>
                            </Space>
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