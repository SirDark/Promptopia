'use client'
import React from 'react'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import Profile from '@components/profile'

const MyProfile = () => {
    const [posts, setPosts] = useState([])
    const {data: session} = useSession();

    console.log("wtf " + session?.user.id)
    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${session?.user.id}/posts`)
            const data = await response.json();
            setPosts(data)
            console.log(data)
        }
        if(session?.user.id) fetchPosts()
    }, []);
  const handleEdit = () =>
  {

  }
  const handleDelete = () =>{

  }
  return (
    <Profile
      name='My'
      desc="Welcome to your personalized profile"
      data={posts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />

    
  )
}

export default MyProfile