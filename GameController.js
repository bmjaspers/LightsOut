(function() {
	'use strict';

	angular.module("lightsout")
		.controller("gameController", gameController);

	gameController.$inject = ["$scope", "$interval", "boardService"];

	function gameController($scope, $interval, boardService) {
		var vm = this;

		vm.board = [];
		vm.moves = [];
		vm.isWon = false;

		vm.boardSizes = boardService.getPresetBoardSizes();

		// initial selection of board size is just the first one in the preset board size array
		vm.selectedBoardSize = vm.boardSizes[0];

		vm.replay = _replay;
		vm.updateBoard = _updateBoard;
		vm.createBoard = _createBoard;

		// initial board creation
		vm.createBoard();

		function _replay() {
			var moves = vm.moves;
			
			var i = -1;
			var delay = 1000;

			vm.board = boardService.createBoard(vm.selectedBoardSize);
			vm.isWon = false;
			vm.moves = [];

			$interval(function() {
					// delays updating the board for one round
					if (i >= 0)	{ vm.updateBoard(moves[i].x, moves[i].y); }
					i++;
				},
				delay,
				moves.length + 1
			);
		}

		function _updateBoard(x, y) {
			vm.moves.push({ x: x, y: y});

			vm.isWon = boardService.updateBoard(x, y);
		}

		function _createBoard() {
			vm.moves = [];
			vm.board = boardService.createBoard(vm.selectedBoardSize);
		}
	}
})();