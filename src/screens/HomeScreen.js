import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
} from 'react-native';
import axios from 'axios';
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  ActivityIndicator,
  TouchableRipple,
  Snackbar,
} from 'react-native-paper';
import {Icon} from 'react-native-elements';

import {texts} from '../styles/textStyles';
import {SectionList} from '../data/sectionHeader';

const LeftContent = props => (
  <Avatar.Icon {...props} backgroundColor="#323aa8" icon="newspaper-variant" />
);

const HomeScreen = ({ navigation}) => {
  const [newsData, setNewsData] = useState([]);
  const [section, setSection] = useState('home');
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchToggle, setSearchToggle] = useState(false);
  const [defaultNewsData, setDefaultNewsData] = useState([]);
  const [searchDone, setSearchDone] = useState(false);
  const [snackBar, setSnackBar] = useState(false)

  useEffect(() => {
    setDefaultData();
  }, []);

  const setDefaultData = () => {
    setLoading(true);
    axios
      .get(
        'https://api.nytimes.com/svc/topstories/v2/home.json?api-key=APNbH591pkwJSw3dPdXFIl7Psn1ZAaKL',
      )
      .then(function (response) {
        // handle success
        setNewsData(response.data.results);
        setDefaultNewsData(response.data.results);
        // console.log('newsData', newsData);
        setLoading(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const fetchSection = section => {
    // console.log(section);
    const sectionURL =
      'https://api.nytimes.com/svc/topstories/v2/' +
      section +
      '.json?api-key=APNbH591pkwJSw3dPdXFIl7Psn1ZAaKL';
    // console.log('sectionURL', sectionURL);
    setLoading(true);
    axios
      .get(sectionURL)
      .then(function (response) {
        // handle success
        // console.log(response.data.results);
        setNewsData(response.data.results);
        setDefaultNewsData(response.data.results);
        setLoading(false);
        setSection(section);
        // console.log('newsData', newsData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  };

  const searchResults = () => {
    // setNewsData(defaultNewsData)
    if (searchText === '') {
      setSnackBar(true)
    } else {
      let resArr = [];

      for (let i = 0; i < newsData.length; i++) {
        if (newsData[i].title.includes(searchText)) {
          resArr.push(newsData[i]);
        }
      }

      setNewsData(resArr);
      setSearchDone(true);
    }
  };

  const renderItem = ({item}) => {
    return (
      <TouchableRipple
        onPress={() => navigation.navigate('WebView', { newsArticle: item })}
        style={styles.Card}>
        <Card>
          <Card.Content>
            <Title>{item.title}</Title>
          </Card.Content>
          <Card.Title
            titleStyle={{fontSize: 16}}
            title={item.byline}
            subtitle={'Published:' + item.published_date}
            left={LeftContent}
          />
          <View style={{width: '100%', alignItems: 'center'}}>
            {item.multimedia !== null && (
              <Card.Cover
                style={{width: '95%'}}
                source={{uri: item.multimedia[0].url}}
              />
            )}
            {item.multimedia === null && (
              <Card.Cover
                style={{width: '95%'}}
                source={{uri: 'https://picsum.photos/200/300'}}
              />
            )}
          </View>
          <Card.Content>
            <Paragraph>{item.abstract}</Paragraph>
          </Card.Content>
        </Card>
      </TouchableRipple>
    );
  };

  const renderItem2 = ({item}) => (
    <View style={[]}>
      {item.label === section && (
        <TouchableRipple
          onPress={() => {
            fetchSection(item.label);
          }}
          style={styles.SectionTileSelected}>
          <View style={styles.SectionTileSelectedDot}>
            <Icon name="primitive-dot" type="octicon" color="#fff" size={36} />
            <Text style={[texts.w16, texts.pl10]}>{item.title}</Text>
          </View>
        </TouchableRipple>
      )}
      {!(item.label === section) && (
        <TouchableRipple
          rippleColor="#323aa8"
          onPress={() => {
            fetchSection(item.label);
          }}
          style={styles.SectionTileUnselected}>
          <Text style={texts.c16}>{item.title}</Text>
        </TouchableRipple>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Section */}
      <View style={styles.SectionSelect}>
        <FlatList
          showsHorizontalScrollIndicator={false}
          horizontal
          data={SectionList}
          renderItem={item => renderItem2(item)}
          keyExtractor={item => item.id}
        />
        {!searchToggle && (
          <TouchableRipple
            onPress={() => setSearchToggle(!searchToggle)}
            style={styles.SearchIcon}>
            <Icon name="search1" type="antdesign" color="#fff" size={24} />
          </TouchableRipple>
        )}
        {searchToggle && (
          <TouchableRipple
            onPress={() => setSearchToggle(!searchToggle)}
            style={styles.SearchIcon}>
            <Icon name="caretup" type="antdesign" color="#fff" size={24} />
          </TouchableRipple>
        )}
      </View>

      {searchToggle && (
        <View style={styles.SearchBar}>
          <View style={styles.SearchBarInput}>
            <TextInput
              style={styles.input}
              onChangeText={text => setSearchText(text)}
              value={searchText}
              placeholder={'Search ' + section}
              placeholderTextColor="#999"
            />
            <Icon
              onPress={() => {
                setSearchText('');
                setNewsData(defaultNewsData);
                setSearchDone(false);
              }}
              name="backspace-outline"
              type="ionicon"
              color="#323aa8"
              size={32}
            />
          </View>
          <Icon
            raised
            onPress={() => searchResults()}
            name="search1"
            type="antdesign"
            color="#323aa8"
            size={24}
          />
        </View>
      )}
      {searchDone && (
        <View style={styles.SearchText}>
          <Text style={texts.b16}>
            Showing {newsData.length} results for: {searchText}
          </Text>
        </View>
      )}

      {loading && (
        <View style={styles.Activity}>
          <ActivityIndicator color="#323aa8" animating={true} size={80} />
        </View>
      )}

      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={item => item.published_date}
      />
      <Snackbar
        visible={snackBar}
        duration={1000}
        onDismiss={() => setSnackBar(false)}
        style={{bottom: 20}}
        >
        No text in search
      </Snackbar>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  //   Select Section
  SectionSelect: {
    height: 70,
    width: '100%',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  SectionTileUnselected: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 120,
    borderRadius: 30,
    backgroundColor: '#fff',
    borderWidth: 3,
    borderColor: '#323aa8',
    marginVertical: 10,
    marginLeft: 10,
  },
  SectionTileSelected: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 120,
    borderRadius: 30,
    backgroundColor: '#323aa8',
    marginVertical: 10,
    marginLeft: 10,
  },
  SectionTileSelectedDot: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingLeft: 10,
    // justifyContent: 'center',
  },
  SearchIcon: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
    backgroundColor: '#323aa8',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  SearchBar: {
    width: '90%',
    // height: 200,
    marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  SearchBarInput: {
    width: '85%',
    borderWidth: 2,
    borderRadius: 10,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#323aa8',
    marginRight: 5,
  },
  input: {
    fontSize: 16,
    color: '#000',
  },
  SearchText: {
    // borderWidth: 1,
    width: '100%',
    paddingHorizontal: 20,
    height: 30,
  },

  //   News Tiles
  NewsTile: {
    flexDirection: 'row',
    width: '95%',
    height: 120,
    alignItems: 'center',
    // borderWidth: 1,
    marginHorizontal: 10,
    marginBottom: 20,
    borderRadius: 10,
    backgroundColor: '#ddd',
  },
  NewsTileLeft: {
    height: 120,
    width: '30%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  NewsTileRight: {
    //   height: 120,
    width: '70%',
    justifyContent: 'space-between',
    height: 120,
    paddingVertical: 10,
  },

  // Card
  Card: {
    // height: 500,
    width: '100%',
    marginTop: 10,
  },

  // Activity
  Activity: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    paddingTop: 50,
  },
});
