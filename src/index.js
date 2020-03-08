import React from "react";
import ReactDOM from "react-dom";
import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from "redux-devtools-extension";
import {Provider} from 'react-redux';
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import App from "./components/app/app.jsx";
import {createAPI} from "./api";

const api = createAPI();

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument(api))
    )
);

store.dispatch(DataOperation.loadOffers());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
