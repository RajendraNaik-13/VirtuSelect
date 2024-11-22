"use client"
import React, { useEffect } from 'react'
import { MockInterview } from '@/utils/schema'
import { db } from '@/utils/db'
import { eq } from 'drizzle-orm'
import { useState } from 'react'
import Webcam from 'react-webcam' 
import { WebcamIcon } from 'lucide-react'      
import { Button } from '@/components/ui/button'
import { Lightbulb } from 'lucide-react'
import  Link  from 'next/link'
function interview({params}) {
    const [interviewData,setInterviewData]=useState();
    const [webCamEnabled,setWebCamEnabled]=useState(false);

    useEffect(()=>{
        console.log(params.interviewId)
        GetInterviewDetails();
    },[]);

    const GetInterviewDetails=async ()=>{
        const result=await db.select().from(MockInterview)
        .where(eq(MockInterview.mockId, params.interviewId))
        setInterviewData(result[0]);
    };
    
  return (
    <div className='my-10'>
        <h2 className='font-bold text-2xl'>Let's get started</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
          <div className='flex flex-col my-5 gap-5 '>
          <div className='flex flex-col  gap-5 p-5 rounded-lg border'>
          <h2 className='text-lg'><strong>job position:</strong>{interviewData ? interviewData.jobPosition : "Loading"}</h2>
          <h2 className='text-lg'><strong>job discription:</strong>{interviewData ? interviewData.jobDesc : "Loading"}</h2>
          <h2 className='text-lg'><strong>job Experience:</strong>{interviewData ? interviewData.jobExperience : "Loading"}</h2>
        </div>
        <div className='p-5 border-yellow-200 bg-yellow-200 rounded-lg'>
        <h2 className='flex gap-2 items-center'><Lightbulb /><strong>Information</strong></h2>
        <h2>{process.env.NEXT_PUBLIC_INFORMATION}</h2>
        </div>
        </div>
        <div>
            {webCamEnabled? <Webcam
            onUserMedia={()=>setWebCamEnabled(true)}
            onUserMediaError={()=>setWebCamEnabled(false)}
            mirrored={false}
             style={{
                height:300,
                width:300
             }}
            />
            
            :
            <>
            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border'/>
            <Button variant="" className=' ' onClick={()=>setWebCamEnabled(true)}>Enable Cam and Microphone</Button>
            </>
            }
        </div>
        </div>
        
        <div className='flex flex-col my-5'>
         </div>
         <div className='flex justify-end items-end'>
       <Link href={'/Dashboard/interview/'+params.interviewId+'/start'}><Button>Start Interview</Button></Link>
       </div>  
    </div>
  )
}

export default interview