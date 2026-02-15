import { Spin } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { createMailbox } from '../../services/mailboxService.js'

// MailboxForm: Allows users to enter details for and submit new mailboxes.
function MailboxForm() {
  const [formData, setFormData] = useState({
    boxOwner: '',
    boxSize: 'Small',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSubmitting(true)
    setError('')

    createMailbox(formData)
      .then((createdMailbox) => {
        setFormData({ boxOwner: '', boxSize: 'Small' })
        navigate(`/mailboxes/${createdMailbox._id}`)
      })
      .catch((submitError) => {
        setError(submitError.message)
      })
      .finally(() => {
        setIsSubmitting(false)
      })
  }

  return (
    <section>
      <h2>New Mailbox</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="boxOwner">Box Owner</label>
        <input
          id="boxOwner"
          name="boxOwner"
          type="text"
          value={formData.boxOwner}
          onChange={handleChange}
          required
        />

        <label htmlFor="boxSize">Box Size</label>
        <select
          id="boxSize"
          name="boxSize"
          value={formData.boxSize}
          onChange={handleChange}
        >
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
        </select>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Create Mailbox'}
        </button>
      </form>

      {isSubmitting && <Spin tip="Creating mailbox..." />}
      {!isSubmitting && error && <p>{error}</p>}
    </section>
  )
}

export default MailboxForm
