import React, { useState, useCallback } from 'react';
import RM from 'react-markdown';
import { useForm, FormContextValues } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import { getRefsOrMentions, renderMarkdown } from 'utils';
import {
  AuthorProps,
  addCommentSchema as CommentSchema
} from 'pages/SinglePerformance/SinglePerformance';

import { Button, ButtonGroup, toast } from '@pf85-ui';

import CodeBlock from 'components/Editor/CodeBlock';
import Editor from 'components/Editor/Editor';
import StyledEditor from 'components/Editor/Editor.style';
import StyledComment from './Comment.style';

import {
  editComment,
  updatePerformance,
  addReferences,
  mentionPeople
} from 'store/ducks/single-performance';
import { StoreState } from 'store';
import CommentHeader from './CommentHeader';

const ReactMarkdown = React.memo(RM);
const MarkdownPlugins = {
  code: CodeBlock
};

interface CommentProps {
  author: AuthorProps;
  date: string;
  body: string;
  performanceId: number | string;
  commentId: string;
  isSelected?: boolean;
}
const Comment: React.FC<CommentProps> = ({
  author,
  date,                         
  body,
  performanceId,
  commentId,
  isSelected
}) => {
  const dispatch = useDispatch<any>();
  const userId = useSelector((state: StoreState) => state.auth.user.id);
  const [isEditing, setIsEditing] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    setValue,
    errors: formErrors
  }: FormContextValues<Record<string, any>> = useForm({
    validationSchema: CommentSchema
  });

  const markdown = watch('body', body);
  const handleMarkdown = (e: any) => {
    setValue('body', e.target.value);
  };

  // using || to get the states of both comment editing & updating
  const [
    isEditingPending,
    editingError
  ] = useSelector(({ loading, error }: StoreState) => [
    loading['singleperformance/EDIT_COMMENT'] || loading['singleperformance/UPDATE_PERFORMANCE'],
    error['singleperformance/EDIT_COMMENT'] || error['singleperformance/UPDATE_PERFORMANCE']
  ]);

  const handleEditorState = useCallback(
    (e: any) => {
      e.preventDefault();
      setValue('body', '');
      setIsEditing(!isEditing);
    },
    [isEditing]
  );

  const onSubmit = (formData: any) => {
    if (commentId === '') {

      dispatch(updatePerformance(performanceId, formData)).then(() => {
        setIsEditing(!isEditing);
      });
    } else {
      // update the comment
      dispatch(editComment(performanceId, commentId, formData)).then(() => {
        setIsEditing(!isEditing);
      });
    }

    const references = getRefsOrMentions(markdown, '#');
    const mentions = getRefsOrMentions(markdown, '@');

    references.length && dispatch(addReferences(performanceId, references));
    mentions.length && dispatch(mentionPeople(performanceId, mentions));
  };

  const isAuthorOfComment = userId === author.id;
  const showCommentEditor = isEditing && isAuthorOfComment;

  editingError && toast.error(editingError);
  return (
    <StyledComment
      id={commentId}
      isSelected={isSelected}
      isCommentEditorOpen={showCommentEditor}
    >
      {showCommentEditor ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <StyledEditor>
            <Editor
              markdown={markdown}
              handleMarkdown={handleMarkdown}
              errors={formErrors}
              inputRef={register}
            />
            <ButtonGroup gap="medium">
              <Button
                variant="danger"
                icon="times"
                size="small"
                onClick={handleEditorState}
              >
                Cancel
              </Button>
              <Button
                icon="edit"
                size="small"
                type="submit"
                isLoading={isEditingPending}
              >
                Update
              </Button>
            </ButtonGroup>
          </StyledEditor>
        </form>
      ) : (
        <>
          <CommentHeader
            performanceId={performanceId}
            date={date}
            author={author}

            commentId={commentId}
            handleEditorState={handleEditorState}
            isAuthorOfComment={isAuthorOfComment}
          />

          <ReactMarkdown
            renderers={MarkdownPlugins}
            className="markdown-preview"
            source={renderMarkdown(body)}
          />

        </>
      )}
    </StyledComment>
  );
};

export default React.memo(Comment);
