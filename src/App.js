import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import {Navbar, Footer, Sidebar , ThemeSetting } from './components';
import {Dashboard,Visa,Payment, Tickets,Clients,Editor,ColorPicker,Calendar,Kanban,Line} from './pages';

import { useStateContext } from './contexts/ContextProvider';
import './App.css';


const App = ()=>{
  const { activeMenu ,themeSettings,setThemeSettings,currentColor,currentMode} = useStateContext();
  return(
    <div className={currentMode === 'Dark' ? 'dark' : '' }>
      <BrowserRouter>
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
         
          <div>
            {themeSettings && <ThemeSetting/>}
            <Routes>
               {/* Dashboard */}
              <Route path="/" element={<Dashboard/>}/>
              <Route path="/dashboard" element={<Dashboard/>}/>

              {/* pages */}
              <Route path="/tickets" element={<Tickets/>}/>
              <Route path="/clients" element={<Clients/>}/>
              <Route path="/visa" element={<Visa/>}/>
              <Route path="/payment" element={<Payment/>}/>

              {/* Apps */}
              <Route path="/kanban" element={<Kanban/>}/>
              <Route path="/editor" element={<Editor/>}/>
              <Route path="/calendar" element={<Calendar/>}/>
              <Route path="/color-picker" element={<ColorPicker/>}/>

              {/* Charts */}
              <Route path="/line" element={<Line/>}/>
            </Routes>
          </div>
        </div>
      </div>
      </BrowserRouter>
    </div>
  )
}

export default App
