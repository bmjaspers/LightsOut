(function() {
	'use strict';

	angular.module("lightsout")
		.controller("gameController", gameController);

	gameController.$inject = ["boardService"];

	function gameController(boardService) {
		var vm = this;

		vm.board = [];
		vm.won = false;

		vm.boardSizes = boardService.getPresetBoardSizes();

		// initial selection of board size is just the first one in the preset board size array
		vm.selectedBoardSize = vm.boardSizes[0];

		vm.updateBoard = _updateBoard;
		vm.checkBoard = _checkBoard;
		vm.createBoard = _createBoard;

		// initial board creation
		vm.createBoard();

		function _updateBoard(x, y) {
			// indicates if we can short cut to not winning
			var shortCut = false

			vm.board[y][x] = !vm.board[y][x];
			shortCut = shortCut || vm.board[y][x];

			// this could probably be functionalized, but wouldn't gain much by it currently
			if (y + 1 < vm.board.length) {
				vm.board[y + 1][x] = !(vm.board[y + 1][x]);
				shortCut = shortCut || vm.board[y + 1][x];
			} 

			if (y - 1 >= 0) {
				vm.board[y - 1][x] = !(vm.board[y - 1][x]);
				shortCut = shortCut || vm.board[y - 1][x];
			}

			if (x + 1 < vm.board[x].length) {
				vm.board[y][x + 1] = !(vm.board[y][x + 1]);
				shortCut = shortCut || vm.board[y][x + 1];
			}

			if (x - 1 >= 0) {
				vm.board[y][x - 1] = !(vm.board[y][x - 1]);
				shortCut = shortCut || vm.board[y][x - 1];
			}

			// if we turned on any squares we know we haven't won yet
			// otherwise double-check the board to see if any others are still on
			if (!shortCut) {
				vm.checkBoard();
			}
		}

		function _checkBoard() {
			// loop through and check if we've got any squares turned on
			for (var i = 0; i < vm.board.length; i++) {
				for (var j = 0; j < vm.board.length; j++) {
					if (vm.board[i][j] === true) {
						return;
					}
				}
			}

			vm.won = true;
		}

		function _createBoard() {
			// set up a temp array and then swap it into the view model
			vm.won = false;

			var tempboard = [];
			for (var i = 0; i < vm.selectedBoardSize.length; i++)
			{
				tempboard[i] = [];

				for (var j = 0; j < vm.selectedBoardSize.width; j++)
				{
					tempboard[i].push(false);
				}
			}

			vm.board = tempboard;

			var centerY = Math.floor(vm.selectedBoardSize.length / 2);
			var centerX = Math.floor(vm.selectedBoardSize.width / 2)

			// "press" the center square and then mark the center square itself as false
			vm.updateBoard(centerX, centerY);
			vm.board[centerY][centerX] = false;
		}
	}
})();