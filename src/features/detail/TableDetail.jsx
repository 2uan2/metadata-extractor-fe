const TableDetail = ({ table, editSubTable }) => {
  const validate = (e, id) => {
    const regex = /^([^(]*)\(?([^)]*)?\)?(.*$)/;
    let match;
    // console.log(e.target.innerText);
    if ((match = regex.exec(e.target.innerText)) != null) {
      console.log(match[1]);
      editSubTable(match[1], table.id, "columns", id, "dataType");
      console.log(match[2]);
      editSubTable(
        !isNaN(parseInt(match[2])) && match[2] != null && match[2] != undefined
          ? parseInt(match[2])
          : null,
        table.id,
        "columns",
        id,
        "dataLength"
      );
      // m.forEach((match, groupIndex) => {
      //   console.log(`Found match, group ${groupIndex}: ${match}`);
      //   // group index for string infront of "("
      //   if (groupIndex == 1) {
      //     // console.log("before");
      //     // console.log(table);
      //     // e.target.innerText = match;
      //     editSubTable(match, table.id, "columns", id, "dataType");
      //     // console.log("after");
      //     // console.log(table);
      //   } else if (groupIndex == 2) {
      //     // e.target.innerText = parseInt(match);
      //     // console.log("before");
      //     // console.log(table);
      //     editSubTable(
      //       !isNaN(parseInt(match)) ? parseInt(match) : null,
      //       table.id,
      //       "columns",
      //       id,
      //       "dataLength"
      //     );
      //     // console.log("after");
      //     // console.log(table);
      //   }
      // });
    }
  };

  return (
    <div>
      <h1 className="bold text-3xl mt-8 mb-4">{table.name}</h1>
      <table>
        <thead>
          <tr>
            <td>Tên trường</td>
            <td>Kiểu dữ liệu và độ dài</td>
            <td>Nullable</td>
            <td>Auto Increment</td>
            <td>P/K Key</td>
            <td>Mặc định</td>
            <td>Mô tả</td>
          </tr>
        </thead>
        <tbody>
          {table.columns.map((column) => {
            return (
              <tr>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "fieldName"
                    )
                  }
                >
                  {column.fieldName}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) => validate(e, column.id)}
                >
                  {column.dataType}
                  {column.dataLength != null &&
                  column.dataLength != "" &&
                  column.dataLength != undefined &&
                  !isNaN(column.dataLength)
                    ? `(${column.dataLength})`
                    : ""}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "nullable"
                    )
                  }
                >
                  {column.nullable}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "autoIncrement"
                    )
                  }
                >
                  {column.autoIncrement}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "keyType"
                    )
                  }
                >
                  {column.keyType}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "defaultValue"
                    )
                  }
                >
                  {column.defaultValue}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "columns",
                      column.id,
                      "description"
                    )
                  }
                >
                  {column.description}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 className="bold text-2xl m-4">Constraints</h2>
      <table>
        <thead>
          <tr>
            <td>Tên khóa</td>
            <td>Tên trường</td>
            <td>Kiểu</td>
            <td>Bảng tham chiếu</td>
            <td>Cột tham chiếu</td>
          </tr>
        </thead>
        <tbody>
          {table.constraints.map((constraint) => {
            return (
              <tr>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "constraints",
                      constraint.id,
                      "keyName"
                    )
                  }
                >
                  {constraint.keyName}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "constraints",
                      constraint.id,
                      "columnName"
                    )
                  }
                >
                  {constraint.columnName}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "constraints",
                      constraint.id,
                      "keyType"
                    )
                  }
                >
                  {constraint.keyType}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "constraints",
                      constraint.id,
                      "referencedTableName"
                    )
                  }
                >
                  {constraint.referencedTableName}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning={true}
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "constraints",
                      constraint.id,
                      "referencedColumnName"
                    )
                  }
                >
                  {constraint.referencedColumnName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <h2 className="bold text-2xl m-4">Constraints</h2>
      <table>
        <thead>
          <tr>
            <td>Tên Index</td>
            <td>Cột tham chiếu</td>
          </tr>
        </thead>
        <tbody>
          {table.indexes.map((index) => {
            return (
              <tr>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "indexes",
                      index.id,
                      "name"
                    )
                  }
                >
                  {index.name}
                </td>
                <td
                  contentEditable
                  suppressContentEditableWarning
                  onBlur={(e) =>
                    editSubTable(
                      e.target.innerText,
                      table.id,
                      "indexes",
                      index.id,
                      "referencedColumnName"
                    )
                  }
                >
                  {index.referencedColumnName}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <hr></hr>
    </div>
  );
};

export default TableDetail;
