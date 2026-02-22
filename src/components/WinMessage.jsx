
export const WinMessage = ({moves})=> {
    return(
        <div className="win-message">
            <h2>Congratulation!</h2>
            <p>You completed the Game in {moves} moves!</p>
        </div>
    )
}