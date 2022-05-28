import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import FormikMultilineInput from '../../../../components/inputs/FormikMultilineInput';
import * as Yup from 'yup';
import GhostButton from '../../../../components/controls/GhostButton';
import {MessageDTO} from '../../../../models/dto/MessageDTO';
import i18n from '../../../../shared/i18n';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import {User} from '../../../../models/User';

export interface ChatDirectFormValues {
  username: string;
  text: string;
}

export const defaultChatDirectFormValues: Readonly<ChatDirectFormValues> = {
  username: '',
  text: '',
};

const initialValues = (user: User): ChatDirectFormValues => ({...defaultChatDirectFormValues, username: user.username});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('chat:directMessage.fields.text.required')),
});

type ChatDirectMessageDialogFormProps = {
  user: User;
  request: (dto: MessageDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatDirectMessageDialogForm = ({user, request, cancel}: ChatDirectMessageDialogFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatDirectFormValues, helpers: FormikHelpers<ChatDirectFormValues>) => {
    const dto = {text: values.text} as MessageDTO;
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(user)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikTextInput
            name="username"
            label={t('chat:directMessage.fields.username.label')}
            isDisabled
            {...formikProps}
          />
          <FormikMultilineInput
            name="text"
            label={t('chat:directMessage.fields.text.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FHStack defaultSpace justifyContent="flex-end">
            <GhostButton
              colorScheme="primary"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('chat:directMessage.send')}
            </GhostButton>
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('chat:directMessage.cancel')}
            </GhostButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatDirectMessageDialogForm;
