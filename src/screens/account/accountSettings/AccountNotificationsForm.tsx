import React, {memo, useMemo} from 'react';
import FVStack from '../../../components/boxes/FVStack';
import AuthSelectors from '../../../store/auth/authSelectors';
import {useTranslation} from 'react-i18next';
import FHStack from '../../../components/boxes/FHStack';
import {useNavigation} from '@react-navigation/native';
import OutlinedButton from '../../../components/controls/OutlinedButton';
import {flowRight} from 'lodash';
import {UserAccount, UserNotifications} from '../../../models/User';
import {EventType} from '../../../models/Event';
import {AuthActions} from '../../../store/auth/authActions';
import {useAppDispatch, useAppSelector} from '../../../store/store';
import {Formik, FormikHelpers} from 'formik';
import FormikSwitchInput from '../../../components/inputs/FormikSwitchInput';
import {Text} from 'native-base';

export interface AccountNotificationsFormValues {
  emailReminder: boolean;
  pushItemCreate: boolean;
  pushItemGroupCreate: boolean;
  pushItemMemberAdd: boolean;
  pushChatCreate: boolean;
  pushChatMessageCreate: boolean;
  pushChatReactionIncoming: boolean;
  pushContactRequestIncoming: boolean;
  pushContactAcceptOutcoming: boolean;
  pushCommentCreate: boolean;
  pushCommentReactionIncoming: boolean;
}

const defaultAccountNotificationsFormValues: Readonly<AccountNotificationsFormValues> = {
  emailReminder: false,
  pushItemCreate: false,
  pushItemGroupCreate: false,
  pushItemMemberAdd: false,
  pushChatCreate: false,
  pushChatMessageCreate: false,
  pushChatReactionIncoming: false,
  pushContactRequestIncoming: false,
  pushContactAcceptOutcoming: false,
  pushCommentCreate: false,
  pushCommentReactionIncoming: false,
};

const notificationsToFormValues = ({
  emailNotifications,
  pushNotifications,
}: UserNotifications): AccountNotificationsFormValues => ({
  emailReminder: emailNotifications?.includes(EventType.REMINDER),
  pushItemCreate: pushNotifications?.includes(EventType.ITEM_CREATE),
  pushItemGroupCreate: pushNotifications?.includes(EventType.ITEM_GROUP_CREATE),
  pushItemMemberAdd: pushNotifications?.includes(EventType.ITEM_MEMBER_ADD),
  pushChatCreate: pushNotifications?.includes(EventType.CHAT_CREATE),
  pushChatMessageCreate: pushNotifications?.includes(EventType.CHAT_MESSAGE_CREATE),
  pushChatReactionIncoming: pushNotifications?.includes(EventType.CHAT_REACTION_INCOMING),
  pushContactRequestIncoming: pushNotifications?.includes(EventType.CONTACT_REQUEST_INCOMING),
  pushContactAcceptOutcoming: pushNotifications?.includes(EventType.CONTACT_ACCEPT_OUTCOMING),
  pushCommentCreate: pushNotifications?.includes(EventType.COMMENT_CREATE),
  pushCommentReactionIncoming: pushNotifications?.includes(EventType.COMMENT_REACTION_INCOMING),
});

const formValuesToNotifications = (values: AccountNotificationsFormValues): UserNotifications => {
  const notifications: UserNotifications = {emailNotifications: [], pushNotifications: []};
  values.emailReminder && notifications.emailNotifications.push(EventType.REMINDER);
  values.pushItemCreate && notifications.pushNotifications.push(EventType.ITEM_CREATE);
  values.pushItemGroupCreate && notifications.pushNotifications.push(EventType.ITEM_GROUP_CREATE);
  values.pushItemMemberAdd && notifications.pushNotifications.push(EventType.ITEM_MEMBER_ADD);
  values.pushChatCreate && notifications.pushNotifications.push(EventType.CHAT_CREATE);
  values.pushChatMessageCreate && notifications.pushNotifications.push(EventType.CHAT_MESSAGE_CREATE);
  values.pushChatReactionIncoming && notifications.pushNotifications.push(EventType.CHAT_REACTION_INCOMING);
  values.pushContactRequestIncoming && notifications.pushNotifications.push(EventType.CONTACT_REQUEST_INCOMING);
  values.pushContactAcceptOutcoming && notifications.pushNotifications.push(EventType.CONTACT_ACCEPT_OUTCOMING);
  values.pushCommentCreate && notifications.pushNotifications.push(EventType.COMMENT_CREATE);
  values.pushCommentReactionIncoming && notifications.pushNotifications.push(EventType.COMMENT_REACTION_INCOMING);
  return notifications;
};

const initialValues = (account: UserAccount): AccountNotificationsFormValues =>
  account?.notifications ? notificationsToFormValues(account.notifications) : defaultAccountNotificationsFormValues;

const AccountNotificationsForm = () => {
  const dispatch = useAppDispatch();
  const account = useAppSelector(AuthSelectors.account);
  const navigation = useNavigation();
  const {t} = useTranslation();

  const values = useMemo(() => initialValues(account), [account]);

  const handleSubmit = (
    values: AccountNotificationsFormValues,
    helpers: FormikHelpers<AccountNotificationsFormValues>,
  ): void => {
    const notifications = formValuesToNotifications(values);
    dispatch(AuthActions.updateAccountNotificationsThunk(notifications))
      .unwrap()
      .then(() => navigation.goBack())
      .finally(() => helpers.setSubmitting(false));
  };

  return (
    <Formik initialValues={values} onSubmit={handleSubmit} enableReinitialize>
      {(formikProps) => (
        <FVStack space="3">
          <Text fontSize="lg" fontWeight="bold" color="primary.500">
            {t('account:settings.labels.notifications')}
          </Text>

          <Text fontWeight="bold" color="gray.500" mt="2">
            {t('account:settings.labels.email')}
          </Text>

          <FVStack space="4">
            <FormikSwitchInput
              name="emailReminder"
              label={t('account:settings.notifications.reminder')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
          </FVStack>

          <Text fontWeight="bold" color="gray.500" mt="2">
            {t('account:settings.labels.push')}
          </Text>

          <FVStack space="4">
            <FormikSwitchInput
              name="pushItemCreate"
              label={t('account:settings.notifications.itemCreate')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushItemGroupCreate"
              label={t('account:settings.notifications.itemGroupCreate')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushItemMemberAdd"
              label={t('account:settings.notifications.itemMemberAdd')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushChatCreate"
              label={t('account:settings.notifications.chatCreate')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushChatMessageCreate"
              label={t('account:settings.notifications.chatMessageCreate')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushChatReactionIncoming"
              label={t('account:settings.notifications.chatReactionIncoming')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushContactRequestIncoming"
              label={t('account:settings.notifications.contactRequestIncoming')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushContactAcceptOutcoming"
              label={t('account:settings.notifications.contactAcceptOutcoming')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushCommentCreate"
              label={t('account:settings.notifications.commentCreate')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
            <FormikSwitchInput
              name="pushCommentReactionIncoming"
              label={t('account:settings.notifications.commentReactionIncoming')}
              isDisabled={formikProps.isSubmitting}
              fullWidth
              {...formikProps}
            />
          </FVStack>

          <FHStack space="3" mt="3" justifyContent="flex-end">
            <OutlinedButton
              colorScheme="primary"
              size="md"
              isLoading={formikProps.isSubmitting}
              isDisabled={!formikProps.isValid || formikProps.isSubmitting}
              onPress={formikProps.submitForm}
            >
              {t('account:actions.save')}
            </OutlinedButton>
          </FHStack>
        </FVStack>
      )}
    </Formik>
  );
};

export default flowRight([memo])(AccountNotificationsForm);
