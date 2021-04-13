import axios from 'axios'


export const BASE_URL = 'https://api.amamaule.cl/'


const INSTANCE =axios.create({
    baseURL: BASE_URL
})


export const GET = async(endpoints) => {

    const request = await INSTANCE.get(endpoints)

    return request

}