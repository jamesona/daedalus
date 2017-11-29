import { Entity } from '@daedalus/common'
import { HasStats, HasInventory, HasPurse, HasAbilities } from '@daedalus/rules'

export interface IsCreature extends Entity, HasStats, HasInventory, HasPurse, HasAbilities {}
