import React from 'react';
import ReactDOM from 'react-dom';
import './styles/bootstap.scss';
import App from './App.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUpload, faCircle } from '@fortawesome/free-solid-svg-icons'
 
library.add(faUpload, faCircle)

ReactDOM.render(
  <App />,
  document.getElementById('root')
);