import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';

export default StyleSheet.create({
    tab:{
        paddingVertical: hp('5%'),
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'center',
        width: wp('80%')
    },
    text:{
        textAlign: 'center',
    },
    form:{
        marginVertical: hp('2.5%')
    },
    formItem:{
        marginVertical: hp('1%')
    }
})