import './assets/app.css'
import { useState, useEffect } from 'react'
import Navbar from './components/navbar'
import Footer from './components/footer'
import convertToonilyID2Title from './components/toonilyid2title'

const App = () => {
  let [backup, setBackup] = useState({})
  let [log, setLogs] = useState('Waiting for file upload...')
  let [uploadDisabled, setUploadDisabled] = useState(false)
  let [downloadDisabled, setDownloadDisabled] = useState(true)
  let [date, setDate] = useState(new Date())

  // enable download button when data is processed (backup changes)
  useEffect(() => {
    setDownloadDisabled(false)
  }, [backup])

  const onFileChange = (event) => {
    setUploadDisabled(true)
    const file = event.target.files[0]
    setLogs((logs) => [...logs, `\nReading ${file.name}...`])
    const fileReader = new FileReader()
    fileReader.readAsText(file, 'UTF-8')
    fileReader.onload = async (e) => {
      setLogs((logs) => [...logs, ` done\nLoading json...`])
      const json = JSON.parse(e.target.result)
      const data = await convertToonilyID2Title(json, setLogs)
      const d = file.name.split('Aidoku-')[1].split('.json')[0]
      setDate(d)
      setBackup(data)
    }
  }

  const downloadFile = () => {
    const blob = new Blob([JSON.stringify(backup)], {
      type: 'application/json'
    })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = 'Aidoku-Toonily-' + date + '.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  return (
    <main className="main">
      <Navbar />
      <div className="flex">
        <label htmlFor="file-upload" className={uploadDisabled ? 'disabled_card' : 'card'}>
          <h2>
            Upload <span>-&gt;</span>
          </h2>
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".json"
          className="input"
          onChange={(e) => onFileChange(e)}
          disabled={uploadDisabled}
        />
        <div className="logs">{log}</div>
        <div className={downloadDisabled ? 'disabled_card' : 'card'} onClick={() => downloadFile()}>
          <h2>
            Download <span>-&gt;</span>
          </h2>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default App
