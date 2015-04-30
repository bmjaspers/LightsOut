(function() {
	'use strict';

	angular.module("lightsout")
		.controller("gameController", gameController);

	gameController.$inject = ["boardService"];

	function gameController(boardService) {
		var vm = this;

		vm.board = [];
		vm.moves = [];
		vm.litCount = 1;

		vm.boardSizes = boardService.getPresetBoardSizes();

		// initial selection of board size is just the first one in the preset board size array
		vm.selectedBoardSize = vm.boardSizes[0];

		vm.updateBoard = _updateBoard;
		vm.createBoard = _createBoard;

		// initial board creation
		vm.createBoard();

		function _updateBoard(x, y) {
			vm.moves.push({ x: x, y: y});

			vm.board[y][x] = !vm.board[y][x];
			vm.litCount += vm.board[y][x] ? 1 : -1;

			// this could probably be functionalized, but wouldn't gain much by it currently
			if (y + 1 < vm.board.length) {
				vm.board[y + 1][x] = !(vm.board[y + 1][x]);
				vm.litCount += vm.board[y + 1][x] ? 1 : -1;
			} 

			if (y - 1 >= 0) {
				vm.board[y - 1][x] = !(vm.board[y - 1][x]);
				vm.litCount +=  vm.board[y - 1][x] ? 1 : -1;
			}

			if (x + 1 < vm.board[x].length) {
				vm.board[y][x + 1] = !(vm.board[y][x + 1]);
				vm.litCount += vm.board[y][x + 1] ? 1 : -1;
			}

			if (x - 1 >= 0) {
				vm.board[y][x - 1] = !(vm.board[y][x - 1]);
				vm.litCount += vm.board[y][x - 1] ? 1 : -1;
			}
		}

		function _createBoard() {
			// set up a temp array and then swap it into the view model
			vm.litCount = 1;

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

			vm.litCount = vm.litCount - 2;
			vm.moves = [];
		}
	}
})();