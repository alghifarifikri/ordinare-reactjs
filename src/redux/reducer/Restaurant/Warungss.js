const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const warungss = (state = initialState, action) => {
    switch(action.type){
    case 'GET_WARUNG_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_WARUNG_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_WARUNG_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default warungss