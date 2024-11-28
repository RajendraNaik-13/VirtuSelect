import { Button } from "@/components/ui/button";

import { AtomIcon, Edit, Share2 } from "lucide-react";

export default function Background() {
  return (
    <div>
      
     
<section className="py-8 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-12">
<h2 className="font-bold text-3xl">How it Works?</h2>
<h2 className="text-md text-gray-500">Give interview in just 3 simple easy steps</h2>

<div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      <a
        className="block rounded-xl border bg-white
         border-gray-200 p-8 shadow-xl transition
         hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
       <AtomIcon className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Create Your Interview</h2>

        <p className="mt-1 text-sm text-gray-600">
        Login with your Email account and click on "Add New" in the dashboard to start. Fill the required details like the job role, description, and years of experience to tailor your mock interview.
        </p>
      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
      <Edit className='h-8 w-8'/>

        <h2 className="mt-4 text-xl font-bold text-black">Prepare & Record Answers </h2>

        <p className="mt-1 text-sm text-gray-600">
        Allow camera and microphone access, then begin the interview. Answer the AI-generated questions using the "Record Answer" button for each question. Complete five questions to simulate a real interview experience.
        </p>
      </a>

      <a
        className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
        href="#"
      >
        
      <Share2 className='h-8 w-8' />

        <h2 className="flex mt-4 text-xl font-bold text-black">Submit & Get Feedback </h2>

        <p className="mt-1 text-sm text-gray-600">
        End the interview by pressing "End Interview". Instantly receive a detailed performance rating and constructive feedback to improve your skills.
        </p>
      </a>

    
    </div>

    <div className="mt-12 text-center">
      <a
        href="/sign-in"
        className="inline-block rounded bg-pink-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-pink-700 focus:outline-none focus:ring focus:ring-yellow-400"
      >
        Sign-In
      </a>
    </div>
    </section>
  </div>
 

  );
}
