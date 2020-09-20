import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

export const StyledHeader = styled.div`
  position: absolute;
  top: 40px;
  width: calc(100vw - 40px);
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f6f6f6;
  font-size: 20px;
  font-weight: bold;
  font-family: Helvetica;
  padding: 20px 0;
  @media (max-width: 960px) {
    width: 500px;
    max-width: calc(100vw - 40px);
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: ${(props) => (props.column ? "column" : "row")}
  align-items: center;
  justify-content: center;
  height: fit-content;
  margin-top: 170px;
  @media (max-width: 960px) {
    flex-direction: column;
  }
`;

export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  margin-top: ${(props) => (props.home ? "170px" : "")};
`;

export const ButtonsRow = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 10px 0 30px 0;
  width: 360px;
  max-width: calc(100vw - 40px);
  @media (max-width: 400px) {
    flex-direction: column;
    height: 140px;
  } ;
`;

export const Button = styled.button`
  width: ${(props) =>
    props.blue ? "334px" : props.narrow ? "200px" : "150px"};
  max-width: ${(props) => (!props.blue ? "50%" : "calc(100vw - 40px)")};
  height: ${(props) => (props.narrow ? "50px" : "60px")};
  max-height: ${(props) =>
    props.narrow ? "calc(25vw - 8px)" : "calc(40vw - 16px)"};
  border: ${(props) => (props.selected ? "2px solid #000" : "1px outset #000")};
  border-radius: 3px;
  margin: auto;
  margin-bottom: ${(props) => (props.blue ? "15px" : "0px")};
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(props) =>
    props.disabled
      ? `linear-gradient(153deg, rgba(244,133,133,1) 0%, rgba(250,140,120,1) 100%);`
      : props.blue && props.selected
      ? `linear-gradient(153deg,rgb(52 109 169) 0%,rgb(36 126 144) 100%);`
      : props.blue
      ? `linear-gradient(153deg,rgb(83 165 249) 0%,rgb(98 171 185) 100%);`
      : `linear-gradient(153deg, rgba(251, 122, 122, 1) 0%, rgba(203, 81, 81, 1) 100%)`};
  box-shadow: ${(props) =>
    props.disabled || props.blue
      ? "0px 0px 4px 3px rgba(0, 0, 0, 0.25);"
      : "0px 0px 5px 3px rgba(0, 0, 0, 0.75);"};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  @media (max-width: 400px) {
	width: 300px;
	margin-bottom: 12px;
    max-width: calc(100vw - 40px);
  } ;
  &:active {
    border-color: ${(props) => (props.disabled ? "#000" : "#fff")};
    background: ${(props) =>
      props.disabled
        ? `linear-gradient(153deg, rgba(251, 122, 122, 1) 0%, rgba(203, 81, 81, 1) 100%);`
        : props.blue
        ? `linear-gradient(153deg,rgb(80 142 206) 0%,rgb(70 149 165) 100%);`
        : `linear-gradient(312deg, rgba(255, 122, 122, 1) 0%, rgba(218, 87, 87, 1) 100%);`}
    box-shadow: inset 0px 0px 5px 3px rgba(255, 255, 255, 0.35);
  }
`;
export const Text = styled.div`
  font-size: 15px;
  font-weight: bold;
  font-family: Helvetica;
  text-transform: uppercase;
  color: white;
`;

export const StartButton = styled.button`
  width: 300px;
  max-width: calc(99vw - 39px);
  height: 100px;
  max-height: calc(33vw - 13px);
  border: 3px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(
    153deg,
    rgba(251, 122, 122, 1) 0%,
    rgba(203, 81, 81, 1) 100%
  );
  box-shadow: 0px 0px 5px 3px rgba(0, 0, 0, 0.75);
  margin-top: 50vh;
  cursor: pointer;
  &:active {
    border-color: #fff;
    background: linear-gradient(
      312deg,
      rgba(255, 122, 122, 1) 0%,
      rgba(218, 87, 87, 1) 100%
    );
    box-shadow: inset 0px 0px 5px 3px rgba(255, 255, 255, 0.35);
  }
`;
export const StartText = styled.div`
  font-size: 24px;
  font-weight: bold;
  font-family: Helvetica;
  text-transform: uppercase;
  color: white;
`;

export const Info = styled.div`
  font-size: 16px;
  font-weight: bold;
  font-family: Helvetica;
  color: black;
  text-align: center;
  margin: 20px;
`;

export const StyledSideBar = styled.div`
  width: 400px;
  max-width: calc(100vw - 40px);
  height: fit-content;
  position: relative;
  display: flex;
  flex-direction: column;
  margin-left: 30px;
  @media (max-width: 960px) {
    margin: auto;
    margin-top: 30px;
  }
  border: 1px outset #000;
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  height: 34px;
`;

export const Results = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Result = styled.div`
  width: 20%;
  border: 1px outset #000;
  height: 34px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: bold;
  font-family: Helvetica;
  @media (max-width: 400px) {
    font-size: 11px;
  }
  @media (max-width: 320px) {
    font-size: 10px;
  } ;
`;

export const Image = styled.img`
  width: 22px;
  height: 22px;
`;

export const HomeButton = styled.button`
  background: transparent;
  width: 150px;
  height: 50px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
  font-family: Helvetica;
  margin-bottom: 10px;
  :active {
    border: 1px solid #aaa;
    background: #aaa;
  }
`;

export const TableField = styled.div`
  width: 50px;
  height: 50px;
  color: ${(props) =>
    props.current || props.blockedField || props.startField || props.endField
      ? "#eee"
      : "#777"};
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${(props) =>
    props.size ? `calc(100% / ${props.size[0]})` : "50px"};
  max-height: ${(props) =>
    props.size ? `calc((100vw - 40px) / ${props.size[0]})` : "50px"};
  box-sizing: border-box;
  border: 1px outset rgba(0, 0, 0, 0.6);
  border-top-width: ${(props) => (props.coordinates[0] === 0 ? "2px" : "1px")};
  border-right-width: ${(props) =>
    props.coordinates[1] === props.size[1] - 1 ? "2px" : "1px"};
  border-bottom-width: ${(props) =>
    props.coordinates[0] === props.size[0] - 1 ? "2px" : "1px"};
  border-left-width: ${(props) => (props.coordinates[1] === 0 ? "2px" : "1px")};
  background: ${(props) =>
    props.blockedField
      ? "linear-gradient(45deg, #333 0%, #777 100%)"
      : props.current
      ? "linear-gradient(135deg, rgba(51,84,116,1) 0%, rgba(73,126,171,1) 100%);"
      : props.startField
      ? "linear-gradient(135deg, #95d637 0%, #82b040 100%)"
      : props.endField
      ? "linear-gradient(211deg, #cf6262 0%, #fb7a7a 100%)"
      : props.selectTable &&
        (props.coordinates[0] === 0 ||
          props.coordinates[0] === props.size[0] - 1 ||
          props.coordinates[1] === 0 ||
          props.coordinates[1] === props.size[1] - 1)
      ? "#fff"
      : props.selectTable
      ? "#555"
      : "linear-gradient(70deg, #eee 0%, #fff 100%)"};
  flex: auto;
  box-shadow: ${(props) =>
    !(props.blockedField || props.startField || props.endField)
      ? "inset 0px 0px 1px 0px rgb(157 193 197);"
      : props.selectTable &&
        (props.coordinates[0] === 0 ||
          props.coordinates[0] === props.size[0] - 1 ||
          props.coordinates[1] === 0 ||
          props.coordinates[1] === props.size[1] - 1)
      ? "#fff"
      : props.selectTable
      ? "linear-gradient(45deg, #ddd 0%, #fff 100%)"
      : "none"};
  cursor: ${(props) =>
    props.selectTable &&
    (props.coordinates[0] === 0 ||
      props.coordinates[0] === props.size[0] - 1 ||
      props.coordinates[1] === 0 ||
      props.coordinates[1] === props.size[1] - 1)
      ? "pointer"
      : props.selectTable
      ? "not-allowed"
      : ""};
`;

export const TableRow = styled.div`
  display: flex;
  width: fit-content;
  height: fit-content;
  justify-content: center;
  max-width: 100%;
`;

export const StyledTable = styled.div`
  width: ${(props) => (props.size ? props.size[1] * 50 : 500)}px;
  max-width: calc(100vw - 40px);
  margin: auto;
  display: flex;
  flex-flow: row wrap;
  margin-bottom: ${(props) => (props.mb ? props.mb : "")};
`;

export const Inputs = styled.div`
  display: flex;
  align-items: center;
  width: 360px;
  max-width: calc(100vw - 40px);
  height: 150px;
  justify-content: space-around;
  @media (max-width: 400px) {
    flex-direction: column;
  } ;
`;

export const InputWrapper = styled.div`
  display: flex;
  position: relative;
`;

export const Label = styled.div`
  width: fit-content;
  height: 20px;
  background-color: #fff;
  padding: 2px 6px;
  position: absolute;
  top: -10px;
  left: 50%;
  transform: translateX(-50%);
  font-size: 12px;
  font-family: Helvetica;
`;

export const StyledInput = styled.input`
  width: 150px;
  height: 50px;
  font-size: 22px;
  text-align: center;
  border: 2px solid #000;
  border-radius: 1px;
`;
