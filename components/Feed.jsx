'use client'

import React from 'react'
import { useState, useEffect } from 'react'

import PromptCard from './PromptCard'

const PromptCardList = ({data, handleTagClick}) => {
  return (
    <div className='mt-16 prompt_layout'>
      {data.map((post) =>(
        <PromptCard 
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
      
    </div>
  )
}

const Feed = () => {
  //const [searchText, setSearchText] = useState('')
  const [posts, setPosts] = useState([])
  const [allPosts, setAllPosts] = useState([])
  const handleSearchChange = (e) => {
    if(e.target.value === '') {
      setPosts(allPosts)
      return
    }
    const filteredposts = allPosts.filter((post) => 
      post.prompt.includes(e.target.value) || post.tag.includes(e.target.value)
    )
    setPosts(filteredposts)
  }
  
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt')
      const data = await response.json();
      setPosts(data)
      setAllPosts(data)
    }

    fetchPosts()
  }, [])
  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username'
          //value={searchText.name}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      <PromptCardList
        data={posts}
        handleTagClick={() => {}}
      />
    </section>
  )
}

export default Feed