import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({ children, authentication = true }) {
    let val = 0;
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authentication && authStatus !== authentication) {
            val++;
            console.log("HELLO1", val)
            navigate("/login")
        } else if (!authentication && authStatus !== authentication) {
            val++;
            console.log("HELLO2",val)
            navigate("/profile")
        }
        setLoader(false)
    }, [authStatus,navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}