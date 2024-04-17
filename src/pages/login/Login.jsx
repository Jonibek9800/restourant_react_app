import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Layout } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "../../store/features/auth/auth";
import { useEffect } from "react";
const Login = () => {
  const dispatch = useDispatch();
  const errorMessage = useSelector(state => state.user.errorMessage)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    rememberMe: false
  })
  const [validate, setValidate] = useState({
    username: false,
    password: false,
  })
  const [error, setError] = useState(null);
  useEffect(() => {
    setError(errorMessage)
  }, [errorMessage])
  const onFinish = () => {
    dispatch(auth(formData))
  };

  const userNameStyle = () => validate.username && formData.username === "" ? { padding: 10, margin: "10px 0px", borderColor: 'red' } : { padding: 10, margin: "10px 0px", }

  const passwordStyle = () => validate.password && formData.password === "" ? { padding: 10, margin: "10px 0px", borderColor: 'red' } : { padding: 10, margin: "10px 0px", }


  const disableChange = () => {
    if (formData.username === "" || formData.password === "") {
      return true
    } else {
      return false
    }
  }
  return (
    <Layout style={{ height: "100vh" }}>
      <Form
        name="normal_login"
        style={{
          margin: "auto",
          minWidth: 500,
          border: "1px solid grey",
          padding: "50px 20px",
          borderRadius: 15,
          textAlign: "center",
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item>
          <h1>Login</h1>
        </Form.Item>
        <Form.Item
          name="username"
        >
          <Input
            onFocus={() => setValidate({ ...validate, username: false })}
            onBlur={() => setValidate({ ...validate, username: true })}
            prefix={<UserOutlined className="site-form-item-icon" />}
            onChange={(event) => setFormData({ ...formData, username: event.target.value })}
            value={formData.username}
            placeholder="Username"
            style={userNameStyle()}
          />
          {validate.username && formData.username === "" ? <span style={{ color: 'red' }}>Пожалуйста заполните это поле!</span> : ""}
        </Form.Item>
        <Form.Item
          name="password"
        >
          <Input.Password
            onChange={(event) => setFormData({ ...formData, password: event.target.value })}
            value={formData.password}
            onFocus={() => setValidate({ ...validate, password: false })}
            onBlur={() => setValidate({ ...validate, password: true })}
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            style={passwordStyle()}
          />
          {errorMessage != null ? <span style={{ color: 'red' }}>{errorMessage}</span> : validate.password && formData.password === "" ? <span style={{ color: 'red' }}>Пожалуйста заполните это поле!</span> : ""}
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox onChange={(event) => setFormData({ ...formData, rememberMe: event.target.value })} value={formData.rememberMe}>Remember me</Checkbox>
          </Form.Item>

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            disabled={disableChange()}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ padding: "0px 30px", margin: 10 }}
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </Layout>
  );
};
export default Login;
