import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';

export default StyleSheet.create({
    body: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: hp('%'),
        // backgroundColor: platform.brandLight,
    },
    bodyStyle:{
        // backgroundColor: platform.brandLight,
    },
    resultSection:{
        width: wp('100%'),
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
        marginHorizontal: hp('1%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselCardBase:{
        backgroundColor: '#444'
    },
    carouselCardBaseText:{
        color: '#eee'
    }
});