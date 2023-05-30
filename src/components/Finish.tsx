import React from 'react'
import { useAppSelector } from '../redux/app/hooks'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import "react-circular-progressbar/dist/styles.css";

interface Props {
    name: string
}

export default function Finish({name}: Props) {
    const result = useAppSelector(state => state.result)
    const score = useAppSelector(state => state.score.value)
  return (
    <div className="bg-slate-400 border rounded-lg m-auto p-5">
        <p className="text-lg text-center">Congratulations, {name.length !== 0 ? `${name}!!!` : ''} you have completed all the questions of the interactive quiz!</p>
        <p className="text-lg text-center">Your total score is </p> 
        <p className='text-center'><span className='text-3xl'>{score}</span> out of {result.length}!!!</p>
        <div className="flex justify-center items-center">
            <div className="mr-7 flex justify-center items center">
                <div className="w-24 m-3 flex flex-col justify-center items-center">
                    <CircularProgressbar
                        value={5}
                        strokeWidth={50}
                        styles={buildStyles({
                        strokeLinecap: "butt"
                        })}
                    />
                </div>
                <h3 className="text-lg">Your score is in top 5%!</h3>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className="w-24 m-3">
                <CircularProgressbar
                    value={score/result.length * 100}
                    text={`${score/result.length * 100}%`}
                    background
                    backgroundPadding={6}
                    styles={buildStyles({
                    backgroundColor: "#3e98c7",
                    textColor: "#fff",
                    pathColor: "#fff",
                    trailColor: "transparent"
                    })}
                />
                </div>
                <h3 className="text-lg">You guess {score/result.length * 100} percent of the questions right!</h3>
            </div>
            
        </div>
    </div>
  )
}
