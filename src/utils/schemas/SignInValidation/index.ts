import * as yup from 'yup';

export const SignInSchema = yup.object({
  email: yup.string().email().required('Email is required'),
  password: yup.string().required('Password is required'),
});

export type SignInValues = yup.InferType<typeof SignInSchema>;
