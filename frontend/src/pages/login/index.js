import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Row, Col, Spin, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import useApi from '../../hooks/useApi';
import { createSignInRequest } from '../../api/auth.api';
import { useAppDispatch } from '../../store';
import './index.css';
import { signIn } from '../../reducers/auth.reducer';

const { Title } = Typography;

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();


    const [{
        loading: isSignInLoading,
        data: signInData,
        isSuccess: isSuccessSignIn,
        error: errorSignIn
    }, executeSignInApi] = useApi();

    useEffect(() => {
        if (isSuccessSignIn === true) {
            let { accessToken } = signInData;
            if (accessToken) {
                dispatch(signIn(accessToken));
                navigate("/bookings");
            }
        }
        else if(isSuccessSignIn === false && errorSignIn){
            messageApi.error(errorSignIn);
        }
    }, [dispatch, navigate, signInData, isSuccessSignIn, errorSignIn, messageApi])

    function onFinish(values) {
        executeSignInApi(createSignInRequest(values));
    }

    return (
        <div className="login">
            {contextHolder}
            <Spin spinning={isSignInLoading}>
                <Row justify="space-around" align="middle" gutter={[32, 32]} className={'login-row'}>
                    <Col xs={20} sm={18} md={10} lg={12} xl={10} xxl={10} >
                        <Title level={3}>Login</Title>
                        <Form
                            name="login"
                            className="login-form"
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
                                <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
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
                                />
                            </Form.Item>

                            <Form.Item>
                                <Row justify="center" align="middle" >
                                    <Col span={18}>
                                        <Button type="primary" size='large' htmlType="submit" className="login-form-button">
                                            Log in
                                        </Button>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Spin>
        </div>
    );
}
