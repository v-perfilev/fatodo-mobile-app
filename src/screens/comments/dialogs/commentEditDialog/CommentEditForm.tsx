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
import {Comment} from '../../../../models/Comment';
import {CommentDTO} from '../../../../models/dto/CommentDTO';
import OutlinedButton from '../../../../components/controls/OutlinedButton';

export interface CommentEditFormValues {
  text: string;
}

const initialValues = (comment: Comment): CommentEditFormValues => ({text: comment.text});

const validationSchema = Yup.object().shape({
  text: Yup.string().required(() => i18n.t('comment:editComment.fields.text.required')),
});

type CommentEditFormProps = {
  comment: Comment;
  request: (dto: CommentDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const CommentEditForm = ({comment, request, cancel}: CommentEditFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: CommentEditFormValues, helpers: FormikHelpers<CommentEditFormValues>) => {
    const dto = {text: values.text} as MessageDTO;
    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(comment)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikMultilineInput
            name="text"
            label={t('comment:editComment.fields.text.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FHStack defaultSpace justifyContent="flex-end">
            <GhostButton colorScheme="secondary" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('comment:editComment.cancel')}
            </GhostButton>
            <OutlinedButton
              colorScheme="primary"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('comment:editComment.send')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default CommentEditForm;
