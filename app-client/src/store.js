import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/sagas/rootSaga';
import combineReducers from './redux/reducers/rootReducer';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: combineReducers,
  middleware,
});
export default store;

sagaMiddleware.run(rootSaga);
