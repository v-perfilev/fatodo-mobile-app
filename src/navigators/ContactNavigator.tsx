import React, {ReactElement, ReactNode, useMemo} from 'react';
import ContactList from '../screens/contacts/contactList/ContactList';
import OutcomingRequestList from '../screens/contacts/outcomingRequestList/OutcomingRequestList';
import IncomingRequestList from '../screens/contacts/incomingRequestList/IncomingRequestList';
import {Dimensions} from 'react-native';
import {Route, SceneMap, TabView} from 'react-native-tab-view';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view/lib/typescript/types';
import PressableButton from '../components/controls/PressableButton';
import FCenter from '../components/surfaces/FCenter';
import {useTranslation} from 'react-i18next';
import FHStack from '../components/surfaces/FHStack';
import {Badge, Text} from 'native-base';
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

  const renderTabBar = ({navigationState}: TabBarProps): ReactNode => {
    return (
      <Header showGoBack={false} showTitle={false}>
        <FHStack grow h="100%" pt="0.5" mr="-2">
          {navigationState.routes.map((route, i) => {
            const handlePress = (): void => setIndex(i);
            const borderColor = index === i ? 'secondary.500' : 'primary.500';
            return (
              <PressableButton flexBasis="1" flexGrow="1" onPress={handlePress} key={route.key}>
                <FCenter grow borderColor={borderColor} borderBottomWidth={4}>
                  <FHStack smallSpace alignItems="center">
                    <Text color="white" fontWeight="bold">
                      {t(`contact:${route.key}.title`)}
                    </Text>
                    {renderBadge(route)}
                  </FHStack>
                </FCenter>
              </PressableButton>
            );
          })}
        </FHStack>
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

export default ContactNavigator;
