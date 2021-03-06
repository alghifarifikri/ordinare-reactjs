const initialState = {
    data: [],
    isLoading: false,
    isError: false,
    isSuccess: true
  }

  const searchname = (state = initialState, action) => {
    switch(action.type){
    case 'GET_SEARCHNAME_PENDING':
        return {
          ...state,
          isLoading: true,
          isError: false,
        }
      case 'GET_SEARCHNAME_REJECTED':
        return {
          ...state,
          isLoading: false,
          isError: true
        }
      case 'GET_SEARCHNAME_FULFILLED':
        return {
          data: action.payload.data.data,
          isLoading: false,
          isError: false
        }
        default :
          return state
    }
}
  
  export default searchname