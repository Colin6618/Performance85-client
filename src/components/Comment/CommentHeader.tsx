import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Avatar, Dropdown, Flex, Twemoji, toast } from '@pf85-ui';
import { copyToClipboard, timeAgo } from 'utils';

import { AuthorProps } from 'pages/SinglePerformance/SinglePerformance';

import { StoreState } from 'store';


const SmileAddIcon = ({ handleClick }: any) => (
  <Flex nowrap onClick={handleClick} className="add-smile-icon hover__button">
    <FontAwesomeIcon icon="smile" />
    <sup>
      <FontAwesomeIcon icon="plus" />
    </sup>
  </Flex>
);


interface CommentProps {
  performanceId: number | string;
  author: AuthorProps;
  date: string;
  commentId: string;
  isAuthorOfComment: boolean;
  handleEditorState: (e: any) => void;
}
const CommentHeader: React.FC<CommentProps> = ({
  performanceId,
  author,
  date,
  commentId,
  isAuthorOfComment,
  handleEditorState
}) => {
  const dispatch = useDispatch();
  const currentUser: any = useSelector((state: StoreState) => state.auth.user);
  const copyCommentLink = () => {
    let fullPath = window.location.origin + window.location.pathname;
    let url = commentId ? `${fullPath}?comment_id=${commentId}` : fullPath;
    copyToClipboard(url);
    toast.success('Link copied!');
  };


  return (
    <Flex
      nowrap
      gap="large"
      align="center"
      justify="space-between"
      className="comment__header"
    >
      <Avatar width="45px" height="45px" size="45px" username={author.username} />
      <span className="color--gray">
        <Link className="text--medium" to={`/profiles/${author.username}`}>
          {author.name}{' '}
        </Link>
        commented {timeAgo(date)}
      </span>

      <Flex
        nowrap
        gap="large"
        align="center"
        justify="space-between"
        className="comment__actions"
      >

        <Dropdown shouldCloseOnClick>
          <Dropdown.Toggle>
            <span className="hover__button">
              <FontAwesomeIcon icon="ellipsis-v" />
            </span>
          </Dropdown.Toggle>
          <Dropdown.Content style={{ padding: 0 }}>
            <Flex direction="column">
              <span
                onClick={copyCommentLink}
                className="comment__dropdown--item"
              >
                Copy link
              </span>
              {false && ( // TODO: open to admin and author maybe
                <span
                  onClick={handleEditorState}
                  className="comment__dropdown--item"
                >
                  Edit Comment
                </span>
              )}
            </Flex>
          </Dropdown.Content>
        </Dropdown>
      </Flex>
    </Flex>
  );
};

export default React.memo(CommentHeader);
