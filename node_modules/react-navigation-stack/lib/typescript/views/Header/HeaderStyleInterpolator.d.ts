import { SceneInterpolatorProps } from '../../types';
declare function forLayout(props: SceneInterpolatorProps): {
    transform?: undefined;
} | {
    transform: {
        translateX: number;
    }[];
} | {
    transform: {
        translateX: import("react-native").Animated.AnimatedInterpolation;
    }[];
};
declare function forLeft(props: SceneInterpolatorProps): {
    opacity: number;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
declare function forCenter(props: SceneInterpolatorProps): {
    opacity: number;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
declare function forRight(props: SceneInterpolatorProps): {
    opacity: number;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
/**
 * iOS UINavigationController style interpolators
 */
declare function forLeftButton(props: SceneInterpolatorProps): {
    opacity: number;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
declare function forLeftLabel(props: SceneInterpolatorProps): {
    opacity: number;
    transform?: undefined;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
    transform: {
        translateX: import("react-native").Animated.AnimatedInterpolation;
    }[];
};
declare function forCenterFromLeft(props: SceneInterpolatorProps): {
    opacity: number;
    transform?: undefined;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
    transform: {
        translateX: import("react-native").Animated.AnimatedInterpolation;
    }[];
};
declare function forBackgroundWithFade(props: SceneInterpolatorProps): {
    opacity: number;
} | {
    opacity: import("react-native").Animated.AnimatedInterpolation;
};
declare function forBackgroundWithInactiveHidden({ navigation, scene, }: SceneInterpolatorProps): {
    opacity: number;
};
declare function forBackgroundWithTranslation(props: SceneInterpolatorProps): {
    opacity: number;
    transform?: undefined;
} | {
    transform: {
        translateX: import("react-native").Animated.AnimatedInterpolation;
    }[];
    opacity?: undefined;
};
declare const _default: {
    forLayout: typeof forLayout;
    forLeft: typeof forLeft;
    forLeftButton: typeof forLeftButton;
    forLeftLabel: typeof forLeftLabel;
    forCenterFromLeft: typeof forCenterFromLeft;
    forCenter: typeof forCenter;
    forRight: typeof forRight;
    forBackground: typeof forBackgroundWithInactiveHidden;
    forBackgroundWithInactiveHidden: typeof forBackgroundWithInactiveHidden;
    forBackgroundWithFade: typeof forBackgroundWithFade;
    forBackgroundWithTranslation: typeof forBackgroundWithTranslation;
};
export default _default;
