import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import styled from "styled-components";

export default function Cadastro() {
  const [form, setForm] = useState({ email: "", name: "", image: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function signUp(e) {
    e.preventDefault();
    setLoading(true);

    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up", form)
      .then(() => navigate("/"))
      .catch(() => {
        alert("Erro ao cadastrar! Verifique os dados.");
        setLoading(false);
      });
  }

  return (
    <Container>
      <img src="/logo.png" alt="TrackIt" />
      <Form onSubmit={signUp}>
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
        <input
          name="name"
          type="text"
          placeholder="nome"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <input
          name="image"
          type="url"
          placeholder="foto (url)"
          value={form.image}
          onChange={handleChange}
          disabled={loading}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? <ClipLoader color="#fff" size={20} /> : "Cadastrar"}
        </button>
      </Form>
      <a href="/">Já tem uma conta? Faça login!</a>
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
