import React, {useEffect, useState} from 'react';
import {ContactRelationWithUser} from '../../../models/ContactRelation';
import ContactListStub from './ContactListStub';
import ContactListItem from './ContactListItem';
import FVStack from '../../../components/surfaces/FVStack';

type ContactListContainerProps = {
  relations: ContactRelationWithUser[];
  filter: string;
};

const ContactListContainer = ({relations, filter}: ContactListContainerProps) => {
  const [relationsToShow, setRelationsToShow] = useState<ContactRelationWithUser[]>([]);

  useEffect(() => {
    const filteredRelations = relations.filter((r) => {
      const str = r.user.username + r.user.firstname + r.user.lastname;
      return str.includes(filter);
    });
    setRelationsToShow(filteredRelations);
  }, [relations, filter]);

  return (
    <>
      {relations.length === 0 && <ContactListStub />}
      {relations.length > 0 && (
        <FVStack>
          {relationsToShow.map((relation) => (
            <ContactListItem relation={relation} key={relation.id} />
          ))}
        </FVStack>
      )}
    </>
  );
};

export default ContactListContainer;
