import React, { useState } from 'react'
import Victory from '../../assets/victory.svg'
import { TabsList } from '@radix-ui/react-tabs'
import { TabsTrigger } from '@radix-ui/react-tabs'
import { TabsContent } from '@radix-ui/react-tabs'
import { Tabs } from '../../components/ui/tabs'
import { Input } from '../../components/ui/input'
import { Button } from '../../components/ui/button'
import { toast } from 'sonner'
import { SIGNUP_ROUTE } from '../../utils/constants.js'
import { apiClient } from '../../lib/api-client.js'

const Auth = () => {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')

    const validateSignup = () => {
        if(!email.length) {
            toast.error('Email is required')
            return false
        }
        if(!password.length) {
            toast.error('Password is required')
            return false
        }
        if(password !== confirmPassword) {
            toast.error('Password donot match')
            return false
        }
    }

    const handleLogin = async() => {}

    const handleSignUp = async() => {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE, {email, password})
        }
    }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center'>
        <div className='h-[80vh] bg-white border-2 border-white text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid xl:grid-cols-2'>
            <div className='flex flex-col gap-10 items-center justify-center' >
                    <div className='flex items-center justify-center flex-col' >
                        <div className='flex items-center justify-center'>
                            <h1 className='text-5xl md:text-6xl font-bold'>Welcome</h1>
                            <img src={Victory} alt="victory emoji" className='h-[100px]' />
                        </div>
                        <p className='font-medium text-center' >Fill in the details to get started!!</p>
                    </div>
                    <div className='flex items-center justify-center w-full'>
                        <Tabs className='w-3/4' >
                            <TabsList className='bg-transparent flex rounded-none w-full' >
                                <TabsTrigger 
                                    className='data-[state=active]:bg-transparent text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-
                                    data-[state=active]:border-b-purple-500 p-3 transition-all duration-300' value="signup" >Sign Up
                                </TabsTrigger>
                                <TabsTrigger
                                    className='data-[state=active]:bg-transparent text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-
                                    data-[state=active]:border-b-purple-500 p-3 transition-all duration-300'                
                                value="login">Login</TabsTrigger>
                            </TabsList>
                            <TabsContent className=' flex flex-col gap-5 mt-10' value='login' >
                                <Input
                                    placeholder='Email'
                                    type='email'
                                    className=' rounded-full p-6'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                                <Input
                                    placeholder='Password'
                                    type='password'
                                    className=' rounded-full p-6'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Input>
                                <Button
                                   onClick = {handleLogin}
                                   className='rounded-full p-6'
                                >Login</Button>
                            </TabsContent>
                            <TabsContent value='signup' className=' flex flex-col gap-5' >
                            <Input
                                    placeholder='Email'
                                    type='email'
                                    className=' rounded-full p-6'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                ></Input>
                                <Input
                                    placeholder='Password'
                                    type='password'
                                    className=' rounded-full p-6'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                ></Input>
                                <Input
                                    placeholder='Confirm Password'
                                    type='password'
                                    className=' rounded-full p-6'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                ></Input> 
                                <Button
                                   onClick = {handleSignUp}
                                   className='rounded-full p-6'
                                >Sign Up</Button>                                                              
                            </TabsContent>
                        </Tabs>
                    </div>
            </div>
            <div className='hidden xl:flex justify-center items-center' >
                <img src='../../assets/login2.png' alt="background login" className='h-[700px]' />
            </div>
        </div>
    </div>
  )
}

export default Auth
