"use client"
import { UserButton } from '@clerk/nextjs'
import React from 'react'
import AddNewInterview from './_components/AddNewInterview'
import InterviewList from './_components/interviewList'
import GradualSpacing from '@/components/ui/gradual-spacing'
function Dashboard() {
  return (
  
    <div className='p-10 '>
        <GradualSpacing
      className="flex items-start justify-start font-display text-4xl font-bold -tracking-widest  text-black dark:text-white md:text-7xl md:leading-[5rem]"
      text="Dashboard"
    />
        <h2 className='text-gray-500'>Create and Start your AI Mockup Interview</h2>

        <div className='grid grid-cols-1 md:grid-cols-3 my-5 gap-5'>
          <AddNewInterview/>
        </div>

        <div className='hidden sm:block'>
          <InterviewList/>
        </div>
        
        

  </div>
    
    
    
  )
}

export default Dashboard
