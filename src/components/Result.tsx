import React, { useRef, useState } from 'react'
import { useAppSelector } from '../redux/app/hooks'
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'
import { useNavigate } from 'react-router-dom'
import Finish from './Finish'

export default function Result() {
    const [name, setName] = useState('')
    const result = useAppSelector(state => state.result)
    const score = useAppSelector(state => state.score.value)
    const navigate = useNavigate()
    const myRef = useRef<HTMLDivElement>(null);
    const ansRef = useRef<HTMLDivElement>(null);
    // const inputRef = useRef<HTMLInputElement>()
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

    // const handleSubmit = (e : React.SyntheticEvent) => {
    //   e.preventDefault();
    //   setName(inputRef.current?.value)
    // }

    //   try {
    //     const dataUrl = await domtoimage.toPng(resultRef.current);
    //     const link = document.createElement('a');
    //     link.href = dataUrl;
    //     link.download = 'image.png'; // Set the desired file name
    //     link.click();
    //   } catch (error) {
    //     console.error('Error generating image:', error);
    //   } finally {
    //     // Reset the CSS filter after generating the image
    //     resultRef.current.style.filter = 'none';
    //   }
    // };

  return (
    <>
      <div className="w-full bg-slate-500 flex flex-col justify-center items-center">
        <div className="w-[80%] bg-slate-100 flex flex-col justify-center items-center relative">
        <button
            className={`bg-slate-600 text-blue-300 0 px-4 py-2 rounded m-3 absolute left-2 top-2`}
            onClick={() => {navigate('/quiz')}}
          >
            Go Back
          </button>
          <h1 className="text-2xl text-center mb-5">Enter Your Name for a more personalized result</h1>
          {/* <form onSubmit={(e : React.SyntheticEvent) => handleSubmit(e)}> */}
            <input 
            value={name}
            className="p-2  rounded-full border-slate-500 mb-3"
            type="text"
            placeholder="Enter Your Name"
            onChange={(e: React.FormEvent<HTMLInputElement>) => setName(e.currentTarget.value)}
            >

            </input>
            {/* <input type="submit" className="p-2 rounded-full bg-blue-300" value="Submit"/> */}
          {/* </form> */}
          
          <div  ref={myRef} className="mb-5 w-3/4 flex flex-col justify-center items-center">
            <Finish name={name}/>
            <button
              className={`bg-slate-600 text-blue-300 px-4 py-2 rounded mr-7 mt-2`}
              onClick={() => downloadImage(myRef.current as Node)}
            >
              Download Result
            </button>
          </div>
          <div ref={ansRef} className="w-3/4 bg-[#AEE2FF] p-3 mb-3">
            <p>Name - {name}</p>
            <ul className="flex flex-wrap gap-3 justify-around items-center my-2">
            {result.map((res, index )=> {
              return (
                <li key={res.id} className="flex justify-start items-center mx-7">
                  <h1 className="text-3xl mr-10">Question- {index + 1} </h1>
                  <div className="my-6 bg-slate-400 border rounded-2xl shadow p-7 w-[60%]">
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
