import React from "react";
import { TableField, TableRow, StyledTable } from "../Styled/Styled";

function isBorder(coords, size) {
  return (
    coords[0] === 0 ||
    coords[1] === 0 ||
    coords[0] === size[0] - 1 ||
    coords[1] === size[1] - 1
  );
}

function SelectField(props) {
  return (
    <TableField
      onClick={() => {
        if (!props.startOrEnd && isBorder(props.coordinates, props.size)) {
          props.setStartOrEnd(1);
          props.setStart([...props.coordinates]);
          localStorage.setItem("start", props.coordinates);
        } else {
          if (!props.startField && isBorder(props.coordinates, props.size)) {
            props.setEnd([...props.coordinates]);
            localStorage.setItem("end", props.coordinates);
            props.setStartOrEnd(2);
          }
        }
      }}
      selectTable={true}
      startField={props.startField}
      endField={props.endField}
      size={props.size}
      coordinates={props.coordinates}
    />
  );
}

export default function SelectTable(props) {
  const rows = Object.keys(new Int8Array(props.size[0])).map(Number);
  const columns = Object.keys(new Int8Array(props.size[1])).map(Number);
  return (
    <StyledTable size={props.size} mb="30px">
      {rows.map((rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {columns.map((columnIndex) => {
              const startField =
                props.start[0] === rowIndex && props.start[1] === columnIndex;
              const endField =
                props.end[0] === rowIndex && props.end[1] === columnIndex;
              return (
                <SelectField
                  selectTable={true}
                  startField={startField}
                  endField={endField}
                  start={props.start}
                  setStart={props.setStart}
                  end={props.end}
                  setEnd={props.setEnd}
                  startOrEnd={props.startOrEnd}
                  setStartOrEnd={props.setStartOrEnd}
                  setSettings={props.setSettings}
                  size={props.size}
                  coordinates={[rowIndex, columnIndex]}
                  key={rowIndex.toString() + columnIndex.toString()}
                />
              );
            })}
          </TableRow>
        );
      })}
    </StyledTable>
  );
}
