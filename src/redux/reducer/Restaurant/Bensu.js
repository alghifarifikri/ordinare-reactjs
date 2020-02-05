const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const bensu = (state = initialState, action) => {
    switch(action.type){
    case 'GET_BENSU_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_BENSU_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_BENSU_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default bensu