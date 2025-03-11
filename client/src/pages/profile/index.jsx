import React from 'react'
import { useAppStore } from '../../store/index.js'

const Profile = () => {

  const {userInfo} = useAppStore()
  const [firstName, setName] = useState("")

  return (
    <div>
        Profile
        <div>Email : {userInfo.email} </div>
    </div>
  )
}

export default Profile
