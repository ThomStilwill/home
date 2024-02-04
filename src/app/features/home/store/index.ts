export * from './home.store'
export * from './home.feature'

export * from './link/link.actions'
export * from './link/link.effects'
export * from './link/link.reducers'
export * from './link/link.model'

export * from './google/google.actions'
export * from './google/google.effects'
export * from './google/google.reducers'

export * from './progress/progress.actions'
export * from './progress/progress.effects'
export * from './progress/progress.reducers'

export * from './menu/menu.actions'
export * from './menu/menu.effects'
export * from './menu/menu.reducers'

export * from './models/linkbase.model'


import { GoogleEffects, 
         LinkEffects, 
         ProgressEffects, 
         MenuEffects 
        } from "../store"

export const effects = [
    GoogleEffects,
    ProgressEffects,
    LinkEffects,
    MenuEffects
]
