import { Scene, NavigationStackState, SceneDescriptorMap } from '../types';
export default function ScenesReducer(scenes: Scene[], nextState: NavigationStackState, prevState: NavigationStackState | null, descriptors: SceneDescriptorMap): Scene[];
