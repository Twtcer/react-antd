import React from 'react'; 
import { Layout, Menu, Breadcrumb, Dropdown,Button } from 'antd';
import { DownOutlined } from '@ant-design/icons';  
import {withRouter} from 'react-router-dom';
import Icon from '@ant-design/icons';  
import './index.css';
import { adminRoutes } from '../../routes/index'; 
const { Header, Content, Footer, Sider } = Layout;

class Index extends React.Component {
    state = {
        collapsed: false,
    };

    render() {
        const routes = adminRoutes.filter(route => route.isShow); 
        const menu = (
            <Menu>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer" href="http://www.alipay.com/">
                    个人中心
                </a>
              </Menu.Item>
              <Menu.Item>
                <a target="_blank" rel="noopener noreferrer">
                    退出
                </a>
              </Menu.Item> 
            </Menu>
          );
        return (
            <Layout>
                <Header className="header" style={{background:'#1890ff'}}>
                    <div className="logo" >
                        <img className='logo-img' alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg" />
                        <p className='logo-title'>react+antd</p>
                    </div>
                    <Dropdown overlay={menu} placement="bottomRight">
                        <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                         <p className="user-action">  admin </p>
                           <DownOutlined />
                        </a>
                    </Dropdown>
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
                            {routes.map(r => { 
                                return (<Menu.Item key={r.path} onClick={r=>this.props.history.push(r.key)}><Icon /> {r.title}</Menu.Item>) }
                                )}  
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