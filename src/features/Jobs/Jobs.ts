import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState = {
    jobs: [],
    finishedJobs: [] as number[], // Agrega esta propiedad para almacenar los trabajos finalizados
};
export const jobsSlice = createSlice({
    name: 'jobs',
    initialState,
    reducers: {
        addFinishedJob: (state, action: PayloadAction<number>) => {
            console.log(action.payload);
            state.finishedJobs.push(action.payload);
        },
    },
});
// Action creators are generated for each case reducer function
export const { addFinishedJob } = jobsSlice.actions

export default jobsSlice.reducer;