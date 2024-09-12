"use client"
import React, { useEffect, useState } from 'react'
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import QuestionSection from './_components/QuestionSection';
import RecordAnswerSection from './_components/RecordAnswerSection';
import { Button } from '@/@/components/ui/button';
function StartInterview({params}) {
  const [interviewData,setInterviewData]=useState();
  const [mockInterviewQuestion,setMockInterviewQuestion]=useState();
  const [activeQuestionIndex,setActiveQuestionIndex]=useState(0);
  var mock ;
  useEffect(()=>{
    GetInterviewDetails();
  },[]);
  const GetInterviewDetails=async ()=>{
    const result=await db.select().from(MockInterview)
    .where(eq(MockInterview.mockId, params.interviewId))
    const jsonMockResp=JSON.parse(result[0].jsonMockResp);
    console.log("no:",jsonMockResp)
    setMockInterviewQuestion(jsonMockResp);
    setInterviewData(result[0]);
    mock=result[0].mockId;
    
};
console.log(interviewData?.mockId);
  return (
    <div>
      <div className='grid grid-col-1 md:grid-cols-2 gap-10'>
        <QuestionSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex}></QuestionSection>
        <RecordAnswerSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} interviewData={interviewData}></RecordAnswerSection>
      </div>
      <div className='flex justify-end gap-8'>
        {activeQuestionIndex>0 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex-1)} >Previous Question</Button>}
        {activeQuestionIndex!=mockInterviewQuestion?.length-1 && <Button onClick={()=>setActiveQuestionIndex(activeQuestionIndex+1)}>Next Question</Button>}
        {activeQuestionIndex==mockInterviewQuestion?.length-1 && <Button> End Interview</Button>}
      </div>
    </div>
  )
}

export default StartInterview