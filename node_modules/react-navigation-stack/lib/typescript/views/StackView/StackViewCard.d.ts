import * as React from 'react';
import { Animated, StyleProp, ViewStyle } from 'react-native';
import { InputProps, InjectedProps } from './createPointerEventsContainer';
declare type Props = InputProps & InjectedProps & {
    style: StyleProp<ViewStyle>;
    animatedStyle: any;
    position: Animated.AnimatedInterpolation;
    transparent?: boolean;
    children: React.ReactNode;
};
declare const _default: React.ComponentType<Pick<Props, "style" | "children" | "scene" | "navigation" | "realPosition" | "animatedStyle" | "position" | "transparent">>;
export default _default;
