import { useEffect, useState } from "react";
import './App.css'

//const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'
export function App() {

    const [fact, setFact] = useState('lorem ipsum cat fact whatever')
    const [imageUrl, setImageUrl] = useState()

    //efecto para recuperar la cita al cargar la página
    useEffect(() => {
        fetch(CAT_ENDPOINT_RANDOM_FACT)
            .then(res => res.json())
            .then(data => {
                const { fact } = data
                setFact(fact)


            })
    }, [])

    // efecto para recuperar la imagen cada vez que tenemos una cita
    useEffect(() => {
        if (!fact) return
        const threeFirstWord = fact.split(' ', 3).join(' ')
        console.log(threeFirstWord)

        fetch(`https://cataas.com/cat/says/${threeFirstWord}?size=50&color=red&json=true`)
            .then(res => res.json())
            .then(response => {
                const { url } = response
                setImageUrl(url)
            })
    }, [fact])


    return (

        <main>
            <h1>App de gatitos</h1>
            <section>
                {fact && <h3>{fact}</h3>}
                {imageUrl && <img src={`${CAT_PREFIX_IMAGE_URL}${imageUrl}`} alt={`image extracted using the first three words for ${fact}`} />}
            </section>

        </main>

    )
}