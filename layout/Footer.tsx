import Image from "next/image";
import { FaCreditCard, FaEnvelope, FaFacebook, FaInstagram, FaMobile, FaTruck } from "react-icons/fa6";
import styled from "styled-components";

const Footer = () => {
  return (
    <Container>
      <Copyright>
        <CopyrightSpan>Felipe Dantas @ 2024</CopyrightSpan>
      </Copyright>
    </Container>
  );
}

export default Footer;



const Container = styled.section`
  background-color: #13131A;

  display: flex;
  flex-direction: column;
  align-items: center;
`
const Copyright = styled.div`
  background-color: #13131A;
  width: 100%;
  padding: 12px 0;
	margin-left: auto;
	margin-right: auto;

	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: center;
`
const CopyrightSpan = styled.span`
  color: #E5E5E5;
  font-size: 14px;
  text-align: center;
`