import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useForm, FormContextValues } from 'react-hook-form';

import { getRefsOrMentions } from 'utils';
import { Button, ButtonGroup, toast } from '@pf85-ui';

import Editor from 'components/Editor/Editor';
import StyledEditor from 'components/Editor/Editor.style';
import CloseReopenButton from './CloseReopenButton';
import { addCommentSchema } from './SinglePerformance';
import {
  addComment,
  openOrClosePerformance,
  addReferences
} from 'store/ducks/single-performance';
import { StoreState } from 'store';

const CommentEditorForm: React.FC<{ performanceIsOpen: boolean }> = ({ performanceIsOpen }) => {
  const dispatch = useDispatch<any>();
  const { performanceId } = useParams<any>();

  const {
    watch,
    setValue,
    register,
    handleSubmit,
    errors: formErrors
  }: FormContextValues<Record<string, any>> = useForm({
    validationSchema: addCommentSchema
  });

  const markdown = watch('body');
  const handleMarkdown = (e: any) => {
    setValue('body', e.target.value);
  };

  const onSubmit = (formData: { body: string }) => {
    dispatch(addComment(performanceId, formData)).then(() => {
      const references = getRefsOrMentions(markdown, '#');
      references.length && dispatch(addReferences(performanceId, references));
      setValue('body', '');
    });
  };

  const sendToggleRequest = useCallback(
    (state: string) => {
      dispatch(openOrClosePerformance(performanceId, state));
    },
    [performanceId]
  );

  const [isCommentLoading, commentError] = useSelector((state: StoreState) => [
    state.loading['singleperformance/ADD_COMMENT'],
    state.error['singleperformance/ADD_COMMENT']
  ]);
  const [isToggleLoading, toggleError] = useSelector((state: StoreState) => [
    state.loading['singleperformance/TOGGLE_PERFORMANCE'],
    state.error['singleperformance/TOGGLE_PERFORMANCE']
  ]);

  commentError && toast.error(commentError);
  toggleError && toast.error(toggleError);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit as any)}>
        <StyledEditor>
          <Editor
            markdown={markdown}
            handleMarkdown={handleMarkdown}
            errors={formErrors}
            inputRef={register}
          />
          <ButtonGroup gap="medium">
            <Button isLoading={isCommentLoading} type="submit" icon="plus">
              Comment
            </Button>
          </ButtonGroup>
        </StyledEditor>
      </form>
    </>
  );
};

export default React.memo(CommentEditorForm);
