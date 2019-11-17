export declare const JUMP_TO = "Navigation/JUMP_TO";
export declare const jumpTo: (payload: {
    routeName: string;
    key: string;
    params?: object | undefined;
}) => {
    routeName: string;
    key: string;
    params?: object | undefined;
    type: string;
    preserveFocus: boolean;
};
