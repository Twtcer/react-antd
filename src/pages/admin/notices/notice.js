import React, { Component } from 'react';
import { Card, List, Typography, Button } from "antd";
import { connect } from 'react-redux';

class Notice extends Component {
    constructor() {
        super();
        this.state = {
            data: [
                "Racing car sprays burning fuel into crowd.",
                "Japanese princess to wed commoner.",
                "Australian walks 100km after outback crash.",
                "Man charged over missing wedding girl.",
                "Los Angeles battles huge wildfires."
            ]
            ,
            isAllRead: false,
            count: 8
        }
    }

    readAll = () => {
        // this.setState({ isAllRead: !this.state.isAllRead });
        this.props.dispatch({
            type: 'READ_ALL'
        });
    }

    render() {
        return (
            <Card title='通知中心'
                extra={<Button onClick={this.readAll}>{this.props.isAllRead ? '全部已读' : '全部未读'}</Button>}>
                <List
                    header={<div>Header</div>}
                    footer={<div>Footer</div>}
                    bordered
                    dataSource={this.state.data}
                    renderItem={item => (
                        <List.Item
                            style={{ display: "flex", alignContent: "spaced-between" }}
                        >
                            <Typography.Text mark>[item]</Typography.Text> {item}
                            <Button size="small">{this.props.isAllRead ? '已读' : '未读'}</Button>
                        </List.Item>
                    )}
                ></List>
            </Card>
        )
    }
}

export default connect(state => state.notice)(Notice)
