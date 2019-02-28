import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';
export default StyleSheet.create({
    userPane:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('2%'),
        // backgroundColor: platform.brandLight
    },
    userPaneItems:{
        paddingVertical: hp('1%'),
        color: platform.brandDark
    },
    listItemIcon:{
        backgroundColor: platform.brandLight,
        color: platform.brandDark,
        fontSize: 36
    }
})