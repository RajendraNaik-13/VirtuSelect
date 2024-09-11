"use client"
import React, { useEffect,useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/AIGemini'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'

function RecordAnswerSection(interviewData,mockInterviewQuestion,activeQuestionIndex) {
 const {user} = useUser();
  const [userAnswer,setUserAnswer]=useState('');
  const [loading,setLoading]=useState(false);
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false
  });
  useEffect(()=>{
    results.map((results)=>(
      setUserAnswer(prevAns=>prevAns+results?.transcript)
    ))
  },[results])
  useEffect(()=>{
    if(!isRecording && userAnswer.length>10){
      UpdateUserAnswer();
    }
  },[userAnswer])
  const StartStopRecording=async ()=>{
    if(isRecording){
      
      stopSpeechToText()
      
    
      
    }else{
      startSpeechToText()
    }
  }
  const UpdateUserAnswer=async()=>{
    setLoading(true)
    const feedbackPrompt="Question:"+mockInterviewQuestion[activeQuestionIndex]?.question+"User answer:"+userAnswer+",please give the rating and feedback for further improvement 3 to 4 lines"
      const result = await chatSession.sendMessage(feedbackPromt);
      const mockJsonResp = ( result.response.text()).replace('```json','').replace('```','')
      const JsonFeedbackResp=JSON.parse(mockJsonResp);
      const resp = await db.insert(UserAnswer).values({
        mockIdRef:interviewData?.mockId,
        question:mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns:mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns:userAnswer,
        feedback:JsonFeedbackResp?.feedback,
        rating:JsonFeedbackResp?.rating,
        userEmail:user?.primaryEmailAddress?.emailAddress,
        createdAt:moment().format('DD-MM-yyyy')
      })
      if(resp){
        toast('user answer is recorded successfully!')
      }
      setUserAnswer('');
      setLoading(false);
  }
  return (
    <div className='flex item-center justify-center flex-col'>
      <div className='flex flex-col my-2 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/ad.png'} width={200} height={200} className='absolute' />
        <Webcam style={{
          height:300,
          width:'100%',
          zIndex:10,
        }}/>
      </div>
      <Button
       disabled={loading} 
       variant ="outline" className="my-10"
      onClick={StartStopRecording}>
        {isRecording?
        <h2 className='text-red-500 flex gap-2'>
          <Mic/>'Stop Recording'
        </h2>:'Record Answer'}</Button>
        
      
    </div>

  )
}

export default RecordAnswerSection