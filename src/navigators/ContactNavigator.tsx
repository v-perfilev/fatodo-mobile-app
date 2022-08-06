import React, {ReactElement, ReactNode, useMemo} from 'react';
import ContactList from '../screens/contacts/contactList/ContactList';
import OutcomingRequestList from '../screens/contacts/outcomingRequestList/OutcomingRequestList';
import IncomingRequestList from '../screens/contacts/incomingRequestList/IncomingRequestList';
import {Dimensions} from 'react-native';
import {Route, SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view/lib/typescript/types';
import {useTranslation} from 'react-i18next';
import FHStack from '../components/boxes/FHStack';
import {Badge, Text, useTheme} from 'native-base';
import Header from '../components/layouts/Header';
import ContactsSelectors from '../store/contacts/contactsSelectors';
import {useAppSelector} from '../store/store';
import {ContactInfo} from '../store/contacts/contactsType';

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
  const contactInfo = useAppSelector(ContactsSelectors.info) as ContactInfo;
  const [index, setIndex] = React.useState<number>(0);

  const routes = useMemo<ContactRoute[]>(() => buildRoutes(contactInfo), [contactInfo]);

  const renderBadge = (route: ContactRoute): ReactElement => {
    return route.showBadgeAlways || route.count > 0 ? (
      <Badge rounded="full" variant="solid" colorScheme="secondary">
        {route.count > route.maxCount ? `${route.maxCount}+` : route.count}
      </Badge>
    ) : null;
  };

  const tabBarColor = theme.colors.primary['500'];
  const indicatorColor = theme.colors.secondary['500'];

  const renderTabBar = (props: TabBarProps): ReactNode => {
    return (
      <Header hideLogo hideGoBack hideTitle>
        <FHStack grow h="100%" mx="-2">
          <TabBar
            {...props}
            style={{flexGrow: 1, backgroundColor: tabBarColor, shadowColor: tabBarColor}}
            indicatorStyle={{backgroundColor: indicatorColor, height: 3}}
            renderLabel={({route}) => (
              <FHStack smallSpace alignItems="center" py="1">
                <Text color="white" fontWeight="bold">
                  {t(`contact:${route.key}.title`)}
                </Text>
                {renderBadge(route)}
              </FHStack>
            )}
          />
        </FHStack>
      </Header>
    );
  };

  return (
    <TabView
      navigationState={{index, routes}}
      renderScene={renderScene}
      renderTabBar={renderTabBar}
      showPageIndicator={true}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
    />
  );
};

export default ContactNavigator;
