import { Animated } from 'react-native';
import { TransitionProps, TransitionConfig } from '../../types';
declare function defaultTransitionConfig(transitionProps: TransitionProps, prevTransitionProps?: TransitionProps, isModal?: boolean): TransitionConfig;
declare function getTransitionConfig<T = {}>(transitionConfigurer: undefined | ((transitionProps: TransitionProps, prevTransitionProps?: TransitionProps, isModal?: boolean) => T), transitionProps: TransitionProps, prevTransitionProps?: TransitionProps, isModal?: boolean): TransitionConfig & T;
declare const _default: {
    defaultTransitionConfig: typeof defaultTransitionConfig;
    getTransitionConfig: typeof getTransitionConfig;
    SlideFromRightIOS: {
        transitionSpec: {
            timing: typeof Animated.spring;
            stiffness: number;
            damping: number;
            mass: number;
            overshootClamping: boolean;
            restDisplacementThreshold: number;
            restSpeedThreshold: number;
            duration?: undefined;
            easing?: undefined;
        } | {
            duration: number;
            easing: import("react-native").EasingFunction;
            timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
            stiffness?: undefined;
            damping?: undefined;
            mass?: undefined;
            overshootClamping?: undefined;
            restDisplacementThreshold?: undefined;
            restSpeedThreshold?: undefined;
        };
        screenInterpolator: (props: import("../../types").SceneInterpolatorProps) => {
            opacity: number;
            transform: ({
                translateX: number;
                translateY?: undefined;
            } | {
                translateY: number;
                translateX?: undefined;
            })[];
        } | {
            opacity: number;
            transform?: undefined;
            overlayOpacity?: undefined;
            shadowOpacity?: undefined;
        } | {
            transform: {
                translateX: Animated.AnimatedInterpolation;
            }[];
            overlayOpacity: Animated.AnimatedInterpolation | null;
            shadowOpacity: Animated.AnimatedInterpolation | null;
            opacity?: undefined;
        };
        containerStyleLight: {
            backgroundColor: string;
        };
        containerStyleDark: {
            backgroundColor: string;
        };
    };
    ModalSlideFromBottomIOS: {
        transitionSpec: {
            timing: typeof Animated.spring;
            stiffness: number;
            damping: number;
            mass: number;
            overshootClamping: boolean;
            restDisplacementThreshold: number;
            restSpeedThreshold: number;
            duration?: undefined;
            easing?: undefined;
        } | {
            duration: number;
            easing: import("react-native").EasingFunction;
            timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
            stiffness?: undefined;
            damping?: undefined;
            mass?: undefined;
            overshootClamping?: undefined;
            restDisplacementThreshold?: undefined;
            restSpeedThreshold?: undefined;
        };
        screenInterpolator: (props: import("../../types").SceneInterpolatorProps) => {
            opacity: number;
            transform: ({
                translateX: number;
                translateY?: undefined;
            } | {
                translateY: number;
                translateX?: undefined;
            })[];
        } | {
            opacity: number;
            transform?: undefined;
        } | {
            transform: {
                translateY: Animated.AnimatedInterpolation;
            }[];
            opacity?: undefined;
        };
        containerStyleLight: {
            backgroundColor: string;
        };
        containerStyleDark: {
            backgroundColor: string;
        };
    };
    FadeInFromBottomAndroid: {
        transitionSpec: {
            duration: number;
            easing: import("react-native").EasingFunction;
            timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        };
        screenInterpolator: (props: import("../../types").SceneInterpolatorProps) => {
            opacity: number;
            transform: ({
                translateX: number;
                translateY?: undefined;
            } | {
                translateY: number;
                translateX?: undefined;
            })[];
        } | {
            opacity: number;
            transform?: undefined;
        } | {
            opacity: Animated.AnimatedInterpolation;
            transform: {
                translateY: Animated.AnimatedInterpolation;
            }[];
        };
    };
    FadeOutToBottomAndroid: {
        transitionSpec: {
            duration: number;
            easing: import("react-native").EasingFunction;
            timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        };
        screenInterpolator: (props: import("../../types").SceneInterpolatorProps) => {
            opacity: number;
            transform: ({
                translateX: number;
                translateY?: undefined;
            } | {
                translateY: number;
                translateX?: undefined;
            })[];
        } | {
            opacity: number;
            transform?: undefined;
        } | {
            opacity: Animated.AnimatedInterpolation;
            transform: {
                translateY: Animated.AnimatedInterpolation;
            }[];
        };
    };
    NoAnimation: {
        transitionSpec: {
            duration: number;
            timing: (value: Animated.Value | Animated.ValueXY, config: Animated.TimingAnimationConfig) => Animated.CompositeAnimation;
        };
        screenInterpolator: () => {};
        containerStyleLight: {
            backgroundColor: string;
        };
        containerStyleDark: {
            backgroundColor: string;
        };
    };
};
export default _default;
