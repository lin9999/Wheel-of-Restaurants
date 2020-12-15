import './NormalLoginForm.css';
import { Form, Input, Button, Checkbox } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';

import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const API_ROOT = 'http://localhost:4000/api'
const instance = axios.create({
    baseURL: API_ROOT
})

function NormalLoginForm() {
	const history = useHistory()
	const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const login = async () => {
        const ret = await instance.post('/auth', { userName: userName, password: password })
        document.cookie = "RND=" + ret.data.RND
        if (ret.data.message === "Login") {
        	history.push('/WTF')
        }
    }

    const signUp = async () => {
        const ret = await instance.post('/signup', { userName: userName, password: password })
        console.log(ret.data.message)
    }

    const clearAll = async () => {
        await instance.delete('/danger/clearAll')
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
				<p style={{ "font-size":"20px", "margin-bottom":"0em" }}> or </p>
				<Button type="primary" htmlType="submit" className="login-form-button" onClick={signUp}>
					Register now!
				</Button>
				<a href="">Forgot password</a>		
				<Button type="danger" onClick={clearAll}>
				CLEAR
				</Button>
			</Form.Item>
		</Form>
	);
};

export default NormalLoginForm;