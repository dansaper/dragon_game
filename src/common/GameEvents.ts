enum GameEventType {
  INCREMENT_BASIC_RESOURCE
}

interface IGameEvent {
  type: GameEventType;
}
