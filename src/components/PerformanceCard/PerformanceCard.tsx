import React from 'react';
import { Link } from 'react-router-dom';


import { StyledPerformanceCard, PerformanceCardIcon, StyledMetaInfo } from './PerformanceCard.style';

interface Author {
  name: string;
  username: string;
}



interface PerformanceMetaProps {
  number: string;
  date: string;
  author: Author;
  subject?: Author;
}

interface PerformanceCardProps {
  number: string;
  title: string;

  body: string;
  isOpen: boolean;
  date: string;
  author: Author;
  subject?: Author;
}

export const PerformanceMetaInfo: React.FC<PerformanceMetaProps> = ({
  number,
  date,
  author,
  subject = {}
}) => (
  <StyledMetaInfo className="text--light">
    <span className="performance__number">#{number.slice(-4)}</span> / on {date} by{' '}
    <Link to={`/profiles/${author.username}`}>{author.name}</Link>
    {' to '} <Link to={`/profiles/${subject.username}`}>{subject.name}</Link>
  </StyledMetaInfo>
);

const PerformanceCard: React.FC<PerformanceCardProps> = ({
  number,
  title,
  body,
  isOpen,
  date,
  author,
  subject
}) => {

  return (
    <StyledPerformanceCard>
      <PerformanceCardIcon isOpen={isOpen} />
      <PerformanceMetaInfo number={number} date={date} author={author} subject={subject} />

      <Link to={`/dashboard/performances/${number}`}>
        <h3 className="performance__title">{title}</h3>
      </Link>

      <div className="performance__body--text mt-large">{body.slice(0, 150)}</div>
    </StyledPerformanceCard>
  );
};

export default React.memo(PerformanceCard);
