import { useEffect, useState } from "react"

const useBuyer=(email)=>{
    const [isBuyer, setIsBuyer] = useState(false);
    const [isBuyerLoading, setIsBuyerLoading] = useState(true)
    useEffect(()=>{
        setIsBuyerLoading(true)
        fetch(`https://mobileshop-inky.vercel.app/users/buyer/${email}`)
        .then(res=>res.json())
        .then(data=>{
           setIsBuyer(data.isBuyer)
        //    console.log(data);
           setIsBuyerLoading(false)
        })
    }, [email])

    return [isBuyer, isBuyerLoading]
}

export default useBuyer;