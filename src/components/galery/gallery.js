import React, {useState, useEffect} from 'react';
import {SERVER_URL} from '../../settings/constants'
import './gallery.css'
import Modal from "@material-ui/core/Modal";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import Vector from "../../images/Vector.png"

function Gallery() {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [urlImage, setUrlImage] = useState('')
    const [idImage, setIdImage] = useState(null)
    const [copyText, setText] = useState(false)
    const textToInput = 'https://test.octweb.ru/api/crop/media/uploads/gallery/gallery/6.jpeg?geometry=420x240&crop=center';

    const onCopy = () => {
        setText(true)
        setTimeout(() => setText(false), 3000)
    }

    const handleOpen = (url, id) => {
        setUrlImage(url)
        setIdImage(id)
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }
    const gallery = data.map(item => {
        const imageUrl = item.image
        const textIncludes = 'test.octweb.ru'
        const urlStart = "https://test.octweb.ru/api/crop/"
        const text = item.image.indexOf(textIncludes)
        const urlWithoutEnd = `${urlStart}${imageUrl.slice(text + textIncludes.length)}`
        return urlWithoutEnd
    })
    const nextImage = () => {
        if (idImage < gallery.length) {
            let galleryReverse = gallery.reverse()
            let urlNew = galleryReverse[idImage].split(`${idImage}`).join(`${idImage + 1}`)
            setUrlImage(urlNew)
            setIdImage(idImage + 1)
        }
    }
    const previousImage = () => {
        if (idImage > 1) {
            let galleryReverse = gallery.reverse()
            let urlNew = galleryReverse[idImage - 2].split(`${idImage - 2}`).join(`${idImage - 3}`)
            setUrlImage(urlNew)
            setIdImage(idImage - 1)
        }
    }

    useEffect(() => {
        fetch(SERVER_URL)
            .then(r => r.json())
            .then(data => setData(data.gallery))

    }, [])

    let widthElement = 1400

    const galleryImages = data.map(item => {
            const imageUrl = item.image
            const textIncludes = 'test.octweb.ru'
            const urlStart = "https://test.octweb.ru/api/crop/"
            const urlEnd = '?geometry=202x130'
            const urlEndMin = '?geometry=164x115'
            const text = item.image.indexOf(textIncludes)
            const urlWithoutEnd = `${urlStart}${imageUrl.slice(text + textIncludes.length)}`
            const textInput = `${urlWithoutEnd}${urlEnd}`
            const textInputMin = `${urlWithoutEnd}${urlEndMin}`
            let element = document.querySelector('.galleryImages');
            widthElement = element.offsetWidth

            if (widthElement < 600 && widthElement - 165 > 165 * item.id) {
                return (
                    <div className='gallery-image' key={item.id}>
                        <img
                            src={textInputMin}
                            alt={`img ${item.id}`}
                            onClick={() => handleOpen(urlWithoutEnd, item.id)}
                        />
                    </div>
                )
            }

            if (widthElement < 600 && widthElement - 165 < 165 * item.id && widthElement > 165 * item.id) {
                return (
                    <div className='gallery-image' key={item.id}>
                        <img
                            src={textInputMin}
                            alt={`img ${item.id}`}
                        />
                        <div className='gallery-image-title'
                             onClick={() => handleOpen(urlWithoutEnd, item.id)}
                        >{`Еще ${data.length - item.id} фото`}</div>
                    </div>
                )
            }

            if (widthElement - 200 > 200 * item.id) {
                return (
                    <div className='gallery-image' key={item.id}>
                        <img
                            src={textInput}
                            alt={`img ${item.id}`}
                            onClick={() => handleOpen(urlWithoutEnd, item.id)}
                        />
                    </div>
                )
            }
            if (widthElement - 200 < 200 * item.id && widthElement > 200 * item.id) {
                return (
                    <div className='gallery-image' key={item.id}>
                        <img
                            src={textInput}
                            alt={`img ${item.id}`}

                        />
                        <div className='gallery-image-title'
                             onClick={() => handleOpen(urlWithoutEnd, item.id)}
                        >{`Еще ${data.length - item.id} фото`}</div>
                    </div>
                )
            }
        }
    )

    return (
        <section className="gallery" id='gallery'>
            <div className='sectionContainer'>
                <h2 className='gallery-header'>Галерея с изображениями</h2>
                <p>Все просто. Выводится столько фотографий сколько влезит на экран.
                    Те что не влезли рассчитываются и выводится их количество над последней фотографией.
                    По клику на эту подпись так же открывается увеличенное версия того изображения, над
                    которым выводится подпись.</p>
                <div className='galleryImages'>
                    {galleryImages}
                </div>
                <div>
                    <Modal
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                        className='modal'
                        open={open}
                        onClose={() => handleClose()}
                    >
                        <div className='modals'>
                            <button onClick={() => previousImage()}>Назад</button>
                            <img
                                src={ widthElement > 545 ? `${urlImage}?geometry=840x420`:
                                `${urlImage}?geometry=180x130`}
                                alt={`img ${idImage}`}
                            />

                            <button onClick={() => nextImage()}>Вперед</button>
                        </div>
                    </Modal>
                </div>
                <div className='gallery-margin'>
                    Для того, чтобы на странице мы выводили изображение фактического нужного размера, а не просто
                    уменьшали заведомо большее изображения, есть такая возможность:
                </div>
                <CopyToClipboard text={textToInput}
                                 onCopy={() => onCopy()}>
                    <button className='linksApi-button gallery-copy'>
                        <span>{textToInput}</span>
                        <img src={Vector} alt=""/>
                    </button>
                </CopyToClipboard>
                {copyText ? <div className='copytext'>Ссылка скопирована</div> :
                            null}
                <div className='gallery-smallSize '>
                    В параметре <strong>geometry</strong> можно задать размеры для изображения, а
                    в <strong>crop</strong> выбрать тип кадрирования
                    (<strong>center, top, bottom</strong>) или вообще его не указывать и тогда изображение
                    пропорционально будет
                    «вписано» в указанные размеры.
                </div>
            </div>
        </section>
    )
}
export default Gallery