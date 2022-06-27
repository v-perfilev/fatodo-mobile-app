import React from 'react';
import {useAppDispatch} from '../../../store/store';
import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import SolidButton from '../../../components/controls/SolidButton';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {PasswordStrengthBar} from '../../../components/inputs/PasswordStrengthBar';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import {passwordValidator} from '../../../shared/validators';
import i18n from '../../../shared/i18n';
import {AuthThunks} from '../../../store/auth/authActions';
import {ChangePasswordDTO} from '../../../models/dto/ChangePasswordDTO';

export interface ChangePasswordFormValues {
  oldPassword: string;
  newPassword: string;
}

const defaultChangePasswordFormValues: Readonly<ChangePasswordFormValues> = {
  oldPassword: '',
  newPassword: '',
};

const validationSchema = Yup.object().shape({
  oldPassword: Yup.string().required(() => i18n.t('account:fields.password.required')),
  newPassword: passwordValidator,
});

const AccountChangePasswordForm = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();

  const handleSubmit = (values: ChangePasswordFormValues, helpers: FormikHelpers<ChangePasswordFormValues>): void => {
    const dto = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    } as ChangePasswordDTO;

    dispatch(AuthThunks.changePassword(dto)).then(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={defaultChangePasswordFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <FVStack defaultSpace>
          <FormikPasswordInput
            name="oldPassword"
            label={t('account:fields.oldPassword.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FormikPasswordInput
            name="newPassword"
            label={t('account:fields.newPassword.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <PasswordStrengthBar password={formikProps.values.newPassword} />

          <FHStack defaultSpace mt="3" justifyContent="flex-end">
            <SolidButton
              colorScheme="primary"
              size="md"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('item:actions.save')}
            </SolidButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default AccountChangePasswordForm;
