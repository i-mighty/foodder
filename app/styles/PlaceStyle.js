import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    topPane:{
        height:hp('40%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        height: hp('50%')
    },
    badgeText:{
        color: '#fff'
    },
    badgeContainer:{
        paddingVertical: wp('1%'),
        paddingHorizontal: wp('2'),
    },
    avatar:{
        marginVertical: hp('1%'),
    }
});