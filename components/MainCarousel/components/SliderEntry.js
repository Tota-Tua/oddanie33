import React, {Component} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {ParallaxImage} from 'react-native-snap-carousel';
import styles from './SliderEntry.style';
import images from '../../../res/images/images';

export default class SliderEntry extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    even: PropTypes.bool,
    parallax: PropTypes.bool,
    parallaxProps: PropTypes.object,
    navigation: PropTypes.object,
  };

  constructor() {
    super();
    this._isNavigationEnabled = true;
  }

  componentDidMount() {
    this._unsubscribeFocus = this.props.navigation.addListener('focus', () => {
      this._isNavigationEnabled = true;
    });
  }

  componentWillUnmount() {
    this._unsubscribeFocus();
  }

  get image() {
    const picName = this.props.data.illustration;
    const curImg = images[picName];
    const {parallax, parallaxProps, even} = this.props;

    return parallax ? (
      <ParallaxImage
        source={curImg}
        // ZMIANA START
        // blad Failed prop type: Prop containerStyle passed to ParallaxImage. Has invalid keys 0, 1
        // z containerStyle={styles.imageContainer, even ? styles.imageContainerEven : {}]} na
        containerStyle={styles.imageContainer}
        // ZMIANA END
        style={styles.image}
        parallaxFactor={0.35}
        showSpinner={true}
        spinnerColor={even ? 'rgba(255, 255, 255, 0.4)' : 'rgba(0, 0, 0, 0.25)'}
        {...parallaxProps}
      />
    ) : (
      <Image source={curImg} style={styles.image} />
    );
  }

  render() {
    const {
      data: {title, subtitle},
      even,
    } = this.props;
    const uppercaseTitle = title ? (
      <Text
        style={[styles.title, even ? styles.titleEven : {}]}
        numberOfLines={2}>
        {title.toUpperCase()}
      </Text>
    ) : (
      false
    );

    return (
      <TouchableOpacity
        activeOpacity={1}
        style={styles.slideInnerContainer}
        onPress={() => {
          // the below code prevents from creation of the multiple instances of the next screen
          if (this._isNavigationEnabled) {
            this.props.navigation.push('RetreatList', this.props.data);
            this._isNavigationEnabled = false;
          }
        }}>
        <View style={styles.shadow} />
        <View
          style={[
            styles.imageContainer,
            even ? styles.imageContainerEven : {},
          ]}>
          {this.image}
          <View
            style={[styles.radiusMask, even ? styles.radiusMaskEven : {}]}
          />
        </View>
        <View
          style={[styles.textContainer, even ? styles.textContainerEven : {}]}>
          {uppercaseTitle}
          <Text
            style={[styles.subtitle, even ? styles.subtitleEven : {}]}
            numberOfLines={2}>
            {subtitle}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}
