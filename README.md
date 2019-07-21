# Yet Another State Manager

yasm aims at being a simple state manager

## API

- `init(initialState)`: create the store with an initial state
- `store.getState()`: returns the current state of the store
- `store.setState(newState)`: sets the state of the store to newState
- `store.subscribe(callback)`: will call the callback on state changes