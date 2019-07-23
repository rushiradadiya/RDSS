import ContactList from '../Components/ContactList';
import ContactDetail from '../Components/ContactDetail'

import {
    createAppContainer,
    createStackNavigator
} from 'react-navigation';

export const DrawerNav = createAppContainer(createStackNavigator(
    {
        ContactList:{screen:ContactList},
        ContactDetail:{screen:ContactDetail}
    },
    {
        headerMode: "none"
    }));
