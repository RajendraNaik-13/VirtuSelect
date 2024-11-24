"use client"
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { chatSession } from '@/utils/AIGemini'
import { LoaderCircle } from 'lucide-react'
import { MockInterview } from '@/utils/schema'
import { useUser} from '@clerk/nextjs'
import moment from 'moment';
import { db } from '@/utils/db';
import { useRouter } from 'next/navigation';

  

function AddNewInterview() {
    const [openDailog,setOPenDailog]=useState(false);
    const [jobPoition,setJobPosition]=useState();
    const [jobDesc,setJobDesc]=useState();
    const [jobExpirence,setJobExpirence]=useState();
    const [loading,setLoading]=useState(false);
    const [JsonResponse,setJsonResponse]=useState([]);
    const { user }=useUser();
    const router=useRouter()
    const onSubmit=async(e)=>{
        setLoading(true)
        e.preventDefault()
        console.log(jobPoition,jobDesc,jobExpirence)
        const InputPrompt="generate 5 question in jason format"
        const result=await chatSession.sendMessage(InputPrompt);
        const MockJsonResp=(result.response.text()).replace('```json','').replace('```','')
        console.log(JSON.parse(MockJsonResp));
        setJsonResponse(MockJsonResp);
        if(result){
            const resp= await db.insert(MockInterview)
            .values({
                mockId:uuidv4(),
                jsonMockResp:MockJsonResp,
                jobPosition:jobPoition,
                jobExperience:jobExpirence,
                jobDesc:jobDesc,
                createdBy:user?.primaryEmailAddress?.emailAddress,
                createdAt:moment().format('DD-MM-yyyy')
            }).returning({mockId:MockInterview.mockId});
            console.log("inserted id",resp )
            if(resp){
                setOPenDailog(false);
                router.push('/Dashboard/interview/'+resp[0]?.mockId)

            }

        }else{
        console.log("error")
    }
        setLoading(false);
    }

  return (
    <div>
        <div className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'
        onClick={()=>setOPenDailog(true)}>
            <h2 className='font-bold text-lg text-center'>+ Add New</h2>
        </div>
        <Dialog open={openDailog}> 
        
        <DialogContent className="max-w-xl">
            <DialogHeader>
            <DialogTitle className="text-2xl"> Tell Us More About Interview</DialogTitle>
            <DialogDescription>
                <form onSubmit={onSubmit}>
                <div>
                    
                    <h2>Add details About Job postion/role,Job description and years of expirence</h2>
                    <div className='mt-7 my-3'>
                        <label>Job Role/Position</label>
                        <Input placeholder="Ex:Scientist" required
                        onChange={(event)=>setJobPosition(event.target.value)}/>
                    </div>
                    <div className='my-3'>
                        <label>Job Description</label>
                        <Textarea placeholder="Ex:Project Manager" required
                        onChange={(event)=>setJobDesc(event.target.value)}/>
                       
                    </div>
                    <div className='my-3'>
                        <label>Years of Expirence</label>
                        <Input placeholder="Ex:5" type="number" required 
                        onChange={(event)=>setJobExpirence(event.target.value)}/>

                    </div>
                </div>

                
                <div className='flex gap-5 justify-end'>
                    <Button varient="ghost" type="button" onClick={()=>setOPenDailog(false)}>Cancel</Button>
                    <Button type="submit" disabled={loading} >
                        {loading?<>
                        <LoaderCircle className='animate-spin'/> 'Genreating Questions'
                        </>:'start interview'
                    }
                        </Button>
                </div>
                </form>
                
            </DialogDescription>
            </DialogHeader>
        </DialogContent>
        </Dialog>

    </div>
  )
}

export default AddNewInterview