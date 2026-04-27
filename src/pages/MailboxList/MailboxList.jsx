import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMailboxes } from '../../services/mailboxService.js'

// MailboxList: Displays an index list of all mailboxes.
function MailboxList() {
  const [mailboxes, setMailboxes] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    getMailboxes()
      .then((data) => {
        if (isMounted) {
          setMailboxes(data)
        }
      })
      .catch((fetchError) => {
        if (isMounted) {
          setError(fetchError.message)
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <section>
      <h2>Mailboxes</h2>
      {isLoading && <Spin tip="Loading mailboxes..." />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && mailboxes.length === 0 && (
        <p>No mailboxes found.</p>
      )}
      {!isLoading && !error && mailboxes.length > 0 && (
        <ul>
          {mailboxes.map((mailbox) => (
            <li key={mailbox._id}>
              <Link to={`/mailboxes/${mailbox._id}`}>
                Mailbox {mailbox._id}
              </Link>{' '}
              - {mailbox.owner} ({mailbox.size})
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

export default MailboxList
