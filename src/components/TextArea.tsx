interface AppData {
  input: string;
  handleInput: any;
  handleSubmit: any;
  handleClearText: any;
}

function TextArea({ input, handleInput, handleSubmit, handleClearText}: AppData) :JSX.Element {
  return (
    <div className="pt-20 pb-20 pl-40 pr-40 w-full">
      <div>
        <label className="text-lg">Start typing your work below and discover the number of occurences for each word:</label><br></br>
        <textarea id="text-area"
                  onChange={(e) => handleInput(e)}
                  value={input} 
                  placeholder="Start adding words to the text area and the form below will start counting them!"
                  className="mt-5 p-1 w-full border-2 h-96 rounded border-solid border-slate-400 resize-y appearence-none">
        </textarea>
      </div>
      <button onClick={(e) => handleSubmit(e)}
              className="hover:bg-blue-200 border-2 rounded border-solid border-slate-300 p-2">
              Count my words!
      </button>
      <button onClick={(e) => handleClearText(e)}
              className="hover:bg-blue-200 border-2 rounded border-solid border-slate-300 p-2 ml-2">
              Clear text
      </button>
    </div>
  )
}

export default TextArea;