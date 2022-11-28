import React, { useEffect, useState } from 'react'
import { useLoaderData, useParams } from 'react-router-dom'

export default function Payment() {
    const [order, setOrder] = useState({});
   const loader = useLoaderData()
   console.log(loader)
    
  
}
