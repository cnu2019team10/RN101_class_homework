import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Constants } from 'expo';

export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `Weather Info: ${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null); // 강사님이 이미 만들어 주신거...
    
    // const city = 'Daejeon';

    // fetch(`http://demo6468405.mockable.io/weather-crawlers/current-weathers/by-city-name/${city}`)
    fetch(`http://api.openweathermap.org/data/2.5/weather?APPID=75536a824749c77d655cf1aaa9807a6e&q=${city}`) // 저번 실습 React-naive 과제에서 했던 api를 가져옴.
      .then(response => response.json())
      .then(info => {
        this.setState({
          ...info,
          isLoading: false,
        });
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <Text>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let city_id = this.state.weather.id;

    let pressure = this.state.main.pressure;
    let celsius = this.state.main.temp - 273.15;

    return (
      <View style={styles.container}>
        <Text>City Id: {city_id}</Text>
        <Text>기압: {pressure}</Text>
        <Text>온도: {celsius.toFixed(1)}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: Constants.statusBarHeight,
  },
});
