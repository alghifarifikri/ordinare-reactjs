const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const tongtji = (state = initialState, action) => {
    switch(action.type){
    case 'GET_TONGTJI_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_TONGTJI_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_TONGTJI_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default tongtji