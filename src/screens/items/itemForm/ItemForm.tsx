import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {Item} from '../../../models/Item';
import {Reminder} from '../../../models/Reminder';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import FormikPriorityInput from '../../../components/inputs/FormikPriorityInput';
import FormikMultilineInput from '../../../components/inputs/FormikMultilineInput';
import FormikRemindersInput from '../../../components/inputs/formikRemindersInput/FormikRemindersInput';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import GhostButton from '../../../components/controls/GhostButton';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import FormikStatusInput from '../../../components/inputs/FormikIsStatusInput';

export interface ItemFormValues {
  title: string;
  priority: number;
  description?: string;
  reminders?: Reminder[];
  done: boolean;
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  priority: 2,
  description: '',
  reminders: [],
  done: false,
};

const initialValues = (item: Item, reminders: Reminder[]): ItemFormValues =>
  item
    ? {
        title: item.title,
        priority: item.priority,
        description: item.description,
        reminders: reminders,
        done: item.done,
      }
    : defaultItemFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('item:fields.title.required')),
  priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
});

type ItemFormProps = {
  group: Group;
  item?: Item;
  reminders?: Reminder[];
  request: (dto: ItemDTO, reminders: Reminder[], stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ItemForm = ({group, item, reminders, request, cancel}: ItemFormProps) => {
  const {t} = useTranslation();

  const handleSubmit = (values: ItemFormValues, helpers: FormikHelpers<ItemFormValues>): void => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;

    const dto: ItemDTO = {
      id: item ? item.id : null,
      title: values.title,
      priority: values.priority,
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      groupId: group.id,
      done: values.done,
      deleteReminders: deleteReminders ? true : undefined,
    };

    request(dto, values.reminders, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(item, reminders)}
      validationSchema={validationSchema}
      enableReinitialize
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack grow space="3">
          {item && <FormikStatusInput name="done" {...formikProps} />}

          <FormikPriorityInput
            name="priority"
            label={t('item:fields.priority.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FormikTextInput
            name="title"
            label={t('item:fields.title.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FormikMultilineInput
            name="description"
            label={t('item:fields.description.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />

          <FormikRemindersInput name="reminders" label={t('item:fields.reminders.label')} {...formikProps} />

          <FHStack space="3" mt="3" justifyContent="flex-end">
            <GhostButton colorScheme="secondary" size="md" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('item:actions.cancel')}
            </GhostButton>
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
  );
};

export default ItemForm;
