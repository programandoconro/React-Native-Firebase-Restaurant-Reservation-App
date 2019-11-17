import * as React from 'react';
import { TransitionProps, TransitionConfig, NavigationStackConfig } from '../../types';
declare type Props = NavigationStackConfig & {
    isLandscape: boolean;
    transitionProps: TransitionProps;
    lastTransitionProps?: TransitionProps;
    transitionConfig?: (transitionProps: TransitionProps, prevTransitionProps?: TransitionProps, isModal?: boolean) => TransitionConfig;
    onGestureBegin?: () => void;
    onGestureEnd?: () => void;
    onGestureCanceled?: () => void;
    screenProps?: unknown;
};
declare const _default: React.ComponentType<Pick<Props, "mode" | "headerMode" | "headerLayoutPreset" | "headerTransitionPreset" | "headerBackgroundTransitionPreset" | "headerBackTitleVisible" | "disableKeyboardHandling" | "transparentCard" | "cardShadowEnabled" | "cardOverlayEnabled" | "cardStyle" | "onTransitionStart" | "onTransitionEnd" | "transitionConfig" | "transitionProps" | "lastTransitionProps" | "onGestureBegin" | "onGestureEnd" | "onGestureCanceled" | "screenProps">>;
export default _default;
