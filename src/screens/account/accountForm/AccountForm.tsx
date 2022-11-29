import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {usernameChangeValidator} from '../../../shared/validators';
import {DateFormat, dateFormats, Gender, Language, TimeFormat, timeFormats, UserAccount} from '../../../models/User';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import FormikGenderInput from '../../../components/inputs/FormikGenderInput';
import ImageUpload from '../../../components/inputs/imageUpload/ImageUpload';
import {AuthActions} from '../../../store/auth/authActions';
import Separator from '../../../components/layouts/Separator';
import SolidButton from '../../../components/controls/SolidButton';
import {useAccountDialogContext} from '../../../shared/contexts/dialogContexts/AccountDialogContext';

export interface AccountFormValues {
  username: string;
  firstname: string;
  lastname: string;
  language: Language;
  gender: Gender;
  timezone: string;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountFormValues: Readonly<AccountFormValues> = {
  username: '',
  firstname: '',
  lastname: '',
  language: 'EN',
  gender: null,
  timezone: '',
  timeFormat: timeFormats[0],
  dateFormat: dateFormats[0],
  imageFilename: null,
  imageContent: null,
};

const initialValues = (account: UserAccount): AccountFormValues =>
  account
    ? {
        username: account.username,
        firstname: account.info.firstname,
        lastname: account.info.lastname,
        language: account.info.language,
        gender: account.info.gender,
        timezone: account.info.timezone,
        timeFormat: account.info.timeFormat,
        dateFormat: account.info.dateFormat,
        imageFilename: account.info.imageFilename,
        imageContent: null,
      }
    : defaultAccountFormValues;

const validationSchema = (account: UserAccount) =>
  Yup.object().shape({
    username: usernameChangeValidator(account.username).check(),
  });

const AccountForm = () => {
  const dispatch = useAppDispatch();
  const {showDeletePermanentlyDialog} = useAccountDialogContext();
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

  const handleSubmit = (values: AccountFormValues, helpers: FormikHelpers<AccountFormValues>): void => {
    const formData = new FormData();
    addValueToForm(formData, 'id', account.id);
    addValueToForm(formData, 'username', values.username);
    addValueToForm(formData, 'firstname', values.firstname);
    addValueToForm(formData, 'lastname', values.lastname);
    addValueToForm(formData, 'language', values.language);
    addValueToForm(formData, 'gender', values.gender);
    addValueToForm(formData, 'timezone', values.timezone);
    addValueToForm(formData, 'timeFormat', values.timeFormat);
    addValueToForm(formData, 'dateFormat', values.dateFormat);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);

    dispatch(AuthActions.updateAccountThunk(formData))
      .unwrap()
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <>
      <Header />
      <SimpleScrollView>
        <FVStack space={3}>
          <Formik initialValues={values} validationSchema={valSchema} onSubmit={handleSubmit} enableReinitialize>
            {(formikProps) => (
              <FVStack space="3">
                <FormikTextInput
                  name="username"
                  label={t('account:fields.username.label')}
                  isDisabled={formikProps.isSubmitting}
                  {...formikProps}
                />
                <FormikTextInput
                  name="firstname"
                  label={t('account:fields.firstname.label')}
                  isDisabled={formikProps.isSubmitting}
                  {...formikProps}
                />
                <FormikTextInput
                  name="lastname"
                  label={t('account:fields.lastname.label')}
                  isDisabled={formikProps.isSubmitting}
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
          <Separator color="primary.500" />
          <SolidButton colorScheme="error" onPress={showDeletePermanentlyDialog}>
            {t('account:actions.deletePermanently')}
          </SolidButton>
        </FVStack>
      </SimpleScrollView>
    </>
  );
};

export default memo(AccountForm);
