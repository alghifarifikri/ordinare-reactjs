const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const snack = (state = initialState, action) => {
    switch(action.type){
    case 'GET_SNACK_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_SNACK_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_SNACK_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default snack