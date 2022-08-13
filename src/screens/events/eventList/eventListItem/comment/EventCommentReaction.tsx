import withEventComment, {WithEventCommentProps} from '../../../../../shared/hocs/withEvents/withEventComment';
import {Trans, useTranslation} from 'react-i18next';
import React, {ReactElement} from 'react';
import UserLink from '../../../../../components/links/UserLink';
import EventListItemTemplate from '../EventListItemTemplate';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import UserReactionView from '../../../../../components/views/UserReactionView';

const EventCommentReaction = ({user, group, item, comment, reaction, date}: WithEventCommentProps) => {
  const {t} = useTranslation();

  const title = t('event:comment.reaction.title');

  const User = (): ReactElement => (user ? <UserLink user={user} /> : null);
  const Group = (): ReactElement => (group ? <GroupLink group={group} /> : null);
  const Item = (): ReactElement => (item ? <ItemLink item={item} /> : null);

  const image = <UserReactionView user={user} size="md" reactionType={reaction} />;

  let content = null;

  if (Group) {
    content = (
      <Trans i18nKey="event:comment.reaction.contentWithGroup" components={{user: <User />, group: <Group />}} />
    );
  }

  if (Item) {
    content = <Trans i18nKey="event:comment.reaction.contentWithItem" components={{user: <User />, item: <Item />}} />;
  }

  return <EventListItemTemplate image={image} title={title} content={content} message={comment?.text} date={date} />;
};

export default withEventComment(EventCommentReaction);
