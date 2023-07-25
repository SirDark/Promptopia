'use client';

import React, { useEffect } from "react";

import { useSession } from "next-auth/react";
import { useRouter,useSearchParams } from "next/navigation";
import { useState } from "react";

import Form  from '@components/Form'
import { analyticsId } from "@next.config";

function EditPrompt() {
    const router = useRouter();
    const {data: session} = useSession();
    const [submitting, setSubmitting] = useState(false);
    const [post, setPost] = useState({
        prompt: '',
        tag: '',
    });
    const searchParams = useSearchParams()
    const promptID = searchParams.get('id')
    console.log(promptID)
    useEffect(() => {
        const getPromptDetails = async () => {
            const response = await fetch(`/api/prompt/${promptID}`)
            const data = await response.json()

            setPost({
                prompt: data.prompt,
                tag: data.tag
            })
        }
        if(promptID) getPromptDetails()
    }, [promptID])

    const editPromptf = async (e) => {
        console.log("called")
        e.preventDefault()
        if(!promptID) return alert('Prompt ID not found')
        try {
            const response = await fetch(`/api/prompt/${promptID}`,
            {
                method: 'PATCH',
                body: JSON.stringify({
                    prompt: post.prompt,
                    userId: session?.user.id,
                    tag: post.tag
                })
            })
            
            if(response.ok){
                router.push('/');
            }
        } catch (error) {
            
        }
    }
  return (
    <Form
        type="Edit"
        post={post}
        setPost={setPost}
        submitting={submitting}
        handleSubmit={editPromptf}
    />
  )
}

export default EditPrompt