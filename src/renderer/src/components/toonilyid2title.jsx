import axios from 'axios'

// Toonily - paperback uses the id from ?p=<id> but aidoku uses webtoon/title
const convertToonilyID2Title = async (json, setLogs) => {
  const toonilyMapper = {} // gotta save for history/chapter
  const manga = json.manga
  const history = json.history
  const library = json.library
  const chapters = json.chapters
  setLogs((logs) => [...logs, ` done\nDetecting toonily manga...`])
  const toonilyCount = library.filter((l) => l.sourceId === 'en.toonily').length
  setLogs((logs) => [...logs, `  found ${toonilyCount}`])
  let toonilyConverted = 0
  for (let i = 0; i < library.length; i++) {
    if (library[i].sourceId === 'en.toonily') {
      toonilyConverted++
      setLogs((logs) => [
        ...logs,
        `\nConverting Toonily IDs: ${toonilyConverted}/${toonilyCount}...`
      ]) // log each one because it takes time
      await axios.get('https://toonily.com/?p=' + library[i].mangaId).then((res) => {
        if (res.status === 200) {
          const url = res.request.responseURL.split('/') ?? [] // request response url has the title
          if (url.length > 0) {
            const title = url[url.length - 2] // should have "/" at end making length - 1 empty but if not, well rip
            toonilyMapper[library[i].mangaId] = title
            manga[i].id = title
            library[i].mangaId = title
          } else {
            setLogs((logs) => [
              ...logs,
              `\nFailed to convert Toonily ${toonilyConverted}/${toonilyCount} - manga ID: ${library[i].mangaId}`
            ])
          }
        } else {
          setLogs((logs) => [
            ...logs,
            `\nFailed to convert Toonily ${toonilyConverted}/${toonilyCount} - manga ID: ${library[i].mangaId}`
          ])
        }
      })
    }
  }
  if (toonilyCount > 0) {
    for (let i = 0; i < history.length; i++) {
      if (history[i].sourceId === 'en.toonily') {
        let title = toonilyMapper[history[i].mangaId]
        if (title) {
          history[i].mangaId = title
          chapters[i].mangaId = title
        }
      }
    }
  }
  setLogs((logs) => [...logs, `\nConversion complete`])
  return json
}

export default convertToonilyID2Title
