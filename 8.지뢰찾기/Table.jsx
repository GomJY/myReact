import React, { useContext } from 'react';
import { TableContext } from './MinSearch';
import Tr from './Tr';

const Table = () => {
  const { tableData, dispatch } = useContext(TableContext);

  return (
    <table>
      {Array(tableData.length).fill().map((tr, i) => <Tr key={"tr" + i} rowIndex={i}/>)}
    </table>
  );
};

export default Table;