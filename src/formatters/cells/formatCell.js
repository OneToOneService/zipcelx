import { validTypes, CELL_TYPE_STRING, CELL_TYPE_DATE, CELL_TYPE_TIMESTAMP, WARNING_INVALID_TYPE } from '../../commons/constants';
import generatorStringCell from './generatorStringCell';
import generatorNumberCell from './generatorNumberCell';
import generatorDateCell from './generatorDateCell';
import generatorTimestampCell from './generatorTimestampCell';

export default (cell, index, rowIndex) => {
  if (validTypes.indexOf(cell.type) === -1) {
    cell.type = CELL_TYPE_STRING;
  }

  if (cell.type === CELL_TYPE_STRING) return generatorStringCell(index, cell.value, rowIndex);
  if (cell.type === CELL_TYPE_DATE) return generatorDateCell(index, cell.value, rowIndex);
  if (cell.type === CELL_TYPE_TIMESTAMP) return generatorTimestampCell(index, cell.value, rowIndex);
  return generatorNumberCell(index, cell.value, rowIndex);
};
