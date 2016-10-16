import React from 'react'
import { render } from 'react-dom'
import './index.sass'
import Router from './Router'

render(
  <Router />,
  document.querySelector('main')
);
