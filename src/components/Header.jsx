import styled from "styled-components";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

export default function Header() {
  const { user } = useContext(UserContext);

  return (
    <Topo data-identifier="top-bar">
      <h1>TrackIt</h1>
      <img src={user?.image} alt="avatar" data-identifier="avatar" />
    </Topo>
  );
}

const Topo = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: #126ba5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 18px;
  z-index: 2;

  h1 {
    font-family: 'Playball', cursive;
    font-size: 39px;
    color: #fff;
  }

  img {
    width: 51px;
    height: 51px;
    border-radius: 50%;
    object-fit: cover;
  }
`;
