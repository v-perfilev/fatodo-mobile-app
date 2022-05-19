import React, {ReactNode} from 'react';
import ContactList from '../screens/contacts/contactList/ContactList';
import OutcomingRequestList from '../screens/contacts/outcomingRequestList/OutcomingRequestList';
import IncomingRequestList from '../screens/contacts/incomingRequestList/IncomingRequestList';
import {Dimensions} from 'react-native';
import {Route, SceneMap, TabView} from 'react-native-tab-view';
import {NavigationState, SceneRendererProps} from 'react-native-tab-view/lib/typescript/types';
import PressableButton from '../components/controls/PressableButton';
import FCenter from '../components/surfaces/FCenter';
import {flowRight} from 'lodash';
import {useTranslation} from 'react-i18next';
import FHStack from '../components/surfaces/FHStack';
import {Text} from 'native-base';
import Header from '../components/layouts/Header';

const ContactNavigator = () => {
  const {t} = useTranslation();
  const [index, setIndex] = React.useState(0);

  const initialLayout = {width: Dimensions.get('window').width};

  const routes = [{key: 'relations'}, {key: 'incoming'}, {key: 'outcoming'}] as Route[];

  const renderScene = SceneMap({
    relations: ContactList,
    incoming: IncomingRequestList,
    outcoming: OutcomingRequestList,
  });

  const renderTabBar = ({
    navigationState,
  }: SceneRendererProps & {navigationState: NavigationState<Route>}): ReactNode => {
    return (
      <Header showGoBack={false} showTitle={false}>
        <FHStack grow h="100%" pt="0.5" mr="-2">
          {navigationState.routes.map((route, i) => {
            const handlePress = (): void => setIndex(i);
            const borderColor = index === i ? 'secondary.500' : 'primary.500';
            return (
              <PressableButton flexBasis="1" flexGrow="1" onPress={handlePress} key={route.key}>
                <FCenter grow borderColor={borderColor} borderBottomWidth={4}>
                  <Text color="white" fontWeight="bold">
                    {t(`contact:${route.key}.title`)}
                  </Text>
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

export default flowRight([])(ContactNavigator);
