import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { StoreState } from 'store';


import { Avatar, Button, Flex, toast } from '@pf85-ui';

// get unique avatar images from all comments
const getParticipants = (performance: any): string[] => {
  return Object.values(performance?.entities?.comments || {})
    .map((comment: any) => comment.author?.username)
    .filter(
      (item: string, pos: number, array: string[]) =>
        array.indexOf(item) === pos
    );
};

interface SinglePerformanceAsideProps {
  performanceId: number | string;
  performance: any;
}
const SinglePerformanceAside: React.FC<SinglePerformanceAsideProps> = ({ performanceId: performanceId, performance: performance }) => {
  const dispatch = useDispatch<any>();


  let participants: string[] = getParticipants(performance);


  return (
    <aside className="singleperformance__aside--sticky">
      <div>
        <h4 className="label__header color--gray">
        </h4>
        <Flex gap="medium">
        </Flex>
      </div>
      <div>
        <h4 className="color--gray">{participants.length} participants</h4>
        <Flex gap="medium">
          {participants.map((participant: string, i: number) => (
            <Avatar
              key={i}
              width="40px"
              height="40px"
              size={45}
              username={participant}
            />
          ))}
        </Flex>
      </div>
    </aside>
  );
};

export default SinglePerformanceAside;
