import React from 'react';
import styled from 'styled-components';
import Masonry from 'react-masonry-css';
import { useParams } from 'react-router-dom';

import { formatDate } from 'utils';
import useFetch from 'hooks/useFetch';
import { Illustration, Loading } from '@pf85-ui';

import DashboardHeader from 'components/DashboardHeader';
import PerformanceCard from 'components/PerformanceCard/PerformanceCard';
import UserInfo from './UserInfo';

const breakpointColumns = {
  default: 3,
  1440: 3,
  1024: 2,
  768: 1
};

const ProfileWrapper = styled.section`
  .user__performances {
    margin-top: ${p => p.theme.spacings.top * 2}px;
  }
`;

const Profile = () => {
  const { username } = useParams();
  const [userData, userLoading, userError] = useFetch(`/api/user/${username}`);

  const isLoading = userLoading 
  const error = userError 
  const user = userData?.data;


  const renderUserInfo = () => {
    if (isLoading) return <Loading />;
    if (error) {
      return (
        <Illustration
          type="error"
          message="Something went wrong while loading the data"
        />
      );
    }
    return (
      <>
        {user && (
          <UserInfo
            user={user}
            totalComments={0}
            totalPerformances={0}
          />
        )}
      </>
    );
  };

  return (
    <ProfileWrapper>
      <DashboardHeader>
        <h1>User</h1>
      </DashboardHeader>
      {renderUserInfo()}
    </ProfileWrapper>
  );
};

export default Profile;
