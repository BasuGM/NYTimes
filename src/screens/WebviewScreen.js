import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {WebView} from 'react-native-webview';
import {Icon} from 'react-native-elements';
import {ActivityIndicator, TouchableRipple} from 'react-native-paper';

import {texts} from '../styles/textStyles';

const WebViewScreen = ({route, navigation}) => {
  const newsArticle = route.params;
  let WebViewRef;

  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.defaultScreen}>
      <View style={styles.HeaderBar}>
        {!loading && (
          <TouchableRipple onPress={() => navigation.goBack()}>
            <Icon
              name="arrow-back-outline"
              type="ionicon"
              color="white"
              size={28}
            />
          </TouchableRipple>
        )}
        {loading && <ActivityIndicator style={texts.mr10} color="white" />}
        <Text style={[texts.w20, texts.pl10, {flexWrap: 'nowrap'}]}>
          {newsArticle.newsArticle.title.slice(0, 20) + '...'}
        </Text>
      </View>
      <View style={styles.webView}>
        <WebView
          ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
          onLoad={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
          source={{uri: newsArticle.newsArticle.url}}
        />
      </View>
      <TouchableRipple
        onPress={() => {
          WebViewRef && WebViewRef.reload();
          setLoading(true);
        }}
        style={styles.IconHolder}>
        <Icon name="refresh" type="material" color="white" size={32} />
      </TouchableRipple>
    </View>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({
  defaultScreen: {
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#fff',
  },

  HeaderBar: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: '#323aa8',
    paddingHorizontal: 20,
  },

  webView: {height: '100%', width: '100%', borderWidth: 1},

  IconHolder: {
    position: 'absolute',
    right: 15,
    bottom: 50,
    height: 50,
    width: 50,
    borderRadius: 25,
    backgroundColor: '#323aa8',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10,
  },
});

// let WebViewRef;
//   return (
//     <View style={Style1.container}>
//       <WebView
//         ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
//         source={{ uri: this.state.site }}
//         renderLoading={this.ActivityIndicatorLoadingView}
//         startInLoadingState={true}
//       />
//       <Button title="Reload Me!" onpress={() => { WebViewRef && WebViewRef.reload(); }} />
