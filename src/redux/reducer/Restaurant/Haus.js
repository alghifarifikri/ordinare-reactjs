const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const haus = (state = initialState, action) => {
    switch(action.type){
    case 'GET_HAUS_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_HAUS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_HAUS_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default haus