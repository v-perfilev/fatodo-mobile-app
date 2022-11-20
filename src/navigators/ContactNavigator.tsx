import React, {memo, ReactElement, useMemo} from 'react';
import ContactList from '../screens/contacts/contactList/ContactList';
import OutcomingRequestList from '../screens/contacts/outcomingRequestList/OutcomingRequestList';
import IncomingRequestList from '../screens/contacts/incomingRequestList/IncomingRequestList';
import {Dimensions, StyleProp, ViewStyle} from 'react-native';
import {
  Route,
  SceneMap,
  TabBar,
  TabBarIndicator,
  TabBarIndicatorProps,
  TabBarItemProps,
  TabView,
} from 'react-native-tab-view';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view/lib/typescript/types';
import {useTranslation} from 'react-i18next';
import FHStack from '../components/boxes/FHStack';
import {Badge, Text, useColorModeValue, useTheme} from 'native-base';
import Header from '../components/layouts/Header';
import ContactsSelectors from '../store/contacts/contactsSelectors';
import {useAppSelector} from '../store/store';
import FBox from '../components/boxes/FBox';
import {HEADER_HEIGHT} from '../constants';
import PressableButton from '../components/controls/PressableButton';
import {ContactInfo} from '../models/Contact';
import {DARK_BG, LIGHT_BG} from '../shared/themes/colors';

type TabBarProps = SceneRendererProps & {navigationState: NavigationState<ContactRoute>};

type ContactRoute = Route & {
  count: number;
  maxCount: number;
  showBadgeAlways: boolean;
};

const initialLayout = {width: Dimensions.get('window').width};

const buildRoutes = (info: ContactInfo): ContactRoute[] => [
  {key: 'relations', count: info.relationCount, maxCount: 999, showBadgeAlways: true},
  {key: 'incoming', count: info.incomingRequestCount, maxCount: 9, showBadgeAlways: false},
  {key: 'outcoming', count: info.outcomingRequestCount, maxCount: 9, showBadgeAlways: false},
];

const renderScene = SceneMap({
  relations: ContactList,
  incoming: IncomingRequestList,
  outcoming: OutcomingRequestList,
});

const ContactNavigator = () => {
  const {t} = useTranslation();
  const theme = useTheme();
  const contactInfo = useAppSelector(ContactsSelectors.info);
  const [index, setIndex] = React.useState<number>(0);

  const routes = useMemo<ContactRoute[]>(() => buildRoutes(contactInfo), [contactInfo]);

  const renderBadge = (route: ContactRoute): ReactElement => {
    return route.showBadgeAlways || route.count > 0 ? (
      <Badge rounded="full" variant="solid" colorScheme="secondary">
        {route.count > route.maxCount ? `${route.maxCount}+` : route.count}
      </Badge>
    ) : null;
  };

  const bg = useColorModeValue(LIGHT_BG, DARK_BG);

  const indicatorColor = theme.colors.secondary['500'];
  const indicatorStyle = {backgroundColor: indicatorColor, height: 3};
  const tabBarStyle: StyleProp<ViewStyle> = {
    shadowOffset: {width: 0, height: 0},
    justifyContent: 'center',
    backgroundColor: bg,
  };

  const renderTabBarItem = (props: TabBarItemProps<ContactRoute>): ReactElement => {
    return (
      <PressableButton
        flexGrow="1"
        w="33.3%"
        h={HEADER_HEIGHT}
        onPress={props.onPress}
        key={props.route.key}
        justifyContent="center"
        alignItems="center"
      >
        <FHStack space="1" mt="3px">
          <Text color="primary.500">{t(`contact:${props.route.key}.title`)}</Text>
          {renderBadge(props.route)}
        </FHStack>
      </PressableButton>
    );
  };

  const renderIndicator = (props: TabBarIndicatorProps<ContactRoute>): ReactElement => {
    return <TabBarIndicator {...props} width="33.3%" />;
  };

  const renderTabBar = (props: TabBarProps): ReactElement => {
    return (
      <Header showAvatar hideGoBack hideTitle>
        <FBox ml="1" mr="-2" overflow="hidden">
          <TabBar
            style={tabBarStyle}
            indicatorStyle={indicatorStyle}
            renderIndicator={renderIndicator}
            renderTabBarItem={renderTabBarItem}
            {...props}
          />
        </FBox>
      </Header>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default memo(ContactNavigator);
