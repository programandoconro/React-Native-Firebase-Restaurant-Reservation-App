import * as React from 'react';
import { Animated } from 'react-native';
import { ThemeContext } from 'react-navigation';
declare class HeaderTitle extends React.Component<React.ComponentProps<typeof Animated.Text>> {
    static contextType: React.Context<import("react-navigation").SupportedThemes>;
    context: React.ContextType<typeof ThemeContext>;
    render(): JSX.Element;
}
export default HeaderTitle;
