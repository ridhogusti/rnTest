import React, { Component } from 'react';

import { TouchableHighlight, Dimensions } from 'react-native';
import { Content, Card, CardItem, Text, Left, Body } from 'native-base';

const { width } = Dimensions.get('window');

class ArtikelList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      akses: null,
      token: null,
    };
  }

  render() {
    const { food } = this.props;

    return (
      <Content
        style={{
          width,
        }}
      >
        <TouchableHighlight
          underlayColor={'rgba(0, 0, 0, 0.054)'}
        >
          <Card style={{ flex: 0 }}>
            <CardItem>
              <Left>
                <Body>
                  <Text>Nama : {food.name}</Text>
                  <Text>Description : {food.description}</Text>
                  <Text note>Time : {food.time}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {food.title}
                </Text>
              </Body>
            </CardItem>
          </Card>
        </TouchableHighlight>
        
      </Content>
    );
  }
}

export default ArtikelList;
