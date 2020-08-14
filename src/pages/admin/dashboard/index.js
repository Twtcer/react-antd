import React, { Component } from 'react';
import { Card, Statistic, Row, Col }   from 'antd';
import { ArrowUpOutlined, ArrowDownOutlined } from '@ant-design/icons';


class Index extends Component {
    render() {
        return (
            <div className="site-statistic-demo-card">
            <Row gutter={16}>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="新增用户"
                    value={11.28}
                    precision={2}
                    valueStyle={{ color: '#3f8600' }}
                    prefix={<ArrowUpOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="总用户"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card>
                  <Statistic
                    title="总订单数"
                    value={9.3}
                    precision={2}
                    valueStyle={{ color: '#cf1322' }}
                    prefix={<ArrowDownOutlined />}
                    suffix="%"
                  />
                </Card>
              </Col>
            </Row>
          </div>
        )
    }
}

export default Index
