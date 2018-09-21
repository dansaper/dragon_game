export interface ResourceValueModel {
    value: number;
}

export interface ResourceModel {
    displayName: string;
    value: ResourceValueModel
}

export enum ResourceTypes {
    WYVERN_BONE,
    WYVERN_HIDE
}

export interface ResourcesModel {
    basic: Map<ResourceTypes, ResourceModel>;
}

export interface GameStateModel {
    resources: ResourcesModel;
}