import { Col, Layout, Row } from 'antd';
import MainProfile from 'components/profile/MainProfile';
import ToolSidebar from 'components/profile/ToolSidebar';
import { NextPage } from 'next';
import React from 'react';
import { Award } from 'types';

type Props = {
  awards?: Award[];
};
const { Header, Content, Footer } = Layout;
const ProfilePage: NextPage<Props> = () => {
  return (
    <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} className='py-6'>
      <Col lg={16} md={24}>
        <MainProfile />
      </Col>
      <Col lg={8} md={24}>
        <ToolSidebar />
      </Col>
    </Row>
  );
};

export default ProfilePage;
