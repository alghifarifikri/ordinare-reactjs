const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const review = (state = initialState, action) => {
    switch(action.type){
    case 'GET_REVIEW_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_REVIEW_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_REVIEW_FULFILLED':
        return {
          ...state,
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default review