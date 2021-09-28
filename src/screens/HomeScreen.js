import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
} from 'react-native';
import axios from 'axios';

import {texts} from '../styles/textStyles';
import { SectionList } from '../data/sectionHeader'

const HomeScreen = () => {
  const [newsData, setNewsData] = useState();

  useEffect(() => {
    axios
      .get(
        'https://api.nytimes.com/svc/topstories/v2/arts.json?api-key=APNbH591pkwJSw3dPdXFIl7Psn1ZAaKL',
      )
      .then(function (response) {
        // handle success
        setNewsData(response.data.results);
        // console.log('newsData', newsData);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  });

  const renderItem = ({item}) => (
    <TouchableOpacity
      onPress={() => console.log('item.uri', item.uri)}
      style={styles.NewsTile}>
      {/* News Tiles */}
      <View style={styles.NewsTileLeft}>
        <Image
          source={{uri: item.multimedia[1].url}}
          style={{
            height: 100,
            width: 100,
          }}
        />
      </View>
      <View style={styles.NewsTileRight}>
        <Text style={[texts.b18, {flexWrap: 'wrap'}]}>{item.title}</Text>
        <View style={[]}>
          <Text style={texts.b12}>{item.byline}</Text>
          <Text style={texts.b12}>Published: {item.created_date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderItem2 = ({item}) => (
      <View style={styles.SectionTile}>
          <Text style={texts.b12}>{item.title}</Text>
      </View>
  )

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
      </View>

      <FlatList
        data={newsData}
        renderItem={renderItem}
        keyExtractor={item => item.published_date}
      />
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
    backgroundColor: '#989',
    alignItems: 'center',
    justifyContent: 'center',
  },
  SectionTile: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: 120,
    borderRadius: 30,
    backgroundColor: '#eee',
    marginVertical: 10,
    marginLeft: 10
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
});

{
  /* <TouchableOpacity
style={{
  height: 100,
  width: 100,
  backgroundColor: '#999',
  borderRadius: 30,
}}
onPress={() => console.log('newsData', newsData)}></TouchableOpacity> */
}
