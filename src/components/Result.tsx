import React, { useRef, useState } from 'react'
import { useAppSelector } from '../redux/app/hooks'
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'
import { useNavigate } from 'react-router-dom'
import Finish from './Finish'

export default function Result() {
    const [name, setName] = useState('')
    const result = useAppSelector(state => state.result)
    const navigate = useNavigate()
    const myRef = useRef<HTMLDivElement>(null);
    const ansRef = useRef<HTMLDivElement>(null);
    console.log(result)
    const downloadImage = async (nodeRef : Node) => {
    
      domtoimage.toBlob(nodeRef as Node)
    .then(function (blob) {
        FileSaver.saveAs(blob, 'my-node.png');
    })
      .catch(function (error) {
        console.error('Error generating image:', error);
      });
    }


  return (
    <>
      <div className="w-full bg-slate-500 flex flex-col justify-center items-center">
        <div className="lg:w-[80%] w-full bg-slate-100 flex flex-col justify-center items-center relative">
        <button
            className={`bg-slate-600 text-blue-300 0 px-4 py-2 rounded m-3 absolute left-2 top-2 lg:block hidden`}
            onClick={() => {navigate('/quiz')}}
          >
            Go Back
          </button>
          <h1 className="sm:text-2xl text-xl text-center mb-5">Enter Your Name for a more personalized result</h1>
            <input 
            value={name}
            className="p-2  rounded-full border-slate-500 mb-3"
            type="text"
            placeholder="Enter Your Name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
            >

            </input>
          
          <div  ref={myRef} className="mb-5 lg:w-3/4 w-full flex flex-col justify-center items-center">
            <Finish name={name}/>
          </div>
          <button
              className={`bg-slate-600 text-blue-300 px-4 py-2 rounded mr-7 mt-2`}
              onClick={() => downloadImage(myRef.current as Node)}
            >
              Download Result
            </button>
          <div ref={ansRef} className="lg:w-3/4 w-full bg-[#AEE2FF] p-3 mb-3">
            <p>Name - {name}</p>
            <ul className="my-2">
            {result.map((res, index )=> {
              return (
                <li key={res.id} className="flex lg:flex-row flex-col justify-start items-center mx-7">
                  <h1 className="text-3xl mr-10">Question- {index + 1} </h1>
                  <div className="my-6 bg-slate-400 border rounded-2xl shadow p-7 lg:w-[60%] w-full">
                    <h3>{res.question}</h3>
                    <p>Your answer was {res.correct_answer === res.selected_answer ? "correct" : "incorrect"}</p>
                    <p>The correct answer is {res.choices.filter(choice => choice.id === res.correct_answer)[0].value}</p>
                  </div>

                </li>
              )
            })}
            </ul>
          </div>
          <button
            className={`bg-slate-600 text-blue-300 px-4 py-2 rounded`}
            onClick={() => downloadImage(ansRef.current as Node)}
          >
            Download Answer
          </button> 
        </div>
        
      </div>
       
      
    </>
  )
}
