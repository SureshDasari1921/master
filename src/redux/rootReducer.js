import accountsReducer from "./reducers/dataReducers";

import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
	accountsData:accountsReducer,
	 
})

export default rootReducer;  