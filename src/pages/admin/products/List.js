import React, { Component,useState,useEffect } from 'react';
import { Card ,Table, Button ,Space,Popconfirm } from 'antd';
import {list,add} from '../../../services/products';
 

export class List extends Component {

   await queryData = ()=>{
      await list().then(res => { 
              res.data;
        });         
    };
 

    useEffect=() => {
        // props.dispatch(
        //     // 使用对象作为参数
        //     loadProduct({
        //         page: 1, 
        //     })
        // )

        list().then(res => {
            console.log('获取数据库数据, 如果有的话 = ', res)
            // setDataSource(res.products)
            // setTotal(res.totalCount)
        })
    };

    render() {
        const data = this.queryData();
        const columns = [
            {
                title: '序号',
                key: 'id',
                width: 80,
                align: 'center',
                render: (text,record,index) => index + 1//模拟自增
            },
            {
                title: '名字',
                dataIndex: 'name'
            }, 
            {
                title: '价格',
                dataIndex: 'price'
            },
            {
                title: '操作',
                render: (text, record, index) => {
                    const json = JSON.stringify(record);
                    return (
                        <div>
                            <Space>
                            <Button type="primary" size="small">修改</Button>
                                <Popconfirm 
                                title="是否确认删除此商品?"
                                 okText="是" 
                                 cancelText="否"
                                 onCancel={()=>{console.log(`user cancel delete product ${json}`);}}
                                 onConfirm={()=>{
                                     console.log(`user confirm delete product ${json}`);
                                     //call api 

                                 }}
                                 >
                                    <Button type="danger" size="small" >删除</Button>
                                </Popconfirm>
                            <Button type="primary" size="small">上架</Button>
                            </Space>
                        </div>
                    );
                }
            }
        ];
        return (
            <Card title="商品列表" extra={<Button type="primary" size="small" onClick={()=>{this.props.history.push("/admin/products/edit/0")}}>新增</Button>}>
                <Table 
                    columns={columns}
                    dataSource={data}
                    bordered
                />
            </Card> 
        )
    }
}

export default List
