import React, { useContext } from 'react';
import { TableContext } from './MinSearch';
import Td from './Td';

const Tr = ({ rowIndex }) => {
  const { tableData, dispatch } = useContext(TableContext);

  return (
    <tr>
      {tableData[0] && Array(tableData[0].length).fill().map((td, i) => <Td key={"td" + rowIndex + "," + i} cellIndex={i} rowIndex={rowIndex} />)}
    </tr>
  );
};

export default Tr;