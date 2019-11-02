import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import ConfirmDetails from './ConfirmDetails';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MemoryRouter><ConfirmDetails/></MemoryRouter>, div);
  ReactDOM.unmountComponentAtNode(div);
});