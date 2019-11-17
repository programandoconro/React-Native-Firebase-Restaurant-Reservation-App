import { SceneInterpolatorProps } from '../../types';
/**
 * Standard iOS-style slide in from the right.
 */
declare function forHorizontal(props: SceneInterpolatorProps): {
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
        translateX: import("react-native").Animated.AnimatedInterpolation;
    }[];
    overlayOpacity: import("react-native").Animated.AnimatedInterpolation | null;
    shadowOpacity: import("react-native").Animated.AnimatedInterpolation | null;
    opacity?: undefined;
};
/**
 * Standard iOS-style slide in from the bottom (used for modals).
 */
declare function forVertical(props: SceneInterpolatorProps): {
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
        translateY: import("react-native").Animated.AnimatedInterpolation;
    }[];
    opacity?: undefined;
};
/**
 * Standard Android-style fade in from the bottom.
 */
declare function forFadeFromBottomAndroid(props: SceneInterpolatorProps): {
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
    opacity: import("react-native").Animated.AnimatedInterpolation;
    transform: {
        translateY: import("react-native").Animated.AnimatedInterpolation;
    }[];
};
declare function forFadeToBottomAndroid(props: SceneInterpolatorProps): {
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
    opacity: import("react-native").Animated.AnimatedInterpolation;
    transform: {
        translateY: import("react-native").Animated.AnimatedInterpolation;
    }[];
};
/**
 *  fadeIn and fadeOut
 */
declare function forFade(props: SceneInterpolatorProps): {
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
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
declare function forNoAnimation(): {};
declare const _default: {
    forHorizontal: typeof forHorizontal;
    forVertical: typeof forVertical;
    forFadeFromBottomAndroid: typeof forFadeFromBottomAndroid;
    forFadeToBottomAndroid: typeof forFadeToBottomAndroid;
    forFade: typeof forFade;
    forNoAnimation: typeof forNoAnimation;
};
export default _default;
