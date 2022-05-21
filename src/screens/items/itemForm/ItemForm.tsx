import React from 'react';
import {flowRight} from 'lodash';
import {Formik, FormikHelpers, FormikProps} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import SolidButton from '../../../components/controls/SolidButton';
import {useTranslation} from 'react-i18next';
import {SnackState} from '../../../shared/contexts/SnackContext';
import withSnackContext from '../../../shared/hocs/withSnack/withSnackContext';
import {Item, ItemPriorityType, itemPriorityTypes, ItemType, itemTypes} from '../../../models/Item';
import {Reminder} from '../../../models/Reminder';
import {DateConverters} from '../../../shared/utils/DateUtils';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import FormikTypeInput from '../../../components/inputs/FormikTypeInput';
import FormikPriorityInput from '../../../components/inputs/FormikPriorityInput';
import FormikMultilineInput from '../../../components/inputs/FormikMultilineInput';
import FormikTagsInput from '../../../components/inputs/FormikTagsInput';
import FormikRemindersInput from '../../../components/inputs/formikRemindersInput/FormikRemindersInput';
import FormikDateTimePicker from '../../../components/inputs/FormikDateTimePicker';
import FVStack from '../../../components/surfaces/FVStack';
import FHStack from '../../../components/surfaces/FHStack';
import {UserAccount} from '../../../models/User';
import {useAppSelector} from '../../../store/hooks';
import AuthSelectors from '../../../store/auth/authSelectors';

export interface ItemFormValues {
  title: string;
  type: ItemType;
  priority: ItemPriorityType;
  time?: Date;
  date?: Date;
  description?: string;
  reminders?: Reminder[];
  tags?: string[];
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  type: itemTypes[0],
  priority: itemPriorityTypes[1],
  time: null,
  date: null,
  description: '',
  reminders: [],
  tags: [],
};

const initialValues = (item: Item, reminders: Reminder[], account: UserAccount): ItemFormValues =>
  item
    ? {
        title: item.title,
        type: item.type,
        priority: item.priority,
        time: DateConverters.getTimeFromParamDate(item.date, account.info.timezone),
        date: DateConverters.getDateFromParamDate(item.date, account.info.timezone),
        description: item.description,
        reminders: reminders,
        tags: item.tags,
      }
    : defaultItemFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('item:fields.title.required')),
  type: Yup.string().required(() => i18n.t('item:fields.type.required')),
  priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
});

type ItemFormProps = FormikProps<ItemFormValues> &
  SnackState & {
    group: Group;
    item?: Item;
    reminders?: Reminder[];
    request: (dto: ItemDTO, stopSubmitting: () => void) => void;
    cancel: () => void;
  };

const ItemForm = ({group, item, reminders, request, cancel}: ItemFormProps) => {
  const account = useAppSelector(AuthSelectors.accountSelector);
  const {t} = useTranslation();

  const handleSubmit = (values: ItemFormValues, helpers: FormikHelpers<ItemFormValues>): void => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;

    const dto = {
      id: item ? item.id : null,
      title: values.title,
      type: values.type,
      priority: values.priority,
      date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date, account.info.timezone),
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      tags: values.tags,
      groupId: group.id,
      deleteReminders: deleteReminders ? true : undefined,
    } as ItemDTO;

    request(dto, () => helpers.setSubmitting(false));
  };

  return (
    <Formik
      initialValues={initialValues(item, reminders, account)}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {(formikProps) => (
        <FVStack defaultSpace>
          <FormikTextInput
            name="title"
            label={t('item:fields.title.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />
          <FHStack defaultSpace>
            <FHStack grow basis>
              <FormikTypeInput
                name="type"
                label={t('item:fields.type.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
            </FHStack>
            <FHStack grow basis>
              <FormikPriorityInput
                name="priority"
                label={t('item:fields.priority.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
            </FHStack>
          </FHStack>
          <FHStack defaultSpace>
            <FHStack grow basis>
              <FormikDateTimePicker
                mode="time"
                name="time"
                label={t('item:fields.time.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
            </FHStack>
            <FHStack grow basis>
              <FormikDateTimePicker
                mode="date"
                name="date"
                label={t('item:fields.date.label')}
                isDisabled={formikProps.isSubmitting}
                {...formikProps}
              />
            </FHStack>
          </FHStack>
          <FormikMultilineInput
            name="description"
            label={t('item:fields.description.label')}
            isDisabled={formikProps.isSubmitting}
            {...formikProps}
          />

          <FormikRemindersInput name="reminders" label={t('item:fields.reminders.label')} {...formikProps} />

          <FormikTagsInput name="tags" label={t('item:fields.tags.label')} {...formikProps} />

          <FHStack defaultSpace mt="3" justifyContent="flex-end">
            <SolidButton
              colorScheme="primary"
              size="md"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('item:actions.save')}
            </SolidButton>
            <SolidButton colorScheme="secondary" size="md" isDisabled={formikProps.isSubmitting} onPress={cancel}>
              {t('item:actions.cancel')}
            </SolidButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([withSnackContext])(ItemForm);
