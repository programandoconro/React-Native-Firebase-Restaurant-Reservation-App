import * as React from 'react';
import { Animated } from 'react-native';
import { NavigationStackProp, Scene, SceneDescriptorMap, TransitionerLayout, TransitionProps } from '../types';
declare type TransitionSpec = {};
declare type Props = {
    render: (current: TransitionProps, previous?: TransitionProps) => React.ReactNode;
    configureTransition?: (current: TransitionProps, previous?: TransitionProps) => TransitionSpec;
    onTransitionStart?: (current: TransitionProps, previous?: TransitionProps) => void | Promise<any>;
    onTransitionEnd?: (current: TransitionProps, previous?: TransitionProps) => void | Promise<any>;
    navigation: NavigationStackProp;
    descriptors: SceneDescriptorMap;
    screenProps?: unknown;
};
declare type State = {
    layout: TransitionerLayout;
    position: Animated.Value;
    scenes: Scene[];
    nextScenes?: Scene[];
};
declare class Transitioner extends React.Component<Props, State> {
    private positionListener;
    private prevTransitionProps;
    private transitionProps;
    private isComponentMounted;
    private isTransitionRunning;
    private queuedTransition;
    constructor(props: Props);
    componentDidMount(): void;
    componentWillUnmount(): void;
    UNSAFE_componentWillReceiveProps(nextProps: Props): void;
    private computeScenes;
    private startTransition;
    render(): JSX.Element;
    private handleLayout;
    private handleTransitionEnd;
}
export default Transitioner;
