"use client"
import { db } from '@/utils/db'
import { UserAnswer } from '@/utils/schema'
import { eq } from 'drizzle-orm'
import React, { useEffect, useState } from 'react'
import {
    Collapsible,
    CollapsibleContent,
    CollapsibleTrigger,
  } from "@/components/ui/collapsible"
import { ChevronsUpDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'


function Feedback({params}) {

    const [feedbackList,setFeedbackList]=useState([]);
    const router=useRouter();
    console.log(params)
    
    useEffect(()=>{
        GetFeedback();
    },[])
    const GetFeedback=async()=>{
        const result=await db.select()
        .from(UserAnswer)
        .where(eq(UserAnswer.mockIdRef,params.interviewId))
        .orderBy(UserAnswer.id)
    
        setFeedbackList(result);
    }

  return (
    <div className=' p-10'>
        
        {feedbackList?.length==0?
        <h2 className='font-bold text-xl text-gray-500'>No Interview Feedback Record Found</h2>  
          :
        <>
       <h2 className='text-3xl font-bold text-green-500'>Congratulation!</h2>
        <h2 className='font-bold text-2xl'>Here is your interview feedback</h2>
       
        {/* <h2 className='text-primary text-lg my-3'>Your overall interview rating: <strong>7/10</strong></h2> */}
   
        <h2 className='text-sm text-gray-500'>Find below interview question with correct answer, Your answer and feedback for improvement</h2>
        {feedbackList&&feedbackList.map((item,index)=>(
            <Collapsible key={index} className='mt-7'>
            <CollapsibleTrigger className='p-2
             bg-secondary rounded-lg flex justify-between
            my-2 text-left gap-7 w-full'>
            Question {index + 1} : {item.question} <ChevronsUpDown className='h-5 w-5'/>
            </CollapsibleTrigger>
            <CollapsibleContent>
            <div className='flex flex-col gap-2'>
                <h2 className='text-white p-2 border rounded-lg'><strong>Rating:</strong>{item.rating}</h2>
                <div className='grid grid-cols-2 gap-4'>
                    <h2 className='p-2 border rounded-lg  text-sm text-red-600'>
                        <strong>Your Answer: </strong>{item.userAns}
                    </h2>
                    <h2 className='p-2 border rounded-lg  text-sm text-green-500'>
                        <strong>Correct Answer: </strong>{item.correctAns}
                    </h2>
                </div>
                <h2 className='p-2 border rounded-lg  text-sm text-white'>
                    <strong>Feedback: </strong>{item.feedback}
                </h2>
            </div>
            </CollapsibleContent>
            </Collapsible>
        ))}
 
  </>}
        
        <Button onClick={()=>router.replace('/Dashboard')} className="flex justify-center items-center mt-6 px-8">Go Home</Button>
    </div>
  )
}

export default Feedback