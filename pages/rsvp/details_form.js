import styles from '/styles/DetailsForm.module.css'

import { useRouter } from 'next/router';
import { useState } from "react";
import { read } from '../api/guest/[id]';

export default function DetailsForm(props) {

  const [guest, setGuest] = useState(props.guest);
  const [plusOnes, setPlusOnes] = useState(0);
  const router = useRouter();

  const plusOneDetails = (event) => {
    setPlusOnes(parseInt(event.target.value));
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const email = event.target.email.value;
    const diet = event.target.diet.value;
    const comment = event.target.comment.value;

    const plusOneDetails = (index) => {
      return {
        first_name: event.target.querySelector(`input[id="first_${index+1}"]`).value,
        last_name: event.target.querySelector(`input[id="last_${index+1}"]`).value,
        diet: event.target.querySelector(`select[id="diet_${index+1}"]`).value,
        guest_id: guest.id,
      }
    }

    const plus_one_details = [...Array(plusOnes)].map((n, i) => plusOneDetails(i));
    plus_one_details.forEach(async (data) => {
      await fetch('/api/plus_one', {
        method: 'POST',
        body: JSON.stringify(data)
      });
    });

    const updatedGuest = {
      ...guest,
      email: email,
      diet: diet,
      comment: comment,
    };

    await fetch('/api/details', {
      method: 'PUT',
      body: JSON.stringify(updatedGuest),
    });
    
    router.push('/rsvp/finish');
  }

  const plusOneForm = (index) => {
    return (
      <div key={index} id={"plus_one_container_" + index}>
        <p>{index + '.'}</p>
        <label htmlFor={'first_' + index}>First Name <span className="required"> *</span></label>
        <input type="text" id={'first_' + index} name={'first_' + index} required />
        <label htmlFor={'last_' + index}>Last Name <span className="required"> *</span></label>
        <input type="text" id={'last_' + index} name={'last_' + index} required />
        <label htmlFor={'diet_' + index}>Please specify dietary requirements <span className="required"> *</span></label>
        <select id={'diet_' + index} name={'diet_' + index} required>
          <option>None</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten Free</option>
        </select>
      </div>
    )
  }
  
  return (
    <div className="container">
      <h1 className={styles.title}>Please fill out the details below</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="first">Email<span className="required"> *</span></label>
        <input type="email" id="email" name="email" required />
        <label htmlFor="plus_ones">Please specify dietary requirements <span className="required"> *</span></label>
        <select id="diet" name="diet" required>
          <option>None</option>
          <option>Vegetarian</option>
          <option>Vegan</option>
          <option>Gluten Free</option>
        </select>
        <label htmlFor="plus_ones">How many plus one&apos;s do you require?<span className="required"> *</span></label>
        <select name="plus_ones" id="plus_ones" onChange={plusOneDetails} required>
          <option>0</option>
          <option>1</option>
          <option>2</option>
        </select>
        { [...Array(plusOnes)].map((n, i) => plusOneForm(i + 1)) }
        <label htmlFor="comment">Comments</label>
        <textarea id="comment" name="comment" rows="4" />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

export async function getServerSideProps(context) {
  const guest = await read(context.query.id);
  return {
    props: { guest: guest },
  }
}
