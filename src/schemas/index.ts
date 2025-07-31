import * as yup from 'yup';
import {useTranslation} from 'react-i18next';

export const useSchemas = () => {
  const {t} = useTranslation();

  const authSchema = yup.object().shape({
    email: yup.string().email().required(t('schemas.required')).trim(),
  });

  const placeBidAddDescriptionSchema = yup.object().shape({
    description: yup.string().required(t('schemas.required')).nullable().trim(),
  });

  const hourlyRateSchemaSchema = yup.object().shape({
    hours: yup
      .number()
      .typeError(t('schemas.digitsOnly'))
      .required(t('schemas.required'))
      .nullable(),
  });

  const rateAndReviewSchema = yup.object().shape({
    review: yup.string().nullable().trim(),
  });

  const addressSchema = yup.object().shape({
    address: yup.string().required(t('schemas.required')).nullable().trim(),
  });

  const reportSchema = yup.object().shape({
    reason: yup.string().trim(),
    text: yup.string().trim(),
  });

  const placeBidAmountSchema = yup.object().shape({
    bidAmount: yup
      .number()
      .typeError(t('schemas.digitsOnly'))
      .min(1, t('schemas.bidAmountMinError'))
      .required(t('schemas.required'))
      .nullable(),
  });

  const completeProfileSchemaStep1 = yup.object().shape({
    firstName: yup.string().trim().required(t('schemas.required')),
    lastName: yup.string().trim().required(t('schemas.required')),
    userName: yup
      .string()
      .matches(/^(?![_.,])[a-zA-Z0-9_.,]+$/, t('schemas.validUsername'))
      .min(3, t('schemas.minUsername'))
      .max(30, t('schemas.maxUsername'))
      .nullable()
      .trim()
      .required(t('schemas.required')),
    referralCode: yup.string().min(8, t('schemas.referralCode')).trim(),
  });

  const completeProfileSchemaStep2 = yup.object().shape({
    streetAddress: yup
      .string()
      .nullable()
      .trim()
      .required(t('schemas.required')),
    location: yup.object().nullable(),
  });

  const addNewAddress = yup.object().shape({
    streetAddress: yup
      .string()
      .required(t('schemas.required'))
      .nullable()
      .trim(),
    addressTitle: yup
      .string()
      .min(3)
      .max(50)
      .required(t('schemas.required'))
      .nullable()
      .trim(),
  });

  const updateProfile = yup.object().shape({
    email: yup.string().email().required(t('schemas.required')).trim(),
    imageAddress: yup.string(),
    firstName: yup.string().required(t('schemas.required')).nullable().trim(),
    lastName: yup.string().required(t('schemas.required')).nullable().trim(),
    userName: yup
      .string()
      .matches(/^[a-zA-Z][a-zA-Z0-9_.,]*$/, t('schemas.validUsername'))
      .min(3, t('schemas.minUsername'))
      .max(30, t('schemas.maxUsername'))
      .required(t('schemas.required'))
      .trim(),
    bio: yup.string().max(140, t('schemas.maxBio')).nullable().trim(),
    phoneNumber: yup.string().nullable().trim(),
  });

  const questionsSchema = yup.object().shape({
    answers: yup.array().of(yup.string().nullable()),
  });

  const paymentSchema = yup.object().shape({
    couponCode: yup.string().nullable().trim(),
  });

  const verifyPhoneNumberSchema = yup.object().shape({
    phoneNumber: yup.string().required(t('schemas.required')).nullable().trim(),
  });

  const verificationSchema = yup.object().shape({
    verificationCode: yup
      .string()
      .required(t('schemas.required'))
      .nullable()
      .trim(),
  });

  const projectCancelationSchema = yup.object().shape({
    cancelProjectStatus: yup.object().required(t('schemas.required')),
    cancellationReason: yup.string().when('cancelProjectStatus', {
      is: (value: any) => value && value.value === 'OTHERS',
      then: () => yup.string().required(t('schemas.required')),
      otherwise: () => yup.string().nullable(),
    }),
  });

  const rateUsSchema = yup.object().shape({
    review: yup.string().nullable().required(t('schemas.required')).trim(),
  });

  const notificationSettingsSchema: yup.ObjectSchema<NotificationSettingsType> =
    yup.object().shape({
      projects: yup.boolean(),
      bids: yup.boolean(),
      messages: yup.boolean(),
      questions: yup.boolean(),
    });

  const selectStateSchema = yup.object().shape({
    city: yup.string().required(t('schemas.required')).nullable(),
    state: yup.object().required(t('schemas.required')).nullable(),
  });

  const loginSchema = yup.object().shape({
    email: yup.string().required(t('schemas.required')).trim(),
    password: yup
      .string()
      .min(6, t('auth.minPassword'))
      .max(36, t('auth.maxPassword'))
      .required(t('schemas.required'))
      .trim(),
  });

  const SignUpSchema = yup.object().shape({
    email: yup.string().email().required(t('schemas.required')),
    password: yup
      .string()
      .min(8, t('auth.minPassword1'))
      .max(36, t('auth.maxPassword'))
      .required(t('schemas.required'))
      .trim(),
    confirm: yup
      .string()
      .min(8, t('auth.minPassword1'))
      .max(36, t('auth.maxPassword'))
      .required(t('schemas.required'))
      .oneOf([yup.ref('password')], t('auth.passwordMatch'))
      .trim(),
  });

  const forgotPasswordSchema = yup.object().shape({
    email: yup.string().email().required(t('schemas.required')).trim(),
  });

  const withdrawSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError(t('schemas.digitsOnly'))
      .min(1, t('schemas.withdrawAmountMinError'))
      .max(999, t('schemas.withdrawAmountMaxError'))
      .required(t('schemas.required'))
      .nullable(),
  });

  const withdrawRegularSchema = yup.object().shape({
    amount: yup
      .number()
      .typeError(t('schemas.digitsOnly'))
      .min(1, t('schemas.withdrawAmountMinError'))
      .required(t('schemas.required'))
      .nullable(),
  });

  return {
    authSchema,
    completeProfileSchemaStep1,
    completeProfileSchemaStep2,
    addNewAddress,
    questionsSchema,
    placeBidAddDescriptionSchema,
    placeBidAmountSchema,
    paymentSchema,
    addressSchema,
    updateProfile,
    rateAndReviewSchema,
    projectCancelationSchema,
    hourlyRateSchemaSchema,
    reportSchema,
    selectStateSchema,
    notificationSettingsSchema,
    verifyPhoneNumberSchema,
    verificationSchema,
    rateUsSchema,
    loginSchema,
    SignUpSchema,
    forgotPasswordSchema,
    withdrawSchema,
    withdrawRegularSchema,
  };
};
