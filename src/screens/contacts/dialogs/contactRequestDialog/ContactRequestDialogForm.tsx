import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FormikMultilineInput from '../../../../components/inputs/FormikMultilineInput';
import {User, UserAccount} from '../../../../models/User';
import * as Yup from 'yup';
import {userValidator} from '../../../../shared/validators';
import {useAppSelector} from '../../../../store/store';
import AuthSelectors from '../../../../store/auth/authSelectors';
import {ContactRequestDTO} from '../../../../models/dto/ContactRequestDTO';
import GhostButton from '../../../../components/controls/GhostButton';
import FormikUserInput from '../../../../components/inputs/FormikUserInput';
import OutlinedButton from '../../../../components/controls/OutlinedButton';

export interface ContactRequestFormValues {
  usernameOrEmail: string;
  user: User;
  message: string;
}

export const defaultContactRequestFormValues: Readonly<ContactRequestFormValues> = {
  usernameOrEmail: '',
  user: null,
  message: '',
};

const validationSchema = (account: UserAccount) =>
  Yup.object().shape({
    usernameOrEmail: userValidator(account.username, account.email).check(),
    user: Yup.string().required(),
  });

type ContactRequestDialogFormProps = {
  request: (dto: ContactRequestDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ContactRequestDialogForm = ({request, cancel}: ContactRequestDialogFormProps) => {
  const {t} = useTranslation();
  const account = useAppSelector(AuthSelectors.account);

  const handleSubmit = (values: ContactRequestFormValues, helpers: FormikHelpers<ContactRequestFormValues>) => {
    const dto = {recipientId: values.user.id, message: values.message} as ContactRequestDTO;
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={defaultContactRequestFormValues}
      validationSchema={validationSchema(account)}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikUserInput
            name="usernameOrEmail"
            userName="user"
            label={t('contact:addContact.fields.user.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FormikMultilineInput
            name="message"
            label={t('contact:addContact.fields.message.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FHStack defaultSpace justifyContent="flex-end">
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('contact:addContact.cancel')}
            </GhostButton>
            <OutlinedButton
              colorScheme="primary"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('group:actions.save')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ContactRequestDialogForm;
