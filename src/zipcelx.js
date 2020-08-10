import JSZip from 'jszip';
import FileSaver from 'file-saver';

import validator from './validator';
import generatorRows from './formatters/rows/generatorRows';

import workbookXML from './statics/workbook.xml';
import workbookXMLRels from './statics/workbook.xml.rels';
import rels from './statics/rels';
import contentTypes from './statics/[Content_Types].xml';
import templateSheet from './templates/worksheet.xml';

export const generateXMLWorksheet = (rows) => {
  const XMLRows = generatorRows(rows);
  return templateSheet.replace('{placeholder}', XMLRows);
};

export default (config) => {
  if (!validator(config)) {
    throw new Error('Validation failed.');
  }

  const zip = new JSZip();
  const xl = zip.folder('xl');
  xl.file('workbook.xml', workbookXML);
  xl.file('styles.xml', `<?xml version="1.0" encoding="UTF-8"?><styleSheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main"><numFmts count="3"><numFmt numFmtId="100" formatCode="YYYY-MM-DD" /><numFmt numFmtId="101" formatCode="YYYY-MM-DD" /><numFmt numFmtId="102" formatCode="YYYY-MM-DD hh:mm:ss am/pm" /></numFmts><cellXfs count="3"><xf numFmtId="100" applyNumberFormat="1" /><xf numFmtId="101" applyNumberFormat="1" /><xf numFmtId="102" applyNumberFormat="1" /></cellXfs></styleSheet>`);
  xl.file('_rels/workbook.xml.rels', workbookXMLRels);
  zip.file('_rels/.rels', rels);
  zip.file('[Content_Types].xml', contentTypes);

  const worksheet = generateXMLWorksheet(config.sheet.data);
  xl.file('worksheets/sheet1.xml', worksheet);

  return zip.generateAsync({
    type: 'blob',
    mimeType:
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  }).then((blob) => {
    FileSaver.saveAs(blob, `${config.filename}.xlsx`);
  });
};
