import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import createSagasMiddleware from 'redux-saga'
import reducers  from './reducers'
import rootSaga from './sagas'

const sagasMiddleware = createSagasMiddleware()

const store = createStore(
  combineReducers({ ...reducers }), compose(
    applyMiddleware(sagasMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
  )
)

window.store = store
sagasMiddleware.run(rootSaga)

export default store
