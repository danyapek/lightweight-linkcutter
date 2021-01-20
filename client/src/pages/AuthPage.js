import React, {useState, useEffect, useContext} from 'react'
import {useHttp} from '../hooks/http.hook'
import {useMessage} from '../hooks/message.hook'
import {AuthContext} from '../context/AuthContext'

export const AuthPage = () => {
    const auth = useContext(AuthContext)
    const message = useMessage()
    const {loading, error, request, clearError} = useHttp()
    const [form, setForm] = useState({
        email:'', password: ''
    })

    useEffect(()=>{
        //console.log('Error', error)
        message(error)
        clearError()
    },[error, message, clearError])

    useEffect(()=>{
        window.M.updateTextFields()
    })

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            message(data.message)
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await request('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId)
        } catch (e) {}
    }

    return (
        <div className="row">
           <div className="col s6 offset-s3">
               <h1>LinkCutter</h1>
               <div className="card black darken-1">
                   <div className="card-content white-text">
                       <span className="card-title">Login</span>
                       <div>

                           <div className="input-field">
                               <input
                               placeholder="Enter email"
                               id="email"
                               type="text"
                               name="email"
                               className="yellow-input"
                               value={form.email}
                               onChange={changeHandler}
                               />
                               <label htmlFor="email">Email</label>
                           </div>

                           <div className="input-field">
                               <input
                                   placeholder="Enter password"
                                   id="password"
                                   type="password"
                                   name="password"
                                   className="yellow-input"
                                   value={form.password}
                                   onChange={changeHandler}
                               />
                               <label htmlFor="email">Password</label>
                           </div>

                       </div>
                   </div>
                   <div className="card-action">
                       <button
                           className="btn black darken-4"
                           style={{marginRight: 10}}
                           disabled={loading}
                           onClick={loginHandler}
                       >
                           Login
                       </button>
                       <button
                           className="btn black lighten-1 white-text"
                           onClick={registerHandler}
                           disabled={loading}
                       >
                           Registration
                       </button>
                   </div>
               </div>
           </div>
        </div>
    )
}