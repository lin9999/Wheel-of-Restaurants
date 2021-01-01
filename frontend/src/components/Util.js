import { message } from 'antd'


export const displayStatus = (s) => {
    if (s.msg) {
        const { type, msg } = s
        const content = {
            content: msg,
            duration: 0.6
        }

        switch (type) {
            case 'success':
                message.success(content)
                break
            case 'info':
                message.info(content)
                break
            case 'danger':
            default:
                message.error(content)
                break
        }
    }
}