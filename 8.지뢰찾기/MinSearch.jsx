import React, { useReducer, createContext, useMemo, useEffect } from 'react';
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
  data: {},
  timer: 0,
  result: '',
  halted: true,
  openedCount: 0,
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
export const INCREMENT_TIMER = "INCREMENT_TIMER";


const reducer = (state, action) => {
  switch(action.type) {
    case START_GAME:
      return {
        ...state,
        data: {row: action.row, cell: action.cell, mine: action.mine, },
        tableData: plantMine(action.row, action.cell, action.mine),
        halted: false, 
        timer: 0,
      };  
    case OPEN_CELL: {
      const tableData = state.tableData;
      tableData.forEach((row, i) => {
        tableData[i] = [...state.tableData[i]]
      });
      const checked = [];
      let counted = 0;
      const checkAround = (row, cell) => {
        // console.log(row, cell);
        if([CODE.OPENED, CODE.FLAG_MINE, CODE.FLAG, CODE.QUESTION_MINE, CODE.QUESTION, CODE.MINE].includes(tableData[row][cell])) {
          return;
        }
        if(row < 0 || row >= tableData.length || cell < 0 || cell >= tableData[0].length) {
          return;
        }
        if(checked.includes(row + ',' + cell)) {
          return;
        } else {
          checked.push(row + ',' + cell);
        }
        
        let around = [];
        if(tableData[row - 1]) {
          around = around.concat(
            tableData[row - 1][cell - 1],
            tableData[row - 1][cell],
            tableData[row - 1][cell + 1],
          );
        }

        around = around.concat(
          tableData[row][cell -1],
          tableData[row][cell +1]
        );
        
        if(tableData[row + 1]) {
          around = around.concat(
            tableData[row + 1][cell],
            tableData[row + 1][cell + 1],
            tableData[row + 1][cell - 1],
          );
        }
        if(tableData[row][cell]=== CODE.NORMAL) {
          counted += 1;
        }
        console.log(counted, state.openedCount);

        const count = around.filter((v) => [CODE.MINE, CODE.FLAG_MINE, CODE.QUESTION_MINE].includes(v)).length;
        tableData[row][cell] = count;
      
        if( count === 0 ) {
          const near = [];
          if(row - 1 > -1) {
              near.push([row -1, cell - 1]);
              near.push([row -1, cell ]);
              near.push([row -1, cell + 1]);
          }
          near.push([row , cell - 1]);
          near.push([row , cell + 1]);
          if(row + 1 >tableData.length) {
            near.push([row + 1, cell - 1]);
            near.push([row + 1, cell ]);
            near.push([row + 1, cell + 1]);
          }
          near.filter(v => !!v[0]).forEach((n) => {
            if(tableData[n[0]][n[1]] !== CODE.OPENED) {
              checkAround(n[0], n[1]);
            }
          });
        }
        
        
        
      }
      checkAround(action.row, action.cell);
      let halted = false;
      let result = '';
      //승리
      if(state.data.row * state.data.cell - state.data.mine === state.openedCount + counted) {
        halted = true;
        result = "승리 하셨습니다."
      }
      return {
        ...state,
        halted,
        result,
        tableData,
        openedCount: state.openedCount + counted
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
      if(tableData[action.row][action.cell] == CODE.QUESTION_MINE) {
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
      if(tableData[action.row][action.cell] == CODE.FLAG_MINE) {
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
    case INCREMENT_TIMER: {
      return {
        ...state,
        timer: state.timer + 1
      }
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
  
  useEffect(() => {
    let timer;
    if(halted === false) {
      timer = setInterval(() => {
        dispatch({type: INCREMENT_TIMER});
      }, 1000);  
    }
    return () => {
      clearInterval(timer);
    }
  },[halted]);

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