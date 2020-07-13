import React from 'react';
import './links-api.css'
import Link from '../UI/links/link';

function LinksApi() {

    return (
        <section className='linksApi'>
            <div className='sectionContainer'>
                <h3 className='linksApi-header'>текстовые блоки и изображения для галереи </h3>
                <div className='linksApiFlex'>
                    <Link/>
                    <div className='linksApi-paragraph'>Будет круто, если по клику на желтый блок, соответствующая
                        ссылка
                        сразу
                        скопируется в буфер обмена и пользователь получит какое-то максимально
                        естественное уведомление что у него теперь в буфере эта ссылка.
                    </div>
                </div>
            </div>

        </section>
    )
}
export default LinksApi