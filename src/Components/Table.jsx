import React, { useEffect } from "react";
import { TableField, TableRow, StyledTable } from "../Styled/Styled";

export default function Table(props) {
  const rows = Object.keys(new Int8Array(props.size[0])).map(Number);
  const columns = Object.keys(new Int8Array(props.size[1])).map(Number);
  useEffect(() => {
    let findingPath, waitToFinish, blink;
    if (props.replayRunning) {
      let newCurrent;
      let counter = 0;
      findingPath = setInterval(() => {
        props.setCurrent(props.visitedFields[counter] || props.end);
        counter += 1;
        if (counter >= props.visitedFields.length) clearInterval(findingPath);
      }, 100);
      waitToFinish = setTimeout(() => {
        newCurrent = [...props.end];
        props.setCurrent(newCurrent);
        let counter = 0;
        blink = setInterval(() => {
          if (counter % 2 === 0) {
            props.setCurrent([-1, -1]);
          } else {
            newCurrent = [...props.end];
            props.setCurrent(newCurrent);
          }
          counter += 1;
          if (counter > 3) {
            clearInterval(blink);
            props.setReplayRunning(false);
          }
        }, 500);
      }, 100 * props.visitedFields.length);
    }

    return () => {
      clearTimeout(findingPath);
      clearTimeout(waitToFinish);
      clearInterval(blink);
    };
  }, [props.replayRunning]);
  useEffect(() => {
    props.setCurrent(...props.start);
  }, [props.level]);
  return (
    <StyledTable size={props.size}>
      {rows.map((rowIndex) => {
        return (
          <TableRow key={rowIndex}>
            {columns.map((columnIndex) => {
              const startField =
                props.start[0] === rowIndex && props.start[1] === columnIndex;
              const endField =
                props.end[0] === rowIndex && props.end[1] === columnIndex;
              let blockedField = false;
              props.blocks.forEach((field) => {
                if (field[0] === rowIndex && field[1] === columnIndex)
                  blockedField = true;
              });
              return (
                <TableField
                  current={
                    props.current[0] === rowIndex &&
                    props.current[1] === columnIndex
                  }
                  level={props.level}
                  startField={startField}
                  endField={endField}
                  blockedField={blockedField}
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
