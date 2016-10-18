import Exponent from 'exponent';
import React from 'react';
import {
  AppRegistry,
  Animated,
  Dimensions,
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';

const DeviceHeight = Dimensions.get('window').height;

class App extends React.Component {
  state = {
    scrollY: new Animated.Value(0),
  }

  render() {
    let { scrollY } = this.state;

    let cardTransform = [1,2,3].map((val, i) => {
      return {
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [-200, 0, 150, 151],
              outputRange: [15 + i * 30, 0, i * -75, i * -75],
            }),
          },
        ]
      }
    });

    return (
      <View style={{flex: 1}}>
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Animated.View style={[styles.card1, cardTransform[0]]} />
          <Animated.View style={[styles.card2, cardTransform[1]]} />
          <Animated.View style={[styles.card3, cardTransform[2]]} />
        </View>

        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flex: 1}}
          style={StyleSheet.absoluteFill}>
          <View style={{flex: 1}} />
        </Animated.ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card1: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'red',
  },
  card2: {
    position: 'absolute',
    top: 175,
    left: 20,
    right: 20,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'purple',
  },
  card3: {
    position: 'absolute',
    top: 250,
    left: 20,
    right: 20,
    height: 250,
    borderRadius: 10,
    backgroundColor: 'orange',
  },
});

Exponent.registerRootComponent(App);
