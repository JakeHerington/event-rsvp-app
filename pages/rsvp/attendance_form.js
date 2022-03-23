import styles from '/styles/AttendanceForm.module.css'
import React, { useEffect, useState } from "react";

export default function AttendanceForm() {
  const [user, setUser] = useState(null);

  useEffect(function() {
    const params = new URLSearchParams(window.location.search);
    setUser(params.get('userid'));
  });

  const handleClick = async (event) => {
    event.preventDefault();

    //use api

    //redirect
  }

  const acceptLink = `/api/attendance?userid=${user}&attending=true`;
  const declineLink = `/api/attendance?userid=${user}&attending=false`;

  return (
    <div className="container">
      <h1 className={styles.title}>Hello{' ' + user}</h1>
      <div className={styles.confirmContainer}>
        <label>Will you be attending?</label>
        <div className={styles.wrapper}>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleClick} id="option-1-button">Yes</button>
            </div>
            <div className={styles.buttonContainer}>
              <button className={styles.button} onClick={handleClick} id="option-2-button">No</button>
            </div>
        </div>
      </div>
    </div>
  )
}
