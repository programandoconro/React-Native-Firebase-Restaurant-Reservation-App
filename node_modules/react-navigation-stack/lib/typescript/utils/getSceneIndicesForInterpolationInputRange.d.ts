import { Scene } from '../types';
declare type Props = {
    scene: Scene;
    scenes: Scene[];
};
declare function getSceneIndicesForInterpolationInputRange(props: Props): {
    first: number;
    last: number;
} | null;
export default getSceneIndicesForInterpolationInputRange;
