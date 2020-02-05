const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const apsurabaya = (state = initialState, action) => {
    switch(action.type){
    case 'GET_APSURABAYA_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_APSURABAYA_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_APSURABAYA_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default apsurabaya