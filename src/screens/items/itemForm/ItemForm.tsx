import React, {useEffect, useState} from 'react';
import {Box, HStack, VStack} from 'native-base';
import {flowRight} from 'lodash';
import {FormikBag, FormikProps, withFormik} from 'formik';
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
import withAuthState from '../../../shared/hocs/withAuthState';
import {ReduxAuthState} from '../../../store/rerducers/AuthReducer';
import FormikTypeInput from '../../../components/inputs/FormikTypeInput';
import FormikTimeInput from '../../../components/inputs/FormikTimeInput';
import FormikDateInput from '../../../components/inputs/FormikDateInput';
import FormikPriorityInput from '../../../components/inputs/FormikPriorityInput';
import FormikMultilineInput from '../../../components/inputs/FormikMultilineInput';
import FormikTagsInput from '../../../components/inputs/FormikTagsInput';

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

type ItemFormProps = FormikProps<ItemFormValues> &
  SnackState &
  ReduxAuthState & {
    group: Group;
    item?: Item;
    reminders?: Reminder[];
    request: (dto: ItemDTO, stopSubmitting: () => void) => void;
    cancel: () => void;
  };

const ItemForm = (props: ItemFormProps) => {
  const {cancel} = props;
  const {isValid, isSubmitting, handleSubmit} = props;
  const {t} = useTranslation();
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return (
    <VStack space="3">
      <FormikTextInput name="title" label={t('item:fields.title.label')} isDisabled={isSubmitting} {...props} />
      <HStack space="3">
        <Box flexGrow="1" flexBasis="1">
          <FormikTypeInput name="type" label={t('item:fields.type.label')} isDisabled={isSubmitting} {...props} />
        </Box>
        <Box flexGrow="1" flexBasis="1">
          <FormikPriorityInput
            name="priority"
            label={t('item:fields.priority.label')}
            isDisabled={isSubmitting}
            {...props}
          />
        </Box>
      </HStack>
      <HStack space="3">
        <Box flexGrow="1" flexBasis="1">
          <FormikTimeInput name="time" label={t('item:fields.time.label')} isDisabled={isSubmitting} {...props} />
        </Box>
        <Box flexGrow="1" flexBasis="1">
          <FormikDateInput name="date" label={t('item:fields.date.label')} isDisabled={isSubmitting} {...props} />
        </Box>
      </HStack>
      <FormikMultilineInput
        name="description"
        label={t('item:fields.description.label')}
        isDisabled={isSubmitting}
        {...props}
      />

      <FormikTagsInput name="tags" label={t('item:fields.tags.label')} {...props} />

      <HStack mt="3" space="3" justifyContent="flex-end">
        <SolidButton
          colorScheme="primary"
          size="md"
          isLoading={isSubmitting}
          isDisabled={!isInitialized || !isValid || isSubmitting}
          onPress={handleSubmit}
        >
          {t('item:actions.save')}
        </SolidButton>
        <SolidButton colorScheme="secondary" size="md" isDisabled={!isInitialized || isSubmitting} onPress={cancel}>
          {t('item:actions.cancel')}
        </SolidButton>
      </HStack>
    </VStack>
  );
};

const formik = withFormik<ItemFormProps, ItemFormValues>({
  mapPropsToValues: ({item, reminders, account}): ItemFormValues =>
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
      : defaultItemFormValues,

  validationSchema: Yup.object().shape({
    title: Yup.string().required(() => i18n.t('item:fields.title.required')),
    type: Yup.string().required(() => i18n.t('item:fields.type.required')),
    priority: Yup.string().required(() => i18n.t('item:fields.priority.required')),
  }),
  validateOnMount: true,

  handleSubmit: (values: ItemFormValues, {setSubmitting, props}: FormikBag<ItemFormProps, ItemFormValues>) => {
    const {request, group, item, reminders, account} = props;

    const mapValuesToDTO = (
      values: ItemFormValues,
      item: Item,
      group: Group,
      reminders: Reminder[],
      timezone: string,
    ): ItemDTO => {
      const remindersChanged = JSON.stringify(reminders) !== JSON.stringify(values.reminders);
      const deleteReminders = remindersChanged && values.reminders.length === 0;
      return {
        id: item ? item.id : null,
        title: values.title,
        type: values.type,
        priority: values.priority,
        date: DateConverters.getParamDateFromTimeAndDate(values.time, values.date, timezone),
        description: values.description,
        reminders: !deleteReminders && remindersChanged ? values.reminders : undefined,
        tags: values.tags,
        groupId: group.id,
        deleteReminders: deleteReminders ? true : undefined,
      };
    };

    const dto = mapValuesToDTO(values, item, group, reminders, account.info.timezone);
    request(dto, () => setSubmitting(false));
  },
});

export default flowRight([withSnackContext, withAuthState, formik])(ItemForm);
