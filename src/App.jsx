
import { Card } from "./components/Card"
import { GameHeader } from "./components/GameHeader"
import { WinMessage } from "./components/WinMessage"
import { GameLogic } from "./Hook/GameLogic"

const cardValues = [
  "🍅",
  "🍌",
  "🍇",
  "🥑",
  "🫐",
  "🍋‍🟩",
  "🍍",
  "🍓",
  "🍅",
  "🍌",
  "🍇",
  "🥑",
  "🫐",
  "🍋‍🟩",
  "🍍",
  "🍓"
]
function App() {

  const {cards,score, moves, isGameComplete, initializeGame, handleCardClick} = GameLogic(cardValues)

  return (
    <div className="app">

      <GameHeader score={score} moves={moves} onReset={initializeGame} />

      {isGameComplete && <WinMessage moves = {moves}/>}

      <div className="cards-grid">
        {cards.map((card) => (
          <Card key={card.id} card={card} onClickk={handleCardClick} />
        ))}
      </div>


    </div>
  )
}

export default App
