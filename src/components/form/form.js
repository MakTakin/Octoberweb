import React,{Component} from 'react';
import image from "../../images/image.png"
import success from "../../images/success.png"
import "./form.css"
import { store } from 'react-notifications-component';
import MaskedInput from 'react-text-mask';

class Form extends Component {
    state = {
        isFormValid: false,
        formControls: {
            email: {
                value: "",
                errorMessage: "Введите корректный Email",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    email: true
                }
            },
            message: {
                value: "",
                errorMessage: "Что вы хотите нам рассказать?",
                valid: false,
                touched: false,
                validation: {
                    required: true,
                    minLength: 2
                }
            },
            checkbox: {
                value: false,
                errorMessage: "Ваше согласие необходимо",
                valid: false,
                touched: false,
                validation: {
                    checkbox: true,
                }
            },
            name: {
                value: "",
                touched: false,
                valid: true,
                validation: false,
            },
            tel: {
                value: "",
                touched: false,
                valid: true,
                validation: false,
            },
        }
    }

    isInvalid({valid, touched}) {
        return !valid && touched
    }

    validateControl(value, validation) {
        if (!validation) {
            return true
        }
        let isValid = true

        if (validation.required) {
            isValid = value.trim() !== '' && isValid

        }
        if (validation.email) {
            isValid = /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i.test(value) && isValid
        }
        if (validation.minLength) {
            isValid = value.length >= validation.minLength && isValid
        }
        if (validation.checkbox) {
            isValid = value
        }
        return isValid
    }

    onChange = (event) => {
        const formControls = {...this.state.formControls}
        const control = {...formControls[event.target.name]}
        control.value =  event.target.type === 'checkbox' ? event.target.checked : event.target.value
        control.touched = true
        control.valid = this.validateControl(control.value, control.validation)

        formControls[event.target.name] = control

        let isFormValid = true

        Object.keys(formControls).forEach(name => isFormValid = formControls[name].valid && isFormValid)

        this.setState({
            formControls, isFormValid
        })
    }

    onClick = () => {
        const formControls = {...this.state.formControls}

        Object.keys(formControls).forEach( name => formControls[name].value = name === 'checkbox' ? false : "")
        this.setState({
            formControls
        })
        return store.addNotification({
            title: <img src={success} alt=""/>,
            message: "Письмо для активации аккаунта успешно отправлено на адрес электронной почты, который вы указали при регистрации.",
            type: "default",
            container: "top-right",
            animationIn: ["animated", "fadeIn"],
            animationOut: ["animated", "fadeOut"],
            dismiss: {
                duration: 1000,
                onScreen: false
            }
        })
}
    render() {
        const {email, message, checkbox, name, tel} = this.state.formControls
        return (
            <section className='form-section'>
                <img className="form-image" src={image} alt=""/>
                <div className="formHello">
                    <form className="form formFlex" id='formToSend'
                          onSubmit={event => {event.preventDefault()}}
                          noValidate
                    >
                        <h2 className='form-header'>Форма с приветами</h2>
                        <input className="form-input" placeholder="Ваше имя"
                               name='name'
                               type='text'
                               value={name.value}
                               touched={name.touched ? 1 : 0}
                               onChange={event => this.onChange(event)}
                        />
                        <div>Имя нас не сильно волнует и это поле необязательное</div>
                        <MaskedInput
                            mask={['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/]}
                            className="form-input"
                            placeholder="+7 (888) 555-55-55"
                            name='tel'
                            type='tel'
                            value={tel.value}
                            touched={tel.touched ? 1 : 0}
                            onChange={event => this.onChange(event)}
                        />
                        <div>Для телефона нужна маска для ввода</div>
                        <div>
                            <input className={this.isInvalid(email) ?
                                                            "form-input form-email formError" :
                                                            "form-input form-email"}
                                   placeholder="Email"
                                   name='email'
                                   type="email"
                                   value={email.value}
                                   valid={email.valid ? 1 : 0}
                                   touched={email.touched ? 1 : 0}
                                   onChange={event => this.onChange(event)}
                            />
                            {this.isInvalid(email) ?
                                <span className='formError'>{email.errorMessage}</span> :
                                null
                            }
                        </div>
                        <div>Почту нужно валидировать, что пользователь точно указал адекватный и похожий на настоящий
                            адрес
                        </div>
                        <div>
                    <textarea className={this.isInvalid(message) ?
                                                            "form-input formError" :
                                                            "form-input"}
                              placeholder='Сообщение'
                              name='message'
                              type="text"
                              value={message.value}
                              valid={message.valid ? 1 : 0}
                              touched={message.touched ? 1 : 0}
                              onChange={event => this.onChange(event)}
                    ></textarea>
                            {this.isInvalid(message) ?
                                <span className='formError'>{message.errorMessage}</span> :
                                null
                            }
                        </div>
                        <div>Без сообщения форму отправлять бессмысленно</div>
                        <div className="form-checkbox">
                            <input type="checkbox" id="checkbox" name="checkbox"
                                   checked={checkbox.value}
                                   valid={checkbox.valid ? 1 : 0}
                                   touched={checkbox.touched ? 1 : 0}
                                   onChange={event => this.onChange(event)}
                            />
                            <label htmlFor="checkbox">Согласен с правилами обработки моих персональных данных</label>
                            {this.isInvalid(checkbox) ?
                                <span className='formError'>{checkbox.errorMessage}</span> :
                                null
                            }
                        </div>
                        <div>
                            Форма отправляется только, если отметка с согласием стоит
                        </div>
                        <button className="form-btn form-input"
                            disabled={!this.state.isFormValid}
                            onClick={this.onClick}
                        >Отправить сообщение
                        </button>
                        <div>У кнопки несколько состояний. Яркой и синей она становится когда все нормально и форму
                            можно
                            отправлять.
                        </div>
                    </form>
                </div>
            </section>
        )
    }
}
export default Form