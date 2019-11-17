import * as React from 'react';
import { NavigationStackProp, SceneDescriptorMap, NavigationStackConfig } from '../../types';
declare type Props = {
    navigation: NavigationStackProp;
    descriptors: SceneDescriptorMap;
    navigationConfig: NavigationStackConfig;
    onTransitionStart?: () => void;
    onGestureBegin?: () => void;
    onGestureCanceled?: () => void;
    onGestureEnd?: () => void;
    screenProps?: unknown;
};
declare class StackView extends React.Component<Props> {
    render(): JSX.Element;
    componentDidMount(): void;
    private configureTransition;
    private getShadowEnabled;
    private getCardOverlayEnabled;
    private renderStackviewLayout;
    private handleTransitionEnd;
}
export default StackView;
