import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [imagenes, setImagenes] = useState([]);
  const [blockes, setBlockes] = useState(0);

  // funcion de incremento en el pedido
  /* const mas = async () => {
    const mas_imagenes = await fetch_imagenes(blockes + 1);
    setBlockes(previo => previo + 1);
    setImagenes( previo => [...previo, ...mas_imagenes])
  } */

  // fetch o peticion de imagenes o datos a nuestra API
  //const fetch_imagenes = async page => (await fetch(`https://picsum.photos/v2/list?page=${page}&limit=10`)).json()

/*   useEffect(() => {
    (async () => {
      const pinturas = await fetch_imagenes(0)
      setImagenes(pinturas)
    })()
  }, []); */
  useEffect(() => {
    const fetchData = async() =>{
      try {
        const res = await fetch(`https://picsum.photos/v2/list?page=${blockes}&limit=5`)
        const data = await res.json();
        setImagenes(prev => [...prev, ...data]);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData()
  }, [blockes])

 // console.log(imagenes);

  useEffect(() => {
    const handleScroll = (e) => {
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight =  e.target.documentElement.scrollTop + window.innerHeight;
      console.log(currentHeight)
      console.log(scrollHeight)
      if(currentHeight + 1 >= scrollHeight){
        setBlockes(blockes + 5)
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [blockes])

  return (
    <div className="App">
      <div style={{ display: 'flex', flexDirection: 'column'}}>
        {imagenes.map((img, i) => (
          <img key={`im${i}`} src={img.download_url} style={{ width: '150px', height: 'auto', marginBottom: '10px', borderRadius: '3px'}} alt='imagenes'/>
        ))}
      </div>
      
    </div>
  )
}

export default App
