import React, { useEffect, useState } from 'react'
import { useAppStore } from '../../store/index.js'
import { IoArrowBack } from 'react-icons/io5'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { getColor } from '../../lib/utils.js'
import { FaTrash, FaPlus } from 'react-icons/fa'
import { Input } from '../../components/ui/input.jsx'
import { color } from '../../lib/utils.js'
import { Button } from '../../components/ui/button.jsx'
import { toast } from 'sonner'
import { apiClient } from '../../lib/api-client.js'
import { UPDATE_PROFILE_ROUTE } from '../../utils/constants.js'
import { useNavigate } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const { userInfo, setUserInfo } = useAppStore()
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [image, setImage] = useState(null)
  const [hovered, setHovered] = useState(false)
  const [selectedColour, setSelectedColour] = useState(0)
  

  useEffect( () => {
    if(userInfo.profileSetup) {
      setFirstName(userInfo.firstName)
      setLastName(userInfo.lastName)
      setSelectedColour(userInfo.color)
    }
  },[userInfo])

  const validateProfile = () => {
    if(!firstName) {
      toast.error("first name required")
      return false
    }
    if(!lastName) {
      toast.error("last name required")
      return false
    }
    return true
  }

  const saveChanges = async () => {
    if(validateProfile()) {
      try {
        const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{ firstName, lastName, color:selectedColour}, {withCredentials:true})

        if(response.status === 200 && response.data){
          setUserInfo(response.data.user)
          toast.success("profile update sucessfull")
          navigate("/chat")
        }

      } catch (error) {
        console.log(error)
        toast.error("profile update failed")
      }
    }
  }

  const handleNavigate = () => {
    userInfo.profileSetup ? navigate("/chat") : toast.error("please setup profile")
  }

  return (
    <div className='bg-[#1b1c24] h-[100vh] flex items-center justify-center flex-col gap-10'>
      <div className='flex flex-col gap-10 w-[80vw] md:w-max'>
        {/* Back Button */}
        <div>
          <IoArrowBack
            className='text-4xl lg:text-6xl text-white/90 cursor-pointer'
            onClick={handleNavigate}
          />
        </div>

        {/* Main Content */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          {/* Avatar Section */}
          <div
            className='h-full w-32 md:w-48 relative flex items-center justify-center'
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar className="h-32 w-32 md:w-48 md:h-48 rounded-full overflow-hidden">
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full bg-black"
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border-[1px] flex items-center justify-center rounded-full ${getColor(
                    selectedColour
                  )}`}
                >
                  {firstName
                    ? firstName.charAt(0).toUpperCase()
                    : userInfo.email.charAt(0).toUpperCase()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div className='absolute inset-0 flex items-center justify-center bg-black/50 rounded-full'>
                {image ? (
                  <FaTrash
                    className='text-white text-3xl cursor-pointer'
                    onClick={() => setImage(null)} 
                  />
                ) : (
                  <FaPlus
                    className='text-white text-3xl cursor-pointer'
                    onClick={() => alert('Add image functionality not implemented')} 
                  />
                )}
              </div>
            )}
          </div>

          {/* Input Fields Section */}
          <div className='flex flex-col gap-5 text-white items-center justify-center'>
            <div className='w-full'>
              <Input
                placeholder="Email"
                type="email"
                disabled
                value={userInfo.email}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="First Name"
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full'>
              <Input
                placeholder="Last Name"
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                className="rounded-lg p-6 bg-[#2c2e3b] border-none"
              />
            </div>
            <div className='w-full flex gap-5 justify-center'>
              {color.map((colorClass, index) => (
                <div
                  className={`${colorClass} h-8 w-8 rounded-full cursor-pointer transition-all duration-300 ${
                    selectedColour === index
                      ? 'outline outline-white/50 outline-2'
                      : ''
                  }`}
                  key={index}
                  onClick={() => setSelectedColour(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Changes Button */}
        <div className='w-full flex justify-center'>
          <Button
            className="h-16 w-full md:w-1/2 bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Profile
