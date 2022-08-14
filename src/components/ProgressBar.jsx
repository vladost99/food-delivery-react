import React from 'react'

function ProgressBar({width}) {
  return (
  <div className="w-full bg-gray-200 rounded-full dark:bg-gray-700">
    <div className="bg-green-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full" style={{width: width}}>{width}</div>
  </div>
  )
}

export default ProgressBar