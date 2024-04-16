import React from "react";
import { Layout, theme } from "antd";
import CarouselSlider from "../../components/carousel/Carousel";
import FooterComponent from "../../components/footer/Footer";
const { Content, } = Layout;

const Home = () => {

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout style={{ backgroundColor: "#754545" }}>
      <Content
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <CarouselSlider />
      </Content>
      <Content></Content>
      <FooterComponent />
    </Layout>
  );
};
export default Home;
