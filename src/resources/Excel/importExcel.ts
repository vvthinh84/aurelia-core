export class ExcelCls{
	
    emitXmlHeader(headerTable) {
        var headerRow = '<ss:Row>\n';

        for (var item of headerTable) {

            headerRow += '  <ss:Cell>\n';
            headerRow += '    <ss:Data ss:Type="String">';
            headerRow += item + '</ss:Data>\n';


            headerRow += '  </ss:Cell>\n';
        }
        headerRow += '</ss:Row>\n';
        return '<?xml version="1.0"?>\n' +
            '<ss:Workbook xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet">\n' +
            '<ss:Worksheet ss:Name="Sheet1">\n' +
            '<ss:Table>\n\n' + headerRow;
    }

    emitXmlFooter() {
        return '\n</ss:Table>\n' +
            '</ss:Worksheet>\n' +
            '</ss:Workbook>\n';
    }

    jsonToSsXml(jsonObject,headerTable,testTypes) {
        
        var row;
        var col;
        var xml;
        var data = typeof jsonObject != "object" ? JSON.parse(jsonObject) : jsonObject;

        xml = this.emitXmlHeader(headerTable);

        for (row = 0; row < data.length; row++) {
            xml += '<ss:Row>\n';

            for (col in data[row]) {
                xml += '  <ss:Cell>\n';
                xml += '    <ss:Data ss:Type="' + testTypes[col] + '">';
                xml += data[row][col] + '</ss:Data>\n';
                xml += '  </ss:Cell>\n';

            }

            xml += '</ss:Row>\n';
        }

        xml += this.emitXmlFooter();
        return xml;
    }

  
      
}