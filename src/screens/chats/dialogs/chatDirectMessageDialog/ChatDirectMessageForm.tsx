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
import OutlinedButton from '../../../../components/controls/OutlinedButton';

export interface ChatDirectMessageFormValues {
  username: string;
  text: string;
}

export const defaultChatDirectMessageFormValues: Readonly<ChatDirectMessageFormValues> = {
  username: '',
  text: '',
};

const initialValues = (user: User): ChatDirectMessageFormValues => ({
  ...defaultChatDirectMessageFormValues,
  username: user.username,
});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('chat:directMessage.fields.text.required')),
});

type ChatDirectMessageFormProps = {
  user: User;
  request: (dto: MessageDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatDirectMessageForm = ({user, request, cancel}: ChatDirectMessageFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatDirectMessageFormValues, helpers: FormikHelpers<ChatDirectMessageFormValues>) => {
    const dto: MessageDTO = {text: values.text};
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
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('chat:directMessage.cancel')}
            </GhostButton>
            <OutlinedButton
              colorScheme="primary"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('chat:directMessage.send')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatDirectMessageForm;
