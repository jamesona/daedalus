import { Entity } from '@daedalus/types'
import { HasStats, HasInventory, HasPurse, HasAbilities } from '@daedalus/types'

export interface IsCreature extends Entity, HasStats, HasInventory, HasPurse, HasAbilities {}
