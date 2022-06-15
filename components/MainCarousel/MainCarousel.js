import React, {useRef} from 'react';
import {useSelector} from 'react-redux';
import {/*Text, */ View} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';

import styles from './MainCarousel.styles';
import SliderEntry from './components/SliderEntry';
import {sliderWidth, itemWidth} from './components/SliderEntry.style';
import carouselData from '../../utils/parseRetreatData';
import store from '../../store/store';
import {setSelectedMainSliderItem} from '../../store/reducers/settings';

const MainCarousel = ({navigation}) => {
  const currMainSliderSlide = store.getState().settings.selectedMainSliderSlide;
  const slider = useRef();
  useSelector(state => state.settings.selectedMainSliderSlide);

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
      {/*<Text style={styles.title}>
        {'Wybierz interesujące Cię przygotowanie'}
      </Text>
      */}
      <Carousel
        ref={slider}
        data={carouselData}
        renderItem={_renderItemWithParallax}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth}
        hasParallaxImages={true}
        currentIndex={currMainSliderSlide}
        firstItem={currMainSliderSlide}
        inactiveSlideScale={0.94}
        inactiveSlideOpacity={0.7}
        inactiveSlideShift={20}
        enableMomentum={true}
        containerCustomStyle={styles.slider}
        contentContainerCustomStyle={styles.sliderContentContainer}
        onSnapToItem={index => {
          store.dispatch(setSelectedMainSliderItem(index));
        }}
      />
      <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={currMainSliderSlide}
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
