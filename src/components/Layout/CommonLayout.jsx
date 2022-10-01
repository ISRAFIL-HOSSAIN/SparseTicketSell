import React, { useState } from "react";
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { BrowserRouter,useNavigate, Routes, Route } from 'react-router-dom';

import { FiSettings } from 'react-icons/fi';
import { useStateContext } from '../../contexts/ContextProvider';
import {Navbar, Footer, Sidebar , ThemeSetting } from './components';
import { ContextProvider } from "../../contexts/ContextProvider";

export default function  CommonLayout(){ 
  const [collapsed, setCollapsed] = useState(true);
  const contextValue = { collapsed, setCollapsed };

  const { activeMenu ,themeSettings,setThemeSettings,currentColor,currentMode} = useStateContext();
  
  return (
    <div className={currentMode === 'Dark' ? 'dark' : '' }>
      
        <div className="flex relative dark:bg-main-dark-bg">
              
            <div className="fixed right-3 bottom-3" style={{zIndex:'1000'}}>
              <TooltipComponent content="Settings" position="Top">
                <button type = "button" 
                className="text-3xl p-3 
                hover:drop-shadow-xl 
                hover:bg-light-gray text-white" 
                onClick={() => setThemeSettings(true)}
                style={{background: currentColor, borderRadius: '50%'}}>
                  <FiSettings/>
                </button>
              </TooltipComponent>
            </div>
            {
            activeMenu ? (
              <div className='w-72 fixed sidebar
              dark:bg-secondary-dark-bg
              bg-white'>
                <Sidebar/>
              </div>
            ) : (
              <div>
                <Sidebar/> 
              </div>
            )}
            <div className={
              `dark:bg-main-dark-bg 
              bg-main-bg 
              main-h-screen  w-full 
              ${activeMenu 
                ? 'md:ml-72' 
                : 'flex-2'}`
            }>
              <div className="fixed md:static
              bg-main-bg dark:bg-main-dark-bg 
              navbar w-full">
                <Navbar/>
              </div>
            </div>
        </div>
    
    </div>
  
   
  )
}
