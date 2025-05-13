import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

export default function Footer() {
  const location = useLocation();

  return (
    <FooterContainer>
      <StyledLink to="/habitos" $active={location.pathname === "/habitos"}>Hábitos</StyledLink>
      <StyledLink to="/hoje" $active={location.pathname === "/hoje"}>Hoje</StyledLink>
    </FooterContainer>
  );
}

const FooterContainer = styled.footer`
  width: 100%;
  height: 70px;
  background-color: #ffffff;

  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 10;

  display: flex;
  justify-content: space-around;
  align-items: center;

  border-top: 1px solid #ccc;
`;

const StyledLink = styled(Link)`
  font-size: 18px;
  color: #ffffff;
  text-decoration: none;
  width: 100%;
  text-align: center;
  line-height: 70px;
  background-color: ${(props) => (props.$active ? "#52B6FF" : "#ffffff")};
  color: ${(props) => (props.$active ? "#ffffff" : "#52B6FF")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #52b6ff;
    color: #ffffff;
  }
`;
