import React, { useEffect, useReducer, useMemo } from 'react';
import Table from './Table';

const initialState = {
  winner: '',
  turn: 'O',
  tableData: [['','',''], ['','',''], ['','','']],
  recentCell: [-1, -1],
};
export const SET_WINNER = "SET_WINNER";
export const CLICK_CELL = "CLICK_CELL";
export const CHANGE_TURN = "CHANGE_TURN";
export const RESET_GAME = "RESET_GAME";

const reducer = (state, action) => {
  switch(action.type) {
    case SET_WINNER:
      return {
        ...state,
        winner: action.winner,
      }
    break;
    case CLICK_CELL:
      const tableData = [...state.tableData];
      tableData[action.row] =  [...tableData[action.row]];
      tableData[action.row][action.cell] = state.turn;
      return {
        ...state,
        tableData,
        recentCell: [action.row, action.cell]
      } 
    break;
    case CHANGE_TURN:
      return {
        ...state,
        turn: state.turn == "O" ? "X" : "O"
      }
    break;
    case RESET_GAME:
      return {
        ...state,
        tableData: [['','',''], ['','',''], ['','','']]
      }
    break;
  }  

};

const TickTaeToe = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, winner, turn, recentCell } = state;

  useEffect(() => {
    const [row, cell] = recentCell;
    if(row < 0) {
      return
    } 
    
    let win = false;
    console.log(row, cell,turn, tableData);
    if(tableData[row][0] === turn && tableData[row][1] === turn && tableData[row][2] === turn) {
      win = true;
    }
    if(tableData[0][cell] === turn && tableData[1][cell] === turn && tableData[2][cell] === turn) {
      win = true;
    }
    if(tableData[0][0] === turn && tableData[1][1] === turn && tableData[2][2] === turn) {
      win = true;
    }
    if(tableData[0][2] === turn && tableData[1][1] === turn && tableData[2][0] === turn) {
      win = true;
    }
    if(win) {
      let all = true; // 무승부 검사
      tableData.forEach((row) => {
        row.forEach((cell) => {
          if(!cell) {
            all = false;
          }
        });
      });
      if(all) {
        dispatch({type: RESET_GAME});
      } else {
        dispatch({type: SET_WINNER, winner: turn});
      }
    } else {  
      dispatch({ type: CHANGE_TURN });
    }
  }, [recentCell])

  return (
    <>
      <Table tableData={state.tableData} dispatch={dispatch}/>
      {state.winner && <div>{turn}님의 승리</div>}
    </>
  );
}

export default TickTaeToe;