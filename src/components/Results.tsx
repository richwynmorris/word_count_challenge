import DataTable, { TableColumn } from 'react-data-table-component'

interface DataRow {
  word: string;
  frequency: number;
}

interface Data {
  data: WordData[];
}

interface WordData {
  id: number,
  word: string,
  frequency: number
}


const columns: TableColumn<DataRow>[] = [
  {
    name: "Word",
    selector: row => row.word,
    sortable: true,
  },
  {
    name: "Frequency",
    selector: row => row.frequency,
    sortable: true,
  }
]

function Results({ data }: Data) :JSX.Element {
  return (
    <>
      { data.length !== 0 
        ? <div id="data-table" className="w-full pl-40 pr-40 mb-20">
            <DataTable
              title="Word Frequency"
              columns={columns}
              data={data}
              pagination
            />
          </div>
        : null
      }
    </>
  )
}

export default Results;