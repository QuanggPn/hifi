import { DownOutlined, MenuOutlined } from '@ant-design/icons';
import { Button, Col, Drawer, Menu, Row } from 'antd';
import axios from 'axios';
import type { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { authActions } from 'redux/reducers/authSlice';
import { selectUser } from 'redux/selectors';
import logo from '/public/images/Logo.svg';
const { SubMenu } = Menu;

interface menuData {
  id: number;
  name: String;
  url: string;
  icon: JSX.Element;
}

interface Props {
  menu: Array<menuData>;
}
const noAuthPaths = ['/auth/login', '/auth/register'];
const publicPaths = ['/', '/job-posts', '/companies'];
const Header: NextPage<Props> = (props) => {
  const { menu } = props;
  const user = useAppSelector(selectUser);
  const [pathname, setPathname] = useState(['home']);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    const tmp = window.location.pathname.substring(1);
    setPathname([tmp]);
  }, []);

  const navMenu = (
    <>
      {menu.map((item) => (
        <Menu.Item key={item.id}>
          <Link href={item.url} passHref={true}>
            <span className='font-bold text-text-primary text-md'>{item.name}</span>
          </Link>
        </Menu.Item>
      ))}
    </>
  );

  const handleLogout = async () => {
    try {
      await axios.get('/api/auth/logout');
      if (!(noAuthPaths.includes(router.pathname) || publicPaths.includes(router.pathname))) {
        router.replace('/auth/login');
      }
      dispatch(authActions.logout());
    } catch (error) {
      console.log('handleLogout Error: ', error);
    }
  };
  return (
    <div className='sticky inset-x-0 top-0 bg-white z-10 drop-shadow-xl'>
      <Row justify='space-between' className='px-16 py-4 '>
        <Col className='items-center'>
          <div className='mobileVisible'>
            <Button type='primary' onClick={showDrawer}>
              <MenuOutlined />
            </Button>
            <Drawer placement='left' onClose={onClose} visible={visible}>
              <Menu
                onClick={(e) => {
                  setPathname([e.key]);
                  setVisible(false);
                }}
                selectedKeys={pathname}
                theme='light'
                mode='vertical'
                inlineCollapsed={false}
              >
                {navMenu}
              </Menu>
            </Drawer>
          </div>
          <div className='mobileHidden'>
            <Row align='middle'>
              <Button type='link' className='w-16' href='/'>
                <Image alt='' src={logo} />
              </Button>
              <Menu
                onClick={(e) => setPathname([e.key])}
                selectedKeys={pathname}
                theme='light'
                mode='horizontal'
                expandIcon={<DownOutlined />}
                disabledOverflow={true}
              >
                {navMenu}
              </Menu>
            </Row>
          </div>
        </Col>
        <Col>
          {!user ? (
            <>
              <Button key='login' type='link' href='/auth/login'>
                <span className='font-semibold text-text-secondary'>Login</span>
              </Button>
              <Button key='signup' type='primary' href='/auth/login'>
                <span className='font-semibold text-[#fff] '>Sign up</span>
              </Button>
            </>
          ) : (
            <div className='space-x-4'>
              <Button key='signup' type='dashed' href='/profile'>
                <span className='font-semibold'>Profile</span>
              </Button>
              <Button key='signup' type='dashed' href='/user/applications'>
                <span className='font-semibold'>My Application</span>
              </Button>
              <Button key='signup' type='dashed' onClick={handleLogout}>
                <span className='font-semibold'>Log out</span>
              </Button>
            </div>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Header;
