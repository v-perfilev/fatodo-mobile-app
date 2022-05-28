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
import {Message} from '../../../../models/Message';

export interface ChatEditMessageFormValues {
  text: string;
}

const initialValues = (message: Message): ChatEditMessageFormValues => ({text: message.text});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('chat:editMessage.fields.text.required')),
});

type ChatEditMessageFormProps = {
  message: Message;
  request: (dto: MessageDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ChatEditMessageForm = ({message, request, cancel}: ChatEditMessageFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ChatEditMessageFormValues, helpers: FormikHelpers<ChatEditMessageFormValues>) => {
    const dto = {text: values.text} as MessageDTO;
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(message)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikMultilineInput
            name="text"
            label={t('chat:editMessage.fields.text.label')}
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
              {t('chat:editMessage.send')}
            </GhostButton>
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('chat:editMessage.cancel')}
            </GhostButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default ChatEditMessageForm;
