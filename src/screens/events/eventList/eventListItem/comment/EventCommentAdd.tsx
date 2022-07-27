import {Text} from 'native-base';
import withEventComment, {WithEventCommentProps} from '../../../../../shared/hocs/withEvents/withEventComment';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import EventListItemTemplate from '../EventListItemTemplate';
import UserView from '../../../../../components/views/UserView';

const EventCommentAdd = ({user, group, item, comment, date}: WithEventCommentProps) => {
  const {t} = useTranslation();

  const title = t('event:comment.add.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Item = (): ReactElement => (item ? <ItemLink item={item} /> : null);

  const image = user ? <UserView user={user} picSize="md" /> : null;

  let content = null;

  if (Group) {
    content = (
      <Text>
        <Trans i18nKey="event:comment.add.contentWithGroup" components={{user: <User />, group: <Group />}} />
      </Text>
    );
  }

  if (Item) {
    content = (
      <Text>
        <Trans i18nKey="event:comment.add.contentWithItem" components={{user: <User />, item: <Item />}} />
      </Text>
    );
  }

  return <EventListItemTemplate image={image} title={title} content={content} message={comment?.text} date={date} />;
};

export default withEventComment(EventCommentAdd);
