import type React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { moderateScale } from '../../utils/scalingUtils';
import { Arrowback } from '../../assets/icons/Arrowback';

interface CurvedHeaderProps {
  title: string;
  onBackPress: () => void;
}

export const CurvedHeader: React.FC<CurvedHeaderProps> = ({ title, onBackPress }) => {
  return (
    <View
      style={{
        backgroundColor: '#9C6FB8',
        paddingTop: moderateScale(70),
        paddingBottom: moderateScale(40),
        paddingHorizontal: moderateScale(20),
        borderBottomLeftRadius: moderateScale(60),
        borderBottomRightRadius: moderateScale(60),
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <TouchableOpacity onPress={onBackPress} style={{ marginRight: moderateScale(15) }}>
          <Arrowback height={moderateScale(30)} width={moderateScale(30)} color="white" />
        </TouchableOpacity>
        <Text
          style={{
            color: 'white',
            fontSize: moderateScale(20),
            fontWeight: '600',
          }}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};
