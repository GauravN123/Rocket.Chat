import { ThreadBridge } from '@rocket.chat/apps-engine/server/bridges/ThreadBridge';
import type { IMessage } from '@rocket.chat/apps-engine/definition/messages';

import type { AppServerOrchestrator } from '../../../../ee/server/apps/orchestrator';

export class AppThreadBridge extends ThreadBridge {
	// eslint-disable-next-line no-empty-function
	constructor(private readonly orch: AppServerOrchestrator) {
		super();
	}

	protected async getById(threadID: string, appId: string): Promise<IMessage[]> {
		this.orch.debugLog(`The App ${appId} is getting the thread: "${threadID}"`);

		return this.orch.getConverters()?.get('threads').convertById(threadID);
	}
}
