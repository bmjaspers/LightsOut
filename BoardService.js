	angular.module("lightsout")
		.factory("boardService", boardService)

	function boardService() {
		return {
			getPresetBoardSizes: _getPresetBoardSizes
		}

		function _getPresetBoardSizes() {
			return [
				{ name: "11x11", width: 11, length: 11 },
				{ name: "21x21", width: 21, length: 21 },
				{ name: "51x51", width: 51, length: 51 }
			]
		}
	}