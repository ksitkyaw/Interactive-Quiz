import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../app/store'

// Define a type for the slice state
interface Choice {
    id: string,
    value: string
}

interface ResultState {
        id: string,
        question: string,
        choices: Choice[],
        correct_answer: string,
        selected_answer?: string
    }

// Define the initial state using that type
// const initialState: ResultState[] = [
//  {
//         id: "Q1",
//         question: "Which planet is known as the \"Red Planet\"?",
//         choices: [
//             {
//                 "id": "Q1_C1",
//                 "value": "Mercury"
//             },
//             {
//                 "id": "Q1_C2",
//                 "value": "Venus"
//             },
//             {
//                 "id": "Q1_C3",
//                 "value": "Mars"
//             },
//             {
//                 "id": "Q1_C4",
//                 "value": "Jupiter"
//             }
//         ],
//         correct_answer: "Q1_C3",
//         selected_answer: ""
//     }

// ]

interface SelectedState {
    id: string,
    selectedChoice: string
}

const initialState: ResultState[] = []

export const resultSlice = createSlice({
  name: 'result',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    resetData: (state) => {},
    addData: (state, action: PayloadAction<ResultState>) => {
        state.push(action.payload)
    },
    addResult: (state, action: PayloadAction<SelectedState>) => {
        state.map(data => {
            if (data.id === action.payload.id) {
                data.selected_answer = action.payload.selectedChoice
            }
        })
    }
  },
})

export const {resetData, addData, addResult} = resultSlice.actions

// Other code such as selectors can use the imported `RootState` type
export const selectResult = (state: RootState) => state.result

export default resultSlice.reducer