import { useState, useEffect } from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
    const [formData, setFormData] = useState({
        email:'',
        password:''
    });

     //destructuring the formData
    const {email, password}= formData;

  const navigate = useNavigate();
  const dispatch= useDispatch();

  const { user, isLoading, isError, isSuccess, message} = useSelector(
    (state) =>state.auth
  );

  useEffect(()=>{
    if(isError){
        toast.error(message)
    }
    if(isSuccess || user){
        navigate('/')
        
    }

    dispatch(reset())
  },  [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e)=>{
        setFormData((prevState)=>({
            ...prevState,
             [e.target.name]:e.target.value,
        }))
        
    }

    const onSubmit=(e)=>{
        e.preventDefault()

        const userData = {
            email,
            password
        }
        dispatch(login(userData))
    }
    if(isLoading){
        return <Spinner />
    }

  return (
    <>
    <section className="heading">
        <h1>
            <FaSignInAlt/> Login
        </h1>
        <p>Login into your account and Start setting goals</p>
    </section>
    <section className="form">
        <form action="" onSubmit={onSubmit}>
         <div className="form-group">
            <input type="email" 
            className="form-control" i
            id='email' name='email' 
            value={email} 
            onChange={onChange} 
            placeholder='Please enter your email'/>
         </div>
         <div className="form-group">
            <input type="password" 
            className="form-control" 
            id='passsword' name='password' 
            value={password} 
            onChange={onChange} 
            placeholder='Please enter your password'/>
         </div>
         <div className="form-group">
            <button type="submit" className="btn btn-block">Submit</button>
         </div>
        </form> 
    </section>
    
    </>
  )
}

export default Login;