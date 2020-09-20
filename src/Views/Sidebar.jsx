import React from "react";
import { StyledSideBar, Row, Results, Result, Image } from "../Styled/Styled";

export default function Sidebar(props) {
  return (
    <StyledSideBar>
      <Row>
        <Result>Level</Result>
        <Result>Algorithm</Result>
        <Result>Time</Result>
        <Result>Iterations</Result>
        <Result>Solved</Result>
      </Row>
      <Results>
        {props.results.map((result, index) => {
          return (
            <Row key={index}>
              <Result>{result[0]}</Result>
              <Result>
                {result[1] === 1
                  ? "Las Vegas"
                  : result[1] === 2
                  ? "Tremaux"
                  : "A-Star"}
              </Result>
              <Result>{result[2]}</Result>
              <Result>{result[3]}</Result>
              <Result>
                <Image src={`/${result[4]}.png`} />
              </Result>
            </Row>
          );
        })}
      </Results>
    </StyledSideBar>
  );
}
