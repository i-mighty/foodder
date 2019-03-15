import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';

export default StyleSheet.create({
    body:{
        paddingVertical: hp('2%'),
        paddingHorizontal: wp('2.5%'),
    },
    container:{
        flex: 1,
        flexDirection: 'column',
    },
    text:{
        color: platform.brandPrimary,
        textAlign: 'center'
    },
    form:{
        paddingRight: wp('2.5%'),
        borderRadius: wp('5%'),
    },
    formItem:{
        marginVertical: hp('1%'),
    }
})