"use client"

export default function Button () {

  async function clickHandler() {
    const response = await fetch("http://localhost:3000/api/hello-backend")
    if(!response.ok) console.log(response.statusText)
    if(response.ok) console.log(await response.json())
  }
  
  return (<button className='py-2 px-4 bg-blue-900 rounded' onClick={clickHandler}>Get Data</button>)
          
} 