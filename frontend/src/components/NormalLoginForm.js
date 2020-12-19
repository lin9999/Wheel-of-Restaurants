import './NormalLoginForm.css'
import { Form, Input, Button } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons'

import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import { parse as cookieParser} from 'cookie'

import User from '../classes/User.js'

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
    baseURL: API_ROOT
})

function NormalLoginForm() {
	const history = useHistory()
	const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")

	const getUserInfo = async () => {
		const cookies = cookieParser(document.cookie)
		const ret = await instance.get('/getInfo?RND=' + cookies.RND)
		return ret.data
	}

    const login = async () => {
        const ret = await instance.post('/auth', { userName: userName, password: password })
        if (ret.data.message === "Success") {
	        document.cookie = "RND=" + ret.data.RND
        	const info = await getUserInfo()
        	sessionStorage.setItem('user', JSON.stringify(info))
        	history.push({
    			pathname: "/WTF"
    		})
        } else {
        	alert(ret.data.message)
        }
    }

    const signUp = async () => {
    	if (userName && password) {
	        const ret = await instance.post('/signup', { userName: userName, password: password })
	        if (ret.data.message === "Success") {
		        console.log(ret.data.message)
	        } else {
	        	alert(ret.data.message)
	        }
    	}
    }

    const clearAll = async () => {
    	sessionStorage.removeItem('user')
        await instance.delete('/danger/clearAll')
    }

    const printCookie = () => {
    	alert(document.cookie)
    }

	const onFinish = (values) => {
		console.log('Received values of form: ', values)
	}

	return(
		<Form
			name="normal_login"
			className="login-form"
			initialValues={{
				remember: true,
			}}
			onFinish={onFinish}
			onFinishFailed={()=>{ alert("Username and Password should not be empty!") }}
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
				<Button type="danger" onClick={clearAll}>
				CLEAR
				</Button>
				<Button type="danger" onClick={printCookie}>
				COOKIE
				</Button>
			</Form.Item>
		</Form>
	);
};

export default NormalLoginForm;