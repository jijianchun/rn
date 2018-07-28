import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Platform,
  TextInput,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';

import Swiper from 'react-native-swiper';

import {Container, Header, Content, Button, InputGroup, Icon, Input, List, ListItem, Thumbnail, Text} from 'native-base';
import Detail from './detail';

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '', // 保存当前输入的文本
      products: [
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品1',
          subTitle: '描述1'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品2',
          subTitle: '描述2'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品3',
          subTitle: '描述3'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品4',
          subTitle: '描述4'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品5',
          subTitle: '描述5'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品6',
          subTitle: '描述6'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品7',
          subTitle: '描述7'
        },{
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品8',
          subTitle: '描述8'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品9',
          subTitle: '描述9'
        },
        {
          image: require('./images/advertisement-image-01.jpg'),
          title: '商品10',
          subTitle: '描述10'
        }
      ],
      advertisements: [
        {
          image: require('./images/advertisement-image-01.jpg')
        },
        {
          image: require('./images/advertisement-image-01.jpg')
        },
        {
          image: require('./images/advertisement-image-01.jpg')
        }
      ],
      isRefreshing: false
    }
  }
  render () {
    return (
      <Container>
        <Header searchBar rounded>
          <StatusBar
            backgroundColor={'blue'}  // 设置背景色
            barStyle={'default'}
            networkActivityIndicatorVisible={true}  // 显示正在请求网络的状态
          >
          </StatusBar>
          <InputGroup>
            <Icon name='ios-analytics' />
            <Input
              placeholder='搜索商品'
              onChangeText={(text) => {
                this.setState({searchText: text});
                console.log('输入的内容是' + this.state.searchText);
              }}
            />
          </InputGroup>
          <Button
            transparent
            onPress={() => {
              Alert.alert('搜索内容' + this.state.searchText, null, null);
            }}
          >
          搜索
          </Button>
        </Header>
        <Content>
          <Swiper
            loop={true}
            height={180}
            autoplay={true}>
            {this.state.advertisements.map((advertisement, index) => {
              return (
                <TouchableHighlight key={index} onPress={() => {Alert.alert('你单击了轮播图', null, null)}}>
                  <Image
                    style={styles.advertisementContent}
                    source={advertisement.image}>
                  </Image>
                </TouchableHighlight>
              )
            })}
          </Swiper>
          <List
            dataArray={this.state.products}
            renderRow={this._renderRow}
          >
          </List>
        </Content>
      </Container>
    );
  }

  _renderRow (product) {
    console.log('this', this);
    return (
      <ListItem
        button
        onPress={() => {
          const {navigator} = this.props;
          if (navigator) {
            navigator.push({
              name: 'detail',
              component: Detail,
              params: {
                productTitle: rowData.title
              }
            })
          }
        }}
      >
        <Thumbnail
          square
          size={40}
          source={product.image}
        />
        <Text>{product.title}</Text>
        <Text note>{product.subTitle}</Text>
      </ListItem>
    )
  }

  _renderRefreshControl () {
    return (
      <RefreshControl
        refreshing={this.state.isRefreshing}
        onRefresh={this._onRefresh.bind(this)} // 刷新时调用
        tintColor={'#ff0000'}
        title={'正在刷新数据,请稍后...'}
        titleColor={'#0000ff'}
      >
      </RefreshControl>
    )
  }

  _onRefresh () {
    console.log('_onrefresh', this);
    this.setState({
      isRefreshing: true
    });
    setTimeout(() => {
      const products = Array.from(new Array(10)).map((value, index) => ({
        image: require('./images/advertisement-image-01.jpg'),
        title: '新商品' + index,
        subTitle: '新商品描述' + index
      }))
      this.setState({
        isRefreshing: false,
        dataSource: ds.cloneWithRows(products)
      });
    }, 2000);
  }

}

const styles = StyleSheet.create({
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  }
});
