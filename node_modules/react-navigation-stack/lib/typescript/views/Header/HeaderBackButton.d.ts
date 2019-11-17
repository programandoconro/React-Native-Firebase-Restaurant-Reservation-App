import * as React from 'react';
import { ThemeContext } from 'react-navigation';
import BackButtonWeb from './BackButtonWeb';
import { HeaderBackButtonProps } from '../../types';
declare type Props = Omit<HeaderBackButtonProps, 'layoutPreset' | 'scene'>;
declare type State = {
    initialTextWidth?: number;
};
declare class HeaderBackButton extends React.PureComponent<Props, State> {
    static defaultProps: {
        pressColorAndroid: string;
        tintColor: string;
        truncatedTitle: string;
        backImage: typeof BackButtonWeb;
    };
    static contextType: React.Context<import("react-navigation").SupportedThemes>;
    context: React.ContextType<typeof ThemeContext>;
    state: State;
    private handleTextLayout;
    private renderBackImage;
    private getTitleText;
    private maybeRenderTitle;
    render(): JSX.Element;
}
export default HeaderBackButton;
