import * as yup from 'yup';

export const SignUpSchema = yup.object({
  userName: yup
    .string()
    .min(3)
    .trim()
    .test('Username', 'Invalid Username', (name) => {
      if (name) {
        const splittedName = name.trim().split(' ');
        const validSymbols = /^[a-zA-Zа-яА-ЯёЁ]+$/;
        const isValidNames = splittedName.every(
          (n) => n[0] === n[0].toUpperCase() && validSymbols.test(n),
        );
        return splittedName.length === 2 && isValidNames;
      }
      return true;
    })
    .required('Full name is required'),
  email: yup.string().email().required('Email is required'),
  password: yup.string().min(12).required('Password is required'),
  repeatPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Reset Passsword is required'),
});

export type SignUpValues = yup.InferType<typeof SignUpSchema>;
