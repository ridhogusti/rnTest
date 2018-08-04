import React, { Component } from 'react';
// import { addNavigationHelpers } from 'react-navigation';
import { connect } from 'react-redux';
import { 
  AsyncStorage,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import Loginn from '../screens/Loginn';
// import FirstScreen from '../screens/FirstScreen';
import Navigator from './Navigator';

class AppNavigator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      error: '',
      showProgress: false,
      logint: false,
      token: '',
    };
  }

  componentDidMount() {
    this.getToken();
  }

  async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem('jwtToken');
      console.log(accessToken);
      if (accessToken == null) {
        this.setState({ token: null });
      } else {
        this.setState({ token: accessToken });
        console.log('ada token', this.state.token);
      }
    } catch (error) {
      console.log('tidak ada toke');
    }
  }
  render() {
    if (this.state.token != null && this.state.token !== '') {
      console.log('aoesunth');
      return <Navigator />;
    } else if (this.state.token == null) {
      return <Loginn />;
    }
    return (

      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
        <ActivityIndicator size="large" color="#0000ff" />
        <ActivityIndicator size="small" color="#00ff00" />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});
export default connect(
  // null
  state => ({
    navigation: state.navigation,
    isAuthenticated: state.auth.isAuthenticated,
  })
  , null)(AppNavigator);
