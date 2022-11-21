import withEventContact, {WithEventContactProps} from '../../../../../shared/hocs/withEvents/withEventContact';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventContactAccept = ({firstUser, secondUser, date}: WithEventContactProps) => {
  const {t} = useTranslation();

  const title = t('event:contact.accept.title');

  const image = <UserView user={firstUser} picSize="md" />;

  const context = firstUser?.gender;
  const content = (
    <Trans
      i18nKey="event:contact.accept.content"
      context={context}
      components={{firstUser: <UserLink user={firstUser} />, secondUser: <UserLink user={secondUser} />}}
    />
  );

  const loading = !firstUser || !secondUser;

  return <EventListItemTemplate image={image} title={title} content={content} date={date} loading={loading} />;
};

export default withEventContact(EventContactAccept);
