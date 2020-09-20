import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Table from "../Components/Table";
import {
  Wrapper,
  ColumnWrapper,
  ButtonsRow,
  Button,
  Text,
  Info,
} from "../Styled/Styled";

export default function Level(props) {
  let [time, setTime] = useState("");
  let [iterations, setIterations] = useState(0);
  let [visitedFields, setVisitedFields] = useState([]);
  let [solved, setSolved] = useState(false);
  return (
    <Wrapper>
      <ColumnWrapper>
        <Table
          size={props.size}
          level={props.level}
          start={props.start}
          end={props.end}
          current={props.current}
          setCurrent={props.setCurrent}
          blocks={props.blocks}
          visitedFields={visitedFields}
          replayRunning={props.replayRunning}
          setReplayRunning={props.setReplayRunning}
          disabled={time !== ""}
        />
        <Info>
          {iterations === 0
            ? "Click start button to start the algorithm."
            : solved
            ? "That took " + time + " and " + iterations + " iterations"
            : "No solution. That took " +
              time +
              " and " +
              iterations +
              " iterations."}
        </Info>
        <ButtonsRow>
          <Button
            onClick={() => {
              const solution = props.solve(
                props.start,
                props.end,
                props.blocks,
                props.size,
                props.level
              );
              setTime(solution[2]);
              setIterations(solution[3]);
              setSolved(solution[4]);
              setVisitedFields(solution[5]);
              props.setReplayRunning(false);
              props.setResults((results) => [...results, solution]);
            }}
          >
            <Text>Start</Text>
          </Button>
          <Button
            onClick={() => {
              if (solved) {
                props.setReplayRunning(!props.replayRunning);
              } else {
                alert("No solution");
              }
            }}
            disabled={time === "" || solved === false}
          >
            <Text>{props.replayRunning ? "Stop" : "Replay"}</Text>
          </Button>
        </ButtonsRow>
        <Button
          onClick={() => {
            props.setLevel(props.level + 1);
            props.history.push(`/level/start/${props.level + 1}`);
            props.setReplayRunning(false);
            setVisitedFields([]);
            setIterations(0);
            setTime("");
          }}
          disabled={time === "" || props.replayRunning}
        >
          <Text>Next Level</Text>
        </Button>
      </ColumnWrapper>
      <Sidebar results={props.results} />
    </Wrapper>
  );
}
