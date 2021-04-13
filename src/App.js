import React, { useEffect, useState } from 'react'
import './assets/css/App.css'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import api from './api/endpoints'
import SDKwebinar from "./components/SDKwebinar"


const GetTransmission = ({match}) => {

    const initialState = {
        uuid:match.params.id,
        transmission: null,
        user: null
    }
    const [state, setState] = useState(initialState)

    useEffect(()=>{
        async function getTransmission(invitation){
            const request = await api.retrieve_invitation(invitation).then((response)=> {
                setState({
                    ...state,
                    transmission: response.data.transmission,
                    user: response.data.user
                })
            }).catch((error)=> {
                window.location.href='http://localhost:3001'
            })
            return request
        }
        getTransmission(state.uuid)
    }, [])

    return(<> {state.transmission && <SDKwebinar transmission={state.transmission} user={state.user} />} </>)
}


const  App = () => {

  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route path='/:id' component={GetTransmission}  />
        </Switch>
      </BrowserRouter>
    </div>
  )
}


export default App
