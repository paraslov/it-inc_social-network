import s from './WelcomePage.module.css'
import papyrusImg from '../../../assets/img/decor/papirus2.png'
import eyesImg from '../../../assets/img/decor/eyes.png'


export const WelcomePage = () => {
    return (
        <div className={s.welcomeContainer}>
            <img className={s.papyrus} src={papyrusImg} alt="papyrus"/>
            <img src={eyesImg} className={s.eyes} alt="eyes"/>
            <button className={s.btn}>JOIN US</button>
        </div>
    )
}