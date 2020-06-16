import algoliasearch, {SearchClient} from "algoliasearch";
import { AuthMode } from '@algolia/client-common';
import {Connection, ConnectionConfig, GlobalConfig} from "@nexus-switchboard/nexus-extend";

export interface IAlgoliaConfig extends ConnectionConfig {
    applicationId: string
    searchToken: string;
    indexName: string;
}

export class AlgoliaConnection extends Connection {
    public api: SearchClient;

    public name = "Github";
    public config: IAlgoliaConfig;

    /**
     * This connect will attempt to pull the account information via API request which
     * means that the account name associated with this instance may not be available
     * immediately.
     */
    public connect(): AlgoliaConnection {
        this.api = algoliasearch(
            this.config.applicationId,
            this.config.searchToken,
            {
                authMode: AuthMode.WithinHeaders, // or AuthMode.WithinQueryParameters
            },
        );

        return this;
    }

    public disconnect(): boolean {
        delete this.api;
        return true;
    }
}

export default function createConnection(cfg: ConnectionConfig, globalCfg: GlobalConfig): Connection {
    return new AlgoliaConnection(cfg, globalCfg);
}
