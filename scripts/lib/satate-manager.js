const createStore = (initialState, reducer) => {
  let hist = [];
  let listeners = [];

  const getState = (timestamp = Infinity) => {
    const histFragment = hist.filter((v) => v.timestamp <= timestamp);

    const state = histFragment.reduce((state, { action }) => {
      return reducer(state, action);
    }, initialState);

    return state;
  };

  const dispatch = (action) => {
    hist.push({
      timestamp: Date.now(),
      action,
    });

    listeners.forEach((fn) => fn());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
