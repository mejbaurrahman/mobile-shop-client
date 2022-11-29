import { useEffect, useState } from "react"

const useAdmin=(email)=>{
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAdminLoading, setIsAdminLoading] = useState(true)
    useEffect(()=>{
        setIsAdminLoading(true)
        fetch(`https://mobileshop-inky.vercel.app/users/admin/${email}`)
        .then(res=>res.json())
        .then(data=>{
           setIsAdmin(data.isAdmin)
        //    console.log(data);
           setIsAdminLoading(false)
        })
    }, [email])

    return [isAdmin, isAdminLoading]
}

export default useAdmin;