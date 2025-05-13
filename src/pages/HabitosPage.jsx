import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {UserContext} from "../contexts/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import HabitForm from "../components/HabitForm";
import HabitItem from "../components/HabitItem";

export default function HabitsPage() {
  const { user } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  function fetchHabits() {
    setLoading(true);
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", config)
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Erro ao carregar hábitos.");
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <>
      <Header />
      <Container>
        <Top>
          <h2>Meus hábitos</h2>
          <button onClick={() => setShowForm(true)}>+</button>
        </Top>

        {showForm && (
          <HabitForm
            token={user.token}
            onSuccess={() => {
              setShowForm(false);
              fetchHabits();
            }}
            onCancel={() => setShowForm(false)}
          />
        )}

        {loading ? (
          <p>Carregando...</p>
        ) : habits.length === 0 ? (
          <NoHabits>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!
          </NoHabits>
        ) : (
          habits.map((habit) => (
            <HabitItem
              key={habit.id}
              habit={habit}
              token={user.token}
              onDelete={fetchHabits}
            />
          ))
        )}
      </Container>
      <Footer />
    </>
  );
}

const Container = styled.div`
  padding: 90px 18px 100px;
  background: #f2f2f2;
  min-height: 100vh;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  h2 {
    font-size: 23px;
    color: #126ba5;
  }

  button {
    width: 40px;
    height: 35px;
    font-size: 27px;
    color: white;
    background: #52b6ff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const NoHabits = styled.p`
  font-size: 18px;
  color: #666666;
  line-height: 22px;
`;

