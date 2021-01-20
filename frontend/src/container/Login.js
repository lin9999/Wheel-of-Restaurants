import './Login.css'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { instance, displayStatus } from '../components/Util'

function Login() {
	const history = useHistory()
	const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

	const getUserInfo = async (UID) => {
		const ret = await instance.get('/getInfo?UID=' + UID)
		if (ret.data.message === "Success") {
			return ret.data.userInfo
		} else {
			displayStatus({
				type: 'error',
				msg: 'getUserInfo error!'
			})
		}
	}

    const login = async () => {
    	if (userName && password) {
	        const ret = await instance.post('/auth', { userName: userName, password: password })
	        if (ret.data.message === "Success") {
	        	displayStatus({
	        		type: 'success', 
	        		msg: 'Welcome!'
	        	})

	        	const info = await getUserInfo(ret.data.UID)
	        	sessionStorage.setItem('user', JSON.stringify({UID: ret.data.UID, ...info}))
	        	history.push({
	    			pathname: "/WTF"
	    		})
	        } else {
	        	displayStatus({
	        		type: 'error', 
	        		msg: ret.data.message
	        	})
	        }
	    }
    }

    const signUp = async () => {
    	if (userName && password) {
	        const ret = await instance.post('/signup', { userName: userName, password: password })
	        if (ret.data.message === "Success") {
		        login()
	        } else {
	        	displayStatus({
	        		type: 'error', 
	        		msg: ret.data.message
	        	})
	        }
    	}
    }

	return(
		<div className="formwrapper">
			<Form
				name="normal_login"
				className="login-form"
				initialValues={{
					remember: true,
				}}
				onFinishFailed={()=>{ 
					displayStatus({
		                type: 'error',
		                msg: 'Please enter your Username and Password.'
		            })
             	}}
			>
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Please input your Username!',
						},
					]}
				>
					<Input prefix={<UserOutlined className="site-form-item-icon" />} 
						   placeholder="Username" 
						   onChange={(e) => {setUserName(e.target.value)}}/>
				</Form.Item>
				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Please input your Password!',
						},
					]}
				>
					<Input
						prefix={<LockOutlined className="site-form-item-icon" />}
						type="password"
						placeholder="Password"
						onChange={(e) => {setPassword(e.target.value)}}
					/>
				</Form.Item>
				<Form.Item>
					<Button type="primary" htmlType="submit" className="login-form-button" onClick={login}>
						Log in
					</Button>
					<p style={{ "fontSize":"20px", "marginBottom":"0em" }}> or </p>
					<Button type="primary" htmlType="submit" className="login-form-button" onClick={signUp}>
						Register now!
					</Button>
					<a href="TODO">Forgot password</a>		
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;