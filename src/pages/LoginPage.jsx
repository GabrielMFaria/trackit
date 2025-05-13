import axios from "axios";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

export default function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function login(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", form)
      .then((res) => {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
        navigate("/hoje");
      })
      .catch(() => {
        alert("Erro ao fazer login! Verifique seus dados.");
        setLoading(false);
      });
  }

  return (
    <Container>
      <img src="/logo.png" alt="TrackIt" />
      <Form onSubmit={login}>
        <input
          name="email"
          type="email"
          placeholder="email"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="senha"
          value={form.password}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader color="#fff" size={20} /> : "Entrar"}
        </button>
      </Form>
      <a href="/cadastro">Não tem uma conta? Cadastre-se!</a>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 400px;
    margin-bottom: 32px;
  }

  a {
    margin-top: 25px;
    font-size: 14px;
    color: #52b6ff;
    text-align: center;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Form = styled.form`
  width: 100%;
  max-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 6px;

  input {
    height: 45px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #666568;
    border-radius: 5px;
    color: #000; 

    ::placeholder {
      color: #666;
    }
  }

  button {
    height: 45px;
    background-color: #52b6ff;
    color: #ffffff;
    font-size: 20px;
    border: none;
    border-radius: 5px;
    margin-top: 4px;

    display: flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    &:disabled {
      opacity: 0.7;
      cursor: default;
    }
  }
`;
