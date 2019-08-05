import React, { useState, useEffect } from 'react';
import { Animated, Image, ScrollView, StyleSheet } from 'react-native';
import { Block, Button, Text } from 'expo-ui-kit';

// constants
import { images, theme } from '../constants';
const { background } = images;

// theme
const { SIZES } = theme;

const backgrounds = [
  {
    title: 'Secured, forever.',
    description:
      'Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: background.welcome
  },
  {
    title: 'Encrypted, forever.',
    description:
      'Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: background.encrypted
  },
  {
    title: 'Privacy, forever.',
    description:
      'Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: background.privacy
  }
];

const Welcome = props => {
  const scrollX = new Animated.Value(0);
  const [slideIndex, setSlideIndex] = useState(0);

  useEffect(() => {
    scrollX.addListener(({ value }) => {
      setSlideIndex(Math.floor(value / SIZES.width));
    });
  }, []);

  const renderImages = () => {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event([
          { nativeEvent: { contentOffset: { x: scrollX } } }
        ])}
      >
        {backgrounds.map((item, index) => (
          <Block
            center
            bottom
            key={`img-${index}`}
            style={{ width: SIZES.width }}
          >
            <Image
              source={item.img}
              resizeMode="center"
              style={{
                width: SIZES.width / 1.5,
                height: '100%'
              }}
            />
          </Block>
        ))}
      </ScrollView>
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, SIZES.width);
    return (
      <Block
        row
        center
        middle
        flex={false}
        margin={[SIZES.padding, 0, SIZES.padding * 2, 0]}
      >
        {backgrounds.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp'
          });
          return (
            <Block
              gray
              animated
              flex={false}
              key={`dot-${index}`}
              radius={SIZES.small}
              margin={[0, SIZES.small / 2]}
              style={[styles.dot, { opacity }]}
            />
          );
        })}
      </Block>
    );
  };

  const renderTexts = () => {
    const background = backgrounds[slideIndex];
    return (
      <>
        <Text animated h3 semibold theme={theme}>
          {background && background.title}
        </Text>
        <Text
          gray
          center
          caption
          animated
          theme={theme}
          margin={[SIZES.small, 0]}
        >
          {background && background.description}
        </Text>
      </>
    );
  };

  return (
    <Block safe>
      <Block center middle>
        {renderImages()}
      </Block>
      <Block flex={false} center bottom margin={60}>
        {renderTexts()}
        {renderDots()}
        <Button
          primary
          theme={theme}
          onPress={() => props.navigation.navigate('VPN')}
        >
          <Text
            bold
            white
            center
            caption
            margin={[SIZES.padding / 2, SIZES.padding * 2]}
          >
            GET STARTED
          </Text>
        </Button>
      </Block>
    </Block>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  dot: { width: SIZES.base, height: SIZES.base }
});
