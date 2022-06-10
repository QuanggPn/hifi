import { Tabs } from 'antd';
import CompanyAbout from 'components/companies/CompanyAbout';
import CompanyImages from 'components/companies/CompanyImages';
import CompanyLocation from 'components/companies/CompanyLocation';
import CompanySummary from 'components/companies/CompanySummary';
import type { NextPage } from 'next';
import Head from 'next/head';
const { TabPane } = Tabs;

const Companies: NextPage = () => {
  const data = [
    {
      id: 1,
      logoUrl: 'https://beta-help.zalo.me/wp-content/uploads/2021/09/Thumb-link.png',
      companyName: 'Zalo',
      address: 'Ho Chi Minh',
      field: 'IT - phần mềm',
      jobs: 10,
    },
    {
      id: 2,
      logoUrl:
        'https://e7.pngegg.com/pngimages/710/104/png-clipart-fossil-company-headquarters-fossil-group-misfit-smartwatch-fossil-group-text-logo.png',
      companyName: 'Fossil',
      address: 'Ho Chi Minh',
      field: 'IT - phần mềm',
      jobs: 10,
    },
    {
      id: 3,
      logoUrl:
        'data:image/png;base64,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',
      companyName: 'Netcompany',
      address: 'Ho Chi Minh',
      field: 'IT - phần mềm',
      jobs: 10,
    },
  ];
  return (
    <div className='contain'>
      <CompanySummary
        id={2}
        logoUrl={
          'https://e7.pngegg.com/pngimages/710/104/png-clipart-fossil-company-headquarters-fossil-group-misfit-smartwatch-fossil-group-text-logo.png'
        }
        companyName={'Fossil Vietnam'}
        address={'Quan 4, Ho Chi Minh'}
        field={'IT - Phan mem'}
        jobs={10}
      />
      <Tabs defaultActiveKey='1' type='card' size='middle'>
        <TabPane tab='Job list' key='1'>
          Content of card tab 1
        </TabPane>
        <TabPane tab='About' key='2'>
          <CompanyAbout />
          <CompanyImages />
        </TabPane>
        <TabPane tab='Location' key='3'>
          <CompanyLocation
            location={{
              lat: 21.027763,
              lng: 105.83416,
            }}
            center={{
              lat: 21.027763,
              lng: 105.83416,
            }}
            address='Fl 24. Opal Tower. Nguyễn Hữu Cảnh Street, Ward 22, Binh Thanh District, HCMC Binh Thanh Ho Chi Minh'
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Companies;
