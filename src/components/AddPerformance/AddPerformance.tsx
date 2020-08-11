import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, FormContextValues, OnSubmit } from 'react-hook-form';
import { useHistory } from 'react-router-dom';

import { Input, StyledH3Input } from '@pf85-ui/Form';
import { Button, toast } from '@pf85-ui';

import AddPerformanceSchema from './AddPerformanceSchema';
import Editor from 'components/Editor/Editor';
import DashboardHeader from 'components/DashboardHeader';
import StyledEditor from 'components/Editor/Editor.style';
import AddPerformanceWrapper from './AddPerformance.style';


import { addPerformance } from 'store/ducks/performances';
import { StoreState } from 'store';

const AddPerformance: React.FC = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    errors,
    watch,
    reset,
    setValue
  }: FormContextValues<Record<string, any>> = useForm({
    validationSchema: AddPerformanceSchema
  });
  const markdown = watch('body');
  const handleMarkdown = (e: any) => {
    setValue('body', e.target.value);
  };

  const [isLoading, error] = useSelector((state: StoreState) => [
    state.loading['performances/ADD_PERFORMANCE'],
    state.error['performances/ADD_PERFORMANCE']
  ]);
  const onSubmit = async (data: { subject: string; title: string; body: string }) => {

    dispatch(addPerformance(data)).then(() => {
      reset();
      setValue('body', '');
      history.push('/dashboard/performances');

      toast.success('New performance added!');
    });
  };

  error && toast.error(error);
  return (
    <AddPerformanceWrapper>
      <DashboardHeader>
        <h1>Submit new performance</h1>
      </DashboardHeader>

      <form onSubmit={handleSubmit(onSubmit as any)}>
        <StyledEditor>
            <Input
              autoComplete="off"
              name="subject"
              type="text"
              icon="user"
              placeholder="Enter the username to be reviewed."
              errors={errors}
              inputRef={register({ required: 'subject is required' })}
            />

            <Input
              autoComplete="off"
              name="title"
              type="text"
              icon="edit"
              placeholder="Enter Title"
              errors={errors}
              inputRef={register({ required: 'Title is required' })}
            />

          <Editor
            handleMarkdown={handleMarkdown}
            markdown={markdown}
            errors={errors}
            inputRef={register}
          />
          {/* <Input
              autoComplete="off"
              name="invitees"
              type="text"
              icon="user" 
              placeholder="Optional: Invite users to get involved. Enter username1, username2, ..."
              errors={errors}
              inputRef={register}
            /> */}

          <Button
            isLoading={isLoading}
            type="submit"
            className="performance__button"
            icon="plus"
          >
            Submit
          </Button>
        </StyledEditor>
      </form>
    </AddPerformanceWrapper>
  );
};

export default AddPerformance;
