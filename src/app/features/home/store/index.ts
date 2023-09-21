import { GoogleEffects } from './google/google.effects'
import { googleReducer } from './google/google.reducers'
import { LinkEffects } from './link/link.effects'
import { linkReducer } from './link/link.reducers'
import { ProgressEffects } from './progress/progress.effects'
import { progressReducer } from './progress/progress.reducers'


export * from './home.store'
export * from './home.feature'

export * from './link/link.actions'
export * from './link/link.effects'
export * from './link/link.reducers'

export * from './google/google.actions'
export * from './google/google.effects'
export * from './google/google.reducers'

export * from './progress/progress.actions'
export * from './progress/progress.effects'
export * from './progress/progress.reducers'

export const effects = [GoogleEffects,ProgressEffects,LinkEffects]
