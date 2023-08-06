"use client"

import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "@/utils/firebase/connection"
import Loading from "@/components/Loading.jsx"
import Error from "@/components/Error.jsx"
import Login from "@/components/Login.jsx"

const MeLayout = ({ children }) => {

    const [user, loading, error] = useAuthState(auth)

    if (error) return <Error />
    if (loading) return <Loading />
    if (!user) return <Login />

    else return children

}

export default MeLayout