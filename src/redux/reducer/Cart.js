const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const carts = (state = initialState, action) => {
    switch(action.type){
    case 'GET_CARTS_PENDING':
        return {
          ...state,
          isLoadig: true,
          isError: false,
        }
      case 'GET_CARTS_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_CARTS_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default carts