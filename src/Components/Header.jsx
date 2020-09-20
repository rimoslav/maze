import React, { useEffect } from "react";
import { StyledHeader, ColumnWrapper, HomeButton } from "../Styled/Styled.jsx";

export default function Header({ level, setLevel, ...props }) {
  return (
    <StyledHeader>
      <ColumnWrapper>
        <HomeButton
          onClick={() => {
            setLevel(0);
            props.history.push("/");
          }}
        >
          HOME
        </HomeButton>
        {level ? "LEVEL " + level : "SETTINGS"}
      </ColumnWrapper>
    </StyledHeader>
  );
}
