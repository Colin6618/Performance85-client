import React, { useState } from 'react';
import { useForm, FormContextValues } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';


import { Flex, Button, IconLink, PF85Logo, toast } from '@pf85-ui';
import { Input, StyledH3Input } from '@pf85-ui/Form';


import SignupSchema from './SignupSchema';

import SignupWrapper from './Signup.style';
import { signUserUp } from 'store/ducks/auth';
import { StoreState } from 'store';

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File>();
  const {
    register,
    handleSubmit,
    errors,
    watch
  }: FormContextValues<Record<string, any>> = useForm({
    validationSchema: SignupSchema,
    mode: 'onChange'
  });

  const [isLoading, signupError] = useSelector((state: StoreState) => [
    state.loading['user/SIGN_UP'],
    state.error['user/SIGN_UP']
  ]);

  const onSubmit = (data: { name: string; email: string; password: string}) => {
    dispatch(signUserUp(data)).then(() => {
      toast.success('Successfully signed up');
    });
  };

  signupError && toast.error(signupError);

  return (
    <SignupWrapper>
      <Flex align="center" justify="center" direction="column">
        <PF85Logo />
        <form onSubmit={handleSubmit(onSubmit as any)}>
          <StyledH3Input>
            <Input
              autoComplete="off"
              name="name"
              type="text"
              icon="edit"
              placeholder="Enter Your Name"
              errors={errors}
              inputRef={register({ required: 'Name is required' })}
            />
          </StyledH3Input>

          <Input
            name="email"
            type="email"
            icon="envelope"
            placeholder="example@gmail.com"
            errors={errors}
            inputRef={register({ required: 'Email is required' })}
          />

          <Input
            type="password"
            name="password"
            icon="lock"
            placeholder="password"
            errors={errors}
            inputRef={register({ required: 'Password is Required' })}
          />

          <Input
            type="password"
            name="confirmPassword"
            icon="lock"
            placeholder="confirm password"
            errors={errors}
            inputRef={register({
              required: 'Confirm Password is Required',
              validate: (value: string) => {
                return (
                  value === watch('password') ||
                  'Confirm Password does not match'
                );
              }
            })}
          />

          <Button
            isLoading={isLoading}
            type="submit"
            width="50%"
            icon="arrow-right"
          >
            SignUp
          </Button>

        </form>

        <IconLink className="color--gray" to="/">
          Already have an account?
        </IconLink>
      </Flex>
    </SignupWrapper>
  );
};

export default Signup;
