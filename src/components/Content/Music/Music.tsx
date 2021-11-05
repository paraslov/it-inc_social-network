import React, {useEffect, useState} from 'react'

function Music() {

  const [test, setTest] = useState<number[]>([])
  const [flag, setFlag] = useState(false)

  console.log('@> outside ', test)

  const onButtonClick = () => {
    if(!flag) {
      setFlag(true)
      setTest([...test, 32, 2345, 23423,2342])
    }
  }
  useEffect(()=> {

    return () => {
      if(flag) {
        console.log('@> ', test)
      }
    }
  }, [flag])

    return (
        <div>
            Music Page
          <button onClick={onButtonClick}>click</button>
        </div>
    )
}

export default Music
