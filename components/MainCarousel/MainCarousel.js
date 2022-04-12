import React, {useRef, useState} from 'react';
import {Text, View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import styles from './MainCarousel.styles';
import carouselData from './data';
import SliderEntry from './components/SliderEntry';
import {sliderWidth, itemWidth} from './components/SliderEntry.style';

const FIRST_ACTIVE_SLIDE = 1;

const MainCarousel = ({navigation}) => {
  const [activeSlide, updateActiveSlide] = useState(FIRST_ACTIVE_SLIDE);
  let slider = useRef();

  function _renderItemWithParallax({item, index}, parallaxProps) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
        parallax={true}
        parallaxProps={parallaxProps}
        navigation={navigation}
      />
    );
  }

  return (
    <View style={styles.exampleContainer}>
      <Text style={styles.title}>
        {'Wybierz interesujące Cię przygotowanie'}
      </Text>
      <Carousel
        ref={slider}
        data={carouselData}
        renderItem={_renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        firstItem={activeSlide}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        inactiveSlideShift={20}
        enableMomentum={true}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        onSnapToItem={index => updateActiveSlide(index)}
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotColor={'rgba(255, 255, 255, 0.92)'}
        dotStyle={styles.paginationDot}
        inactiveDotColor={'#000'}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        carouselRef={slider}
        tappableDots={!!slider}
      />
    </View>
  );
};

export default MainCarousel;
