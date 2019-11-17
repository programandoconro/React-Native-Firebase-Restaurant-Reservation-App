import * as React from 'react';
import { Animated, View } from 'react-native';
import { NavigationStackProp, Scene } from '../../types';
export declare type PointerEvents = 'box-only' | 'none' | 'auto';
export declare type InputProps = {
    scene: Scene;
    navigation: NavigationStackProp;
    realPosition: Animated.Value;
};
export declare type InjectedProps = {
    pointerEvents: PointerEvents;
    onComponentRef: (ref: View | null) => void;
};
/**
 * Create a higher-order component that automatically computes the
 * `pointerEvents` property for a component whenever navigation position
 * changes.
 */
export default function createPointerEventsContainer<Props extends InjectedProps & InputProps>(Component: React.ComponentType<Props>): React.ComponentType<Pick<Props, Exclude<keyof Props, keyof InjectedProps>>>;
