import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './App';
import reportWebVitals from './reportWebVitals';

import $ from "jquery";
window.jQuery = $;
window.$ = $;
global.jQuery = $;


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

$("#menu-toggle").click(function() {
  $("#wrapper").toggleClass("toggled");
});

$('.modal[data-reset="true"]').on('shown.bs.modal', () =>
  $("input[name != 'timestamp']").val(''));

$('.modal').on('shown.bs.modal', () =>
  $('input[data-reset-input="true"]').val(''));
