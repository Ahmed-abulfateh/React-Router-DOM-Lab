import { Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getMailbox } from '../../services/mailboxService.js'

// MailboxDetails: Shows details about a specific mailbox.

function MailboxDetails() {
  const { mailboxId } = useParams()
  const [mailbox, setMailbox] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    let isMounted = true
    setIsLoading(true)
    setError('')

    getMailbox(mailboxId)
      .then((data) => {
        if (isMounted) {
          setMailbox(data)
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
  }, [mailboxId])

  return (
    <section>
      <h2>Mailbox Details</h2>
      {isLoading && <Spin tip="Loading mailbox..." />}
      {!isLoading && error && <p>{error}</p>}
      {!isLoading && !error && mailbox && (
        <div>
          <p>Box #{mailbox._id}</p>
          <p>Owner: {mailbox.boxOwner}</p>
          <p>Size: {mailbox.boxSize}</p>
        </div>
      )}
    </section>
  )
}

export default MailboxDetails
