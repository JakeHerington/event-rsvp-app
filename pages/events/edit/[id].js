import styles from '/styles/DetailsForm.module.css'
import 'react-datepicker/dist/react-datepicker.css';

import { useRouter } from 'next/router';
import { useState } from "react";
import { readEvent } from 'pages/api/event/[id]';
import DatePicker from 'react-datepicker';
import { parseISO } from 'date-fns';

export default function Event(props) {
    const [Event, setEvent] = useState(JSON.parse(props.event));
    const [startDate, setStartDate] = useState(parseISO(Event.date));
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();

        const updatedEvent = {
            ...Event,
            name: event.target.name.value,
            date: new Date(event.target.date.value).toISOString(),
            description: event.target.description.value,
            date_updated: new Date().toISOString()
        }
        
        await fetch('/api/event', {
            method: 'PUT',
            body: JSON.stringify(updatedEvent),
        });

        router.push('/events')
    }

    return (
        <div className="container">
            <h1 className={styles.title}>Edit Event</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" defaultValue={Event.name} />
                <label htmlFor="date">Date</label>
                <DatePicker
                    id="date" 
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                />
                <label htmlFor="description">Description</label>
                <textarea id="desription" name="description" rows="4" defaultValue={Event.description} />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export async function getServerSideProps(context) {
    const events = await readEvent(context.query.id);
    return {
        props: { 
            event: JSON.stringify(events)
        },
    }
}