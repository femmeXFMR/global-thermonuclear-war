// Global Thermonuclear War - Game Logic
class GlobalThermonuclearWar {
    constructor() {
        this.gameState = {
            board: [],
            currentPlayer: 'US',
            selectedPiece: null,
            gamePhase: 'title',
            moveCount: 0,
            gameMode: 'human',
            isComputerThinking: false,
            scores: { US: 16, USSR: 16 },
            humanPlayer: 'US',
            computerPlayer: 'USSR'
        };
        
        this.pieces = {
            'US_ICBM': { icon: '🚀', label: 'ICBM', color: '#00ff00' },
            'US_BOMBER': { icon: '✈️', label: 'B-52', color: '#00ff00' },
            'US_SUBMARINE': { icon: '🚢', label: 'SUB', color: '#00ff00' },
            'US_SILO': { icon: '🏗️', label: 'SILO', color: '#00ff00' },
            'US_COMMAND': { icon: '🏛️', label: 'PENT', color: '#00ff00' },
            'US_DEFENSE': { icon: '🛡️', label: 'ABM', color: '#00ff00' },
            'US_SATELLITE': { icon: '🛰️', label: 'SAT', color: '#00ff00' },
            'US_SOLDIER': { icon: '👨‍✈️', label: 'GEN', color: '#00ff00' },
            'USSR_ICBM': { icon: '🚀', label: 'ICBM', color: '#ff6b6b' },
            'USSR_BOMBER': { icon: '✈️', label: 'TU-95', color: '#ff6b6b' },
            'USSR_SUBMARINE': { icon: '🚢', label: 'SUB', color: '#ff6b6b' },
            'USSR_SILO': { icon: '🏗️', label: 'SILO', color: '#ff6b6b' },
            'USSR_COMMAND': { icon: '🏛️', label: 'KREML', color: '#ff6b6b' },
            'USSR_DEFENSE': { icon: '🛡️', label: 'ABM', color: '#ff6b6b' },
            'USSR_SATELLITE': { icon: '🛰️', label: 'SAT', color: '#ff6b6b' },
            'USSR_SOLDIER': { icon: '👨‍✈️', label: 'GEN', color: '#ff6b6b' }
        };
        
        this.init();
    }
    
    init() {
        this.gameState.board = this.initializeBoard();
        this.showScreen('title-screen');
        this.startTitleSequence();
    }
    
    initializeBoard() {
        const board = Array(8).fill(null).map(() => Array(8).fill(null));
        
        // US Pieces (Bottom)
        board[7][0] = 'US_ICBM';
        board[7][1] = 'US_BOMBER';
        board[7][2] = 'US_SUBMARINE';
        board[7][3] = 'US_COMMAND';
        board[7][4] = 'US_SILO';
        board[7][5] = 'US_SUBMARINE';
        board[7][6] = 'US_BOMBER';
        board[7][7] = 'US_ICBM';

        board[6][0] = 'US_DEFENSE';
        board[6][1] = 'US_SATELLITE';
        board[6][2] = 'US_SOLDIER';
        board[6][3] = 'US_DEFENSE';
        board[6][4] = 'US_DEFENSE';
        board[6][5] = 'US_SOLDIER';
        board[6][6] = 'US_SATELLITE';
        board[6][7] = 'US_DEFENSE';

        // USSR Pieces (Top)
        board[0][0] = 'USSR_ICBM';
        board[0][1] = 'USSR_BOMBER';
        board[0][2] = 'USSR_SUBMARINE';
        board[0][3] = 'USSR_COMMAND';
        board[0][4] = 'USSR_SILO';
        board[0][5] = 'USSR_SUBMARINE';
        board[0][6] = 'USSR_BOMBER';
        board[0][7] = 'USSR_ICBM';

        board[1][0] = 'USSR_DEFENSE';
        board[1][1] = 'USSR_SATELLITE';
        board[1][2] = 'USSR_SOLDIER';
        board[1][3] = 'USSR_DEFENSE';
        board[1][4] = 'USSR_DEFENSE';
        board[1][5] = 'USSR_SOLDIER';
        board[1][6] = 'USSR_SATELLITE';
        board[1][7] = 'USSR_DEFENSE';

        return board;
    }
    
    showScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        
        // Show footer only on title screen
        const footer = document.getElementById('credit-footer');
        if (footer) {
            console.log('Screen:', screenId, 'Footer display:', screenId === 'title-screen' ? 'block' : 'none');
            footer.style.display = screenId === 'title-screen' ? 'block' : 'none';
        } else {
            console.log('Footer element not found!');
        }
    }
    
    startTitleSequence() {
        const text = `WELCOME TO WOPR
War Operation Plan Response

INITIALIZING SYSTEM...
Loading nuclear protocols...
Establishing secure connection...
Accessing strategic database...

A strange game.
The only winning move is not to play.
How about a nice game of chess?

> Shall we play a game?
> GLOBAL THERMONUCLEAR WAR

Preparing battlefield...
Deploying nuclear forces...
Ready for strategic combat.

Press any key to continue...`;

        let index = 0;
        let animationComplete = false;
        const typewriterElement = document.getElementById('typewriter-text');
        
        // Add skip functionality that works throughout the animation
        this.handleTitleKeyPress = this.handleTitleKeyPress.bind(this);
        document.addEventListener('keydown', this.handleTitleKeyPress);
        document.addEventListener('click', this.handleTitleKeyPress);
        
        const typeNextChar = () => {
            if (index < text.length && !animationComplete) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                setTimeout(typeNextChar, 50);
            } else if (!animationComplete) {
                animationComplete = true;
                // Keep the event listeners active for the "Press any key to continue" message
            }
        };
        
        typeNextChar();
    }
    
    handleTitleKeyPress() {
        document.removeEventListener('keydown', this.handleTitleKeyPress);
        document.removeEventListener('click', this.handleTitleKeyPress);
        this.showScreen('rules-screen');
    }
    
    showGameModeSelection() {
        this.showScreen('game-mode-screen');
    }
    
    selectGameMode(mode) {
        this.gameState.gameMode = mode;
        
        if (mode === 'computer') {
            this.showScreen('team-selection-screen');
        } else {
            this.startGame();
        }
    }
    
    selectTeam(team) {
        this.gameState.humanPlayer = team;
        this.gameState.computerPlayer = team === 'US' ? 'USSR' : 'US';
        this.gameState.currentPlayer = 'US';
        this.startGame();
    }
    
    startGame() {
        this.gameState.gamePhase = 'playing';
        this.showScreen('game-screen');
        this.renderBoard();
        this.updateGameInfo();
        
        if (this.gameState.gameMode === 'computer' && this.gameState.currentPlayer === this.gameState.computerPlayer) {
            setTimeout(() => this.computerMove(), 1000);
        }
    }
    
    renderBoard() {
        const boardElement = document.getElementById('board');
        boardElement.innerHTML = '';

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const square = document.createElement('div');
                square.className = `square ${(row + col) % 2 === 0 ? 'light' : 'dark'}`;
                square.dataset.row = row;
                square.dataset.col = col;
                square.onclick = () => this.handleSquareClick(row, col);

                const piece = this.gameState.board[row][col];
                if (piece) {
                    const pieceData = this.pieces[piece];
                    square.innerHTML = `
                        <div class="piece">
                            <div class="piece-icon" style="color: ${pieceData.color}">${pieceData.icon}</div>
                            <div class="piece-label" style="color: ${pieceData.color}">${pieceData.label}</div>
                        </div>
                    `;
                }

                boardElement.appendChild(square);
            }
        }
    }
    
    handleSquareClick(row, col) {
        if (this.gameState.gamePhase !== 'playing' || this.gameState.isComputerThinking) return;
        
        if (this.gameState.gameMode === 'computer' && this.gameState.currentPlayer === this.gameState.computerPlayer) return;

        const piece = this.gameState.board[row][col];
        
        if (this.gameState.selectedPiece) {
            if (this.isValidMove(this.gameState.selectedPiece, { row, col })) {
                this.makeMove(this.gameState.selectedPiece, { row, col });
            } else {
                this.gameState.selectedPiece = null;
                this.updateBoardDisplay();
            }
        } else if (piece && piece.startsWith(this.gameState.currentPlayer)) {
            const piecePlayer = piece.startsWith('US_') ? 'US' : 'USSR';
            if (piecePlayer === this.gameState.currentPlayer) {
                this.gameState.selectedPiece = { row, col };
                this.updateBoardDisplay();
            }
        }
    }
    
    isValidMove(from, to) {
        const piece = this.gameState.board[from.row][from.col];
        if (!piece) return false;

        if (from.row === to.row && from.col === to.col) return false;

        const targetPiece = this.gameState.board[to.row][to.col];
        if (targetPiece && targetPiece.startsWith(this.gameState.currentPlayer)) return false;

        const pieceType = piece.split('_')[1];
        const rowDiff = to.row - from.row;
        const colDiff = to.col - from.col;

        switch (pieceType) {
            case 'ICBM':
            case 'SATELLITE':
                return this.isRookMove(from, to);
            case 'BOMBER':
                return this.isQueenMove(from, to);
            case 'SUBMARINE':
                return this.isKnightMove(from, to);
            case 'SILO':
            case 'COMMAND':
            case 'SOLDIER':
                return this.isKingMove(from, to);
            case 'DEFENSE':
                return this.isBishopMove(from, to);
            default:
                return false;
        }
    }
    
    isRookMove(from, to) {
        if (from.row !== to.row && from.col !== to.col) return false;
        return this.isPathClear(from, to);
    }

    isBishopMove(from, to) {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);
        if (rowDiff !== colDiff) return false;
        return this.isPathClear(from, to);
    }

    isQueenMove(from, to) {
        return this.isRookMove(from, to) || this.isBishopMove(from, to);
    }

    isKingMove(from, to) {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);
        return rowDiff <= 1 && colDiff <= 1;
    }

    isKnightMove(from, to) {
        const rowDiff = Math.abs(to.row - from.row);
        const colDiff = Math.abs(to.col - from.col);
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
    }

    isPathClear(from, to) {
        const rowStep = from.row === to.row ? 0 : (to.row - from.row) / Math.abs(to.row - from.row);
        const colStep = from.col === to.col ? 0 : (to.col - from.col) / Math.abs(to.col - from.col);

        let currentRow = from.row + rowStep;
        let currentCol = from.col + colStep;

        while (currentRow !== to.row || currentCol !== to.col) {
            if (this.gameState.board[currentRow][currentCol] !== null) return false;
            currentRow += rowStep;
            currentCol += colStep;
        }

        return true;
    }
    
    makeMove(from, to) {
        const piece = this.gameState.board[from.row][from.col];
        const capturedPiece = this.gameState.board[to.row][to.col];
        
        if (capturedPiece) {
            const capturedPlayer = capturedPiece.startsWith('US_') ? 'US' : 'USSR';
            this.gameState.scores[capturedPlayer]--;
        }

        this.gameState.board[to.row][to.col] = piece;
        this.gameState.board[from.row][from.col] = null;
        this.gameState.selectedPiece = null;
        this.gameState.currentPlayer = this.gameState.currentPlayer === 'US' ? 'USSR' : 'US';
        this.gameState.moveCount++;

        this.renderBoard();
        this.updateGameInfo();

        const winner = this.checkWinCondition();
        if (winner) {
            this.showGameOver(winner);
        } else if (this.gameState.gameMode === 'computer' && this.gameState.currentPlayer === this.gameState.computerPlayer) {
            setTimeout(() => this.computerMove(), 1000);
        }
    }
    
    checkWinCondition() {
        let usCommand = false;
        let ussrCommand = false;

        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.gameState.board[row][col];
                if (piece === 'US_COMMAND') usCommand = true;
                if (piece === 'USSR_COMMAND') ussrCommand = true;
            }
        }

        if (!usCommand) return 'USSR';
        if (!ussrCommand) return 'US';
        return null;
    }
    
    updateBoardDisplay() {
        const squares = document.querySelectorAll('.square');
        squares.forEach(square => {
            square.classList.remove('selected', 'highlighted');
        });

        if (this.gameState.selectedPiece) {
            const selectedSquare = document.querySelector(`[data-row="${this.gameState.selectedPiece.row}"][data-col="${this.gameState.selectedPiece.col}"]`);
            if (selectedSquare) {
                selectedSquare.classList.add('selected');
            }
        }
    }
    
    updateGameInfo() {
        document.getElementById('current-player').textContent = this.gameState.currentPlayer;
        document.getElementById('player-icon').textContent = this.gameState.currentPlayer === 'US' ? '🇺🇸' : '☭';
        document.getElementById('move-count').textContent = this.gameState.moveCount;
        
        document.getElementById('us-score').textContent = this.gameState.scores.US;
        document.getElementById('ussr-score').textContent = this.gameState.scores.USSR;
        
        const turnIndicator = document.getElementById('turn-indicator');
        const currentPlayerDiv = document.querySelector('.current-player');
        
        if (this.gameState.gameMode === 'computer' && this.gameState.currentPlayer === this.gameState.computerPlayer) {
            turnIndicator.textContent = 'COMPUTER THINKING...';
            turnIndicator.className = 'turn-indicator computer-turn';
            currentPlayerDiv.className = 'current-player computer-active';
        } else {
            turnIndicator.textContent = 'YOUR TURN';
            turnIndicator.className = 'turn-indicator';
            currentPlayerDiv.className = 'current-player active';
        }
    }
    
    computerMove() {
        if (this.gameState.isComputerThinking) return;
        
        this.gameState.isComputerThinking = true;
        document.body.classList.add('thinking');
        this.updateGameInfo();
        
        setTimeout(() => {
            const possibleMoves = this.getAllPossibleMoves(this.gameState.computerPlayer);
            
            if (possibleMoves.length === 0) {
                this.gameState.isComputerThinking = false;
                document.body.classList.remove('thinking');
                this.updateGameInfo();
                return;
            }

            let bestMove = possibleMoves[0];
            let bestScore = -Infinity;

            for (const move of possibleMoves) {
                let score = 0;
                const targetPiece = this.gameState.board[move.to.row][move.to.col];
                
                const enemyCommand = this.gameState.computerPlayer === 'US' ? 'USSR_COMMAND' : 'US_COMMAND';
                if (targetPiece === enemyCommand) {
                    score += 1000;
                } else if (targetPiece && targetPiece.startsWith(this.gameState.humanPlayer + '_')) {
                    const pieceType = targetPiece.split('_')[1];
                    switch (pieceType) {
                        case 'BOMBER': score += 50; break;
                        case 'ICBM': score += 40; break;
                        case 'SILO': score += 30; break;
                        case 'SOLDIER': score += 20; break;
                        case 'DEFENSE': score += 15; break;
                        case 'SATELLITE': score += 10; break;
                        case 'SUBMARINE': score += 5; break;
                    }
                }
                
                score += Math.random() * 10;
                
                if (score > bestScore) {
                    bestScore = score;
                    bestMove = move;
                }
            }

            this.gameState.isComputerThinking = false;
            document.body.classList.remove('thinking');
            
            this.makeMove(bestMove.from, bestMove.to);
            
        }, 1500);
    }
    
    getAllPossibleMoves(player) {
        const moves = [];
        
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const piece = this.gameState.board[row][col];
                if (piece) {
                    const piecePlayer = piece.startsWith('US_') ? 'US' : 'USSR';
                    if (piecePlayer === player) {
                        for (let targetRow = 0; targetRow < 8; targetRow++) {
                            for (let targetCol = 0; targetCol < 8; targetCol++) {
                                if (this.isValidMove({ row, col }, { row: targetRow, col: targetCol })) {
                                    moves.push({
                                        from: { row, col },
                                        to: { row: targetRow, col: targetCol }
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        
        return moves;
    }
    
    showGameOver(winner) {
        this.showScreen('game-over-screen');
        
        const isHumanWinner = this.gameState.gameMode === 'computer' ? winner === this.gameState.humanPlayer : true;
        const winnerName = winner === 'US' ? 'United States' : 'Soviet Union';
        const winnerIcon = winner === 'US' ? '🇺🇸' : '☭';
        const victoryMessage = isHumanWinner ? 'VICTORY!' : 'DEFEAT!';
        const victoryEmoji = isHumanWinner ? '🎉' : '💥';
        
        document.getElementById('victory-animation').textContent = victoryEmoji;
        document.getElementById('victory-message').textContent = victoryMessage;
        document.getElementById('victory-text').textContent = 
            isHumanWinner ? 
            `Congratulations! ${winnerName} ${winnerIcon} has achieved nuclear superiority!` :
            `The computer has defeated you in nuclear combat!`;
            
        // Add simple mushroom cloud
        const mushroomCloud = document.getElementById('mushroom-cloud');
        if (mushroomCloud) {
            mushroomCloud.innerHTML = '💥💥💥<br>☁️☁️☁️☁️☁️<br>☁️☁️☁️☁️☁️☁️☁️<br>☁️☁️☁️☁️☁️☁️☁️☁️☁️';
        }
    }
    
    resetGame() {
        this.gameState = {
            board: this.initializeBoard(),
            currentPlayer: 'US',
            selectedPiece: null,
            gamePhase: 'title',
            moveCount: 0,
            gameMode: 'human',
            isComputerThinking: false,
            scores: { US: 16, USSR: 16 },
            humanPlayer: 'US',
            computerPlayer: 'USSR'
        };
        
        document.body.classList.remove('thinking');
        this.showScreen('title-screen');
        
        // Clear the typewriter text and restart
        const typewriterElement = document.getElementById('typewriter-text');
        if (typewriterElement) {
            typewriterElement.textContent = '';
        }
        this.startTitleSequence();
    }
    
    showRules() {
        this.showScreen('rules-screen');
    }
}

// Global functions for HTML onclick handlers
let game;

function selectGameMode(mode) {
    if (game) {
        game.selectGameMode(mode);
    }
}

function selectTeam(team) {
    if (game) {
        game.selectTeam(team);
    }
}

function showGameModeSelection() {
    if (game) {
        game.showGameModeSelection();
    } else {
        // Try to initialize game if it doesn't exist
        game = new GlobalThermonuclearWar();
        if (game) {
            game.showGameModeSelection();
        }
    }
}

function showRules() {
    if (game) {
        game.showRules();
    }
}

function resetGame() {
    if (game) {
        game.resetGame();
    }
}

// Global Thermonuclear War - Game Logic

// Initialize game when page loads
document.addEventListener('DOMContentLoaded', () => {
    game = new GlobalThermonuclearWar();
});
