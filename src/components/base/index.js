import React from 'react';

import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

import './index.css';
import { adminRoutes } from '../../routes/index';

import {withRouter} from 'react-router-dom';

const { SubMenu } = Menu;
const { Header, Content, Footer, Sider } = Layout;

class Index extends React.Component {
    state = {
        collapsed: false,
    };

    render() {
        const routes = adminRoutes.filter(route => route.isShow);
        console.log(routes);
        return (
            <Layout>
                <Header className="header" style={{background:'#1890ff'}}>
                    <div className="logo" >
                        <img className='logo-img' alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                        <p className='logo-title'>react+antd</p>
                    </div>
                </Header>
                <Content style={{ padding: '0 50px' }}>
                    {/* <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                    </Breadcrumb> */}
                    <Layout className="site-layout-background" style={{ padding: '16px 0' }}>
                        <Sider className="site-layout-background" width={200}>
                            <Menu
                                mode="inline" 
                                style={{ height: '100%' }}
                            > 
                            {routes.map(r => { return (<Menu.Item key={r.path} onClick={r=>this.props.history.push(r.key)}>{r.title}</Menu.Item>) })}  
                            </Menu>
                        </Sider>
                        <Content style={{ padding: '0 24px', minHeight: 280 }}>     {this.props.children}</Content>
                    </Layout>

                </Content>
                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        );
    }
} 

export default withRouter(Index);