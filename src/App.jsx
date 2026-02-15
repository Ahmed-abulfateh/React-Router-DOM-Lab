
import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar.jsx'
import MailboxForm from './pages/MailboxForm/MailboxForm.jsx'
import MailboxList from './pages/MailboxList/MailboxList.jsx'
import MailboxDetails from './pages/MailboxDetails/MailboxDetails.jsx'

// App: The root component that orchestrates the entire application.
function App() {
  const Home = () => (
    <main>
      <h1>Post Office</h1>
    </main>
  )


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mailboxes" element={<MailboxList />} />
        <Route path="/new-mailbox" element={<MailboxForm />} />
        <Route path="/mailboxes/:mailboxId" element={<MailboxDetails />} />
      </Routes>
    </>
  )
}

export default App
