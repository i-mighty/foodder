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
        paddingVertical: hp('2%'),
        // backgroundColor: platform.brandLight,
    },
    bodyStyle:{
        // backgroundColor: platform.brandLight,
    },
    resultSection:{
        width: wp('100%'),
        paddingHorizontal: wp('2%'),
        paddingVertical: hp('1%'),
        marginHorizontal: hp('2%'),
        justifyContent: 'center',
        alignItems: 'center',
    },
    carouselCardBase:{
        backgroundColor: '#444'
    },
    carouselCardBaseText:{
        color: '#eee'
    },
    notFoundImage:{
        height: hp('25%'),
        width: wp('60%')
    },
    notFoundView:{
        height: hp('30%'),
    },
    //MakeOrderStyles
    orderCard:{

    }
});