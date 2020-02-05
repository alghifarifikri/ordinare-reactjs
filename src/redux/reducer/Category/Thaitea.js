const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const thaitea = (state = initialState, action) => {
    switch(action.type){
    case 'GET_THAITEA_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_THAITEA_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_THAITEA_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default thaitea