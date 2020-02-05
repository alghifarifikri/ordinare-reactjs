const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const chickenfood = (state = initialState, action) => {
    switch(action.type){
    case 'GET_CHICKENFOOD_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_CHICKENFOOD_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_CHICKENFOOD_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default chickenfood