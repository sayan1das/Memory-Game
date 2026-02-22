

export const Card = ({card , onClickk }) => {
    return (
        <div className= {`card ${card.isFlipped ? "flipped" : ""} ${card.isMatched ? "matched" : ""}`} 
        onClick={() => onClickk(card)}>
            <div className="card-front">?</div>
            <div className="card-back">{card.value}</div>
        </div>
    )
}