import React, { useReducer, createContext, useMemo } from 'react';
import Form from './Form';
import Table from './Table';

export const CODE = {
  MINE: -7,
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  CLICKED_MINE: -6,
  OPENED: 0,
};
// export const TableContext = createContext();

export const TableContext = createContext({
  tableData: [
    [-1, -1, -1, -1, -1, -1, -1, ],
    [-7, -1, -1, -1, -1, -1, -1, ],
    [-1, -1, -1, -1, -1, -1, -1, ],
    [],
    [],
  ],
  dispatch: () => {},
  halted: true,
});

const initialState ={
  tableData: [],
  timer: 0,
  result: '',
  halted: false,
};

const plantMine = (row, cell, mine) => {
  console.log(row, cell, mine);
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while(candidate.length > row * cell - mine ) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for(let i = 0; i < cell; i++) {
    const rowData = [];
    data.push(rowData);
    for(let j = 0; j < row; j++) {
      rowData.push(CODE.NORMAL);
    } 
  }

  for(let k = 0; k < shuffle.length; k++ ) {
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;  
};

export const START_GAME = 'START_GAME';
export const OPEN_CELL = "OPEN_CELL";
export const CLICK_MINE = "CLICK_MINE";
export const QUESTION_CELL = "QUESTION_CELL";
export const NORMAL_CELL = "NORMAL_CELL";
export const FLAG_CELL = "FLAG_CELL";


const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME:
      return {
        ...state,
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, 
      };  
    case OPEN_CELL: {
      const tableData = state.tableData;
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.OPENED;
      return {
        ...state,
        tableData,
      };
    }
    case CLICK_MINE: {
      const tableData = state.tableData;
      tableData[action.row] = [...state.tableData[action.row]];
      tableData[action.row][action.cell] = CODE.CLICKED_MINE;
      return {
        ...state,
        tableData,
        halted: true,
      };
    }
    case FLAG_CELL: {
      console.log('FLAG_CELL');
      const tableData = state.tableData;
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] == CODE.MINE) {
        tableData[action.row][action.cell] = CODE.FLAG_MINE;
      }
      else {
        tableData[action.row][action.cell] = CODE.FLAG;
      }
      return {
        ...state,
        tableData
      };
    }
    case NORMAL_CELL: {
      console.log('NORMAL_CELL');
      const tableData = state.tableData;
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] == CODE.MINE) {
        tableData[action.row][action.cell] = CODE.MINE;
      }
      else {
        tableData[action.row][action.cell] = CODE.NORMAL;
      }
      return {
        ...state,
        tableData
      };
    }
    case QUESTION_CELL: {
      console.log('QUESTION_CELL');
      const tableData = state.tableData;
      tableData[action.row] = [...state.tableData[action.row]];
      if(tableData[action.row][action.cell] == CODE.MINE) {
        tableData[action.row][action.cell] = CODE.QUESTION_MINE;
      }
      else {
        tableData[action.row][action.cell] = CODE.QUESTION;
      }
      return {
        ...state,
        tableData
      };
    }
    default:
      return state;
  };
};

const MinSearch = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { tableData, halted } = state;

  //캐시로 넣어서 성능 저하 방지 => 이 값을 바로 provider에 value로 넣어주면 렌더링이 될때마다 객체이기 떄문에 다시 렌더링 되고 -> 자식도 렌더링
  const value = useMemo(() => ({tableData: tableData, dispatch, halted: halted }), [tableData, halted]);
  
  return (
    <TableContext.Provider value={value}>
      <Form />
      <div>{state.timer}</div>
      <Table />
      <div>{state.result}</div>
    </TableContext.Provider>  
  );
};

export default MinSearch;