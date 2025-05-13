import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const days = [
  { id: 0, label: "D" },
  { id: 1, label: "S" },
  { id: 2, label: "T" },
  { id: 3, label: "Q" },
  { id: 4, label: "Q" },
  { id: 5, label: "S" },
  { id: 6, label: "S" },
];

export default function HabitForm({ token, onSuccess, onCancel }) {
  const [name, setName] = useState("");
  const [selectedDays, setSelectedDays] = useState([]);
  const [loading, setLoading] = useState(false);

  function toggleDay(id) {
    if (selectedDays.includes(id)) {
      setSelectedDays(selectedDays.filter((d) => d !== id));
    } else {
      setSelectedDays([...selectedDays, id]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (name.trim() === "" || selectedDays.length === 0) {
      alert("Preencha o nome e selecione pelo menos um dia.");
      return;
    }

    setLoading(true);

    const body = { name, days: selectedDays };
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits", body, config)
      .then(() => {
        setName("");
        setSelectedDays([]);
        setLoading(false);
        onSuccess();
      })
      .catch((err) => {
        alert("Erro ao criar hábito.");
        console.error(err);
        setLoading(false);
      });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="nome do hábito"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={loading}
        required
      />

      <Days>
        {days.map((d) => (
          <Day
            key={d.id}
            selected={selectedDays.includes(d.id)}
            onClick={() => !loading && toggleDay(d.id)}
          >
            {d.label}
          </Day>
        ))}
      </Days>

      <Buttons>
        <CancelButton type="button" onClick={onCancel} disabled={loading}>
          Cancelar
        </CancelButton>
        <SaveButton type="submit" disabled={loading}>
          {loading ? <ClipLoader size={20} color="#fff" /> : "Salvar"}
        </SaveButton>
      </Buttons>
    </Form>
  );
}

const Form = styled.form`
  background: #ffffff;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 20px;

  input {
    width: 100%;
    height: 45px;
    font-size: 20px;
    padding: 0 11px;
    margin-bottom: 10px;
    border: 1px solid #d5d5d5;
    border-radius: 5px;

    &::placeholder {
      color: #dbdbdb;
    }

    &:disabled {
      background-color: #f2f2f2;
    }
  }
`;

const Days = styled.div`
  display: flex;
  gap: 4px;
  margin-bottom: 20px;
`;

const Day = styled.button`
  width: 30px;
  height: 30px;
  background: ${(props) => (props.selected ? "#cfcfcf" : "#ffffff")};
  color: ${(props) => (props.selected ? "#ffffff" : "#dbdbdb")};
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  font-size: 20px;
  cursor: pointer;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const CancelButton = styled.button`
  background: none;
  border: none;
  color: #52b6ff;
  font-size: 16px;
  cursor: pointer;

  &:disabled {
    color: #a0d2f3;
    cursor: default;
  }
`;

const SaveButton = styled.button`
  background-color: #52b6ff;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  padding: 8px 16px;
  height: 35px;
  cursor: pointer;

  &:disabled {
    opacity: 0.7;
    cursor: default;
  }
`;
