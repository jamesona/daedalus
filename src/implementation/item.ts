import { HasInventory, IsItem } from '@daedalus/rules'

export function giveItem(target: HasInventory, item: IsItem): void {

}

export function takeItem(target: HasInventory, index: number): IsItem {
	const item = target.inventory[index]
	target.inventory.splice(index, 1)
	return item
}
