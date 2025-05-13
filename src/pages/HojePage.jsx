import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { UserContext } from "../contexts/UserContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TodayPage() {
  const { user } = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchTodayHabits();
  }, []);

  function fetchTodayHabits() {
    setLoading(true);
    axios
      .get("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today", {
        headers: { Authorization: `Bearer ${user.token}` },
      })
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        alert("Erro ao carregar hábitos de hoje.");
        console.error(err);
        setLoading(false);
      });
  }

  function toggleHabit(habit) {
    const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/${habit.done ? "uncheck" : "check"}`;
    axios
      .post(url, {}, { headers: { Authorization: `Bearer ${user.token}` } })
      .then(() => fetchTodayHabits())
      .catch((err) => {
        alert("Erro ao atualizar hábito.");
        console.error(err);
      });
  }

  const doneCount = habits.filter((h) => h.done).length;
  const percentage = habits.length ? Math.round((doneCount / habits.length) * 100) : 0;

  return (
    <>
      <Header />
      <Container>
        <Top>
          <h2 data-identifier="today-infos">
            {dayjs().locale("pt-br").format("dddd, DD/MM").replace("-feira", "")}
          </h2>
          <Subtitle data-identifier="today-infos" className={doneCount > 0 ? "green" : ""}>
            {doneCount === 0
              ? "Nenhum hábito concluído ainda"
              : `${percentage}% dos hábitos concluídos`}
          </Subtitle>
        </Top>

        {loading ? (
          <p>Carregando...</p>
        ) : (
          habits.map((h) => (
            <Habit key={h.id}>
              <div>
                <h3 data-identifier="today-habit-name">{h.name}</h3>
                <p>
                  Sequência atual:{" "}
                  <span data-identifier="today-habit-sequence" className={h.done ? "green" : ""}>
                    {h.currentSequence} dias
                  </span>
                </p>
                <p>
                  Seu recorde:{" "}
                  <span
                    data-identifier="today-habit-record"
                    className={
                      h.currentSequence === h.highestSequence && h.highestSequence > 0
                        ? "green"
                        : ""
                    }
                  >
                    {h.highestSequence} dias
                  </span>
                </p>
              </div>
              <CheckButton
                data-identifier="done-habit-btn"
                onClick={() => toggleHabit(h)}
                $done={h.done}
              >
                ✓
              </CheckButton>
            </Habit>
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
  margin-bottom: 28px;

  h2 {
    font-size: 23px;
    color: #126ba5;
    text-transform: capitalize;
  }
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: #bababa;

  &.green {
    color: #8fc549;
  }
`;

const Habit = styled.div`
  background: #fff;
  border-radius: 5px;
  padding: 13px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 20px;
    color: #666;
    margin-bottom: 7px;
  }

  p {
    font-size: 13px;
    color: #666;
    line-height: 16px;

    .green {
      color: #8fc549;
    }
  }
`;

const CheckButton = styled.button`
  width: 69px;
  height: 69px;
  background: ${(props) => (props.$done ? "#8FC549" : "#EBEBEB")};
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  font-size: 35px;
  color: #fff;
  cursor: pointer;
`;
