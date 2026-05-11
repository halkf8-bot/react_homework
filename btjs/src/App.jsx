import './App.css'

let today = new Date().toLocaleDateString()
let time = new Date().toLocaleTimeString()

const welcome = [1, 2, 3]

function ranDomTitle() {
    return Math.floor(Math.random() * welcome.length)
}

function Header() {
    const title = welcome[ranDomTitle()]
    return (
        <>
            <h1>{title}</h1>
            <p>Hôm nay: <strong>{today}</strong>. Thời gian: <strong>{time}</strong></p>
        </>
    )
}

function App() {
  return (
    <>
        <Header />
    </>
  )
}

export default App
