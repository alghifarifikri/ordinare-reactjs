const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const sort = (state = initialState, action) => {
    switch(action.type){
    case 'GET_SORT_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_SORT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_SORT_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default sort