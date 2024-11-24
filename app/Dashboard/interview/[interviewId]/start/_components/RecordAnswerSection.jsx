
"use client"
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import useSpeechToText from 'react-hook-speech-to-text'
import { Mic } from 'lucide-react'
import { toast } from 'sonner'
import { chatSession } from '@/utils/AIGemini'
import { UserAnswer } from '@/utils/schema'
import { useUser } from '@clerk/nextjs'
import { db } from '@/utils/db'
import moment from 'moment'

function RecordAnswerSection({ mockInterviewQuestion, activeQuestionIndex, interviewData }) {
  const { user } = useUser();
  const [userAnswer, setUserAnswer] = useState('');
  const [loading, setLoading] = useState(false);
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

  useEffect(() => {
    if (results.length > 0) {
      setUserAnswer(prev => prev + results[results.length - 1]?.transcript);
    }
  }, [results]);

  useEffect(() => {
    if (!isRecording && userAnswer.length > 10) {
      UpdateUserAnswer();
    }
  }, [isRecording, userAnswer]);

  const StartStopRecording = async () => {
    if (isRecording) {
      stopSpeechToText();
    } else {
      startSpeechToText();
    }
  }

  const UpdateUserAnswer = async () => {
    if (!interviewData || !interviewData.mockId) {
      console.error('Interview data or mockId is not available');
      toast.error('Unable to save answer. Interview data is missing.');
      return;
    }

    setLoading(true);
    try {
      const feedbackPrompt = `Question: ${mockInterviewQuestion[activeQuestionIndex]?.question}\nUser answer: ${userAnswer}\nDepending on question and useranswer of interview question, please give the rating out of 10 and feedback for further improvement 3 to 4 lines in json format`;
      const result = await chatSession.sendMessage(feedbackPrompt);
      const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '');
      const JsonFeedbackResp = JSON.parse(mockJsonResp);

      const resp = await db.insert(UserAnswer).values({
        mockIdRef: interviewData.mockId,
        question: mockInterviewQuestion[activeQuestionIndex]?.question,
        correctAns: mockInterviewQuestion[activeQuestionIndex]?.answer,
        userAns: userAnswer,
        feedback: JsonFeedbackResp?.feedback,
        rating: JsonFeedbackResp?.rating,
        userEmail: user?.primaryEmailAddress?.emailAddress,
        createdAt: moment().format('YYYY-MM-DD')
      });

      if (resp) {
        toast.success('User answer is recorded successfully!');
      }
      setUserAnswer('');
    } catch (error) {
      console.error('Error updating user answer:', error);
      toast.error('Failed to save answer. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex item-center justify-center flex-col items-center'>
      <div className='flex flex-col my-2 justify-center items-center bg-black rounded-lg p-5'>
        <Image src={'/ad.png'} width={200} height={200} className='absolute' alt="Advertisement" />
        <Webcam style={{
          height: 300,
          width: '100%',
          zIndex: 10,
        }} />
      </div>
      <Button
        disabled={loading}
        variant="outline"
        className="my-10"
        onClick={StartStopRecording}
      >
        {isRecording ?
          <h2 className='text-red-500 flex gap-2'>
            <Mic />Stop Recording
          </h2> : 'Record Answer'}
      </Button>
    </div>
  )
}

export default RecordAnswerSection
