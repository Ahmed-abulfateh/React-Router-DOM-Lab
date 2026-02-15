import axios from 'axios'

const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getMailboxes = async () => {
  try {
    const response = await client.get('/mailboxes')
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to load mailboxes.')
  }
}

export const getMailbox = async (mailboxId) => {
  try {
    const response = await client.get(`/mailboxes/${mailboxId}`)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to load mailbox.')
  }
}

export const createMailbox = async (payload) => {
  try {
    const response = await client.post('/mailboxes', payload)
    return response.data
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create mailbox.')
  }
}
