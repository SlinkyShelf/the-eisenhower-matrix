import { getJsonData, storeData } from '../modules/fsstorage.js';
import { useEffect, useState } from 'react';
import { store } from "../modules/store.js"

function FsDataChild({ datakey, name })
{
    const [ data, setData ] = store.useState(name)
    const [ gotData, setGotData ] = useState(false)

    useEffect(() => {
        getJsonData(datakey).then((d) => {
          setGotData(true)
          if (d)
            setData(d)
        })
      }, [])

      useEffect(() => {
        if (!gotData) {return}
        // console.log("Stored "+name+": ", data)
        storeData(datakey, JSON.stringify(data)).then(() => { })
      }, [data])

    return <><div></div></>
}

function FsDataManager({ dataKeys })
{

  return <>
    {Object.keys(dataKeys).map(name => {
      return <FsDataChild datakey={dataKeys[name]} name={name} key={name}/>
    })}
  </>
}

export default FsDataManager