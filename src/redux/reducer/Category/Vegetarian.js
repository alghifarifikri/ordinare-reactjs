const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const vegetarian = (state = initialState, action) => {
    switch(action.type){
    case 'GET_VEGETARIAN_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_VEGETARIAN_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_VEGETARIAN_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default vegetarian