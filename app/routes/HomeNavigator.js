import React from 'react';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import FoodForm from '../screens/Profile/FoodForm';
import UserForm from '../screens/Profile/UserForm';
import Dashboard from '../screens/Profile/Dashboard';

const NavbarDefaultStyle = {
  backgroundColor: '#f73859',
};

const Dashboardd = createStackNavigator({
  Dashboard: {
    screen: Dashboard,
    navigationOptions: () => ({
      title: 'Favorite Foods',
    }),
  },

  TambahFood: {
    screen: FoodForm,
    navigationOptions: () => ({
      title: 'Add Food',
    }),
  },

  EditUser: {
    screen: UserForm,
    navigationOptions: () => ({
      title: 'Edit User',
    }),
  },

});

export default createBottomTabNavigator({
  Dashboard: {
    screen: Dashboardd,
    navigationOptions: {
      headerStyle: NavbarDefaultStyle,
      tabBarIcon: ({ tintColor }) => (
        <Icon name="account" size={25} color={tintColor} />
      ),
    },
  },
}, {
  swipeEnabled: false,
  animationEnabled: false,
  tabBarPosition: 'bottom',
  tabBarOptions: {
    showLabel: false,
    showIcon: true,
    inactiveTintColor: '#384259',
    activeTintColor: '#f73859',
    pressColor: '#f73859',
    indicatorStyle: { backgroundColor: '#f73859' },
    style: {
      backgroundColor: '#fff',
    },
  },
});
