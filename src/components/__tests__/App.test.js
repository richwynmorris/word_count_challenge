import { fireEvent, render, screen, cleanup } from "@testing-library/react";
import App from "../../App"

const setup = () => render(<App />)

afterEach(cleanup)

describe('TextArea Component Tests', () => {
  test('Check that text area contains placeholder text', () => {
    setup()
    const textArea = document.getElementById('text-area').placeholder

    expect(textArea).toEqual("Start adding words to the text area and the form below will start counting them!")
  })
  
  test('Check alert is raised if the button is clicked with no text area input', () => {
    setup()
    const button = screen.getByRole('button', {name: "Count my words!"})
    global.alert = jest.fn()
    fireEvent.click(button)

    expect(global.alert).toHaveBeenCalledTimes(1)
  })
  
  test('Check alert is raised if text area is only white space', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: '    '}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    global.alert = jest.fn()
    fireEvent.click(button)

    expect(global.alert).toHaveBeenCalledTimes(1)
  })
  
  test('Check alert is raised if text area contains only punctuation', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: '././?£2!'}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    global.alert = jest.fn()
    fireEvent.click(button)

    expect(global.alert).toHaveBeenCalledTimes(1)
  })
  
  test('Check text area is cleared when clear button is clicked', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: 'This is a test'}})

    const submitButton = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(submitButton)

    const clearButton = screen.getByRole('button', {name: "Clear text"})
    fireEvent.click(clearButton)

    expect(textArea.value).toEqual("")
  })
})


describe('Result Component Tests', () => {
  test('check punctuation is removed from original text', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: 'penguin!*&^'}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(button)

    expect(screen.getByText('penguin')).toBeInTheDocument()
  })

  test('check capitalized words are considered the same as lowercase', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: 'penguin Penguin pEnGuiN'}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(button)

    const cell = document.getElementById("cell-2-0").children[0]
    expect(cell.innerHTML).toEqual('3')
  })

  test('check words returned do not contain whitespace', () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value: 'this This   '}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(button)

    const cell = document.getElementById("cell-1-0").children[0]
    expect(cell.innerHTML).toEqual('this')
  })

  test('check words are sorted alphabetically on sort click', async () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value:'Charlie Alpha Beta'}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(button)

    const sortableButton = document.querySelector('[role="columnheader"]')
    fireEvent.click(sortableButton)

    const cell = document.getElementById("row-1").children[0].children[0]
    expect(cell.innerHTML).toEqual('alpha')
  })

  test('check words are sorted by highest occurence on sort click', async () => {
    setup()
    let textArea = document.getElementById('text-area')
    fireEvent.change(textArea,{ target: {value:'Charlie alpha Alpha'}})

    const button = screen.getByRole('button', {name: "Count my words!"})
    fireEvent.click(button)

    const sortableButton = document.querySelector('[data-sort-id="2"]')
    fireEvent.click(sortableButton)

    const cell = document.getElementById("row-1").children[1].children[0]
    expect(cell.innerHTML).toEqual('2')
  })
})
