import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import Header from '../../../components/layouts/Header';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import {Formik, FormikHelpers} from 'formik';
import FHStack from '../../../components/boxes/FHStack';
import {DateFormat, dateFormats, Language, TimeFormat, timeFormats, UserAccount} from '../../../models/User';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import SimpleScrollView from '../../../components/scrollable/SimpleScrollView';
import FormikTimezoneInput from '../../../components/inputs/FormikTimezoneInput';
import FormikLanguageInput from '../../../components/inputs/FormikLanguageInput';
import {AuthActions} from '../../../store/auth/authActions';
import FormikTimeFormatInput from '../../../components/inputs/FormikTimeFormatInput';
import FormikDateFormatInput from '../../../components/inputs/FormikDateFormatInput';
import FormikSwitchInput from '../../../components/inputs/FormikSwitchInput';
import Subtitle from '../../../components/layouts/Subtitle';
import {flowRight} from 'lodash';
import withKeyboardHeightAvoiding from '../../../shared/hocs/withKeyboardHeightAvoiding';

export interface AccountSettingsFormValues {
  language: Language;
  timezone: string;
  timeFormat: TimeFormat;
  dateFormat: DateFormat;
  emailReminders: boolean;
}

const defaultAccountSettingsFormValues: Readonly<AccountSettingsFormValues> = {
  language: 'EN',
  timezone: '',
  timeFormat: timeFormats[0],
  dateFormat: dateFormats[0],
  emailReminders: true,
};

const initialValues = (account: UserAccount): AccountSettingsFormValues =>
  account ? account.settings : defaultAccountSettingsFormValues;

const AccountSettingsForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const values = useMemo(() => initialValues(account), [account]);

  const handleSubmit = (values: AccountSettingsFormValues, helpers: FormikHelpers<AccountSettingsFormValues>): void => {
    dispatch(AuthActions.updateAccountSettingsThunk(values))
      .unwrap()
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <>
      <Header />
      <SimpleScrollView>
        <Formik initialValues={values} onSubmit={handleSubmit} enableReinitialize>
          {(formikProps) => (
            <FVStack space="3">
              <FormikLanguageInput
                name="language"
                label={t('account:fields.language.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
              <FormikTimezoneInput
                name="timezone"
                label={t('account:fields.timezone.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
              <FormikTimeFormatInput
                name="timeFormat"
                label={t('account:fields.timeFormat.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
              <FormikDateFormatInput
                name="dateFormat"
                label={t('account:fields.dateFormat.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />

              <Subtitle subtitle={t('account:settings.notificationsSubtitle')} />

              <FormikSwitchInput
                name="emailReminders"
                label={t('account:fields.emailReminders.label')}
                isDisabled={formikProps.isSubmitting}
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
      </SimpleScrollView>
    </>
  );
};

export default flowRight([memo, withKeyboardHeightAvoiding])(AccountSettingsForm);
