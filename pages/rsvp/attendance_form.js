import styles from '/styles/AttendanceForm.module.css';

import { useRouter } from 'next/router';
import { useState } from "react";
import { getData } from '../api/guest'; 

export default function AttendanceForm(props) {

  const [guest, setGuest] = useState(props.guest);
  const router = useRouter();

  async function saveAttendence(event) {
    const attending = event.target.id === 'option-1-button';

    const attendence = {
      id: guest.id,
      attending: attending
    };

    const response = await fetch('/api/attendance', {
      method: 'POST',
      body: JSON.stringify(attendence)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    };

    const path = attending ? 'details_form' : 'finish'
    router.push({
      pathname: '/rsvp/' + path,
      query: { 
        id: guest.id, 
      },
    });
  };

  return (guest &&
    <div className="container">
      <h1 className={styles.title}>Hello{' ' + guest.first_name + ' ' + guest.last_name}</h1>
      <div className={styles.confirmContainer}>
        <label>Will you be attending?</label>
        <div className={styles.wrapper}>
            <div className={styles.buttonContainer}>
              <button onClick={saveAttendence} id="option-1-button">Yes</button>
            </div>
            <div className={styles.buttonContainer}>
              <button onClick={saveAttendence} id="option-2-button">No</button>
            </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(context) {
  const guest = await getData(context.query.id);
  return {
    props: { guest: guest },
  }
}
