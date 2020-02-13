const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const searchrating = (state = initialState, action) => {
    switch(action.type){
    case 'GET_SEARCHRATING_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_SEARCHRATING_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_SEARCHRATING_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default searchrating