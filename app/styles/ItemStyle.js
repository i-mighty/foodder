import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';

export default StyleSheet.create({
    topPane:{
        width: wp('100%'),
        height: hp('47%'),
        left: -2,
        top: -5,
        // borderBottomLeftRadius: wp('50%')/2,
        // borderBottomRightRadius: wp('50%') / 2,
        // transform: [{
        //     scaleX: 2
        // }],
        // backgroundColor: platform.brandLight,
        borderColor: platform.brandLight,
        paddingBottom: hp('2%'),
        borderBottomWidth: 2,
        borderTopWidth: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonRow:{
        width: wp('80%')
    },
    lAvatar:{
        borderColor: platform.brandLight, 
        borderWidth: 2, 
        marginVertical: hp('2.5%')
    },
    bodyPane:{
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('2.5%'),
        marginVertical: hp('2%'),
        width: wp('100%'),
        height: hp('45%'),
        justifyContent: 'center',
    },
    name:{
        color: platform.brandPrimary,
    },
    hView:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    desc: {
        color: '#444',
        fontSize: 13,
    },
    descContainer:{
        width: wp('60%')
    },
    footer:{
        paddingVertical: hp('1%')
    }
})