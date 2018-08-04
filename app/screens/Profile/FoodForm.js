import React, { Component } from 'react';
import { Container, Content, Form, Label, Textarea, Text, Button } from 'native-base';
import { TouchableOpacity, AsyncStorage, TextInput } from 'react-native';
import { connect } from 'react-redux';
import DateTimePicker from 'react-native-modal-datetime-picker';
import moment from 'moment';

import { createFood, updateFood } from '../../actions/food';

class ArtikelForm extends Component {
  static navigatorStyle = {
    screenBackgroundColor: 'white',
  }
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      chosenDate: '',
      token: null,
      data: null,
      _id: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel')._id : '',
      name: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').name : '',
      description: this.props.navigation.getParam('artikel') ? this.props.navigation.getParam('artikel').description : '',
    };
  }

  async componentWillMount() {
    this.setState({ token: await AsyncStorage.getItem('jwtToken') });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({
      _id: nextProps.editartikel._id,
      name: nextProps.editartikel.name,
      description: nextProps.editartikel.description,
      errors: nextProps.errorss,
    });
  }
  async upload() {
    const token = this.state.token.split('"');
    console.log(token[1]);
    this.props.createFood(token[1], this.state.name, this.state.description, this.state.chosenDate)
      .then(this.props.navigation.goBack());
  }

  handlePicker = (time) => {
    this.setState({ isVisible: false,
      chosenDate: moment(time).format('HH:mm:ss'),
    });
  }
  hidePicker = () => this.setState({ isVisible: false });
  showPicker = () => this.setState({ isVisible: true });
  
  handleChange = (aoeu) => {
    this.setState({ name: aoeu });
    console.log(this.state.name, 'onchange');
  }
  render() {
    return (
      <Container>
        <Content>
          <Form
            style={{
              margin: 10,
            }}
          >
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
            <Label>Description</Label>
            <Textarea
              value={this.state.description}
              rowSpan={5} bordered placeholder="Textarea"
              onChangeText={
                (description) => {
                  this.setState({ description });
                }
              }
            />
            <Text>Time : {this.state.chosenDate}</Text>
            <TouchableOpacity onPress={this.showPicker}>
              <Text>Show Time</Text>
            </TouchableOpacity>
            <DateTimePicker
              isVisible={this.state.isVisible}
              onConfirm={this.handlePicker}
              onCancel={this.hidePicker}
              mode={'time'}
            />
            <Button
              block style={{
                marginTop: 10,
              }}
              onPress={this.upload.bind(this)}
            >
              <Text>Create Food</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}

export default connect(null, { createFood, updateFood })(ArtikelForm);
