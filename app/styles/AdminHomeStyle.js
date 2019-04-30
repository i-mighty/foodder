import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';

export default StyleSheet.create({
    fab:{
        backgroundColor: platform.brandDark
    },
    noFollowersIcon:{
        fontSize: wp('20%'),
        color: '#AAA7'
    },
    noFollowersView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: hp('50')
    },
    noMenuView:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        height: hp('50')
    },
    noFollowersText:{
        fontSize: wp('5%'),
        color: '#AAA7',
        marginVertical: hp('1%')
    },
})