import { createFeatureSelector } from '../../../lib/store'
import { ScenesState } from './reducer'

export const selectScenes = createFeatureSelector<ScenesState>('scenes')
