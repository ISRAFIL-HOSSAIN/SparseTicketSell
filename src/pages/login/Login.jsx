import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../model/firebase"
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from '../../assets/binance.png';
import {notification } from "antd"; 
import { AuthContext } from "../../contexts/AuthContext";


const Login = () => {
    const [error, setError] = useState(false);
    const [email, setEmail] = useState(""); 
    const [password, setPassword] = useState(""); 
    const navigate = useNavigate(); 
    
    const {dispatch} = useContext(AuthContext)
  
 

    const handleLogin =(e)=>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Sign in 
            const user = userCredential.user;
            // console.log(user); 
            dispatch({type:"LOGIN", payload:user})
            notification["success"]({
                message: "Successfully login",
              });
            navigate("/")
        
        })
        .catch((error) => {
            setError(true); 
        });
    };

    const renderErrorMessage = (name) =>
         error && (
        <div className="error" style={{color:"red"}}>{"** UserName or Password is Wrong ! "}</div>
    );

  return (   
    <section class="bg-gray-50 dark:bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
              <img class="w-8 h-8 mr-2" src={logo} alt="logo" />
              TicketSystem  
            </a>
            <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                      Sign in to your account
                    </h1>

                    <form class="space-y-4 md:space-y-6" onSubmit={handleLogin}>
                        {renderErrorMessage(error)} 
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" 
                            required  onChange={e=>setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
                            required onChange={e=>setPassword(e.target.value)} />
                        </div>
                        <div class="flex items-center justify-between">
                            <div class="flex items-start">
                                <div class="flex items-center h-5">
                                    <input id="remember" aria-describedby="remember" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                </div>
                                <div class="ml-3 text-sm">
                                    <label for="remember" class="text-gray-500 dark:text-gray-300">Remember me</label>
                                </div>
                            </div>
                        <a href="#" class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500">Forgot password?</a>
                        </div>
                        <input type="submit" value={"Submit"}  class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
                        <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don't have an account yet? <a href="#" class="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>

    </section>
   
  )
}

export default Login