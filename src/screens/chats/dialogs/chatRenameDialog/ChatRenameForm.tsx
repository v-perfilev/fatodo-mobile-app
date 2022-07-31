import {Formik, FormikHelpers} from 'formik';
import FVStack from '../../../../components/boxes/FVStack';
import FHStack from '../../../../components/boxes/FHStack';
import React from 'react';
import {useTranslation} from 'react-i18next';
import * as Yup from 'yup';
import GhostButton from '../../../../components/controls/GhostButton';
import i18n from '../../../../shared/i18n';
import {Chat} from '../../../../models/Chat';
import FormikTextInput from '../../../../components/inputs/FormikTextInput';
import OutlinedButton from '../../../../components/controls/OutlinedButton';

export interface ChatRenameFormValues {
  title: string;
}

const initialValues = (chat: Chat): ChatRenameFormValues => ({title: chat.title || ''});

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('chat:renameChat.fields.title.required')),
});

type ChatRenameFormProps = {
  chat: Chat;
  request: (title: string, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatRenameForm = ({chat, request, cancel}: ChatRenameFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatRenameFormValues, helpers: FormikHelpers<ChatRenameFormValues>) => {
    request(values.title, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(chat)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikTextInput
            name="text"
            label={t('chat:renameChat.fields.title.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FHStack defaultSpace justifyContent="flex-end">
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('chat:renameChat.cancel')}
            </GhostButton>
            <OutlinedButton
              colorScheme="primary"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('chat:renameChat.send')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatRenameForm;
