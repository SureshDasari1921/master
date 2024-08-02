import axios from "axios";
import { param } from "jquery";

const api = "http://localhost:3001"

const headers = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer your_auth_token_here'  // Example Authorization header

};
const register = (data) => {
  return axios.post(api + "/auth/register", data, { headers: headers })
}
const login = (data) => {
  return axios.post(api + "/auth/login", data, { headers: headers })
}
const updateProfile = (data) => {
  return axios.post(api + "/users/updateProfile", data, { headers: headers })
}
const getProfile = (data) => {
  return axios.post(api + "/users/getProfile", data, { headers: headers })
}
const crateAccountProfile = (data) => {
  return axios.post(api + "/accountDetails/createAccount", data, { headers: headers })
}
const getAccountProfile = (data) => {
  return axios.get(api + "/accountDetails/getAccount", { headers: headers })
}

const deleteAccountProfile = (data) => {

  return axios.delete(api + `/accountDetails/deleteAccount/${data.accountNumber}`, { headers: headers })
}
const updateBankAccount = (data) => {

  return axios.put(api + "/accountDetails/updateAccount", data, { headers: headers })
}
const amountDepositWithdraw = (data) => {

  return axios.post(api + "/debit-credit/deposit-withdraw", data, { headers: headers })
}
const fetchBankDetails = (data) => {

  return axios.post(api + "/accountDetails/fetchBankDetails", data, { headers: headers })
}
const fetchTrannsactionDetails = () => {

  return axios.get(api + "/debit-credit/getTransactionDetails", { headers: headers })
}
const getTotalAmountsByAllAccounts = () => {

  return axios.get(api + "/debit-credit/getTotalAmountsByAllAccounts", { headers: headers })
}
 
export default {
  register, login, updateProfile, getProfile, crateAccountProfile, getAccountProfile
  , deleteAccountProfile, updateBankAccount, amountDepositWithdraw, fetchBankDetails, fetchTrannsactionDetails
  ,getTotalAmountsByAllAccounts
}
