import React, { useState } from 'react';
import { Card, Col, Row, Typography, Button, Input, List, Statistic, Dropdown, Menu, Badge, notification } from 'antd';
import { SearchOutlined, BellOutlined, CheckCircleOutlined, ScheduleOutlined, CheckOutlined, CalendarOutlined, DownOutlined } from '@ant-design/icons';
import profileImage from '../../assets/profile.jpeg';
import Logo from '../../assets/logo.jpg';
import { Carousel } from 'antd';

const { Title, Text } = Typography;

const UserDashboard = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'Presidential Election 2024 is approaching!', date: '2024-11-01' },
    { id: 2, message: 'Local Council Election is currently ongoing.', date: '2024-08-20' }
  ]);

  const [searchText, setSearchText] = useState('');

  const userInfo = {
    name: 'UTKARSH RAGHAV',
    email: 'raghavutkarsh16@gmail.com',
    ethereumAddress: '0x1234567890abcdef1234567890abcdef12345678',
    age: 21,
    address: 'Ghaziabad, Uttar Pradesh-201005, India'
  };

  const votingStats = {
    eligible: true,
    votesPlaced: 2,
    waiting: 0,
    rejected: 0
  };

  const elections = [
    { title: 'Presidential Election 2024', status: 'Upcoming', date: '2024-11-01', icon: <CalendarOutlined style={{ color: '#ffbf00' }} /> },
    { title: 'Local Council Election', status: 'Ongoing', date: '2024-08-20', icon: <ScheduleOutlined style={{ color: '#1890ff' }} /> },
    { title: 'State Assembly Election', status: 'Past', date: '2024-03-15', icon: <CheckOutlined style={{ color: '#52c41a' }} /> },
  ];

  const handleMenuClick = ({ key }) => {
    console.log('Menu item clicked:', key);
  };

  const userMenu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="details">View Details</Menu.Item>
      <Menu.Item key="settings">Account Settings</Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">Logout</Menu.Item>
    </Menu>
  );

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const highlightText = (text) => {
    if (!searchText) return text;
    const parts = text.split(new RegExp(`(${searchText})`, 'gi'));
    return parts.map((part, index) =>
      part.toLowerCase() === searchText.toLowerCase() ? <span key={index} style={{ backgroundColor: '#ffc069' }}>{part}</span> : part
    );
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <Row gutter={16} align="middle" style={{ marginBottom: '20px' }}>
        <Col span={4}>
          <img src={Logo} alt="Logo" style={{ width: '80px', height: 'auto', borderRadius: '80%' }} />
        </Col>
        <Col span={12}>
          <Input.Search
            placeholder="Search"
            prefix={<SearchOutlined />}
            style={{ borderRadius: '4px', borderColor: '#1890ff', width: '100%', fontSize: '16px' }}
            onChange={handleSearch}
          />
        </Col>
        <Col span={8} style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <Badge count={notifications.length} overflowCount={99} style={{ marginRight: '10px' }}>
              <BellOutlined
                style={{ fontSize: '20px', color: '#1890ff' }}
                onClick={() => notification.open({
                  message: 'Notifications',
                  description: (
                    <List
                      size="small"
                      dataSource={notifications}
                      renderItem={item => (
                        <List.Item>
                          <Text>{item.message} <Text type="secondary">({item.date})</Text></Text>
                        </List.Item>
                      )}
                    />
                  ),
                  placement: 'bottomRight'
                })}
              />
            </Badge>
            <Dropdown overlay={userMenu} trigger={['click']}>
              <span style={{ fontWeight: 'bold', color: '#1890ff', cursor: 'pointer', marginLeft: '20px' }}>
                {userInfo.name} <DownOutlined />
              </span>
            </Dropdown>
          </div>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={4}>
          <Card>
            <div style={{ backgroundColor: '#1890ff', padding: '10px', borderRadius: '8px' }}>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  border: '2px solid #1890ff'
                }}
              >
                Dashboard
              </Button>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  border: '2px solid #1890ff'
                }}
              >
                Elections
              </Button>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  border: '2px solid #1890ff'
                }}
              >
                Vote
              </Button>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  border: '2px solid #1890ff'
                }}
              >
                Results
              </Button>
              <Button
                type="primary"
                style={{
                  width: '100%',
                  fontWeight: 'bold',
                  border: '2px solid #1890ff'
                }}
              >
                Queries
              </Button>
            </div>
          </Card>
        </Col>
        <Col span={20}>
          <Card>
            <Row gutter={16}>
              <Col span={6}>
                <img src={profileImage} alt="Profile" style={{ width: '100%', borderRadius: '50%' }} />
              </Col>
              <Col span={18}>
                <Title level={4} style={{ color: '#1890ff', fontWeight: 'bold' }}>{userInfo.name}</Title>
                <Text style={{ display: 'block', fontSize: '16px' }}>{userInfo.email}</Text>
                <Text style={{ display: 'block', fontSize: '16px' }}>Ethereum Address: {userInfo.ethereumAddress}</Text>
                <Text style={{ display: 'block', fontSize: '16px' }}>Age: {userInfo.age}</Text>
                <Text style={{ display: 'block', fontSize: '16px' }}>Address: {userInfo.address}</Text>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: '20px' }}>
            <Title level={4}>Voting Dashboard</Title>
            <Row gutter={16}>
              <Col span={6}>
                <Card bordered={false} style={{ backgroundColor: '#e6fffb', textAlign: 'center' }}>
                  <Title level={2}>
                    {votingStats.eligible ? (
                      <CheckCircleOutlined style={{ color: 'green', fontSize: '48px' }} />
                    ) : (
                      'Not Eligible'
                    )}
                  </Title>
                  <Text>Eligible</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} style={{ backgroundColor: '#fff7e6', textAlign: 'center' }}>
                  <Title level={2}>{votingStats.votesPlaced}</Title>
                  <Text>Votes Placed</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} style={{ backgroundColor: '#fff0f6', textAlign: 'center' }}>
                  <Title level={2}>{votingStats.waiting}</Title>
                  <Text>Waiting</Text>
                </Card>
              </Col>
              <Col span={6}>
                <Card bordered={false} style={{ backgroundColor: '#f9f0ff', textAlign: 'center' }}>
                  <Title level={2}>{votingStats.rejected}</Title>
                  <Text>Rejected</Text>
                </Card>
              </Col>
            </Row>
          </Card>

          <Card style={{ marginTop: '20px' }}>
            <Title level={4}>Elections</Title>
            <Carousel
              dots={false}
              autoplay
              speed={500}
              slidesToShow={3}
              draggable
              infinite
              swipeToSlide
              style={{ width: '100%' }}
            >
              {elections.map((election, index) => (
                <div key={index}>
                  <Card
                    hoverable
                    style={{ marginBottom: '16px', borderRadius: '8px', backgroundColor: '#ffffff' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      {election.icon}
                      <div style={{ marginLeft: '10px' }}>
                        <Title level={5}>{highlightText(election.title)}</Title>
                        <Text style={{ display: 'block', marginBottom: '8px', color: '#888' }}>
                          Date: {highlightText(election.date)}
                        </Text>
                        <Text style={{
                          display: 'block',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          backgroundColor: election.status === 'Upcoming' ? '#fffbf0' : 
                                            election.status === 'Ongoing' ? '#e6f7ff' : '#f0f9ff',
                          color: election.status === 'Upcoming' ? '#faad14' :
                                election.status === 'Ongoing' ? '#1890ff' : '#52c41a'
                        }}>
                          Status: {highlightText(election.status)}
                        </Text>
                      </div>
                    </div>
                    <Button type="primary" style={{ marginTop: '10px' }}>View Details</Button>
                  </Card>
                </div>
              ))}
            </Carousel>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserDashboard;
