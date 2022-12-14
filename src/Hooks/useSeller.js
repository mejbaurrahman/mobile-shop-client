import { useEffect, useState } from "react"

const useSeller=(email)=>{
    const [isSeller, setIsSeller] = useState(false);
    const [isSellerLoading, setIsSellerLoading] = useState(true)
    useEffect(()=>{
        setIsSellerLoading(true)
        fetch(`https://mobileshop-inky.vercel.app/users/seller/${email}`)
        .then(res=>res.json())
        .then(data=>{
           setIsSeller(data.isSeller)
        //    console.log(data);
           setIsSellerLoading(false)
        })
    }, [email])

    return [isSeller, isSellerLoading]
}

export default useSeller;