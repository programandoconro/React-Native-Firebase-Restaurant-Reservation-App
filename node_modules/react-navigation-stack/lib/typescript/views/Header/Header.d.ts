import * as React from 'react';
import { SceneInterpolatorProps, HeaderProps } from '../../types';
declare type Props = HeaderProps & {
    leftLabelInterpolator: (props: SceneInterpolatorProps) => any;
    leftButtonInterpolator: (props: SceneInterpolatorProps) => any;
    titleFromLeftInterpolator: (props: SceneInterpolatorProps) => any;
    layoutInterpolator: (props: SceneInterpolatorProps) => any;
    theme: string;
};
declare const _default: (React.ComponentClass<Pick<Props, "scene" | "navigation" | "position" | "layoutPreset" | "backTitleVisible" | "scenes" | "layout" | "mode" | "transitionPreset" | "leftInterpolator" | "titleInterpolator" | "rightInterpolator" | "backgroundInterpolator" | "leftLabelInterpolator" | "leftButtonInterpolator" | "titleFromLeftInterpolator" | "layoutInterpolator" | "theme">, any> & {
    readonly HEIGHT: number;
}) | (React.FunctionComponent<Pick<Props, "scene" | "navigation" | "position" | "layoutPreset" | "backTitleVisible" | "scenes" | "layout" | "mode" | "transitionPreset" | "leftInterpolator" | "titleInterpolator" | "rightInterpolator" | "backgroundInterpolator" | "leftLabelInterpolator" | "leftButtonInterpolator" | "titleFromLeftInterpolator" | "layoutInterpolator" | "theme">> & {
    readonly HEIGHT: number;
});
export default _default;
