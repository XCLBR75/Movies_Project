import React,{useState} from 'react'

function Pagination() {
  let [pageNum,setPage] = useState(1);
  const onPrev = () =>{
    if (pageNum >  1){
      setPage(pageNum-1);
    }
  }

  const onNext = () =>{
    if (pageNum >=  1){
      setPage(pageNum + 1);
    }
  }

  return (
    <div className='flex justify-center'>
      <div className='border-2 p-2 rounded-l-xl border-blue-400' onClick={onPrev}>Previours</div>
      <div className='border-2 p-2 border-r-0 border-l-0 border-blue-400'> {pageNum} </div>
      <div className='border-2 p-2 rounded-r-xl border-blue-400' onClick={onNext}>Next</div>
    </div>
  )
}

export default Pagination
