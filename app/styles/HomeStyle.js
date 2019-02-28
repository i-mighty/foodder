import { StyleSheet } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';

export default StyleSheet.create({
    body:{
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: hp('2%'),
    },
    container:{
        justifyContent: 'center',
    },
    bannerTile:{
        height: hp('30%'),
        width: wp('100%'),
        justifyContent: 'center',
        marginHorizontal: wp('1%')
    },
    bannerTileIcon:{
        height: hp('30%'),
        width: wp('100%'),
        backgroundColor: '#2226',
        alignItems: 'center',
        justifyContent: 'center'
    },
    smallerTile:{
        height: hp('20%'),
        width: wp('48%'),
        justifyContent: 'center',
        marginHorizontal: wp('1%')
    },
    smallerTileIcon:{
        height: hp('20%'),
        width: wp('48%'),
        backgroundColor: '#2226',
        alignItems: 'center',
        justifyContent: 'center'
    },
    tileIcon:{
        fontSize: 36,
        color: '#eee'
    },
    tileIconView:{
        height: hp('20%')
    },
    sectionLabel:{
        fontWeight: 'bold',
        color: '#044704'
    }

})