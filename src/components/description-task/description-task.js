import React, {useState, useEffect} from 'react';
import './description-task.css'
import {SERVER_URL} from '../../settings/constants'

function DescriptionTask() {
    const [data, setData] = useState('Задание');
    useEffect(() => {
        fetch(SERVER_URL)
            .then(r => r.json())
            .then(data => setData(data))
    }, [])

    return (
        <section className="descriptionTask">
            <div className='sectionContainer'>
                <h1 className="descriptionTask-header">{data.title}</h1>
                <div className="descriptionTask-paragraph">
                    <div dangerouslySetInnerHTML={{__html: data.content}}></div>
                    <p className="descriptionTask-paragraph-grey"> Этот блок с описанием тоже нужно сверстать.
                        Специально
                        использовали разные стили и текстовые блоки, даже если они порой неуместны ;)
                    </p>
                </div>
            </div>
        </section>
    )
}
export default DescriptionTask