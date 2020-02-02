import { Subject } from 'rxjs'

import { Action } from './models'

export class ScannedActionsSubject extends Subject<Action> {
	ngOnDestroy() {
		this.complete()
	}
}
