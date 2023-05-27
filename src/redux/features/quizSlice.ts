import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface QuizState {
    value: {
        currentQuizID: number,
        selectedChoice: string,
        endOfQuiz: boolean,
    }
    
}

// Define the initial state using that type
const initialState: QuizState = {
    value: {
        currentQuizID: 0,
        selectedChoice: '',
        endOfQuiz: false,
    }
  
}

export const quizSlice = createSlice({
  name: 'quiz',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    quizIDIncrement: (state) => {
      state.value.currentQuizID += 1
    },
    quizIDDecrement: (state) => {
      state.value.currentQuizID -= 1
    },
    quizIDReset: (state) => {
        state.value.currentQuizID = 0
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setSelectedChoice: (state, action: PayloadAction<string>) => {
      state.value.selectedChoice = action.payload
    },
    setEndOfQuiz: (state, action: PayloadAction<boolean>) => {
        state.value.endOfQuiz = action.payload
    }
  },
})

export const { quizIDIncrement, quizIDDecrement, quizIDReset, setSelectedChoice, setEndOfQuiz } = quizSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectQuiz = (state: RootState) => state.quiz.value

export default quizSlice.reducer