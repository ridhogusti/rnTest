import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  View,
  AsyncStorage,
} from 'react-native';
import { Container, Content, Text, Button, H2 } from 'native-base';
// import { fetchUstadzs } from '../../actions/ustadz';
import { fetchFoods } from '../../actions/food';
import FoodList from './FoodList';

class DashboardPage extends Component {
  // static navigatorStyle = {
  //   screenBackgroundColor: 'white',
  // };
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
      limit: 0,
      activeIndex: 0,
      data: [],
      dataUser: {},
      akses: null,
      index: 0,
      routes: [
        { key: 'first', title: 'First' },
        { key: 'second', title: 'Second' },
      ], 
    };
  }

  async componentWillMount() {
    const dataUser = JSON.parse(await AsyncStorage.getItem('dataUser'));
    console.log(dataUser);
    console.log(this.props.auth.user.name, 'aoeu');
    if (this.props.auth.user.name == undefined) {
      this.setState({ dataUser });
      await this.props.fetchFoods(dataUser._id);
    } else {
      console.log('au');
      this.setState({ dataUser: this.props.auth.user }); 
      await this.props.fetchFoods(dataUser._id);
    }
  }

  componentDidMount() {
    this.setState({ dataUser: this.props.auth.user }); 
  }

  renderSectionOne() {
    const elementButton = (
      <Button
        block style={{
          marginTop: 10,
        }}
        onPress={() => this.props.navigation.navigate(
          'TambahFood',
        )}
      >
        <Text>Create Food</Text>
      </Button>
    );
    return (
      <View>
        {elementButton}
        {
          this.props.foods.map(food => <FoodList navigation={this.props.navigation} food={food} key={food._id} />)
        }
      </View>
    );
  }
  
  renderSection() {
    if (this.state.activeIndex === 0) {
      return (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          {this.renderSectionOne()}
        </View>
      );
    }
  }

  render() {
    let dataUser;
    if (this.props.auth.user.name == null) {
      dataUser = this.state.dataUser;
    } else {
      dataUser = this.props.auth.user;
    }
    return (
      <Container>
        <View
          style={{
            width: '100%',
            height: 150,
            backgroundColor: '#BBBFC4',
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >

          <H2
            style={{
              alignSelf: 'center',
            }}
          >{this.props.auth.user.name == null ? this.state.dataUser.name : this.props.auth.user.name}</H2>
          <Button
            block style={{
              marginTop: 10,
              width: 100,
              alignSelf: 'center',
            }}
            onPress={() => this.props.navigation.navigate(
              'EditUser',
              { dataUser }
            )}
          >
            <Text>Edit user</Text>
          </Button>
        </View>
        <Content>
          {this.renderSectionOne()}
        </Content>
        
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    auth: state.auth,
    foods: state.foods.data,
  };
}

export default connect(mapStateToProps, { 
  fetchFoods,
})(DashboardPage);
