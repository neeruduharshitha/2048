document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    const size = 4;
    let grid = Array(size).fill().map(() => Array(size).fill(0));
    let score = 0;
  
    // Initialize grid
    function init() {
      addTile();
      addTile();
      updateGrid();
    }
  
    // Add a new tile to the grid at a random empty position
    function addTile() {
      let emptyCells = [];
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          if (grid[row][col] === 0) {
            emptyCells.push({ row, col });
          }
        }
      }
      if (emptyCells.length > 0) {
        let { row, col } = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[row][col] = Math.random() < 0.9 ? 2 : 4;
      }
    }
  
    // Update the grid display
    function updateGrid() {
      gridContainer.innerHTML = '';
      for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          gridContainer.appendChild(cell);
          if (grid[row][col] !== 0) {
            const tile = document.createElement('div');
            tile.className = 'tile';
            tile.dataset.value = grid[row][col];
            tile.textContent = grid[row][col];
            cell.appendChild(tile);
          }
        }
      }
      document.getElementById('score').textContent = score;
    }
  
    init();
  
    // Add event listeners for keyboard input
    document.addEventListener('keydown', handleInput);
  
    function handleInput(event) {
      switch (event.key) {
        case 'ArrowUp':
          moveUp();
          break;
        case 'ArrowDown':
          moveDown();
          break;
        case 'ArrowLeft':
          moveLeft();
          break;
        case 'ArrowRight':
          moveRight();
          break;
      }
      addTile();
      updateGrid();
      // Check for game over or win conditions
    }
  
    function moveUp() {
      for (let col = 0; col < size; col++) {
        let column = [];
        for (let row = 0; row < size; row++) {
          if (grid[row][col] !== 0) {
            column.push(grid[row][col]);
          }
        }
        mergeTiles(column);
        for (let row = 0; row < size; row++) {
          grid[row][col] = column[row] || 0;
        }
      }
    }
  
    function moveDown() {
      for (let col = 0; col < size; col++) {
        let column = [];
        for (let row = size - 1; row >= 0; row--) {
          if (grid[row][col] !== 0) {
            column.push(grid[row][col]);
          }
        }
        mergeTiles(column);
        for (let row = size - 1; row >= 0; row--) {
          grid[row][col] = column[size - 1 - row] || 0;
        }
      }
    }
  
    function moveLeft() {
      for (let row = 0; row < size; row++) {
        let line = [];
        for (let col = 0; col < size; col++) {
          if (grid[row][col] !== 0) {
            line.push(grid[row][col]);
          }
        }
        mergeTiles(line);
        for (let col = 0; col < size; col++) {
          grid[row][col] = line[col] || 0;
        }
      }
    }
  
    function moveRight() {
      for (let row = 0; row < size; row++) {
        let line = [];
        for (let col = size - 1; col >= 0; col--) {
          if (grid[row][col] !== 0) {
            line.push(grid[row][col]);
          }
        }
        mergeTiles(line);
        for (let col = size - 1; col >= 0; col--) {
          grid[row][col] = line[size - 1 - col] || 0;
        }
      }
    }
  
    function mergeTiles(line) {
      for (let i = 0; i < line.length - 1; i++) {
        if (line[i] === line[i + 1]) {
          line[i] *= 2;
          score += line[i];
          line.splice(i + 1, 1);
          line.push(0); // Keep the length of the line consistent
        }
      }
    }
  });
  