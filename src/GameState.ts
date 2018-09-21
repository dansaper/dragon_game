export class ResourceValue {
    value: number;
    constructor(value: number) {
        this.value = value;
    }
    changeValue(change: number) {
        this.value = this.value + change;
    }
    toString() {
        return this.value;
    }
}

export interface Resource {
    readonly displayName: string
    value: ResourceValue,
}

export enum ResourceTypes {
    WYVERN_BONE,
    WYVERN_HIDE
}

export interface Resources {
    basic: Map<ResourceTypes, Resource>
}

export interface GameState {
    resources: Resources
}

export interface Game {
    state: GameState
}
