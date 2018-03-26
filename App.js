import React from 'react';
import { Button, Linking, StyleSheet, Text, View, Platform } from 'react-native';
import DeepLinking from 'react-native-deep-linking';

export default class App extends React.Component {
  state = {
    response: {},
  };

  componentDidMount() {
    DeepLinking.addScheme('example://');
    Linking.addEventListener('url', this.handleUrl);

    DeepLinking.addRoute('/test', (response) => {
      // example://test
      this.setState({ response });
    });

    DeepLinking.addRoute('/test/:id', (response) => {
      // example://test/23
      this.setState({ response });
    });

    DeepLinking.addRoute('/test/:id/details', (response) => {
      // example://test/100/details
      this.setState({ response });
    });

    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));

  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }

  handleUrl = ({ url }) => {
    console.log('url',url);
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        console.log('sucsess')
        DeepLinking.evaluateUrl(url);
      } else {
        console.log('fail',url);
      }
    });
  }

  checked() {
    console.log(Platform.OS)
    if(Platform.OS === 'ios') {
      Linking.canOpenURL('fb268536283583339://').then((supported) => {
        console.log('sup',  supported);
        if(supported) {
          console.log('sup2',  supported);
          Linking.openURL('fb268536283583339://');
        } else {
          Linking.openURL('itms-apps://itunes.apple.com/kr/app/%EB%8F%99%EB%82%A8%EC%95%84-%ED%83%9C%EA%B5%AD-%EC%97%AC%ED%96%89-%EB%B2%A0%ED%8A%B8%EB%82%A8-%EC%97%AC%ED%96%89-%EA%B7%B8%EB%A6%AC%EA%B3%A0/id1222473224?mt=8')
        }
      })
    } else {
      Linking.canOpenURL('naverblog://').then((supported) => {
        if(supported) {
          Linking.openURL('naverblog://');
        } else {
          Linking.openURL("https://play.google.com/store/apps/details?id=com.nhn.android.blog&hl=ko")
        }
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <Button
            onPress={() => Linking.openURL('example://test')}
            title="Open example://test"
          />
          <Button
            onPress={() => Linking.openURL('example://test/23')}
            title="Open example://test/23"
          />
          <Button
            onPress={() => Linking.openURL('example://test/100/details')}
            title="Open example://test/100/details"
          />
          {/* <Button
            onPress={() => Linking.openURL('fb268536283583339://')}
            title="Open DNA"
          /> */}
          <Button
            onPress={() => this.checked()}
            title="Open DNA2"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.response.scheme ? `Url scheme: ${this.state.response.scheme}` : ''}</Text>
          <Text style={styles.text}>{this.state.response.path ? `Url path: ${this.state.response.path}` : ''}</Text>
          <Text style={styles.text}>{this.state.response.id ? `Url id: ${this.state.response.id}` : ''}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    margin: 10,
  },
});
