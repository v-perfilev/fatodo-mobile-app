import React, {FC, useEffect, useState} from 'react';
import {HStack, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {FormikBag, FormikProps, withFormik} from 'formik';
import {Group} from '../../../models/Group';
import {ColorScheme} from '../../../shared/themes/ThemeFactory';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import SolidButton from '../../../components/controls/SolidButton';
import {useTranslation} from 'react-i18next';
import {SnackState} from '../../../shared/contexts/SnackContext';
import {withSnackContext} from '../../../shared/hocs/withSnackbar';
import FormikThemeInput from '../../../components/inputs/FormikThemeInput';
import ImageUpload from '../../../components/inputs/imageUpload/ImageUpload';

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

type GroupFormProps = FormikProps<GroupFormValues> &
  SnackState & {
    group?: Group;
    request: (formData: FormData, stopSubmitting: () => void) => void;
    cancel: () => void;
  };

const GroupForm: FC<GroupFormProps> = (props) => {
  const {cancel} = props;
  const {isValid, isSubmitting, handleSubmit} = props;
  const {t} = useTranslation();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <VStack w="100%" space="3">
      <FormikTextInput name="title" label={t('group:fields.title.label')} isDisabled={isSubmitting} {...props} />
      <FormikThemeInput name="color" label={t('group:fields.color.label')} isDisabled={isSubmitting} {...props} />
      <ImageUpload
        filenameName="imageFilename"
        contentName="imageContent"
        label={t('group:fields.image.label')}
        preview
        crop
        {...props}
      />
      <HStack space="3" justifyContent="flex-end">
        <SolidButton
          colorScheme="primary"
          size="md"
          isLoading={isSubmitting}
          isDisabled={!isInitialized || !isValid || isSubmitting}
          onPress={handleSubmit}
        >
          {t('group:actions.save')}
        </SolidButton>
        <SolidButton colorScheme="secondary" size="md" isDisabled={!isInitialized || isSubmitting} onPress={cancel}>
          {t('group:actions.cancel')}
        </SolidButton>
      </HStack>
    </VStack>
  );
};

const formik = withFormik<GroupFormProps, GroupFormValues>({
  mapPropsToValues: ({group}: GroupFormProps): GroupFormValues =>
    group
      ? {
          title: group.title,
          color: group.color,
          imageFilename: group.imageFilename,
          imageContent: null,
        }
      : defaultGroupFormValues,

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('group:fields.title.required')),
    color: Yup.string().required(() => i18n.t('group:fields.color.required')),
  }),
  validateOnMount: true,

  handleSubmit: (values: GroupFormValues, {setSubmitting, props}: FormikBag<GroupFormProps, GroupFormValues>) => {
    const {request, group} = props;

    console.log('send form');

    const addValueToForm = (formData: FormData, name: string, value: any): void => {
      if (value) {
        formData.append(name, value);
      }
    };

    const mapValuesToFormData = (values: GroupFormValues, group: Group): FormData => {
      const formData = new FormData();
      addValueToForm(formData, 'id', group?.id);
      addValueToForm(formData, 'title', values.title);
      addValueToForm(formData, 'color', values.color);
      addValueToForm(formData, 'imageFilename', values.imageFilename);
      addValueToForm(formData, 'imageContent', values.imageContent);
      return formData;
    };

    const formData = mapValuesToFormData(values, group);
    request(formData, () => setSubmitting(false));
  },
});

export default flowRight([withSnackContext, formik])(GroupForm);
