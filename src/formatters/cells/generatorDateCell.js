import escape from 'lodash.escape';
import generatorCellNumber from '../../commons/generatorCellNumber';

export default (index, value, rowIndex) => (`<c r="${generatorCellNumber(index, rowIndex)}" s="1"><v>${escape(value)}</v></c>`);
