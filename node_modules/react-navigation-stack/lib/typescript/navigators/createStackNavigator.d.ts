import { CreateNavigatorConfig, NavigationStackRouterConfig, NavigationRouteConfigMap, NavigationRoute } from 'react-navigation';
import { NavigationStackConfig, NavigationStackOptions, NavigationStackProp } from '../types';
declare function createStackNavigator(routeConfigMap: NavigationRouteConfigMap<NavigationStackOptions, NavigationStackProp<NavigationRoute, any>>, stackConfig?: CreateNavigatorConfig<NavigationStackConfig, NavigationStackRouterConfig, NavigationStackOptions, NavigationStackProp<NavigationRoute, any>>): any;
export default createStackNavigator;
