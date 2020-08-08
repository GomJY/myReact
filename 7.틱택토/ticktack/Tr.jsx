import React, {useRef, useEffect, memo } from 'react';
import Td from './Td';

const Tr = memo(({rowData, rowIndex, dispatch }) => {
  console.log(`TR Render[${rowIndex}] ====== `);
  
  const ref = useRef([]);
  useEffect(() => {
    console.log(rowData === ref.current[0], dispatch === ref.current[2], rowIndex === ref.current[3],);
    ref.current = [rowData, rowIndex, dispatch];
  }, [rowData, rowIndex, dispatch])

  return (
    <tr>
      {rowData.map((td, i) => 
       <Td key={`td ${rowIndex}, ${i}`} dispatch={dispatch} rowIndex={rowIndex} cellIndex={i} cellData={td}/> 
      )}
    </tr>
  );
});

export default Tr;