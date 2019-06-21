import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
export default StyleSheet.create({
    view:{
        justifyContent: 'center',
    },
    bgImage:{
        height: hp('60%'),
        width: wp('100%'),
        justifyContent: 'center', 
        alignItems: 'center',
    },
    form:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('2%'),
        paddingLeft: wp('4%'),
        paddingRight: wp('4%'),
        height: hp('40%'),
        width: wp('100%'),
        backgroundColor: '#fff'
    },
    input:{
        marginVertical: hp('1%')
    },
    header:{
        backgroundColor: 'transparent'
    },
    inputLeft:{
        paddingHorizontal: wp('2%'),
        color: '#555'
    }
});