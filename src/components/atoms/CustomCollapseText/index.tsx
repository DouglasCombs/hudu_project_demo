import React from 'react';
import {StyleSheet, Text, TextStyle, TouchableOpacity} from 'react-native';
import {VStack} from 'native-base';
import {Colors} from '~/styles';
import {fontFamily, verticalScale, fontSize as fs} from '~/utils/style';
import ViewMoreText from 'react-native-view-more-text';

const CustomCollapseText = ({
  label,
  text = '',
  labelStyle = styles.label,
  textStyle = styles.bodyText,
  numberOfLines = 2,
  flex = 1,
}: {
  label?: string;
  text?: string;
  labelStyle?: any;
  textStyle?: TextStyle;
  numberOfLines?: number;
  flex?: number | string;
}) => {
  const renderViewMore = (onPress: any) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.linkText}>See more</Text>
      </TouchableOpacity>
    );
  };

  const renderViewLess = (onPress: any) => {
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        <Text style={styles.linkText}>See less</Text>
      </TouchableOpacity>
    );
  };

  return (
    <VStack flex={flex} space="3">
      {label && <Text style={labelStyle}>{label}</Text>}
      <ViewMoreText
        numberOfLines={numberOfLines}
        renderViewMore={renderViewMore}
        renderViewLess={renderViewLess}
        textStyle={textStyle}>
        <Text style={textStyle}>{text}</Text>
      </ViewMoreText>
    </VStack>
  );
};

export default CustomCollapseText;

const styles = StyleSheet.create({
  bodyText: {
    flex: 1,
    color: Colors.PLACEHOLDER,
    fontSize: fs.normal,
    fontFamily: fontFamily.regular,
  },
  linkText: {
    color: Colors.INFO,
    fontSize: fs.normal,
    fontFamily: fontFamily.regular,
    textDecorationLine: 'underline',
    textAlign: 'right',
    marginTop: 3,
  },
  linkContainer: {height: '100%', justifyContent: 'flex-end'},
  label: {
    color: Colors.BLACK_1,
    fontSize: fs.tiny,
    fontFamily: fontFamily.regular,
    marginBottom: verticalScale(6),
  },
});

// import React, {useState} from 'react';
// import {
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextLayoutEventData,
//   NativeSyntheticEvent,
// } from 'react-native';
// import {Center, HStack, VStack} from 'native-base';
// import {Colors} from '~/styles';
// import {fontFamily, scale, verticalScale, fontSize as fs} from '~/utils/style';

// const CustomCollapseText = ({
//   label,
//   text = '',
//   labelStyle = styles.label,
//   textStyle = styles.bodyText,
//   numberOfLines = 2,
// }: {
//   label?: string;
//   text?: string;
//   labelStyle?: any;
//   textStyle?: any;
//   numberOfLines?: number;
// }) => {
//   const [loadMore, setLoadMore] = useState<boolean>(false);
//   const [numOfLines, setNumOfLines] = useState<number>(0);

//   const onTextLayout = ({
//     nativeEvent: {lines},
//   }: NativeSyntheticEvent<TextLayoutEventData>) => {
//     if (numOfLines === 0) {
//       setNumOfLines(lines.length);
//     }
//   };

//   const onLoadMoreToggle = () => {
//     setLoadMore(prevState => !prevState);
//   };

//   return (
//     <VStack space="3" flex={1}>
//       {label && <Text style={labelStyle}>{label}</Text>}
//       <HStack flex={1} space="1" alignItems="center">
//         <Text
//           numberOfLines={
//             numOfLines === 0 ? undefined : loadMore ? numOfLines : numberOfLines
//           }
//           onTextLayout={onTextLayout}
//           style={textStyle}>
//           {text}
//         </Text>
//         {!loadMore && numOfLines > numberOfLines && (
//           <TouchableOpacity
//             style={styles.linkContainer}
//             activeOpacity={0.7}
//             onPress={onLoadMoreToggle}>
//             <Text style={styles.linkText}>{'See more'}</Text>
//           </TouchableOpacity>
//         )}
//       </HStack>
//       {loadMore && (
//         <Center position="absolute" right="0" bottom="0">
//           <TouchableOpacity activeOpacity={0.7} onPress={onLoadMoreToggle}>
//             <Text style={styles.linkText}>{'See less'}</Text>
//           </TouchableOpacity>
//         </Center>
//       )}
//     </VStack>
//   );
// };

// export default CustomCollapseText;

// const styles = StyleSheet.create({
//   bodyText: {
//     flex: 1,
//     color: Colors.PLACEHOLDER,
//     fontSize: fs.normal,
//     fontFamily: fontFamily.regular,
//   },
//   linkText: {
//     color: Colors.INFO,
//     fontSize: fs.normal,
//     fontFamily: fontFamily.regular,
//     textDecorationLine: 'underline',
//   },
//   linkContainer: {height: '100%', justifyContent: 'flex-end'},
//   label: {
//     color: Colors.BLACK_1,
//     fontSize: fs.tiny,
//     fontFamily: fontFamily.regular,
//     marginBottom: verticalScale(6),
//   },
// });
