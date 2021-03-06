import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import thunk from 'redux-thunk';



const configureStoreDev = function (rootReducer, initialState) {
    //const reactRouterMiddleware = routerMiddleware(history);
    const middlewares = [
        // Add other middleware on this line...

        // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
        reduxImmutableStateInvariant(),

        // thunk middleware can also accept an extra argument to be passed to each thunk action
        // https://github.com/gaearon/redux-thunk#injecting-a-custom-argument
        thunk
        //reactRouterMiddleware
    ];

    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
    const store = createStore(rootReducer, initialState, composeEnhancers(
        applyMiddleware(...middlewares)
    )
    );
    return store;
}

//TODO: Modify according to the production
let env = 'development'; //process.env.NODE_ENV 

const configureStore = env === 'production' ? 'configureStoreProd' : configureStoreDev;

export default configureStore;