const initialState = {
    data: {},
    next : {},
    prev : {},
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const food = (state = initialState, action) => {
    switch(action.type){
    case 'GET_FOOD_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_FOOD_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_FOOD_FULFILLED':
        return {
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        case 'GET_NEXT_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_NEXT_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_NEXT_FULFILLED':
        return {
          data: action.payload.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default food