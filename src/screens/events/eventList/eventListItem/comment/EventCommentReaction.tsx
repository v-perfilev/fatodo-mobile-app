import withEventComment, {WithEventCommentProps} from '../../../../../shared/hocs/withEvents/withEventComment';
import {Trans, useTranslation} from 'react-i18next';
import React from 'react';
import UserLink from '../../../../../components/links/UserLink';
import EventListItemTemplate from '../EventListItemTemplate';
import GroupLink from '../../../../../components/links/GroupLink';
import ItemLink from '../../../../../components/links/ItemLink';
import UserReactionView from '../../../../../components/views/UserReactionView';

const EventCommentReaction = ({user, group, item, comment, reaction, date}: WithEventCommentProps) => {
  const {t} = useTranslation();

  const title = t('event:comment.reaction.title');

  const image = <UserReactionView user={user} size="md" reactionType={reaction} />;

  const context = user?.gender;

  let content = null;

  if (item) {
    content = (
      <Trans
        i18nKey="event:comment.add.contentWithItem"
        context={context}
        components={{user: <UserLink user={user} />, item: <ItemLink item={item} />}}
      />
    );
  } else if (group) {
    content = (
      <Trans
        i18nKey="event:comment.add.contentWithGroup"
        context={context}
        components={{user: <UserLink user={user} />, group: <GroupLink group={group} />}}
      />
    );
  }

  const loading = !user || !(!!group || !!item) || !comment;

  return (
    <EventListItemTemplate
      image={image}
      title={title}
      content={content}
      message={comment?.text}
      date={date}
      loading={loading}
    />
  );
};

export default withEventComment(EventCommentReaction);
