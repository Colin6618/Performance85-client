import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import http from 'utils/httpInstance';
import { Avatar, PF85Logo, Flex, IconLink } from '@pf85-ui';
import Avatar2 from 'react-avatar';
import SidebarWrapper, { SidebarLinks } from './Sidebar.style';
import { StoreState } from 'store';
import { logUserOut } from 'store/ducks/auth';

interface SidebarProps {
  isOpen?: boolean;
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state: StoreState) => state.auth.user);

  const logout = () => {
    http.post('/api/user/logout').then(() => {
      console.log('logged out');
      history.push('/');
      dispatch(logUserOut());
    });
  };

  return (
    <SidebarWrapper isOpen={isOpen}>
      <Link to="/dashboard/performances">
        <PF85Logo width="100px" />
      </Link>
      <div className="sidebar--sticky">
        <Flex align="center" justify="flex-start">
          <Avatar
            className="dashboard__avatar"
            size={130}
            username={user?.username}
          />
          <div>
            <h2 className="text--bold">{user?.name}</h2>
            <p className="color--gray">@{user?.username}</p>
          </div>
        </Flex>

        <SidebarLinks>
          <Flex gap="large" direction="column">
            <IconLink isNav icon="home" to="/dashboard/performances">
              Dashboard
            </IconLink>
            <IconLink isNav icon="user" to="/profiles">
              Users
            </IconLink>
            <IconLink isNav icon="sign-out-alt" to="#" onClick={logout}>
              Logout
            </IconLink>
          </Flex>
        </SidebarLinks>
      </div>
    </SidebarWrapper>
  );
};

export default Sidebar;
