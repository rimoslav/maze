import React, { useState } from "react";
import SelectTable from "../Components/SelectTable";
import {
  ColumnWrapper,
  Inputs,
  InputWrapper,
  Label,
  StyledInput,
  StartButton,
  StartText,
  ButtonsRow,
  Button,
  Text,
  Info,
} from "../Styled/Styled";

export default function Home(props) {
  let [settings, setSettings] = useState(1);
  let [startOrEnd, setStartOrEnd] = useState(0);
  let [width, setWidth] = useState(10);
  let [height, setHeight] = useState(10);
  if (settings === 1) {
    return (
      <ColumnWrapper home={true}>
        <Inputs>
          <InputWrapper>
            <Label># of rows</Label>
            <StyledInput
              value={width}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onChange={(e) => setWidth(parseInt(e.target.value))}
              type="number"
              min={3}
              max={50}
            />
          </InputWrapper>
          <InputWrapper>
            <Label># of columns</Label>
            <StyledInput
              value={height}
              onKeyDown={(e) => {
                e.preventDefault();
                return false;
              }}
              onChange={(e) => setHeight(parseInt(e.target.value))}
              type="number"
              min={3}
              max={50}
            />
          </InputWrapper>
        </Inputs>
        <ColumnWrapper>
          <Button
            blue={true}
            narrow={true}
            selected={props.algorithm === 1}
            onClick={() => {
              props.setAlgorithm(1);
              localStorage.setItem("algorithm", 1);
            }}
          >
            <Text>Random Mouse</Text>
          </Button>
          <Button
            blue={true}
            narrow={true}
            selected={props.algorithm === 2}
            onClick={() => {
              props.setAlgorithm(2);
              localStorage.setItem("algorithm", 2);
            }}
          >
            <Text>Tremaux</Text>
          </Button>
          <Button
            blue={true}
            narrow={true}
            selected={props.algorithm === 3}
            onClick={() => {
              props.setAlgorithm(3);
              localStorage.setItem("algorithm", 3);
            }}
          >
            <Text>A*</Text>
          </Button>
        </ColumnWrapper>
        <ButtonsRow>
          <Button
            onClick={() => {
              props.setSize([width, height]);
              props.setStart([-1, -1]);
              props.setEnd([-1, -1]);
              localStorage.setItem("size", [width, height]);
              setSettings(settings + 1);
            }}
            disabled={width < 3 || width > 50 || height < 3 || height > 50}
          >
            <Text>Next</Text>
          </Button>
          <Button
            onClick={() => {
              props.setSize([10, 10]);
              props.setStart([0, 4]);
              props.setEnd([9, 4]);
              props.history.push("/level/start/1");
            }}
          >
            <Text>Skip</Text>
          </Button>
        </ButtonsRow>
      </ColumnWrapper>
    );
  } else if (settings === 2) {
    return (
      <ColumnWrapper home={true}>
        <Info>
          {startOrEnd < 2
            ? `Click on any field to select ${
                !startOrEnd ? "start" : "end"
              } position.`
            : "You're good to go."}
        </Info>
        <SelectTable
          size={props.size}
          start={props.start}
          setStart={props.setStart}
          end={props.end}
          setEnd={props.setEnd}
          startOrEnd={startOrEnd}
          setStartOrEnd={setStartOrEnd}
          setSettings={setSettings}
        />
        <Button
          onClick={() => {
            if (!startOrEnd) {
              setStartOrEnd(1);
            } else {
              props.history.push("/level/start/1");
            }
          }}
          disabled={startOrEnd !== 2}
        >
          <Text>Next</Text>
        </Button>
      </ColumnWrapper>
    );
  } else {
    return (
      <StartButton isHome onClick={() => props.history.push("/level/start/1")}>
        <StartText>Start</StartText>
      </StartButton>
    );
  }
}
