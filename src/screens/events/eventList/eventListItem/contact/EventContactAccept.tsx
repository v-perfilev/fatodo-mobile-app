import withEventContact, {WithEventContactProps} from '../../../../../shared/hocs/withEvents/withEventContact';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventContactAccept = ({firstUser, secondUser, date}: WithEventContactProps) => {
  const {t} = useTranslation();

  const title = t('event:contact.accept.title');

  const FirstUser = (): ReactElement => (firstUser ? <UserLink user={firstUser} /> : null);
  const SecondUser = (): ReactElement => (secondUser ? <UserLink user={secondUser} /> : null);

  const image = <UserView user={firstUser} picSize="md" />;

  const content = (
    <Trans i18nKey="event:contact.accept.content" components={{firstUser: <FirstUser />, secondUser: <SecondUser />}} />
  );

  const loading = !firstUser || !secondUser;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventContact(EventContactAccept);
