import { createStackNavigator } from 'react-navigation';

import HomeNavigator from './HomeNavigator';

export default createStackNavigator({
  Home: { screen: HomeNavigator },
}, {
  headerMode: 'none',
}
);
