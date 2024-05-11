import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import FormFirstStep from './components/FormFirstStep'
import SimplePaper from './components/SimplePaper'
import axios from 'axios'
import { config } from './config'

function App() {
  const navigate = useNavigate()
  const location = useLocation()
  const { pathname } = location
  const [form, setForm] = useState({})
  const [hash, setHash] = useState('')
  const [transitionId, setTransitionID] = useState('')

  function generateTransitionID() {
    const timestamp = Date.now()
    const randomNum = Math.floor(Math.random() * 1000000)
    const merchantPrefix = 'T'
    const transitionID = `${merchantPrefix}${timestamp}${randomNum}`
    return setTransitionID(transitionID)
  }

  const getHashApi = (forms) => {
    axios
      .post(`${config.API_URL}/api/payu/hashing`, {
        ...forms,
        firstname: 'abc',
        email: 'abc@gmail.com',
        phone: '6203411149',
        transitionId,
      })
      .then((res) => {
        setHash(res.data.hash)
        setTransitionID(res.data.transitionId)
      })
      .catch((err) => console.error(err.message))
  }

  useEffect(() => {
    generateTransitionID()
  }, [])

  const onSubmit = (values, { setSubmitting }) => {
    setSubmitting(false)
    setForm(values)
    getHashApi(values)
    // navigate('/step2')
  }

  function renderSwitch(param) {
    switch (param) {
      case '/':
        return (
          <FormFirstStep
            {...{
              form,
              hash,
              transitionId,
              onSubmit,
            }}
          />
        )

      default:
        return <FormFirstStep {...{ form }} />
    }
  }

  console.log('server', process.env.SERVER_API)
  return (
    <div className="App">
      {transitionId}
      <header className="App-header">
        <SimplePaper>{renderSwitch(pathname)}</SimplePaper>
      </header>
    </div>
  )
}

export default App
