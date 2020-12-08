const createStore = ({
  initialState,
  saveHistory,
  loadHistory,
  history = loadHistory?.() || [],
  reducer,
}) => {
  let listeners = [];

  const getState = (timestamp = Infinity) => {
    const historySlice = history.filter((v) => v.timestamp <= timestamp);

    const state = historySlice
      .sort((a, b) => a.timestamp - b.timestamp)
      .reduce((state, { action }) => {
        return reducer(state, action);
      }, initialState);

    store.timestamp = timestamp === Infinity ? undefined : timestamp;

    return state;
  };

  const getHistory = () => history;

  const dispatch = (action) => {
    history.push({
      timestamp: store.timestamp || Date.now(),
      action,
    });

    saveHistory?.(getHistory());
    listeners.forEach((fn) => fn());
  };

  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  const store = {
    timestamp: Infinity,
    getState,
    getHistory,
    dispatch,
    subscribe,
  };

  return store;
};

export default createStore;
