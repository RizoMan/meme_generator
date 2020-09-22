import React, { useEffect, useState } from 'react'
import axios from 'axios'

const MemeGenerator = props => {
    const [topText, setTopText] = useState("")
    const [bottomText, setBottomText] = useState("")
    const [randomImg, setRandomImg] = useState("https://i.imgflip.com/1bij.jpg")
    const [allMemesImgs, setallMemesImgs] = useState([]);

    useEffect(() => {
        const memeCall = async () => {
            await axios.get('https://api.imgflip.com/get_memes')
                .then(response => {
                    setallMemesImgs(response.data.data.memes)
                })
                .catch(err => console.log(err))
        }

        memeCall()

    }, [])


    const handleChange = e => {
        const { name, value } = e.target
        switch (name) {
            case "top-text":
                setTopText(value)
                break
            case "bottom-text":
                setBottomText(value)
                break
            default:
                break;
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const randNum = Math.floor(Math.random() * allMemesImgs.length)
        const randMeme = allMemesImgs[randNum].url;
        setRandomImg(randMeme)
    }

    const styles = {
        img: {
            width: '480px',
        },
        topText: {
            position: 'absolute',
            top: 0,
            left: 10,
            color: '#fefefe',
            margin: 'auto'
        }
    }

    return (
        <div>
            <form className="meme-form" onSubmit={ handleSubmit }>
                <input
                    type="text"
                    name="top-text"
                    placeholder="Top Text"
                    onChange={ handleChange }
                    value={topText}
                />

                <input
                    type="text"
                    name="bottom-text"
                    placeholder="Bottom Text"
                    onChange={ handleChange }
                    value={bottomText}
                />
                <button>Gen</button>
            </form>

            <div className="meme" >
                <img src={ randomImg } style={ styles.img }></img>
                <h2 className="top" style={ styles.topText }>{topText}</h2>
                <h2 className="bottom">{ bottomText }</h2>

            </div>
        </div>
    )
}

export default MemeGenerator