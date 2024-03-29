import React, {memo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch} from '../../../store/store';
import {AuthActions} from '../../../store/auth/authActions';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {passwordValidator} from '../../../shared/validators';
import i18n from '../../../shared/i18n';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import {ChangePasswordDTO} from '../../../models/dto/ChangePasswordDTO';
import FormikPasswordInput from '../../../components/inputs/FormikPasswordInput';
import {PasswordStrengthBar} from '../../../components/inputs/PasswordStrengthBar';
import {flowRight} from 'lodash';

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
  const navigation = useNavigation();
  const {t} = useTranslation();

  const handleSubmit = (values: ChangePasswordFormValues, helpers: FormikHelpers<ChangePasswordFormValues>): void => {
    const dto: ChangePasswordDTO = {
      oldPassword: values.oldPassword,
      newPassword: values.newPassword,
    };

    dispatch(AuthActions.changePasswordThunk(dto))
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={defaultChangePasswordFormValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {(formikProps) => (
        <FVStack space="3">
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

          <FHStack space="3" mt="3" justifyContent="flex-end">
            <OutlinedButton
              colorScheme="primary"
              size="md"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('account:actions.save')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([memo])(AccountChangePasswordForm);
