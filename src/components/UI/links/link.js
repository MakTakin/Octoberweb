import React, {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './link.css'
import Vector from "../../../images/Vector.png"

function Link() {
    const [copyText, setText] = useState(false)
    const textToInput = 'https://test.octweb.ru/api/pages/index/';
    const onCopy = () => {
        setText(true)
        setTimeout(() => setText(false), 3000)
    }
    return (
        <div className='button-position'>
            <CopyToClipboard text={textToInput}
                             onCopy={() => onCopy()}>
                <button className='linksApi-button position'>
                    {textToInput}
                    <img src={Vector} alt=""/>
                </button>
            </CopyToClipboard>
            {copyText ? <div className='copytext'>Ссылка скопирована</div> :
                        null}
        </div>
    )
}

export default Link