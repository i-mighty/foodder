import {
    StyleSheet
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import platform from '../native-base-theme/variables/platform';
export default StyleSheet.create({
    listHeaders:{
        backgroundColor: platform.brandLight,
    },
    sectionHeader:{
        color: platform.brandDark
    },
    body:{
        backgroundColor: '#555A',
    }
});