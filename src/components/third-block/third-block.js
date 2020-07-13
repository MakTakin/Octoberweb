import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../settings/constants'
import './third-block.css'

function ThirdBlock() {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(SERVER_URL)
            .then(r => r.json())
            .then(data => setData(data.static_blocks[2]))

    }, [])

    return (
        <section>
            <div className='sectionContainer thirdBlock'>
                <h2 className='thirdBlock-header'>{data.title}</h2>
                <div className='thirdBlock-context' dangerouslySetInnerHTML={{__html: data.content}}></div>
            </div>
        </section>
    )
}
export default ThirdBlock