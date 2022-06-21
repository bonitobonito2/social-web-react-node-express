import {createSlice,configureStore} from '@reduxjs/toolkit'

const initialState = {
    person : {
        firstname: '',
        lastname: '',
        nickname : '',
        email : '',
        password : '',
        potourl : ''
    },

    isLoggined : 0,
    background  : ''
}

const storeManipulation = createSlice({
    name : 'information',
    initialState,
    reducers: ({
        loggined(state) {
            console.log(state)
        },
        startChangeLoginInfo(state,action){
            if(action.payload == 1){
               
                state.isLoggined = action.payload
            }else
            if(action.payload == 0) {
                state.isLoggined = action.payload
            }else{
                state.isLoggined = 0
            }
        },

        changeUserInformationPlus(state,action){
          
           state.person['firstname'] = action.payload['firstname']
           state.person['lastname'] = action.payload['lastname']
           state.person['nickname'] = action.payload['nickname']
           state.person['email'] = action.payload['email']
           state.person['password'] = action.payload['password']
           state.person['potourl'] = action.payload['potorul']
        }
        

    })
})

const store = configureStore({
    reducer: storeManipulation.reducer
})


export const functionsFromStore = storeManipulation.actions
export default store