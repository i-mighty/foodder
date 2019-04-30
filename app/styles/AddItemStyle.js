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
    },
    map:{
        height: hp('70%')
    },
    buttonRowMargin:{
        marginHorizontal:wp('1%')
    },
    tagContainer:{
        backgroundColor: platform.brandLight,
        borderColor: platform.brandDark,
        borderWidth: 0.5,
        borderRadius: 20
    },
    tagText:{
        color: platform.brandDark
    }
})