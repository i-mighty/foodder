import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';
export default StyleSheet.create({
    topPane:{
        height:hp('40%'),
        justifyContent: 'center',
        marginHorizontal: wp('5%'),
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
    desc:{
        color: '#444',
        fontSize: 13,
        marginVertical: hp('1%'), 
        marginHorizontal: wp('1%')
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
    tab:{
        height: hp('50%')
    },
    badgeContainer:{
        paddingVertical: wp('1%'),
        paddingHorizontal: wp('2'),
    },
    avatar:{
        marginVertical: hp('1%'),
        borderWidth: 1,
        borderColor: platform.brandPrimary
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
});