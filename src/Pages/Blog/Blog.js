import React from 'react'

export default function Blog() {
  return (
    <div className='w-full mx-auto'>
        <div>
            <h1 className='text-5xl text-primary uppercase font-light'>Blog</h1>
            <div className="divider"></div>
        </div>
        <div className='my-3'>
            <h1 className='text-primary'>What are the different ways to manage a state in a React application?</h1>
            <div className="divider"></div>
            <p className='text-justify'>useState is the first tool you should reach for to manage state in your components.

It can take accept any valid data value, including primitive and object values. Additionally, its setter function can be passed down to other components as a callback function.useReducer is another option that can be used for either local or global state. It is similar in many ways to useState under the hood, although instead of just an initial state it accepts a reducer</p>
        </div>
        <div className='my-3'>
            <h1 className='text-primary'>How does prototypical inheritance work?</h1>
            <div className="divider"></div>
            <p className='text-justify'>The Prototypal Inheritance is a feature in javascript used to add methods and properties in objects. It is a method by which an object can inherit the properties and methods of another object. Traditionally, in order to get and set the Prototype of an object, we use Object. getPrototypeOf and Object.</p>
        </div>
        <div className='my-3'>
            <h1 className='text-primary'>What is a unit test? Why should we write unit tests</h1>
            <div className="divider"></div>
            <p className='text-justify'>The main objective of unit testing is to isolate written code to test and determine if it works as intended. Unit testing is an important step in the development process, because if done correctly, it can help detect early flaws in code which may be more difficult to find in later testing stages.</p>
        </div>
        <div className='my-3'>
            <h1 className='text-primary'>React vs. Angular vs. Vue?</h1>
            <div className="divider"></div>
            <p className='text-justify'>Vue provides higher customizability and hence is easier to learn than Angular or React. Further, Vue has an overlap with Angular and React with respect to their functionality like the use of components. Hence, the transition to Vue from either of the two is an easy option</p>
        </div>

    </div>
  )
}
