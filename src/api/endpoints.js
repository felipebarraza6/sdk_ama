import { GET } from './config'



const retrieve_invitation = async(invitation)=> {
    const request = await GET(`invitations/${invitation}/`)
    return request
}


const api = {
    retrieve_invitation
}


export default api