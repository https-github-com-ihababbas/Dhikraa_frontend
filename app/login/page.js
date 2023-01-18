"use client";
import React from "react";
import { useState ,useContext,useEffect} from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import Profile from "../profile/page";


export default function LoginForm(){

  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('')
  const {tokens,login}=useContext(AuthContext)
  const x=localStorage.getItem("username")

  const  usernameHandler= (e) => {
    setUsername(e.target.value);
  };
  const passwordHandler=(e)=>{
    setPassword(e.target.value)
  }
  const submitHandler=(e)=>{
    e.preventDefault();
    login({
      username,
      password
    })
  }

  

 
  return (
    <>
    {!tokens ?<div className="flex justify-center py-24 ">
    <form id="whoobe-t7qyk" className="flex flex-col items-center justify-center w-full px-6 m-auto my-5 bg-gray-300 rounded-lg shadow md:w-1/2 lg:w-1/3" onSubmit={submitHandler}>
    <h2 className="my-4 text-2xl text-gray-600 ">Login</h2>
			<div id="whoobe-h90kl" className="flex flex-col justify-start w-full p-2">
				<div id="whoobe-7izhv" className="flex flex-row ">
					<span id="whoobe-plfl9" className="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest" mode="render" block="">
						<svg xmlns="http://www.w3.org/2000/svg"  aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 26 26" className="iconify iconify--wpf">
							<path d="M16.563 15.9c-.159-.052-1.164-.505-.536-2.414h-.009c1.637-1.686 2.888-4.399 2.888-7.07c0-4.107-2.731-6.26-5.905-6.26c-3.176 0-5.892 2.152-5.892 6.26c0 2.682 1.244 5.406 2.891 7.088c.642 1.684-.506 2.309-.746 2.397c-3.324 1.202-7.224 3.393-7.224 5.556v.811c0 2.947 5.714 3.617 11.002 3.617c5.296 0 10.938-.67 10.938-3.617v-.811c0-2.228-3.919-4.402-7.407-5.557z" fill="currentColor">
							</path>
						</svg>
					</span>
					<input className="w-full pl-1 border border-gray-200 rounded-r-lg outline-none focus:ring-1 ring-blue-400" id="username" placeholder="username" onChange={usernameHandler}/>
				</div>
				
				<div id="whoobe-l6k6r" className="flex flex-row my-4">
					<span id="whoobe-4occ6" className="flex items-center justify-center w-10 h-10 text-2xl text-gray-400 border border-r-0 rounded-l-lg z-highest" mode="render" block="">
						<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1em" height="1em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 32 32" className="iconify iconify--carbon">
							<path d="M21 2a8.998 8.998 0 0 0-8.612 11.612L2 24v6h6l10.388-10.388A9 9 0 1 0 21 2zm0 16a7.013 7.013 0 0 1-2.032-.302l-1.147-.348l-.847.847l-3.181 3.181L12.414 20L11 21.414l1.379 1.379l-1.586 1.586L9.414 23L8 24.414l1.379 1.379L7.172 28H4v-3.172l9.802-9.802l.848-.847l-.348-1.147A7 7 0 1 1 21 18z" fill="currentColor">
							</path>
							<circle cx="22" cy="10" r="2" fill="currentColor">
							</circle>
						</svg>
					</span>
					<input type="password"className="w-full h-10 pl-1 border border-gray-200 rounded-r-lg outline-none bg-gary-200 focus:ring-1 ring-blue-300" id="password" placeholder="password" required="false" onChange={passwordHandler}/>
				</div>
				<button value="button" className="w-full px-4 py-2 my-4 text-white bg-teal-600 rounded hover:bg-blue-700" id="whoobe-ibemp">Login</button>
			</div>
		</form>
    </div>:
    <div className="text-black">
       <Profile/>
      
      
      
      </div> }
    
    </>
  )
}