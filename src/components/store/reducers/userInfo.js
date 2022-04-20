let userinfo = {
    userName : '', 
    emailId : '',
    mobileNum : '',
    subscription : {
        plan: '',
        price: ''
    }
}

const userInfo = (state=userinfo, action) => {
    switch (action.type){
        case "USER_EMAIL" :
            return {
                ...state,
                emailId : action.payload.email
            }
        case "USER_INFO" :
            return {
                ...state,
                emailId : action.payload.emailId,
                userName : action.payload.userName,
                mobile : action.payload.mobile
            }
        case "USER_PLAN" :
            return {
                ...state,
                subscription : {
                    plan: action.payload.plan,
                    price: action.payload.price
                }
            }
        default:
            return state
    }
}

export default userInfo;