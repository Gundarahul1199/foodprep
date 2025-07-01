import React from 'react'
import './LoginPopup.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios'
import {toast} from 'react-toastify'

const LoginPopup = ({setShowLogin}) => {

    const {url,token,setToken} = React.useContext(StoreContext)

    const[curState, setCurState] = React.useState("Log In");
    const [data,setData] = React.useState({
        name:"",
        email:"",
        password:"",
    });

    const onChangeHandler = (e)=>{
        const{name,value} = e.target;
        setData({...data,[name]:value});
    };

    const onSubmitHandler = async(e)=>{
        e.preventDefault()

        let newUrl = url;
        if(curState==="Log In"){
            newUrl+= '/api/user/login'
        }
        else{
            newUrl += '/api/user/register'
        }

        try {
            const response = await axios.post(newUrl,data)
            if(curState==="Sign Up"){
                toast.success("Account created successfully! Please Log in")
                setCurState("Log In")
            }
            else{
                setToken(response.data.token)
                localStorage.setItem("token",response.data.token)
                setShowLogin(false)
            }
        } catch (error) {
            toast(error.response?.data?.message || error.message ||"Please try again")
        }
    }

  return (
    <div className='login-popup'>
        <form onSubmit={onSubmitHandler} className='login-popup-container'>
            <div className="login-popup-title">
                <h2>{curState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon} alt=""  />
            </div>
        <div className="login-popup-inputs">
            {curState !== "Log In" ? (
                <input
                    name="name"
                    value={data.name}
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="Your Name"
                    required
                />
            ) : null}
            <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder='Email' required />
            <input name="password" value={data.password} onChange={onChangeHandler} type="password" placeholder='Password' required />
            
           
        </div>
        <button type='submit' className='btn'>
            {curState}
        </button>
        {curState === "Sign Up" && (
            <div className="login-popup-condition">
                <input type="checkbox" required />
                <p>
                    By signing up, you agree to our <span>Terms of Service</span> and <span>Privacy Policy</span>.
                </p>
            </div>
        )}
        {
            curState === "Log In" 
            ? (<p>Create a new account? <span onClick={()=>setCurState("Sign Up")}>Click here</span></p>)
            : (<p>Already have an account? <span onClick={()=>setCurState("Log In")}>Login here</span></p>)
            
        }
        </form>
    </div>
  )
}

export default LoginPopup