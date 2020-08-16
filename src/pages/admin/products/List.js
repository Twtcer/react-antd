import React, { Component } from 'react';
import { Card, Table, Button, Space, Popconfirm,message,Spin } from 'antd';
import { serviceUrl } from '../../../utils/config';
import {  query, delOne,modifOne } from '../../../services/products';   
import './list.css'; 

class List extends Component {  
    constructor() {
        super(); 
        this.state = {
            // loading:true, 
            list:[],
            total:0,
            currentPage:1,
            pageSize:5
        }
    } 

    componentDidMount(){
        const {currentPage,pageCount} = this.state;
        this.queryProducts(currentPage,pageCount);
    } 

    queryProducts=(page=1,per=5)=>{ 
        let _this = this;
        query(page,per).then(res=>{
            _this.setState({ list: res.products,total:res.totalCount, loading: false });            
        }).catch(err=>{
            message.error("获取数据失败,err:"+err);
        }); 
    };   

    render() {
        let _this = this;
        const {
             list, 
            // loading,
            total,
            pageSize,
        } = this.state;

        const columns = [
            {
                title: '序号',
                key: '_id',
                dataIndex: '_id',
                width: 80,
                align: 'center',
                render: (text, record, index) => index + 1//模拟自增
            },
            {
                title: '主图',
                dataIndex: 'coverImg',
                render: (text, record, index) =>
                    record.coverImg ?
                        (<img src={serviceUrl + record.coverImg} alt={record.name} style={{ width: '120px' }} />) :
                        ('暂无图片')
            },
            {
                title: '名称',
                dataIndex: 'name'
            },
            {
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '库存',
                dataIndex: 'quantity'
            },
            {
                title: '是否在售',
                dataIndex: 'onSale',
                render: (txt, record) => record.onSale ? '在售' : '已下架'
            },            
            {
                title: '操作',
                render: (text, record, index) => {
                    const json = JSON.stringify(record);
                    return (
                        <div>
                            <Space>
                                <Button 
                                type="primary" 
                                size="small" 
                                onClick={()=>{
                                    this.props.history.push(`/admin/products/edit/${record._id}`)
                                }}
                                >修改</Button>
                                <Popconfirm
                                    title="是否确认删除此商品?"
                                    okText="是"
                                    cancelText="否"
                                    onCancel={() => { console.log(`user cancel delete product ${json}`); }}
                                    onConfirm={() => {
                                        console.log(`user confirm delete product ${json}`);
                                        //call api 
                                        delOne(record._id).then(res=>{
                                            this.queryProducts();
                                        })
                                    }}
                                >
                                    <Button type="danger" size="small" >删除</Button>
                                </Popconfirm>
                                <Button 
                                type="default" 
                                size="small" 
                                onClick={()=>{
                                    debugger
                                    modifOne(record._id,{onSale: !record.onSale})
                                    .then(res=>{
                                        this.queryProducts();
                                    })
                                    .catch(err=>{
                                        message.error("上架失败，原因:"+err);
                                    });
                                }}
                            >{record.onSale?"下架":"上架"}</Button>
                            </Space>
                        </div>
                    );
                }
            }
        ];
        return  (
        //<Spin tip="载入中..." size="large" spinning={loading}>
            <Card title="商品列表" 
            extra={<Button type="primary" 
            size="small" 
            onClick={() => { this.props.history.push("/admin/products/edit") }}
            >新增</Button>}>
                <Table
                    rowKey="_id"
                    // loading={loading}
                    pagination={{
                        total,
                        defaultPageSize:pageSize, 
                        hideOnSinglePage:false,
                        // pageSizeOptions:[10, 20, 50, 100], 
                        onChange:(page, pageSize)=>{ 
                            // _this.setState({loading:true});
                            _this.queryProducts(page,pageSize);
                        }
                    }}
                    rowClassName={(record) =>{ return record.onSale ? "" : "bg-red"}}
                    columns={columns}
                    dataSource={list}
                    bordered
                />
            </Card>
            //</Spin> 
        )
    }
}

export default List