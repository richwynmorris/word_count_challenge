import React, { useState } from "react"
import TextArea from "./components/TextArea";
import Results from "./components/Results";
import Header from "./components/Header";

interface WordData {
  id: number,
  word: string,
  frequency: number
}

interface TrackerInterface {
  [key: string]: WordData
}

function App() {
  const [ input, setInput ] = useState<string>("")
  const [ data, setData ] = useState<WordData[]>([])

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setInput(e.target.value)
  }

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    let result: string = input.replace(/[^A-Za-z\s]/g, " ")

    if (result === "" ||
        result.split("").every((letter: string) => letter === " " || letter === '\n')) {
        setInput("")  
        alert("You need to add some words before you can count them!")
    }

    let words: string[] = result.toLowerCase().split(/\s/g).filter(Boolean)
    let idCounter: number = 0
    let tracker: TrackerInterface = {}

    words.forEach((word: string) => {
      if (!tracker[word]) {
        const data: WordData = {
          "id": idCounter,
          "word": word,
          "frequency": 1
        }
        tracker[word] = data
        idCounter += 1
      } else {
        tracker[word].frequency += 1 
      }
    })
    setData(Object.values(tracker))
  }

  const handleClearText = (e: any) => {
    e.preventDefault()
    setInput("")
    setData([])
  }

  return (
    <div className="grid justify-items-center max-w-screen-xl">
        <Header/>
        <TextArea 
          input={input} 
          handleInput={handleInput} 
          handleSubmit={handleSubmit}
          handleClearText={handleClearText}
        />
        <Results 
          data={data}
        />
    </div>
  );
}

export default App;
