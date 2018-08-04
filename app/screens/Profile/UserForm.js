import React, { Component } from 'react';
import { Container, Content, Form, Label, Text, Button } from 'native-base';
import { AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';

import { updateUser } from '../../actions/auth';

class UserForm extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
  }
  constructor(props) {
    super(props);
    this.state = {
      token: null,
      data: null,
      _id: this.props.navigation.getParam('dataUser') ? this.props.navigation.getParam('dataUser')._id : '',
      name: this.props.navigation.getParam('dataUser') ? this.props.navigation.getParam('dataUser').name : '',
      email: this.props.navigation.getParam('dataUser') ? this.props.navigation.getParam('dataUser').email : '',
      gender: this.props.navigation.getParam('dataUser') ? this.props.navigation.getParam('dataUser').gender : '',
      phone: this.props.navigation.getParam('dataUser') ? this.props.navigation.getParam('dataUser').phone : '',
    };
  }

  async componentWillMount() {
    this.setState({ token: await AsyncStorage.getItem('jwtToken') });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editartikel._id,
      name: nextProps.editartikel.name,
      email: nextProps.editartikel.email,
      gender: nextProps.editartikel.gender,
      phone: nextProps.editartikel.phone,
      errors: nextProps.errorss,
    });
  }
  async upload() {
    const token = this.state.token.split('"');
    console.log(token[1]);
    this.props.updateUser(this.state._id, token[1], this.state.email, this.state.name, this.state.gender, this.state.phone)
      .then(this.props.navigation.goBack());
  }

  render() {
    const radioProps = [
      { label: 'male', value: 'male' },
      { label: 'female', value: 'female' },
    ];
    return (
      <Container>
        <Content>
          <Form
            style={{
              margin: 10,
            }}
          >
            <Label>Email</Label>
            <TextInput
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#fefefe',
                borderWidth: 1,
                borderRadius: 5,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholder="email"
              required
              id="email"
              ref={emailInput => (this.emailInput = emailInput)}
              onChangeText={
                (email) => {
                  this.setState({ email });
                }
              }
              value={this.state.email}
              name="email"
            />
            <Label>Name</Label>
            <TextInput
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#fefefe',
                borderWidth: 1,
                borderRadius: 5,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholder="Name"
              required
              id="name"
              ref={nameInput => (this.nameInput = nameInput)}
              onChangeText={
                (name) => {
                  this.setState({ name });
                }
              }
              value={this.state.name}
              name="name"
            />
            <Label>Phone</Label>
            <TextInput
              style={{
                height: 50,
                width: '100%',
                backgroundColor: '#fefefe',
                borderWidth: 1,
                borderRadius: 5,
                paddingTop: 0,
                paddingBottom: 0,
              }}
              placeholder="Phone"
              required
              id="phone"
              ref={phoneInput => (this.phoneInput = phoneInput)}
              onChangeText={
                (phone) => {
                  this.setState({ phone });
                }
              }
              value={this.state.phone}
              keyboardType="numeric"
              name="phone"
            />
            <Label>Gender</Label>
            <RadioForm
              radio_props={radioProps}
              initial={this.state.gender == 'male' ? 0 : 1}
              onPress={(value) => { this.setState({ gender: value }); }}
            />
            <Button
              block style={{
                marginTop: 10,
              }}
              onPress={this.upload.bind(this)}
            >
              <Text>Update User</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { updateUser })(UserForm);
