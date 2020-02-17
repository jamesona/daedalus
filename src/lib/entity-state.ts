type HasID = { id: string }

export class EntityState<
	T extends HasID,
	U extends { [id: string]: T } = { [id: string]: T }
> {
	private _ids: Array<keyof U> | undefined

	constructor(public readonly entities: U = {} as U) {}

	public get ids() {
		if (!this._ids) {
			this._ids = Reflect.ownKeys(this.entities) as Array<keyof U>
		}
		return this._ids
	}
}

export class EntityStateAdapter<T extends HasID> {
	private append(entity: T, entities: EntityState<T>['entities']) {
		return {
			...entities,
			[entity.id]: entity
		} as EntityState<T>['entities']
	}

	upsertOne(entity: T, state: EntityState<T>): EntityState<T> {
		const entities = this.append(entity, state.entities)

		return new EntityState(entities)
	}
}
