import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React from 'react'

function InterviewItemCard({interview}) {
    const router=useRouter()
    const onStart=()=>{
        router.push('/Dashboard/interview/'+interview?.mockId)
    }
    const onFeedback=()=>{
        router.push('/Dashboard/interview/'+interview?.mockId+'/feedback')
    }
  return (
    <div className='border shadow-sm rounded-lg p-3'>
        <h2 className='font-bold text-purple-300'>{interview?.jobPosition}</h2>
        <h2 className='text-sm text-gray-600'>{interview?.jobExperience} Years of Expirence</h2>
        <h2 className='text-sm text-gray-400'>Created At{interview?.createdAt}</h2>
        <div className='flex justify-between mt-2'>
            
            <Button size="sm" variant="outline" className='w-full'
            onClick={onFeedback}
            >Feedback</Button>
            <Button size="sm" className='w-full'
            onClick={onStart}
            >Start</Button>
        </div>
    </div>
  )
}

export default InterviewItemCard