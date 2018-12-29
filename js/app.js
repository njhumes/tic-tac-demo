const game = {
    activePlayer: 'X',
    board: [[],[],[]],
    active: true
}
const createBoard = () => {
    const $activePlayerDisplay = $("<h1 class='score-board'>Active player: <span class='active-player'>X</span></h1>")
    $('body').append($activePlayerDisplay);
    const $gameBoard = $('<div></div>').addClass("game-board")
    $('body').append($gameBoard)
    for(let i = 2; i > -1; i--){
        const $gameRow = $('<div/>').addClass("game-row").attr('row', i)
        $gameBoard.append($gameRow)
        for(let x = 0; x < 3; x++){
            const $gameSquare = $('<div/>').addClass("game-square")
            $gameSquare.attr('x', x)
            $gameSquare.attr('y', i)
            $gameRow.append($gameSquare)
        }
    }
}
const activePlayerWins = () => {
    game.active = false;
    $('.score-board').html(`<h1>PLAYER ${game.activePlayer} WINS!</h1>`)
    const $startButton = $('<button/>').attr('id', 'start-game').text("TRY AGAIN").click(startGame)
    $('.score-board').after($startButton)
}
const checkForHorizontalVictory = () => {
    game.board.forEach((row)=>{
        let activePlayerSquares = 0;
        for(let i = 0; i < row.length; i ++ ){
            if(row[i] === game.activePlayer){
                activePlayerSquares++;
            }
        }
        if(activePlayerSquares === 3){
            activePlayerWins()
        }
    })
}
const checkForVerticalVictory = () => {
    for(let x = 0; x < 3; x++){
        let activePlayerSquares = 0;
        game.board.forEach((row)=>{
            if(row[x] === game.activePlayer){
                activePlayerSquares++;
            }
        })
        if(activePlayerSquares === 3){
            activePlayerWins();
        }
    }
}
const checkForDiagonalVictory = () => {
    if(game.board[0][0] === game.activePlayer &&
       game.board[1][1] === game.activePlayer &&
       game.board[2][2] === game.activePlayer){
        activePlayerWins()
    }else if(
        game.board[2][0] === game.activePlayer &&
        game.board[1][1] === game.activePlayer &&
        game.board[0][2] === game.activePlayer
    ){
        activePlayerWins();
    }
}
const checkForWin = () => {
    checkForHorizontalVictory();
    checkForVerticalVictory();
    checkForDiagonalVictory();
}
const changeActivePlayer = () => {
    // super advanced ternary logic version:
    // game.activePlayer = game.activePlayer === 'X' ? 'O' : 'X'
    if(game.activePlayer === 'X'){
        game.activePlayer = 'O'
    }else{
        game.activePlayer = 'X'
    }
    $('.active-player').text(game.activePlayer);
}
const squareRespondsToClick = (e)=>{
    if(game.active){
        $(e.currentTarget).off();
        $(e.currentTarget).append(`<h4>${game.activePlayer}</h4>`)
        const x = parseInt($(e.currentTarget).attr('x'));
        const y = parseInt($(e.currentTarget).attr('y'));
        game.board[y][x] = game.activePlayer;
        checkForWin();
        if(game.active){
            changeActivePlayer();
        }
    }
}
const attachListenersToSquares = () => {
    $('.game-square').click(squareRespondsToClick)
}
const resetGame = () => {
    $('body').empty();
    game.active = true;
    game.activePlayer = 'X'
    game.board = [[],[],[]]
}
const startGame = (e)=>{
    resetGame();
    createBoard();
    attachListenersToSquares();
}
$('#start-game').click(startGame)
