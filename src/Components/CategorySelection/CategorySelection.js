import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import ReactCardSlider from 'react-card-slider-component';

export default function CategorySelection() {
  const [slides, setSlides]= useState([]);
  const navigate = useNavigate();
  const slider = [];
  const [allProducts, setAllProducts] = useState([])
  const {data: categories=[], isLoading} = useQuery({
    queryKey:['categories'],
    queryFn: async ()=>{
      const res= await fetch(`http://localhost:5000/categories`)
      const data = await res.json();
      return data;
    }
  })

  const handleClick =(id)=>{
    navigate(`product/${id}`)
  }
  useEffect(()=>{
    fetch(`http://localhost:5000/allproducts`)
    .then(res=>res.json())
    .then(data=>{
      data.forEach(product=>{
        const items = {
          image: product.image,
          title: product.productName,
          clickEvent:()=>handleClick(product._id)
        }
        slider.push(items);
      })
      setSlides(slider)
    })
  }, [slider])

  
  return (
    <div className='my-5'>
         <div>
            <h1 className='text-5xl text-primary uppercase font-light'>Categories</h1>
            <div className="divider"></div>
        </div>
        <div className='flex lg:justify-around justify-center px-4 lg:flex-row flex-col items-center'>
            {
              categories &&
              categories?.map(category=><Link
               to={`/category/${category._id}`}
                key={category._id}
                >
              <button
              className='btn btn-primary btn-outline'
              >{category.category}</button>
              </Link>)
            }
        </div>
      <div className='my-7'>
      {
        slides && <ReactCardSlider slides={slides}/>
       }
      </div>
    </div>
  )
}
