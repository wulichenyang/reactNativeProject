/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';

import {
  View,
  ScrollView,
  Image,
  Alert,
  AppRegistry,
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  FlatList,
  SectionList,
} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
  'Double tap R on your keyboard to reload,\n' +
  'Shake or press menu button for dev menu',
});

export default class IScrolledDownAndWhatHappenedNextShockedMe extends Component {
  constructor(props) {
    super(props)
    this.state = {
      movies: null,
      loadingMovies: false,
    }
  }

  componentDidMount() {
    this.getMoviesFromApiAsync()
  }

  fetchData(url, method = 'GET', params = {}) {
    let body = null;
    if (method === 'POST') {
      body: JSON.stringify({
        ...params
      })
    }
    return fetch(url, {
      method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        // 伪装代理
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36'
      },
      body
    }).then((res) => {
      return res.json()
    })
  }

  getMoviesFromApiAsync() {
    this.setState({
      loadingMovies: true,
    })
    this.fetchData("https://raw.githubusercontent.com/facebook/react-native/0.51-stable/docs/MoviesExample.json")
      .then(responseJson => {
        this.setState({
          movies: responseJson.movies,
          loadingMovies: false,
        })
      })
      .catch(error => {
        this.setState({
          loadingMovies: false,
        })
        console.error(error);
      });
  }

  renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        <Image
          style={styles.img}
          source={{ uri: item.posters.thumbnail }}
        >
        </Image>
        <View style={styles.textContainer}>
          <Text
            style={styles.title}
          >
            {
              item.title.length > 40 ? item.title.substring(0, 40) + '...' : item.title
            }
          </Text>
          <Text
            style={styles.content}
          >
            {item.year}
          </Text>
        </View>
      </View>
    )
  }
  render() {
    const { movies, loadingMovies } = this.state
    return (
      <View style={styles.listContainer}>
        {loadingMovies &&
          <Text
            style={styles.loadingText}
          >
            loading...
          </Text>
        }
        {movies && !loadingMovies &&
          <FlatList
            data={movies}
            renderItem={this.renderItem}
            keyExtractor={(item, index) => (index).toString()}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'lightgray',
  },
  img: {
    marginRight: 5,
    width: 53,
    height: 81
  },
  textContainer: {
    padding: 2,
    flex: 1,
    height: 81
  },
  title: {
    marginTop: 12,
    fontSize: 15,
    textAlign: 'center',
  },
  content: {
    marginTop: 12,
    textAlign: 'center',
  },
  loadingText: {
    marginTop: 200,
    textAlign: 'center',
  },
})