import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect} from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {colors} from '../../Common/colors';
import {useDispatch, useSelector} from 'react-redux';
import {apiCall} from '../../Redux/Middleware';
import {addCount, minusCount, sampleApi} from '../../Redux/Red-Action';
import {LOG} from '../../Common/utils';

const Chat = () => {
  const dispatch = useDispatch();

  const curVal = useSelector(({main}) => main.curVal);

  useEffect(() => {
    LOG('chat useEffect :' + curVal);
  }, []);

  const onPlusPress = () => {
    // dispatch(apiCall(addCount({val: 1})));
    dispatch(apiCall(sampleApi({get: 'allStoreData'})));
  };

  const onMinusPress = () => {
    dispatch(apiCall(minusCount()));
  };

  return (
    <View style={styles.container}>
      <View style={styles.rowButton}>
        <TouchableOpacity style={styles.rowContent} onPress={onPlusPress}>
          <AntDesign name="pluscircleo" color={colors.royalBlue} size={50} />
        </TouchableOpacity>

        <View style={styles.rowContent}>
          <Text style={styles.numText}>{curVal}</Text>
        </View>

        <TouchableOpacity style={styles.rowContent} onPress={onMinusPress}>
          <AntDesign name="minuscircleo" color={colors.royalBlue} size={50} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },

  rowButton: {
    flexDirection: 'row',
    borderColor: colors.darkBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowContent: {
    marginHorizontal: 20,
  },
  numText: {
    fontSize: 20,
  },
});
export default Chat;
