import * as React from 'react';
import { HeaderBackButtonProps } from '../../types';
declare type Props = HeaderBackButtonProps & {
    LabelContainerComponent: React.ComponentType;
    ButtonContainerComponent: React.ComponentType;
};
declare type State = {
    initialTextWidth?: number;
};
declare class ModularHeaderBackButton extends React.PureComponent<Props, State> {
    static defaultProps: {
        tintColor: string;
        truncatedTitle: string;
    };
    state: State;
    private onTextLayout;
    private renderBackImage;
    private getTitleText;
    private maybeRenderTitle;
    render(): JSX.Element;
}
export default ModularHeaderBackButton;
