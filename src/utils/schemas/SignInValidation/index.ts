import * as yup from 'yup';

export const SignInSchema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().required(),
});

export type SignInValues = yup.InferType<typeof SignInSchema>;
