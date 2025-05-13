import styled from "styled-components";
import axios from "axios";
import { BsTrash } from "react-icons/bs";

const weekDays = [
  { id: 0, label: "D" },
  { id: 1, label: "S" },
  { id: 2, label: "T" },
  { id: 3, label: "Q" },
  { id: 4, label: "Q" },
  { id: 5, label: "S" },
  { id: 6, label: "S" },
];

export default function HabitItem({ habit, token, onDelete }) {
  function handleDelete() {
    if (!window.confirm("Deseja mesmo deletar este hábito?")) return;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .delete(`https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}`, config)
      .then(() => {
        onDelete();
      })
      .catch((err) => {
        alert("Erro ao deletar hábito.");
        console.error(err);
      });
  }

  return (
    <HabitBox>
      <div>
        <h3>{habit.name}</h3>
        <Days>
          {weekDays.map((day) => (
            <Day key={day.id} selected={habit.days.includes(day.id)}>
              {day.label}
            </Day>
          ))}
        </Days>
      </div>
      <BsTrash size={20} color="#666" onClick={handleDelete} style={{ cursor: "pointer" }} />
    </HabitBox>
  );
}

const HabitBox = styled.div`
  background: #ffffff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  position: relative;
  display: flex;
  justify-content: space-between;

  h3 {
    font-size: 20px;
    color: #666666;
    margin-bottom: 8px;
  }
`;

const Days = styled.div`
  display: flex;
  gap: 4px;
`;

const Day = styled.div`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.selected ? "#cfcfcf" : "#ffffff")};
  color: ${(props) => (props.selected ? "#ffffff" : "#dbdbdb")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
