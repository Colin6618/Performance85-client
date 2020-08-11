import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StoreState } from 'store';
import { useHistory } from 'react-router-dom';

import { Flex } from '@pf85-ui';
import circleShapes from 'assets/svg/circle_shapes.svg';

import HomeWrapper from './Home.style';

interface HomeProps {
  right: React.FC<{}>;
}
const Home: React.FC<HomeProps> = ({ right: Right }) => {
  const history = useHistory();
  const isAuthenticated = useSelector(
    (state: StoreState) => state.auth.isAuthenticated
  );
  useEffect(() => {
    if (isAuthenticated) {
      history.push('/dashboard/performances');
    }
  }, [isAuthenticated]);

  return (
    <HomeWrapper>
      <img className="home__shape" src={circleShapes} />
      <Flex>
        <div className="home__left">
          <div className="home__text">
            <h1 className="text--light">PF85</h1>
            <h1 className="text--light">Reviews</h1>
            <h1 className="text--light">your</h1>
            <h1 className="text--bold">Performance</h1>
            <span>with no bonus!</span>

          </div>
        </div>
        <div className="home__right">
          <Right />
        </div>
      </Flex>
    </HomeWrapper>
  );
};

export default Home;
