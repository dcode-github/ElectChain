import React from 'react';
import { Table, Card, Typography } from 'antd';

const { Title, Link, Paragraph } = Typography;

const Elections = () => {
  const upcomingElectionsData = [
    {
      key: '1',
      state: <Link href="https://en.wikipedia.org/wiki/2024_Maharashtra_Legislative_Assembly_election" target="_blank">Maharashtra</Link>,
      tenure: '27 Nov 2019 - 28 Nov 2024',
      year: '2024',
      totalAC: 288,
      totalPC: 48,
      totalRajyasabha: 19,
    },
    {
      key: '2',
      state: <Link href="https://en.wikipedia.org/wiki/2023_Karnataka_Legislative_Assembly_election" target="_blank">Karnataka</Link>,
      tenure: '13 May 2018 - 12 May 2023',
      year: '2023',
      totalAC: 224,
      totalPC: 28,
      totalRajyasabha: 12,
    },
    {
      key: '3',
      state: <Link href="https://en.wikipedia.org/wiki/Adarsh_Nagar,_Delhi_Assembly_constituency" target="_blank">Delhi</Link>,
      tenure: '24 Feb 2020 - 23 Feb 2025',
      year: '2025',
      totalAC: 70,
      totalPC: 7,
      totalRajyasabha: 3,
    },
  ];

  const pastElectionsData = [
    {
      key: '1',
      state: 'Uttar Pradesh',
      tenure: '10 Mar 2017 - 10 Mar 2022',
      year: '2022',
      totalAC: 403,
      totalPC: 80,
      totalRajyasabha: 31,
    },
    {
      key: '2',
      state: 'Punjab',
      tenure: '16 Mar 2017 - 16 Mar 2022',
      year: '2022',
      totalAC: 117,
      totalPC: 13,
      totalRajyasabha: 7,
    },
  ];

  const activeElectionsData = [
    {
      key: '1',
      state: 'Rajasthan',
      tenure: '17 Dec 2018 - 16 Dec 2023',
      year: '2023',
      totalAC: 200,
      totalPC: 25,
      totalRajyasabha: 10,
    },
    {
      key: '2',
      state: 'Chhattisgarh',
      tenure: '17 Dec 2018 - 16 Dec 2023',
      year: '2023',
      totalAC: 90,
      totalPC: 11,
      totalRajyasabha: 5,
    },
  ];

  const columns = [
    {
      title: 'State Name',
      dataIndex: 'state',
      key: 'state',
      render: (text) => <span style={{ color: '#1890ff', fontWeight: 'bold' }}>{text}</span>,
    },
    {
      title: 'Current Tenure',
      dataIndex: 'tenure',
      key: 'tenure',
    },
    {
      title: 'Election Year',
      dataIndex: 'year',
      key: 'year',
    },
    {
      title: 'Total AC',
      dataIndex: 'totalAC',
      key: 'totalAC',
    },
    {
      title: 'Total PC',
      dataIndex: 'totalPC',
      key: 'totalPC',
    },
    {
      title: 'Total Rajyasabha',
      dataIndex: 'totalRajyasabha',
      key: 'totalRajyasabha',
    },
  ];

  return (
    <div style={{ padding: '20px' }}>
      <Title level={2} style={{ color: '#001529' }}>Upcoming Elections in India</Title>
      <Paragraph style={{ color: '#595959', marginBottom: '20px' }}>
        As 2024 nears its end, India is preparing for important elections that will shape its future. Earlier this year, the country elected its 18th Lok Sabha through a large voting process. This page provides details on upcoming, active, and past elections across Indian states.
      </Paragraph>
      <Card title="Upcoming Elections in India" bordered={false} style={{ backgroundColor: '#e6f7ff', marginBottom: '20px' }}>
        <Table columns={columns} dataSource={upcomingElectionsData} pagination={false} />
      </Card>
      <Card title="Active Elections in India" bordered={false} style={{ backgroundColor: '#f6ffed', marginBottom: '20px' }}>
        <Table columns={columns} dataSource={activeElectionsData} pagination={false} />
      </Card>
      <Card title="Past Elections in India" bordered={false} style={{ backgroundColor: '#fffbe6', marginBottom: '20px' }}>
        <Table columns={columns} dataSource={pastElectionsData} pagination={false} />
      </Card>
    </div>
  );
};

export default Elections;
