const board = document.getElementById("chessboard");

// Representação inicial do tabuleiro (peças unicode)
const initialBoard = [
  ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
  ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["", "", "", "", "", "", "", ""],
  ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
  ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
];

// Função para renderizar o tabuleiro
function renderBoard() {
  board.innerHTML = ""; // Limpa o tabuleiro
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const square = document.createElement("div");
      square.classList.add("square");
      square.classList.add((i + j) % 2 === 0 ? "light" : "dark");
      square.dataset.row = i;
      square.dataset.col = j;

      if (initialBoard[i][j]) {
        square.textContent = initialBoard[i][j];
        square.draggable = true; // Permite arrastar peças
      }

      board.appendChild(square);
    }
  }
}

// Evento de drag-and-drop para movimentar as peças
board.addEventListener("dragstart", (e) => {
  e.dataTransfer.setData("text/plain", `${e.target.dataset.row},${e.target.dataset.col}`);
});

board.addEventListener("dragover", (e) => {
  e.preventDefault(); // Permite o drop
});

board.addEventListener("drop", (e) => {
  const from = e.dataTransfer.getData("text/plain").split(",");
  const toRow = e.target.dataset.row;
  const toCol = e.target.dataset.col;

  if (toRow && toCol) {
    const piece = initialBoard[from[0]][from[1]];
    initialBoard[from[0]][from[1]] = ""; // Remove a peça da posição inicial
    initialBoard[toRow][toCol] = piece; // Adiciona a peça na nova posição
    renderBoard(); // Atualiza o tabuleiro
  }
});

// Renderiza o tabuleiro inicial
renderBoard();
