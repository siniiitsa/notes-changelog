const createStore = ({ initialState, history = [], reducer }) => {
  let listeners = [];

  const getState = (timestamp = Infinity) => {
    const historySlice = history.filter((v) => v.timestamp <= timestamp);

    const state = historySlice.reduce((state, { action }) => {
      return reducer(state, action);
    }, initialState);

    return state;
  };

  const getHistory = () => history;

  const dispatch = (action) => {
    history.push({
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
    getHistory,
    dispatch,
    subscribe,
  };
};

export default createStore;
