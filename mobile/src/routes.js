import * as React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

import Incidents from './pages/Incidents'
import Detail from './pages/Detail'

const AppStack = createStackNavigator()
export default function Routes() {
	return (
		<NavigationContainer>
			<AppStack.Navigator>
				<AppStack.Screen name='Incidents' options={{ headerShown: false }} component={Incidents} />
				<AppStack.Screen options={{ headerShown: false }} name='Detail' component={Detail} />
			</AppStack.Navigator>
		</NavigationContainer>

	)
}