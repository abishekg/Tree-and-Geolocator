import 'react-checkbox-tree/lib/react-checkbox-tree.css'
import 'materialize-css/dist/css/materialize.min.css';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { NodeHead } from './components/NodeHead';
import reducers from './reducers';
import reduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import Geolocator from './components/Geolocator';
import ShipForm from './components/ShipForm';
import { Infiniteloop } from './components/Infiniteloop';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));


ReactDOM.render(<div>
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path="/infiniteloop" component={Infiniteloop} />
        <Route path="/geolocator" component={Geolocator} />
        <Route path="/shipform" component={ShipForm} />
        <Route path="/tree" component={App} />
        <Route path="/" component={NodeHead} />
      </Switch>
    </BrowserRouter>
  </Provider>
</div>, document.getElementById('root'));
registerServiceWorker();
