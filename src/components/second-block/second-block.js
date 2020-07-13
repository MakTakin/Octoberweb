import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../settings/constants'
import './second-block.css'


function SecondBlock() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(SERVER_URL)
            .then(r => r.json())
            .then(data => setData(data.static_blocks[1]))

    }, [])
    return (
        <section className="secondBlock">
            <div className='sectionContainer'>
                <h2 className='secondBlock-header'>{data.title}</h2>
                <div className="secondFlex">
                <p className='secondBlock-paragraph secondFlex-t' dangerouslySetInnerHTML={{__html: data.content}}></p>
                <p className='secondFlex-p'>{data.description}</p>
                </div>
            </div>
        </section>
    )
}

export default SecondBlock