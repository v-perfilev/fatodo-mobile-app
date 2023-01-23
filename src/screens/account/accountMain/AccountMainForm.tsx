import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {usernameChangeValidator} from '../../../shared/validators';
import {Gender, UserAccount} from '../../../models/User';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import FormikGenderInput from '../../../components/inputs/FormikGenderInput';
import ImageUpload from '../../../components/inputs/imageUpload/ImageUpload';
import {AuthActions} from '../../../store/auth/authActions';
import {flowRight} from 'lodash';

export interface AccountMainFormValues {
  username: string;
  firstname: string;
  lastname: string;
  gender: Gender;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountMainFormValues: Readonly<AccountMainFormValues> = {
  username: '',
  firstname: '',
  lastname: '',
  gender: null,
  imageFilename: null,
  imageContent: null,
};

const initialValues = (account: UserAccount): AccountMainFormValues =>
  account
    ? {
        username: account.username,
        firstname: account.info.firstname || '',
        lastname: account.info.lastname || '',
        gender: account.info.gender,
        imageFilename: account.info.imageFilename,
        imageContent: null,
      }
    : defaultAccountMainFormValues;

const validationSchema = (account: UserAccount) =>
  Yup.object().shape({
    username: usernameChangeValidator(account.username).check(),
  });

const AccountMainForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const values = useMemo(() => initialValues(account), [account]);
  const valSchema = useMemo(() => validationSchema(account), [account]);

  const addValueToForm = (formData: FormData, name: string, value: any, condition = true): void => {
    if (condition && value) {
      formData.append(name, value);
    }
  };

  const handleSubmit = (values: AccountMainFormValues, helpers: FormikHelpers<AccountMainFormValues>): void => {
    const formData = new FormData();
    addValueToForm(formData, 'username', values.username);
    addValueToForm(formData, 'firstname', values.firstname);
    addValueToForm(formData, 'lastname', values.lastname);
    addValueToForm(formData, 'gender', values.gender);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);

    dispatch(AuthActions.updateAccountInfoThunk(formData))
      .unwrap()
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={values} validationSchema={valSchema} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <FVStack space="3">
          <FormikTextInput
            name="username"
            label={t('account:fields.username.label')}
            isDisabled={formikProps.isSubmitting}
            isTrim
            {...formikProps}
          />
          <FormikTextInput
            name="firstname"
            label={t('account:fields.firstname.label')}
            isDisabled={formikProps.isSubmitting}
            isTrim
            {...formikProps}
          />
          <FormikTextInput
            name="lastname"
            label={t('account:fields.lastname.label')}
            isDisabled={formikProps.isSubmitting}
            isTrim
            {...formikProps}
          />
          <FormikGenderInput
            name="gender"
            label={t('account:fields.gender.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <ImageUpload
            filenameName="imageFilename"
            contentName="imageContent"
            label={t('account:fields.image.label')}
            preview
            crop
            {...formikProps}
          />

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

export default flowRight([memo])(AccountMainForm);
