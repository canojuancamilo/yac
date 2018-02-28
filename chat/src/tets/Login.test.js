import React from 'react';
import ReactDOM from 'react-dom';
import Login from '../components/Login-Component';

it('renders without crashing', () => {
    expect(Login.change_state.bind(this,1).toBe(1))
});
