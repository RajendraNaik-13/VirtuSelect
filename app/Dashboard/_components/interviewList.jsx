"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { useUser } from '@clerk/nextjs'
import { desc, eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import InterviewItemCard from './InterviewItemCard';
import GradualSpacing from '@/components/ui/gradual-spacing';
function InterviewList() {

    const {user}=useUser();
    const [interviewList,setInterviewList]=useState([]);

    useEffect(()=>{
        user&&GetInterviewList();
    },[user])

    const GetInterviewList=async()=>{
        const result=await db.select()
        .from(MockInterview)
        .where(eq(MockInterview.createdBy,user?.primaryEmailAddress?.emailAddress))
        .orderBy(desc(MockInterview.id));

        console.log(result);
        setInterviewList(result);
    }

  return (
    <div>
    <GradualSpacing
      className="flex spitems-start justify-start items-baseline font-display text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-5xl md:leading-[6rem]"
      text="Previous Mock Interview"
    />

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 '>
            {interviewList?.length>0?interviewList.map((interview,index)=>(
                <InterviewItemCard 
                interview={interview}
                key={index} />
            ))
            :
            [1,2,3,4].map((item,index)=>(
                <div className='h-[100px] w-full bg-gray-200 animate-pulse rounded-lg '>
                </div>
            ))
        }
        </div>
    </div>
  )
}

export default InterviewList