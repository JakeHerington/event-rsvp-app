import Link from 'next/link'
import styles from '/styles/Home.module.css'

export default function RsvpForm() {
  const handleSubmit = async (event) => {
    event.preventDefault()

    const data = {
      first: event.target.first.value,
      last: event.target.last.value,
    }

    const JSONdata = JSON.stringify(data)

    const response = await fetch('/api/form', {
      body: JSONdata,

      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })
    const result = await response.json()
  }
  return (
    <div className="container">
      <h1 className={styles.title}>
        Form{' '}
        <Link href="/">
          <a>with</a>
        </Link>{' '}
        JavaScript.
      </h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="attendees">Who else is attending?</label>
        <select name="attendees" required>
          <option>0</option>
          <option>1</option>
          <option>2</option>
        </select>
        <label htmlFor="first">First Name</label>
        <input type="text" id="first" name="first" required />
        <label htmlFor="last">Last Name</label>
        <input type="text" id="last" name="last" required />

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
