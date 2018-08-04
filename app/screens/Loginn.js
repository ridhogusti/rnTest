import React, { Component } from 'react';
import { 
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { connect } from 'react-redux';
import Navigator from '../routes/Navigator';

import { login, getStorage } from '../actions/auth';

class Loginn extends Component {
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

  async getToken() {
    try {
      const accessToken = await AsyncStorage.getItem('jwtToken');
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

  async login() {
    this.setState({ showProgress: true });
    const { email, password } = this.state;
    const data = {
      email,
      password,
    };
    console.log(data);

    await this.props.login(data).then(
      (res) => this.getToken()     
    );
  }

  render() {
    if (this.state.token != null && this.state.token !== '') {
      return <Navigator />;
    }
    let elementButton;
    if (this.state.showProgress === false) {
      elementButton = (
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.login()}
        >
          <Text>Log in</Text>
        </TouchableOpacity>
      ); 
    } else {
      elementButton = (
        <TouchableOpacity
          style={{
            alignSelf: 'stretch',
            backgroundColor: '#01c853',
            padding: 20,
            alignItems: 'center', 
          }}
          disabled
        >
          <ActivityIndicator
            // animating={this.state.showProgress}
            animating
            size="large"
          />
        </TouchableOpacity>
      );
    }
    console.log(this.state.token, 'token nya');
    return (
      <KeyboardAvoidingView
        behavior='padding'
        style={styles.wrapper}
      >
        <View
          style={styles.container}
        >
          <Text
            style={styles.header}
          >- LOGIN -</Text>
          <TextInput
            style={styles.textInput}
            placeholder='Email'
            onChangeText={(text) => this.setState({ email: text })}
            underlineColorAndroid='transparent'
          />

          <TextInput
            style={styles.textInput}
            placeholder='Password'
            onChangeText={(text) => this.setState({ password: text })}
            underlineColorAndroid='transparent'
            secureTextEntry
          />

          {/* <TouchableOpacity
            style={styles.btn}
            onPress={() => this.login()}
            disabled
          >
            <Text>Log in</Text>
          </TouchableOpacity> */}
          
          {/* <ActivityIndicator
            animating={this.state.showProgress}
            size="large"
          /> */}
          {elementButton}
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
}

export default connect(mapStateToProps, { login, getStorage })(Loginn);

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2896d3',
    paddingLeft: 40,
    paddingRight: 40,
  },

  header: {
    fontSize: 24,
    marginBottom: 60,
    color: '#fff',
    fontWeight: 'bold',
  },
  textInput: {
    alignSelf: 'stretch',
    padding: 16,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  btn: {
    alignSelf: 'stretch',
    backgroundColor: '#01c853',
    padding: 20,
    alignItems: 'center',
  },
});

