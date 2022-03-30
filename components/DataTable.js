import DataTable from 'react-data-table-component';
import { useRouter } from 'next/dist/client/router'; 

function DataTableComponent(columns, data, path) {
    const router = useRouter();
    return (
        <DataTable
            columns={columns}
            data={data}
            onRowClicked={(row) => router.push({ 
                pathname: path + row.id,
            })}
        />
    );
}

export default DataTableComponent;