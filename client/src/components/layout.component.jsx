import React from 'react';
import {Header} from './header.component';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {{children}}
    </>
  );
};

export default Layout;
