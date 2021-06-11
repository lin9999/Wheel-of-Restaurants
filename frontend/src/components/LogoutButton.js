import './LogoutButton.css'
import { Button } from 'antd'
import { useHistory } from 'react-router-dom'


function LogoutButton() {
    const history = useHistory()

    const logout = () => {
        sessionStorage.removeItem('user')
        history.push({
            pathname: "/"
        })
    }


    return (
        <Button className="LOGOUT" type="primary" onClick={logout}> LOGOUT </Button>
    ); 

};

export default LogoutButton;