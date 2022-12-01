import { Button, Col, Layout, Row, Typography } from "antd";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";
import { signOut } from "../reducers/auth.reducer";
import { getIsAuthenticated } from "../selectors/auth.selectors";
import { useAppDispatch } from "../store";

import './index.css';

const { Content } = Layout;
const { Title } = Typography;

export default function IndexLayout() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useSelector(getIsAuthenticated);

  function handleLogOut() {
    dispatch(signOut());
  }
  return (
    <Layout className="full-height">
      <Row justify={'center'}>
        <Col xs={20} sm={18} md={18} lg={16} xl={16} xxl={16}>
          <Row className="index-content">
            <Col xs={20} sm={18} md={18} lg={16} xl={16} xxl={16}>
              <Title level={1} className="head-title">Parking App</Title>
            </Col>
            <Col xs={4} sm={6} md={6} lg={8} xl={8} xxl={8} >
              {isAuthenticated && <Button onClick={handleLogOut} className="logout-button">Logout</Button>}
            </Col>
          </Row>
          <Content><Outlet /></Content>
        </Col>
      </Row>
    </Layout>
  );
}