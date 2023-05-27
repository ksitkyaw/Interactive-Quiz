import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface ScoreState {
    value: number
}

// Define the initial state using that type
const initialState: ScoreState = {
    value: 0
}

export const scoreSlice = createSlice({
  name: 'score',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    scoreIncrement: (state) => {
      state.value += 1
    },
    scoreDecrement: (state) => {
      state.value -= 1
    },
    scoreReset: (state) => {
        state.value = 0
    }
  },
})

export const {scoreIncrement,scoreDecrement,scoreReset} = scoreSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectScore = (state: RootState) => state.score.value

export default scoreSlice.reducer