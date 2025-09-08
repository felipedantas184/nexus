import {  FaBrain, FaHouse, FaVideo } from "react-icons/fa6";
import styled from "styled-components";
import Link from "next/link";
import { FaChalkboardTeacher } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import { BiLogOut } from "react-icons/bi";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";

const Sidebar = () => {
  const { logout, user } = useAuth()
  const router = useRouter()

  return (
    <Container>
      <Wrapper>
        <Menu>
          <Item><PageLink href={'/'}><FaHouse size={20} color="#F6F6F6" />Página Inicial</PageLink></Item>
          <Item><PageLink href={'/'}><FaBrain size={20} color="#F6F6F6" />Psicólogos</PageLink></Item>
          <Item><PageLink href={'/'}><FaChalkboardTeacher size={20} color="#F6F6F6" />Monitores</PageLink></Item>
          <Item><PageLink href={'/videos'}><FaVideo size={20} color="#F6F6F6" />Instruções</PageLink></Item>
          <Item><PageLink href={'/'}><RxAvatar size={20} color="#F6F6F6" />Meu Perfil</PageLink></Item>
        </Menu>
        <Menu>
          <LogoutButton
            onClick={() => {
              logout()
              router.push('/authentication/signin')
            }}
          ><LogoutItem><BiLogOut size={20} color="#F6F6F6" />Logout</LogoutItem></LogoutButton>
        </Menu>
      </Wrapper>
    </Container>
  );
}

export default Sidebar;



const Container = styled.nav`
  background: #0A3D62;  
  min-width: 250px;
  height: 100%;
  
  transition: 0.7s ease-in-out;
`
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 8px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  gap: 8px;
`
const Menu = styled.ul`
  width: 100%;  
  list-style: none;
  text-align: left;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
`
const Item = styled.li`
  color: #F6F6F6;
  font-size: 16px;
  font-weight: 500;
  width: 80%;
  
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  user-select: none;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #8360C3;
    transition: 0.2s ease-in-out;
  }
  &::after {
    display:block;
    content: '';
    border-bottom: solid 2px #8360C3;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`
const PageLink = styled(Link)`
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
`
const LogoutItem = styled.div`
  padding: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  font-family: 'Montserrat', sans-serif;
`
const LogoutButton = styled.div`
  color: #F6F6F6;
  font-size: 16px;
  font-weight: 500;
  width: 80%;
  
  text-decoration: none;
  cursor: pointer;
  -webkit-tap-highlight-color:  rgba(255, 255, 255, 0); 
  user-select: none;
  transition: 0.2s ease-in-out;

  &:hover {
    color: #8360C3;
    transition: 0.2s ease-in-out;
  }
  &::after {
    display:block;
    content: '';
    border-bottom: solid 2px #8360C3;  
    transform: scaleX(0);  
    transition: transform 250ms ease-in-out;
  }
  &:hover::after {
    transform: scaleX(1);
  }
`