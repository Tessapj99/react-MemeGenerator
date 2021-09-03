import React, {useState, useEffect} from "react"

// class MemGen extends Component {
//     constructor() {
//         super()
//         this.state = {
//             topText: "",
//             bottomText: "",
//             randomImage: " http://i.imgflip.com/1bij.jpg"

//         }
//     }
    
//     componentDidMount() {
//         fetch("https://api.imgflip.com/get_memes")
//         .then(response => response.json())
//             .then(response => { 
//                 const {memes} = response.data
//                 console.log(memes[0])
//                 this.setState({ allMemeImgs: memes })
//             })
//     }
//     render() {
//         return (
//             <h1>MEME GENERATOR SECTION</h1>
//         )
//     }
// }


export default function MemGen1() {
    const [state, setState ] =  useState({ topText: " ", bottomText: " ", randomImage: "http://i.imgflip.com/1bij.jpg" })
    
    useEffect(() => {
        fetch("https://api.imgflip.com/get_memes")
            .then(response => response.json())
            .then(response => {
                const { memes } = response.data
                console.log(memes[0])
                setState(prevState => ({ ...prevState, allMemeImgs: memes }))
                console.log(state)
            }
                ) // eslint-disable-next-line
    }, []);
    
    function handelChange(event) {
        const { name, value } = event.target
        setState(
            (prevState => ({ ...prevState, [name]: value }))
        )
    }

    function handelMeme(event) {
        event.preventDefault()
        const randNum = Math.floor(Math.random() * state.allMemeImgs.length)
        const randMemeImg = state.allMemeImgs[randNum].url
        console.log(randMemeImg);
        setState((prevState => ({ ...prevState, randomImage: randMemeImg })))
        console.log(state)
    }

    
    return (
        <div>
            <form className="meme-form" onSubmit={(e)=>handelMeme(e)}>
                <button >Submit</button>
                <input
                    type="text"
                    name="topText"
                    placeholder='Top Text'
                    value={state.topText}
                    onChange={(e)=>handelChange(e) }
                />
                
                <br />
                <input
                    type="text"
                    name="bottomText"
                    placeholder='Bottom Text'
                    value={state.bottomText}
                    onChange={(e)=>handelChange(e)}
                />
            </form>
            <div className='meme'>
                <img src={state.randomImage} alt="" />
                <h2 className="top">{state.topText}</h2>
                <h2 className="bottom">{state.bottomText}</h2>

            </div>
        </div>
        
    )
    }
