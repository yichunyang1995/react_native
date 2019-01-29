import { createStore,applyMiddleware } from 'redux'
import reducers from '../Reducers'
import thunk from 'redux-thunk';//redux的所有中间件都在store中进行解决异步问题
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'



// const store = createStore(reducers,applyMiddleware(thunk));
// export default store;



const persistConfig = {
    key: 'root',
    storage,
  }
   
  const persistedReducer = persistReducer(persistConfig,reducers)
   
  export default () => {
    let store = createStore(persistedReducer,applyMiddleware(thunk))
    let persistor = persistStore(store)
    return { store, persistor }
  }