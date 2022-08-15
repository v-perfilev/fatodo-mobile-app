import React from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import {AuthThunks} from '../../../store/auth/authActions';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import * as Yup from 'yup';
import {usernameChangeValidator} from '../../../shared/validators';
import {UserAccount} from '../../../models/User';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import FormikSelect from '../../../components/inputs/FormikSelect';
import {languages} from '../../../shared/i18n';
import {ScrollView, Text} from 'native-base';
import {timezones} from '../../../shared/timezone';
import {DateFormatters} from '../../../shared/utils/DateUtils';
import ImageUpload from '../../../components/inputs/imageUpload/ImageUpload';
import {useNavigation} from '@react-navigation/native';
import {AccountNavigationProp} from '../../../navigators/AccountNavigator';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import {DEFAULT_SPACE} from '../../../constants';

export interface AccountFormValues {
  username: string;
  firstname: string;
  lastname: string;
  language: string;
  timezone: string;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultAccountFormValues: Readonly<AccountFormValues> = {
  username: '',
  firstname: '',
  lastname: '',
  language: 'en',
  timezone: '',
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
        timezone: account.info.timezone,
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
  const account = useAppSelector(AuthSelectors.account);
  const navigation = useNavigation<AccountNavigationProp>();
  const {t} = useTranslation();

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
    addValueToForm(formData, 'timezone', values.timezone);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);

    dispatch(AuthThunks.updateAccount(formData))
      .unwrap()
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <>
      <Header hideLogo />
      <ScrollView p={DEFAULT_SPACE}>
        <Formik
          initialValues={initialValues(account)}
          validationSchema={validationSchema(account)}
          onSubmit={handleSubmit}
        >
          {(formikProps) => (
            <FVStack defaultSpace>
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
              <FormikSelect
                name="language"
                label={t('account:fields.language.label')}
                options={languages.map((l) => l.code)}
                view={(lang: string) => <Text>{languages.find((l) => l.code === lang).name}</Text>}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
              <FormikSelect
                name="timezone"
                label={t('account:fields.timezone.label')}
                options={timezones}
                view={(t) => <Text>{DateFormatters.formatTimezone(t)}</Text>}
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

              <FHStack defaultSpace mt="3" justifyContent="flex-end">
                <OutlinedButton
                  colorScheme="primary"
                  size="md"
                  isLoading={formikProps.isSubmitting}
                  isDisabled={!formikProps.isValid || formikProps.isSubmitting}
                  onPress={formikProps.submitForm}
                >
                  {t('item:actions.save')}
                </OutlinedButton>
              </FHStack>
            </FVStack>
          )}
        </Formik>
      </ScrollView>
    </>
  );
};

export default AccountForm;
