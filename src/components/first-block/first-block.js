import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../settings/constants'
import './first-block.css'

function FirstBlock() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(SERVER_URL)
            .then(r => r.json())
            .then(data => setData(data.static_blocks[0]))

    }, [])

    return (

        <section className="firstBlock" id='textBlocks'>
            <div className='sectionContainer'>
                <h2 className="firstBlock-header">{data.title}</h2>
                <p  className="firstBlock-paragraph" dangerouslySetInnerHTML={{__html: data.content}}></p>
                <div className='firstBlock-image'>
                    <img src={data.image1} alt=""/>
                    <img src={data.image2} alt=""/>
                    <img src={data.image3} alt=""/>
                    <img src={data.image4} alt=""/>
                </div>
            </div>
        </section>
    )
}
export default FirstBlock