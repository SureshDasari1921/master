const initialData={
    data:[]
}

const accountsReducer=(state=initialData,action)=>{
   
    if(action.type=='UPDATE'){
 console.log("enter",action)
 
        return  {
            ...state,data:[action.payload]
        }
    }
    else return state
}
export default accountsReducer