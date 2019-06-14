import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Constants } from 'expo';
import { Font } from 'expo';


export default class WeatherDetailScreen extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: `${navigation.getParam('city', 'Unknown')}`,
    };
  };

  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const city = navigation.getParam('city', null); // 강사님이 이미 만들어 주신거....
    await Font.loadAsync({
      'OpenSans-Bold' : require('./assets/fonts/OpenSans-Bold.ttf'),
      'BMHANNA' : require('./assets/fonts/BMHANNA_11yrs_ttf.ttf'),
      'joseon' : require('./assets/fonts/joseon.ttf'),
    });
    this.setState({fontLoaded: true});
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
          <Text style={styles.loading}>데이터를 불러오는 중입니다.</Text>
        </View>
      )
    }

    let city_id = this.state.weather.id;
    let city_name = this.state.name;

    let pressure = this.state.main.pressure;
    let celsius = this.state.main.temp - 273.15;
    let temp_min = this.state.main.temp_min - 273.15;
    let temp_max = this.state.main.temp_max - 273.15;

    let weather_json = this.state.weather;
    // let weather_json_str = JSON.stringify(weather_json);
    // console.log(weather_json_str);
    // console.log(weather_json[0]);
    // console.log(weather_json[0].icon);


    return (
      <View style={styles.container}>
        {this.state.fontLoaded ? (
            <Text style={styles.title}>
              {city_name} 의 날씨

            </Text>
          ) : null
        }

        <Text></Text>
        {/*<Image source={{uri: 'http://openweathermap.org/img/w/' + weather_json[0].icon + '.png'}} />*/}
        <Image
            style={styles.icon}
            source={{uri: 'http://openweathermap.org/img/w/' + weather_json[0].icon + '.png'}}
        />
        <Text style={styles.content}>기압: {pressure} hPa</Text>
        <Text style={styles.content}>온도: {celsius.toFixed(1)} °C</Text>
        <Text style={styles.content}>최고기온: {temp_min.toFixed(1)} °C</Text>
        <Text style={styles.content}>최저기온: {temp_max.toFixed(1)} °C</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopWidth: 150,
    borderTopColor: '#fff',

  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontFamily: 'joseon',
    color: 'black',

  },
  content: {
    fontSize: 18,
    fontFamily: 'joseon',
    height: 30,
    textAlign: 'center',
  },
  icon: {
    alignSelf: 'center',
    width: 100,
    height: 100,
  },
  loading: {
      fontSize: 18,
      textAlign: 'center',
      borderTopWidth: 200,
      borderTopColor: '#fff',
      fontFamily: 'joseon',
    },
});
