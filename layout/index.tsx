import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import styled from "styled-components";

const Layout = ({ children }: PropsWithChildren) => {

  return (
    <Container>
      <Navbar />
      <Content>
        <Sidebar />
        <MainContent>
          {children}
        </MainContent>
      </Content>
      {/**<Footer /> */}
    </Container>
  );
}

export default Layout;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`
const Content = styled.div`
  display: flex;
  flex-direction: row;
  height: calc(100vh - 60px);
`
const MainContent = styled.div`
  background-color: #FFF;
  border-radius: 10px 0 0 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
`;