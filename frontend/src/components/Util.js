import axios from 'axios'
import { message } from 'antd'

const API_ROOT = 'http://localhost:4000/api'
// const API_ROOT = 'https://wheel-to-food.herokuapp.com/api'
const instance = axios.create({
    baseURL: API_ROOT
})


const displayStatus = (s) => {
    if (s.msg) {
        const { type, msg } = s
        const content = {
            content: msg,
            duration: 0.8
        }

        switch (type) {
            case 'success':
                message.success(content)
                break
            case 'info':
                message.info(content)
                break
            case 'error':
            default:
                message.error(content)
                break
        }
    }
}

const fadeOutEffect = (targetID, setVisible) => {
    var fadeTarget = document.getElementById(targetID);
    var fadeEffect = setInterval(function () {
        if (!fadeTarget.style.opacity) {
            fadeTarget.style.opacity = 1;
        }
        if (fadeTarget.style.opacity > 0) {
            fadeTarget.style.opacity -= 0.1;
        } else {
            clearInterval(fadeEffect)
            setVisible(false)
        }
    }, 75);
}

const getUrl = (foodList, restaurant) => {
    return foodList.find((food) => food._id === restaurant).mapurl
}


export { instance, displayStatus, fadeOutEffect, getUrl }