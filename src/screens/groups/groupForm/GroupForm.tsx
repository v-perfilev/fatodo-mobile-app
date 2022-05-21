import React from 'react';
import {flowRight} from 'lodash';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import {ColorScheme} from '../../../shared/themes/ThemeFactory';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import SolidButton from '../../../components/controls/SolidButton';
import {useTranslation} from 'react-i18next';
import {SnackState} from '../../../shared/contexts/SnackContext';
import FormikThemeInput from '../../../components/inputs/FormikThemeInput';
import ImageUpload from '../../../components/inputs/imageUpload/ImageUpload';
import withSnackContext from '../../../shared/hocs/withSnack/withSnackContext';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';

export interface GroupFormValues {
  title: string;
  color: ColorScheme;
  imageFilename?: string;
  imageContent?: Blob;
}

const defaultGroupFormValues: Readonly<GroupFormValues> = {
  title: '',
  color: 'yellow',
  imageFilename: null,
  imageContent: null,
};

const initialValues = (group: Group): GroupFormValues =>
  group
    ? {
        title: group.title,
        color: group.color,
        imageFilename: group.imageFilename,
        imageContent: null,
      }
    : defaultGroupFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('group:fields.title.required')),
  color: Yup.string().required(() => i18n.t('group:fields.color.required')),
});

type GroupFormProps = SnackState & {
  group?: Group;
  request: (formData: FormData, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const GroupForm = ({group, request, cancel}: GroupFormProps) => {
  const {t} = useTranslation();

  const addValueToForm = (formData: FormData, name: string, value: any, condition = true): void => {
    if (condition && value) {
      formData.append(name, value);
    }
  };

  const mapValuesToFormData = (values: GroupFormValues, group: Group): FormData => {
    const formData = new FormData();
    addValueToForm(formData, 'id', group?.id);
    addValueToForm(formData, 'title', values.title);
    addValueToForm(formData, 'color', values.color);
    addValueToForm(formData, 'imageFilename', values.imageFilename, !values.imageContent);
    addValueToForm(formData, 'imageContent', values.imageContent);
    return formData;
  };

  const handleSubmit = (values: GroupFormValues, helpers: FormikHelpers<GroupFormValues>) => {
    const formData = mapValuesToFormData(values, group);
    request(formData, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(group)}
      validationSchema={validationSchema}
      validateOnMount
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow defaultSpace>
          <FormikTextInput
            name="title"
            label={t('group:fields.title.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FormikThemeInput
            name="color"
            label={t('group:fields.color.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <ImageUpload
            filenameName="imageFilename"
            contentName="imageContent"
            label={t('group:fields.image.label')}
            preview
            crop
            {...formikProps}
          />
          <FHStack defaultSpace justifyContent="flex-end">
            <SolidButton
              colorScheme="primary"
              size="md"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('group:actions.save')}
            </SolidButton>
            <SolidButton
              colorScheme="secondary"
              size="md"
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={cancel}
            >
              {t('group:actions.cancel')}
            </SolidButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withSnackContext])(GroupForm);
