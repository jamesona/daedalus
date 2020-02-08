import { createFeatureSelector } from '../../../lib/store'
import { ScenesState } from './reducer'

export const scenesState = createFeatureSelector<ScenesState>('scenes')
