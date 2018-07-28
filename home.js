import React, {Component} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Platform,
  TextInput,
  Button,
  ScrollView,
  Dimensions,
  ListView,
  Alert,
  TouchableHighlight,
  StatusBar,
  Image,
  RefreshControl
} from 'react-native';

import Detail from './detail';
const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2
}); // 创建数据源
const circleSize = 8;
const circleMargin = 5;

export default class home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '', // 保存当前输入的文本
      currentPage: 0,
      dataSource: ds.cloneWithRows([
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
      ]),
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
    const advertisementCount = this.state.advertisements.length;  // 指示器圆点个数
    const indicatorWidth = circleSize * advertisementCount + circleMargin * advertisementCount * 2; // 计算指示器的宽度
    const left = (Dimensions.get('window').width - indicatorWidth) / 2; //计算指示器最左边的坐标位置

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'blue'}  // 设置背景色
          barStyle={'default'}
          networkActivityIndicatorVisible={true}  // 显示正在请求网络的状态
        >
        </StatusBar>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.input}
            placeholder='搜索商品'
            onChangeText={(text) => {
              this.setState({searchText: text})
              console.log('输入的内容是' + this.state.searchText);
            }}
          ></TextInput>
          <Button
            style={styles.button}
            title="搜索"
            onPress={() => Alert.alert('搜索内容' + this.state.searchText, null, null)}
            ></Button>
        </View>
        <View style={styles.advertisement}>
          <ScrollView
            ref="scrollView"
            horizontal={true} // 横向滚动
            showsHorizontalScrollIndicator={false}  // 不显示横向滚动条
            pagingEnabled={true}  // 分页
          >
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
          </ScrollView>
          <View style={[styles.indicator, {left: left}]}>
            {this.state.advertisements.map((advertisement, index) =>{
              return (
                <View
                  key={index}
                  style={(index === this.state.currentPage) ? styles.circleSelected : styles.circle}
                />
              )
            })}
          </View>
        </View>
        <View style={styles.products}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={this._renderRow.bind(this)}
            renderSeparator={this._renderSeparator}
            refreshControl={this._renderRefreshControl()} />
        </View>
      </View>
    );
  }

  componentDidMount () {
    this._startTimer();
  }

  componentWillUnmount () {
    clearInterval(this.interval);
  }

  _startTimer () {
    this.interval = setInterval(() => {
      nextPage = this.state.currentPage + 1;
      if (nextPage >= 3) {
        nextPage = 0; // 如果已经滚动到最后一页，下次返回第一页
      }
      this.setState({
        currentPage: nextPage
      });
      const offsetX = nextPage * Dimensions.get('window').width;  // 计算x轴偏移量
      this.refs.scrollView.scrollResponderScrollTo({
        x: offsetX,
        y: 0,
        animated: true
      })
    }, 2000)
  }

  _renderRow (rowData, sectionID, rowID) {
    return (
      <TouchableHighlight onPress={() => {
          const {navigator} = this.props;
          if (navigator) {
            navigator.push({
              name: 'detail',
              component: Detail,
              params: {
                productTitle: rowData.title
              }
            });
          }
      }}>
        <View style={styles.row}>
          <Image source={rowData.image} style={styles.productImage}>
          </Image>
          <View style={styles.productText}>
            <Text style={styles.productTitle}>
              {rowData.title}
            </Text>
            <Text style={styles.productSubTitle}>
              {rowData.subTitle}
            </Text>
          </View>
        </View>
      </TouchableHighlight>
    )
  }

  _renderSeparator (sectionID, rowID, adjacentRowHighlighted) {
    return (
      <View key={`${sectionID}-${rowID}`} style={styles.divider}>
      </View>
    );
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
  container: {
    flex: 1
  },
  searchBar: {
    marginTop: Platform.OS === 'ios' ? 20 : 0,  // ios和android对于状态栏的处理方式不一样
    height: 40,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 2,
    borderRadius: 10
  },
  button: {
    flex: 1
  },
  advertisement: {
    height: 180
  },
  advertisementContent: {
    width: Dimensions.get('window').width,
    height: 180
  },
  indicator: {
    position: 'absolute',
    top: 160,
    flexDirection: 'row'
  },
  circle: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'gray',
    marginHorizontal: circleMargin
  },
  circleSelected: {
    width: circleSize,
    height: circleSize,
    borderRadius: circleSize / 2,
    backgroundColor: 'white',
    marginHorizontal: circleMargin
  },
  products: {
    flex: 1
  },
  row: {
    height: 60,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  productImage: {
    marginLeft: 10,
    marginRight: 10,
    width: 40,
    height: 40,
    alignSelf: 'center'
  },
  productText: {
    flex: 1,
    marginTop: 10,
    marginBottom: 10
  },
  productTitle: {
    flex: 3,
    fontSize: 16
  },
  productSubTitle: {
    flex: 2,
    fontSize: 14,
    color: 'gray'
  },
  divider: {
    height: 1,
    width: Dimensions.get('window').width - 5,
    marginLeft: 5,
    backgroundColor: 'lightgray'
  }
});
