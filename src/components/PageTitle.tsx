import React from 'react'

const Title = ({ title }: { title: string }) => {
  return (
    <div className="my-3">
        <h1 className="text-xl my-1">
            <b>{title}</b> 
        </h1>
    </div>
  )
}

export default Title;