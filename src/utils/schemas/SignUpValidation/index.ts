import * as yup from 'yup';

export const SignUpSchema = yup.object({
  userName: yup.string().min(3).required('Full name is required'),
  email: yup.string().email().required(),
  password: yup.string().min(12).required(),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Reset Passsword is required'),
});

export type SignUpValues = yup.InferType<typeof SignUpSchema>;

export const isValidUserName = (name: string): boolean => {
  const splittedName = name.split(' ');
  const onlyLetter = /^[a-zA-Zа-яА-ЯёЁ]+$/;
  const isValidNames = splittedName.every(
    (n) =>
      n[0] === n[0].toUpperCase() &&
      n.length > 0 &&
      !n.includes(' ') &&
      onlyLetter.test(n),
  );
  return splittedName.length === 2 && isValidNames;
};
