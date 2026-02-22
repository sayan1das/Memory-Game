import { useEffect, useState } from "react"

export const GameLogic = (cardValues) => {

  const [cards, setCards] = useState([])
  const [firstCard, setFirstCard] = useState(null)
  const [secondCard, setSecondCard] = useState(null)
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  // ---- Fisher-Yates Shuffle ----
  const shuffleArray = (array) => {
    const shuffled = [...array]
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
    }
    return shuffled
  }

  // ---- Build fresh card objects and reset all state ----
  const initializeGame = () => {
    const freshCards = shuffleArray(cardValues).map((value, index) => ({
      id: index,
      value,
      isFlipped: false,
      isMatched: false,
    }))

    setCards(freshCards)
    setFirstCard(null)
    setSecondCard(null)
    setScore(0)
    setMoves(0)
    setIsLocked(false)
  }

  useEffect(() => {
    initializeGame()
  }, [])

  // ---- Called every time user clicks a card ----
  const handleCardClick = (card) => {

    // Block click if: board locked, card already open, card already matched
    if (isLocked || card.isFlipped || card.isMatched) return

    // Flip the clicked card visually
    setCards((prev) =>
      prev.map((c) => (c.id === card.id ? { ...c, isFlipped: true } : c))
    )

    // --- First card selection ---
    if (!firstCard) {
      setFirstCard(card)
      return  // wait for second card, don't count move yet
    }

    // --- Second card selected, now compare ---
    setSecondCard(card)
    setMoves((prev) => prev + 1)  // count one move = one pair attempt
    setIsLocked(true)

    const isMatch = firstCard.value === card.value

    if (isMatch) {
      // Mark both cards as permanently matched
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === card.id ? { ...c, isMatched: true } : c )
        )
        setScore((prev) => prev + 1)
        resetTurn()
      }, 500)

    } else {
      // Flip both cards back face-down
      setTimeout(() => {
        setCards((prev) =>
          prev.map((c) =>
            c.id === firstCard.id || c.id === card.id ? { ...c, isFlipped: false } : c )
        )
        resetTurn()
      }, 1000)
    }
  }

  // ---- Clear selected cards and unlock the board ----
  const resetTurn = () => {
    setFirstCard(null)
    setSecondCard(null)
    setIsLocked(false)
  }

  const isGameComplete = cards.length > 0 && cards.every((c) => c.isMatched)

  return { cards, score, moves, isGameComplete, initializeGame, handleCardClick }
}












// import { useEffect, useState } from "react"

// export const GameLogic = (cardValues) => {
//   const [cards, setCards] = useState([])
//   const [flippedCards, setFlippedCards] = useState([])
//   const [matchedCards, setMatchedCards] = useState([])
//   const [score, setScore] = useState(0)
//   const [moves, setMoves] = useState(0)
//   const [isLocked, setIsLocked] = useState(false)


//   const shuffleArray = (array) => {
//     const shuffled = [...array];
//     for (let i = shuffled.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
//     }
//     return shuffled;
//   }

//   const initializeGame = () => {

//     const shuffleCards = shuffleArray(cardValues)

//     const finalCards = shuffleCards.map((value, index) => ({
//       id: index,
//       value,
//       isFlipped: false,
//       isMatched: false
//     }))

//     setCards(finalCards)
//     setMoves(0)
//     setScore(0)
//     setMatchedCards([])
//     setFlippedCards([])
//     setIsLocked(false)
//   }

//   useEffect(() => {
//     initializeGame()
//   }, [])

//   const handleCardClick = (card) => {
//     if (card.isFlipped || card.isMatched || isLocked ) {
//       return
//     }

//     const newCards = cards.map((c) => {
//       if (c.id === card.id) {
//         return { ...c, isFlipped: true }
//       } else {
//         return c
//       }
//     })
//     setCards(newCards)

//     const newFlippedCards = [...flippedCards, card.id]
//     setFlippedCards(newFlippedCards)

//     if (flippedCards.length === 1) {
//       setIsLocked(true)
//       const firstCard = cards[flippedCards[0]]

//       if (firstCard.value === card.value) {
//         setTimeout(() => {
//           setMatchedCards((prev) => [...prev, firstCard.id, card.id])

//           setScore((prev) => prev + 1)
//           setCards((prev) => prev.map((c) => {
//             if (c.id === card.id || c.id === firstCard.id) {
//               return { ...c, isMatched: true }
//             } else {
//               return c
//             }
//           }))
//           setFlippedCards([])
//           setIsLocked(false)
//         }, 500)

//       } else {

//         setTimeout(() => {
//           const flippedBackCard = newCards.map((c) => {
//             if (newFlippedCards.includes(c.id) || c.id === card.id) {
//               return { ...c, isFlipped: false }
//             } else {
//               return c
//             }
//           })

//           setCards(flippedBackCard)

//           setFlippedCards([])

//           setIsLocked(false)
//         }, 1000)

//       }

//     }
//     setMoves((prev) => prev + 1)
//   }

//   const isGameComplete = (matchedCards.length === cardValues.length)


//   return { cards, score, moves, isGameComplete, initializeGame, handleCardClick }
// }



