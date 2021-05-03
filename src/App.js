import { useEffect, useState } from 'react'

import { format } from 'date-fns'

function App() {
  const [dayOffset, setDayOffset] = useState(0)
  const [statusSholat, setStatusSholat] = useState(loadStatusSholat())

  useEffect(() => {
    setStatusSholat(loadStatusSholat())
  }, [dayOffset])

  function loadStatusSholat() {
    const key = format(getDate(), 'eeee, dd MMMM yyyy')

    return {
      shubuh: localStorage.getItem(`Shubuh - ${key}`) || 'BELUM',
      dzuhur: localStorage.getItem(`Dzuhur - ${key}`) || 'BELUM',
      ashar: localStorage.getItem(`Ashar - ${key}`) || 'BELUM',
      maghrib: localStorage.getItem(`Maghrib - ${key}`) || 'BELUM',
      isya: localStorage.getItem(`Isya - ${key}`) || 'BELUM'
    }
  }

  function getDate() {
    const date = new Date()

    date.setDate(date.getDate() + dayOffset)

    return date
  }

  function changeStatus(prayerTime) {
    const key = format(getDate(), 'eeee, dd MMMM yyyy')

    const previousStatus = localStorage.getItem(`${prayerTime} - ${key}`) || 'BELUM'

    const nextStatus = previousStatus == 'SUDAH' ? 'BELUM' : 'SUDAH'

    if (window.confirm(`Yakin ingin mengubah status sholat ${prayerTime.toLowerCase()} menjadi ${nextStatus}`)) {
      if (nextStatus == 'SUDAH') {
        localStorage.setItem(`${prayerTime} - ${key}`, nextStatus)
      } else {
        localStorage.removeItem(`${prayerTime} - ${key}`)
      }

      setStatusSholat(loadStatusSholat())
    }
  }

  return (
    <div
      className = 'container'
    >
      <div
        className = 'inner-container'
      >
        <div
          className = 'top-section'
        >
          <a
            href = 'javascript:void(0)'
            onClick = {() => setDayOffset(dayOffset - 1)}
          >
            Prev
          </a>

          <div>
            {format(getDate(), 'eeee, dd MMMM yyyy')}
          </div>

          <a
            href = 'javascript:void(0)'
            onClick = {() => setDayOffset(dayOffset + 1)}
          >
            Next
          </a>
        </div>

        <div
          className = 'list-container'
        >
          <a
            className = 'list-item'
            href = 'javascript:void(0)'
            onClick = {() => changeStatus('Shubuh')}
          >
            <strong style = {{ color: statusSholat.shubuh == 'BELUM' ? 'crimson' : 'forestgreen' }}>{statusSholat.shubuh}</strong> Sholat Shubuh
          </a>

          <a
            className = 'list-item'
            href = 'javascript:void(0)'
            onClick = {() => changeStatus('Dzuhur')}
          >
            <strong style = {{ color: statusSholat.dzuhur == 'BELUM' ? 'crimson' : 'forestgreen' }}>{statusSholat.dzuhur}</strong> Sholat Dzuhur
          </a>

          <a
            className = 'list-item'
            href = 'javascript:void(0)'
            onClick = {() => changeStatus('Ashar')}
          >
            <strong style = {{ color: statusSholat.ashar == 'BELUM' ? 'crimson' : 'forestgreen' }}>{statusSholat.ashar}</strong> Sholat Ashar
          </a>

          <a
            className = 'list-item'
            href = 'javascript:void(0)'
            onClick = {() => changeStatus('Maghrib')}
          >
            <strong style = {{ color: statusSholat.maghrib == 'BELUM' ? 'crimson' : 'forestgreen' }}>{statusSholat.maghrib}</strong> Sholat Maghrib
          </a>
          
          <a
            className = 'list-item'
            href = 'javascript:void(0)'
            onClick = {() => changeStatus('Isya')}
          >
            <strong style = {{ color: statusSholat.isya == 'BELUM' ? 'crimson' : 'forestgreen' }}>{statusSholat.isya}</strong> Sholat Isya
          </a>
        </div>
      </div>
    </div>
  )
}

export default App
