	angular.module("lightsout")
		.factory("boardService", boardService)

	function boardService() {
		var _board = [];
		var _litCount = 0;

		return {
			getPresetBoardSizes: _getPresetBoardSizes,
			updateBoard: _updateBoard,
			createBoard: _createBoard
		}

		function _getPresetBoardSizes() {
			return [
				{ name: "5x5", width: 5, length: 5 },
				{ name: "9x9", width: 9, length: 9 },
				{ name: "11x11", width: 11, length: 11 },
				{ name: "21x21", width: 21, length: 21 },
				{ name: "51x51", width: 51, length: 51 }
			]
		}

		function _updateBoard(x, y) {
			_board[y][x] = !_board[y][x];
			_litCount += _board[y][x] ? 1 : -1;

			// this could probably be functionalized, but wouldn't gain much by it currently
			if (y + 1 < _board.length) {
				_board[y + 1][x] = !(_board[y + 1][x]);
				_litCount += _board[y + 1][x] ? 1 : -1;
			} 

			if (y - 1 >= 0) {
				_board[y - 1][x] = !(_board[y - 1][x]);
				_litCount +=  _board[y - 1][x] ? 1 : -1;
			}

			if (x + 1 < _board[x].length) {
				_board[y][x + 1] = !(_board[y][x + 1]);
				_litCount += _board[y][x + 1] ? 1 : -1;
			}

			if (x - 1 >= 0) {
				_board[y][x - 1] = !(_board[y][x - 1]);
				_litCount += _board[y][x - 1] ? 1 : -1;
			}

			if (_litCount === 0)
			{
				return  true;
			}
			else
			{
				return false;
			}
		}

		function _createBoard(selectedBoardSize) {
			// so we don't trip the win condition, set this to 1
			_litCount = 0;

			// set up a temp array and then swap it into the view model
			var tempboard = [];
			for (var i = 0; i < selectedBoardSize.length; i++)
			{
				tempboard[i] = [];

				for (var j = 0; j < selectedBoardSize.width; j++)
				{
					tempboard[i].push(false);
				}
			}

			_board = tempboard;

			// get the center square (assumes odd rows/columns)
			var centerY = Math.floor(selectedBoardSize.length / 2);
			var centerX = Math.floor(selectedBoardSize.width / 2)

			// "press" the center square and then mark the center square itself as false
			_updateBoard(centerX, centerY);
			_board[centerY][centerX] = false;

			// take out the 1 we set at the beginning, plus the center square that we turned off
			_litCount = _litCount - 1;

			return _board;
		}
	}