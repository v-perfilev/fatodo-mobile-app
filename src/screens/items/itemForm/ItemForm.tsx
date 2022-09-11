import React from 'react';
import {Formik, FormikHelpers} from 'formik';
import {Group} from '../../../models/Group';
import * as Yup from 'yup';
import i18n from '../../../shared/i18n';
import FormikTextInput from '../../../components/inputs/FormikTextInput';
import {useTranslation} from 'react-i18next';
import {
  Item,
  ItemPriorityType,
  itemPriorityTypes,
  ItemStatusType,
  itemStatusTypes,
  ItemType,
  itemTypes,
} from '../../../models/Item';
import {Reminder} from '../../../models/Reminder';
import {DateConverters} from '../../../shared/utils/DateUtils';
import {ItemDTO} from '../../../models/dto/ItemDTO';
import FormikTypeInput from '../../../components/inputs/FormikTypeInput';
import FormikPriorityInput from '../../../components/inputs/FormikPriorityInput';
import FormikMultilineInput from '../../../components/inputs/FormikMultilineInput';
import FormikRemindersInput from '../../../components/inputs/formikRemindersInput/FormikRemindersInput';
import FormikDateTimePicker from '../../../components/inputs/FormikDateTimePicker';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';
import {UserAccount} from '../../../models/User';
import {useAppSelector} from '../../../store/store';
import AuthSelectors from '../../../store/auth/authSelectors';
import GhostButton from '../../../components/controls/GhostButton';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import FormikStatusInput from '../../../components/inputs/FormikStatusInput';

export interface ItemFormValues {
  title: string;
  status: ItemStatusType;
  type: ItemType;
  priority: ItemPriorityType;
  time?: Date;
  date?: Date;
  description?: string;
  reminders?: Reminder[];
}

const defaultItemFormValues: Readonly<ItemFormValues> = {
  title: '',
  status: itemStatusTypes[0],
  type: itemTypes[0],
  priority: itemPriorityTypes[1],
  time: null,
  date: null,
  description: '',
  reminders: [],
};

const initialValues = (item: Item, reminders: Reminder[], account: UserAccount): ItemFormValues =>
  item
    ? {
        title: item.title,
        status: item.status,
        type: item.type,
        priority: item.priority,
        time: DateConverters.getTimeFromParamDate(item.date, account.info.timezone),
        date: DateConverters.getDateFromParamDate(item.date, account.info.timezone),
        description: item.description,
        reminders: reminders,
      }
    : defaultItemFormValues;

const validationSchema = Yup.object().shape({
  title: Yup.string().required(() => i18n.t('item:fields.title.required')),
  status: Yup.string().required(() => i18n.t('item:fields.type.required')),
  type: Yup.string().required(() => i18n.t('item:fields.type.required')),
  priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
});

type ItemFormProps = {
  group: Group;
  item?: Item;
  reminders?: Reminder[];
  request: (dto: ItemDTO, stopSubmitting: () => void) => void;
  cancel: () => void;
};

const ItemForm = ({group, item, reminders, request, cancel}: ItemFormProps) => {
  const account = useAppSelector(AuthSelectors.account);
  const {t} = useTranslation();

  const handleSubmit = (values: ItemFormValues, helpers: FormikHelpers<ItemFormValues>): void => {
    const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
    const deleteReminders = remindersChanged && values.reminders.length === 0;

    const dto: ItemDTO = {
      id: item ? item.id : null,
      title: values.title,
      status: values.status,
      type: values.type,
      priority: values.priority,
      date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date, account.info.timezone),
      description: values.description,
      reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
      groupId: group.id,
      deleteReminders: deleteReminders ? true : undefined,
    };

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
          <FormikStatusInput
            name="status"
            label={t('item:fields.status.label')}
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

          <FHStack defaultSpace mt="3" justifyContent="flex-end">
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
