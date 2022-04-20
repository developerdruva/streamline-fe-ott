let isLogged = false

const auth = (state=isLogged, action)=>{
    switch (action.type){
        case "AUTH":
            return action.payload
        default:
            return state
    }
}

export default auth