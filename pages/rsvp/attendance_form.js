import styles from '/styles/AttendanceForm.module.css';

import { useRouter } from 'next/router';
import { useEffect, useState } from "react";

export default function AttendanceForm() {

  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(function() {
    async function fetchData() {
      const guest = await fetch(`/api/guest?id=${id}`).then(data => data.json());
      setUser(guest);
    };
    
    const params = new URLSearchParams(location.search);
    const id = params.get('id');
    
    fetchData();
  }, []);

  async function saveAttendence(event) {
    const attending = event.target.id === 'option-1-button';

    const attendence = {
      id: user.id,
      attending: attending
    };

    const response = await fetch('/api/attendance', {
      method: 'POST',
      body: JSON.stringify(attendence)
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    };

    const base = '/rsvp/';
    const path = attending ? `details_form?userid=${user.id}` : 'finish'

    router.push(base + path);
  };

  return (user &&
    <div className="container">
      <h1 className={styles.title}>Hello{' ' + user.first_name + ' ' + user.last_name}</h1>
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
