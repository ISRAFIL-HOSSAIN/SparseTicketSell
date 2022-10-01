import React, { useEffect,useContext } from 'react';
import { useNavigate } from "react-router-dom";
import { AiOutlineMenu } from 'react-icons/ai';
import { BiExit } from "react-icons/bi"; 
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { useStateContext } from '../contexts/ContextProvider';
import { getAuth, signOut } from "firebase/auth";
import { AuthContext } from '../contexts/AuthContext';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const navigate = useNavigate(); 
  const auth = getAuth(); 
  const {dispatch} = useContext(AuthContext)
  const { currentColor, activeMenu, setActiveMenu, handleClick, isClicked, setScreenSize, screenSize } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  const handleLogOut=()=>{
    signOut(auth).then(()=>{
      dispatch({type:"LOGOUT", payload:""})

      console.log("Signout Successfull "); 
      navigate("/login");
    }).catch((error)=>{
      console.log(error); 
    })
  }

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">

      <NavButton title="Menu" customFunc={handleActiveMenu} color={currentColor} icon={<AiOutlineMenu />} />
      <div className="flex">
       
        <TooltipComponent content="Logout" position="BottomCenter">
          <button
              className="flex items-center gap-1 bg-blue-800 hover:bg-red-900 p-2 rounded-md text-white"
              onClick={() => handleLogOut()}
            >
              <BiExit /> Logout
          </button>
          
        </TooltipComponent>

        {/* {isClicked.cart && ('')}
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)} */}
      </div>
    </div>
  );
};

export default Navbar;