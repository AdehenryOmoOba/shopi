"use client"
import React, { useRef, useState, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom';


type SearchPopOverProp = {
  popOver: boolean
  setPopOver: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}

function createDOMElement(id: string) {
  const popOverDiv = document.createElement('div');
  popOverDiv.setAttribute("id", id);
  document.body.appendChild(popOverDiv);
  return popOverDiv;
}

function SearchPopOver({popOver, setPopOver, children}: SearchPopOverProp) {
  const popOverRef = useRef<HTMLDivElement | null>(null)
  const [popOverDiv, setPopOverDiv] = useState<HTMLElement | null>(null)
  const switchRef = useRef(0)


  useLayoutEffect(() => {

    let element = document.getElementById("pop-over");

    const handleEscapeKey = (e: KeyboardEvent) => {
      e.key == "Escape" ? setPopOver(false) : null
    }

    function handleClickOutside(event: any){
      if(event.target.classList[0] === "clearBtn") return
      switchRef.current++
      if (popOver && !popOverRef.current.contains(event.target) && switchRef.current > 1) {
          setPopOver(false)
      }
    };

    if(popOver && !element) {
    element = createDOMElement("pop-over")
    document.addEventListener("keydown", handleEscapeKey)
    document.addEventListener("click", handleClickOutside)
    }

    setPopOverDiv(element)
    document.body.style.overflow = "hidden";

    return () => {
    document.removeEventListener("keydown", handleEscapeKey);
    document.removeEventListener("click", handleClickOutside);
    document.body.style.overflow = "auto";
    element.parentNode.removeChild(element)
    }

  },[popOver])

  if(!popOverDiv) return null

  const content = <div ref={popOverRef}  className="fixed inset-0 bg-black bg-opacity-70 z-10">
                    {children}
                  </div>

  return createPortal(content, popOverDiv)
}

export default SearchPopOver
