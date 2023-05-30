import React, {useEffect} from 'react'
import { motion } from 'framer-motion'
import { Howl } from 'howler'

export default function Completion() {

    useEffect(() => {
        const cheerSound = new Howl({
            src: ["cheer.wav"]
        })
        const cheer = setTimeout(() => {
            cheerSound.play()
            console.log('hello')
        }, 1000)
        return () => {
            clearTimeout(cheer)
            cheerSound.stop()
            cheerSound.unload()
        }
    }, [])
    
  return (
    <div className="flex flex-col justify-center items-center">
        <motion.img
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 2}}
        className="w-36"
        src="https://i.pinimg.com/originals/4a/b2/28/4ab228563a0ee29d507ea5919e88f303.gif" 
        alt="gif"
        />
        <motion.p
        initial={{opacity: 0, scale: 0.1}}
        animate={{opacity: 1, scale: 1}}
        transition={{delay: 1}}
        className="text-lg text-slate-500 text-center mt-5"
        >
            Well done, this is the end of the quiz.
            Now let's take some time to check your scores and share it with others
         </motion.p>
    </div>
  )
}
