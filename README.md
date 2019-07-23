# Yet Another State Manager

[![Build Status](https://travis-ci.org/mendaomn/yasm.svg?branch=master)](https://travis-ci.org/mendaomn/yasm)

State Management is surely one of the most delicate aspects of building sizable Web Applications. 

Yet I think most of the state managers out there tend to overdo it, so I tried my hand at it with two goals in mind:

- it should only do what's absolutely needed
- it should be as small as possible

## API

- `init(initialState)`: create the store with an initial state
- `store.getState()`: returns the current state of the store
- `store.setState(newState)`: sets the state of the store to newState
- `store.subscribe(callback)`: will call the callback on state changes