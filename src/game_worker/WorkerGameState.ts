import { ResourceValueModel, ResourceModel, ResourceTypes, ResourcesModel, GameStateModel } from "../GameStateModels";

export class ResourceValue implements ResourceValueModel {
    public value: number;
    constructor(o: ResourceValueModel) {
        this.value = o.value;
    }
    changeValue(change: number) {
        this.value = this.value + change;
    }
    toString() {
        return this.value;
    }
}

export class Resource implements ResourceModel {
    public readonly displayName: string;
    public value: ResourceValue;
    constructor(o: ResourceModel) {
        this.displayName = o.displayName;
        this.value = new ResourceValue(o.value);
    }
}

export class Resources implements ResourcesModel {
    public basic: Map<ResourceTypes, Resource>;
    constructor(o: ResourcesModel) {
        this.basic = new Map();
        o.basic.forEach((resource, type) => {
            this.basic.set(type, new Resource(resource));
        });
    }
}

export class GameState implements GameStateModel {
    public resources: Resources;
    constructor(o: GameStateModel) {
        this.resources = new Resources(o.resources);
    }
}

export interface Game {
    state: GameState
}
