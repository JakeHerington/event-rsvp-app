import DataTableComponent from 'components/DataTable'
import { readEvents } from 'pages/api/event/index'

export default function Events(props) {
    const columns = [{
            name: 'Name',
            selector: row => row.name,
        },
        {
            name: 'Date',
            selector: row => row.date,
        },
        {
            name: 'Description',
            selector: row => row.description,
        },
        {
            name: 'Date Created',
            selector: row => row.date_created,
        },
        {
            name: 'Last Updated',
            selector: row => row.date_updated,
        }
    ];
    const data = JSON.parse(props.events);
    const dataTable = DataTableComponent(columns, data, "events/edit/");

    return (
        <div>
            {dataTable}
        </div>
    )
}

export async function getServerSideProps() {
    const events = await readEvents();
    return {
        props: { 
            events: JSON.stringify(events)
        },
    }
}