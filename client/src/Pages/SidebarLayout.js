import React from 'react';
import SideMenu from '../Components/SideMenu';

const SidebarLayout = () => {
  return (
    <>
        <SideMenu/>
        <Outlet />
    </>
  );
}

export default SidebarLayout;
