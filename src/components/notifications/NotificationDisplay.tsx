import React, {useCallback, useEffect, useState} from 'react';
import NotificationTemplate from './NotificationTemplate';
import NotificationBase, {NotificationBaseChildrenProps} from './NotificationBase';
import AlarmIcon from '../icons/AlarmIcon';
import IconPic from '../surfaces/IconPic';
import {Text} from 'native-base';

const NotificationDisplay = () => {
  const [display, setDisplay] = useState<boolean>(false);

  const image = <IconPic icon={<AlarmIcon />} size="sm" />;

  const title = 'Test';

  const content2 = (
    <>
      <Text color="primary.500" fontWeight="bold">
        Test: &nbsp;
      </Text>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore
      et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
      ut labore et dolore magna aliqua.
    </>
  );

  useEffect(() => {
    const timer = setInterval(() => setDisplay((prevState) => !prevState), 5000);
    return () => clearInterval(timer);
  }, []);

  const content = useCallback(
    ({close}: NotificationBaseChildrenProps) => (
      <NotificationTemplate image={image} title={title} content={content2} close={close} />
    ),
    [],
  );

  return (
    <NotificationBase display={display} setDisplay={setDisplay}>
      {content}
    </NotificationBase>
  );
};

export default NotificationDisplay;
