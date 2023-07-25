'use client'
import React from 'react'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

import Profile from '@components/profile'

const MyProfile = () => {
    const router = useRouter();
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
  const handleEdit = (post) =>
  {
    router.push(`/update-prompt?id=${post._id}`)
  }
  const handleDelete = async (post) =>{
    const hasConfirmed = confirm("are you sure you want to delete it ?")
    if(hasConfirmed){
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        })
        const filteredPosts = posts.filter((mypost) => mypost._id !== post._id)
        setPosts(filteredPosts)
        console.log
      } catch (error) {
        console.log(error)
      }
    }
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