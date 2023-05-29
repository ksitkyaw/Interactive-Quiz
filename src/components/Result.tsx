import React, { useRef, RefObject } from 'react'
import { useAppSelector } from '../redux/app/hooks'
import domtoimage from 'dom-to-image'
import FileSaver from 'file-saver'

export default function Result() {
    const result = useAppSelector(state => state.result)
    const score = useAppSelector(state => state.score.value)
    const myRef = useRef<HTMLDivElement>(null);
    const downloadImage = async () => {
    
      domtoimage.toBlob(myRef.current as Node)
    .then(function (blob) {
        FileSaver.saveAs(blob, 'my-node.png');
    })
      .catch(function (error) {
        console.error('Error generating image:', error);
      });
    }

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
      <div ref={myRef}>
        <h1>Congratulations, your total score is {score} points</h1>
        <ul>
        {result.map(res => {
          return (
            <li className="my-3" key={res.id}>
              <h3>{res.question}</h3>
              <p>Your answer was {res.correct_answer === res.selected_answer ? "correct" : "incorrect"}</p>
              <p>The correct answer is {res.choices.filter(choice => choice.id === res.correct_answer)[0].value}</p>
            </li>
          )
        })}
        </ul>
      </div>
      <button
        className={`bg-blue-500 text-white px-4 py-2 rounded`}
        onClick={downloadImage}
      >
        Download Result
      </button> 
    </>
  )
}
