import React, {useMemo} from 'react';
import Tr from './Tr';

const Table = ({ onClick, tableData, dispatch }) => {

  return (
    <table onClick={onClick}>
      {tableData.map((tr, index) => (
        useMemo(
          () => <Tr key={"tr" + index} rowData={tr} rowIndex={index} dispatch={dispatch}/>
          ,[tableData[index]]
        )
      ))}
    </table>
  );
};

export default Table; 