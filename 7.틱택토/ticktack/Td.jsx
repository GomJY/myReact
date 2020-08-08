import React, { useCallback, memo } from 'react';
import { CLICK_CELL, CHANGE_TURN } from './TickTaeToe';

const Td = memo(({dispatch, rowIndex, cellIndex, cellData}) => {
  console.log(`TD Render[${cellIndex}][${rowIndex}] - ${cellData}`);
  
  const onClickTd = useCallback(() => {
    if(cellData) {
      return 
    }
    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex });
  }, [cellData]);
  
  
  return (
   <td onClick={onClickTd}>{cellData}</td>);
});

export default Td;