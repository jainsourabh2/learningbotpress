const axios = require('axios');
const baseURL = 'http://localhost:3001';
/**
 * Description of the action goes here
 * @param  {String} params.name=value Description of the parameter goes here
 * @param  {Number} [params.age] Optional parameter
 */
async function yourCustomAction(state, event, params) {
  return state
}

module.exports = {
  startGame: async (state, event) => {
    const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    const val = event.text;
    //console.log(state);
    return {
      ...state, // we clone the existing state
      val // setting the value typed by user
    }
  },
  branchLocator: async(state, event) => {
    let url = baseURL +'/branch/branchdetails/' + event.text;
    const response = await axios.get(url);
    let responseBranch = response.data.data.branch;

    return {
      ...state, // we clone the existing state
      responseBranch // setting the value typed by user
    }
  },
  accountDetails: async(state,event,{accountType}) => {
    let url = baseURL +'/accounttype/interestrates/' + accountType;
    const response = await axios.get(url);
    let interestRate = response.data.data.interestrates;
    return{
      ...state,
      interestRate,
      accountType
    }
  },
  fixedDepositDetails: async(state,event) => {
    //let json = JSON.parse(state);
    let category = state['skill-choice-ret'];
    let url = baseURL +'/fixeddeposits/fixeddepositdetails/' + category;
    const response = await axios.get(url);
    let fixedDepositRateOfInterest = response.data.data.interestrates;
    return{
      ...state,
      fixedDepositRateOfInterest,
      category
    }
  },
  validCustomerID: async(state,event) => {
    let customerId = event.text;
    let url = baseURL +'/account/validate/' + customerId;
    let response = await axios.get(url);
    let name = response.data.data;
    return{
      ...state,
      name,
      customerId
    }
  },
  bookCreditCard: async(state,event) => {
    let customerId = state.customerId;
    let url = baseURL +'/creditcard/book/' + customerId;
    let response = await axios.get(url);
    let transactionId = response.data.data;
    return{
      ...state,
      transactionId
    }
  },
  generateOTP: async(state,event) => {
    let customerId = state.customerId;
    let url = baseURL +'/otp/generate/' + customerId;
    let response = await axios.get(url);
    let mobilenumber = response.data.data;
    return{
      ...state,
      mobilenumber
    }
  },
  validateOTP: async(state,event) => {
    let customerId = state.customerId;
    let url = baseURL +'/otp/validate/' + customerId;
    let response = await axios.get(url);
    let otp = response.data.data;
    let otpValidationStatus=0;
    console.log(event.text);
    console.log(otp);
    if (event.text === otp.toString())
      otpValidationStatus = 1
    //console.log(state);
    return{
      ...state,
      otpValidationStatus
    }
  },
  showAccountBalance: async(state,event) => {
    let customerId = state.customerId;
    let url = baseURL +'/account/balance/' + customerId;
    let response = await axios.get(url);
    let accountBalance = response.data.data;
    return{
      ...state,
      accountBalance
    }
  }
 }
