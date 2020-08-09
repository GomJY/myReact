import React, { useContext, useCallback } from 'react';
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, QUESTION_CELL, NORMAL_CELL, FLAG_CELL } from './MinSearch';

const getTdStyle = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return {
        background: '#444'
      }
    case CODE.OPENED:
      return {
        background: 'white'
      }
    case CODE.QUESTION:
    case CODE.QUESTION_MINE:
      return {
        background: 'yellow'
      }
    case CODE.FLAG:
    case CODE.FLAG_MINE:
      return {
        background: 'red'
      }
    default:
      return {
        background: '#444'
      }
  }
}
const getTdText = (code) => {
  switch(code) {
    case CODE.NORMAL:
      return '';
    case CODE.MINE:
      return 'X';
    case CODE.CLICKED_MINE:
      return '펑';
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return '!';
    case CODE.QUESTION:
      return '?';   
    default:
        return '';
  }
}

const Td = ({cellIndex, rowIndex}) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  const cellData = tableData[rowIndex][cellIndex];
  console.log(halted);
  
  const onClickTd = useCallback(() => {
    console.log(halted);
    if(halted) {
      return;
    }

    const cellData = tableData[rowIndex][cellIndex];
    switch(cellData) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION:
      case CODE.QUESTION_MINE:
        return; 
      case CODE.MINE:
        dispatch({type: CLICK_MINE, row: rowIndex, cell: cellIndex});
        console.log(halted);
        return;
      case CODE.NORMAL:
        dispatch({type: OPEN_CELL, row: rowIndex, cell: cellIndex});
        return;
    }
    
  });
  
  const onRightClickTd = useCallback((e) => {
    console.log(halted);
    if(halted) {
      return;
    }

    const cellData = tableData[rowIndex][cellIndex];
    e.preventDefault();
    switch(cellData) {
      case CODE.OPENED: {
        return;
      }
      case CODE.FLAG_MINE:
      case CODE.FLAG: {
        dispatch({type: QUESTION_CELL, row: rowIndex, cell: cellIndex});
        return;
      }
      case CODE.QUESTION:
      case CODE.QUESTION_MINE: {
        dispatch({type: NORMAL_CELL, row: rowIndex, cell: cellIndex});
        return;
      }
      case CODE.MINE:
      case CODE.NORMAL: {
        dispatch({type: FLAG_CELL, row: rowIndex, cell: cellIndex}); 
        return;
      }
    }
  },[]);


  return (
    <td
      style={getTdStyle(cellData)}
      onClick={onClickTd}
      onContextMenu={onRightClickTd}
    >{getTdText(cellData)}</td>
  );
};

export default Td;