(function() {
	'use strict';

	angular.module("lightsout")
		.controller("gameController", gameController);

	gameController.$inject = ["$scope", "$interval", "boardService"];

	function gameController($scope, $interval, boardService) {
		var vm = this;
		var _replayInterval = {};

		vm.board = [];
		vm.moves = [];
		vm.replayMoves = [];
		vm.isWon = false;
		vm.isReplaying = false;
		vm.speedFactor = 4;

		vm.boardSizes = boardService.getPresetBoardSizes();

		// initial selection of board size is just the first one in the preset board size array
		vm.selectedBoardSize = vm.boardSizes[0];

		vm.replay = _replay;
		vm.changeReplaySpeed = _changeReplaySpeed;
		vm.updateBoard = _updateBoard;
		vm.createBoard = _createBoard;

		// initial board creation
		vm.createBoard();

		function _replay() {
			vm.replayMoves = vm.moves;
			
			var i = -1;

			vm.board = boardService.createBoard(vm.selectedBoardSize);
			vm.isWon = false;
			vm.moves = [];
			vm.isReplaying = true;

			_createReplayInterval();
		}

		function _createReplayInterval() {
			var delay = 250;

			if (_replayInterval) { $interval.cancel(_replayInterval); }

			console.log("Replay speed: " + delay * vm.speedFactor);

			_replayInterval = $interval(function() {
					var move = vm.replayMoves.splice(0, 1)[0];
					vm.updateBoard(move.x, move.y);
				},
				delay * vm.speedFactor,
				vm.replayMoves.length
			);			
		}

		function _changeReplaySpeed(inc) {
			var newFactor = vm.speedFactor + inc;

			if (newFactor < 1) newFactor = 1;
			if (newFactor > 4) newFactor = 4;

			if (newFactor != vm.speedFactor) {
				vm.speedFactor = newFactor;
				_createReplayInterval();
			}
		}

		function _updateBoard(x, y) {
			vm.moves.push({ x: x, y: y});
			vm.isWon = boardService.updateBoard(x, y);

			if (vm.isWon && vm.isReplaying) {
				vm.isReplaying = false;
			}
		}

		function _createBoard() {		
			vm.board = boardService.createBoard(vm.selectedBoardSize);
			vm.isWon = false;
			vm.moves = [];
		}
	}
})();