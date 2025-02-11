import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Logo from "../../assets/byte.png"
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { loginUser, resetError, resetIsLogin } from '../../slices/userSlice/userSlice'
import { toast } from "react-toastify"
import { STATUSES } from '../../store/statuses'
import Loader from "../layout/Loader/Loader"
import MetaData from '../layout/MetaData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { Label } from '../ui/label'
import { ShieldQuestion } from 'lucide-react'



const Login = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, error, isLogin, status } = useSelector((state) => state.user);

  const [user, setUser] = useState({
    email: "testuser@gmail.com",
    password: "12345678"
  })

  const { email, password } = user;

  const userDataChanged = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value })
  }

  const submitHandler = async (e) => {
    e.preventDefault()
    dispatch(loginUser(user));
  }

  const guestLogin = (e) => {
    e.preventDefault()
    dispatch(loginUser({
      email: "adminUser@gmail.com",
      password: "12345678"
    }));
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/")
    }
    if (isLogin) {
      toast.success("Login successfully");
      dispatch(resetIsLogin());
      navigate(location.state);
    }
    if (error) {
      toast.error(error);
      dispatch(resetError());
    }
  }, [navigate, isAuthenticated, isLogin, location, error, dispatch])

  if (status === STATUSES.LOADING)
    return <Loader />

  return (
    <>
      <MetaData title={"SignUp"} />
      <div className='fixed inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-slate-50'>
        <Card className="w-[380px]">
          <CardHeader>
            <img className="w-24" src={Logo} alt="Byte logo" />
            <CardTitle className="text-2xl font-bold">Login</CardTitle>
            <CardDescription>Welcome back!</CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              className="w-full mb-4 text-yellow-600 hover:text-white hover:bg-yellow-500/60 bg-yellow-500/50"
              onClick={guestLogin}>
              <ShieldQuestion />
              <p>Guest Mode</p>
            </Button>
            <form class="flex text-black gap-4 flex-col" onSubmit={submitHandler} >
              <Label htmlFor='email'>Email</Label>
              <Input
                id="email"
                type="Email"
                required
                name='email'
                placeholder='Email'
                onChange={userDataChanged}
                value={email} />
              <Label htmlFor='password'>Password</Label>
              <Input
                id="Password"
                type="password"
                required
                name='password'
                placeholder='Password'
                onChange={userDataChanged}
                value={password} />
              <Button type="submit">Login</Button>
            </form>
            <div className='flex justify-between m-2'>
              <Link
                class="text-xs"
                to="/user/signup"
                state={location.state}>
                New User? Create Account
              </Link>
              <Link
                className='text-xs text-red-400'
                to="/user/password/forget">
                Forget Password
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}

export default Login