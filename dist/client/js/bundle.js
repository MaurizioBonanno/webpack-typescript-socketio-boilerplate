/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/SocketClient.ts":
/*!************************************!*\
  !*** ./src/client/SocketClient.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SocketClient": () => (/* binding */ SocketClient)
/* harmony export */ });
class SocketClient {
    constructor() {
        this.socket = io();
        this.socket.on('connect', function () {
            console.log('connect');
        });
        this.socket.on('disconnect', function (message) {
            console.log('disconnect ' + message);
            document.body.innerHTML +=
                'Disconnected from Server : ' + message + '<br/>';
            location.reload();
        });
        //evento chatMessage
        this.socket.on('chatMessage', (chatMessage) => {
            $('#messages').append("<li><span class='float-right'><span class='circle'>" +
                chatMessage.from +
                "<span></span><div class='otherMessage'>" +
                chatMessage.message + "</div></li>");
            this.scrollChatWindow();
        });
        //evento screenName
        this.socket.on('screenName', (screenName) => {
            this.screenName = screenName;
            console.log('rcevuto screenName:' + this.screenName.name);
            $('.screenName').text(this.screenName.name + ' ' + this.screenName.abbreviation);
        });
        $(() => {
            $('#messageText').keypress((e) => {
                var key = e.which;
                if (key == 13) {
                    this.sendMessage();
                    return false;
                }
            });
        });
    }
    sendMessage() {
        let messageText = $('#messageText').val();
        if (messageText.toString().length > 0) {
            this.socket.emit('chatMessage', {
                message: messageText,
                from: this.screenName.abbreviation,
            });
            $('#messages').append("<li><span class='float-left'><span class='circle'>AB</span></span><div class='myMessage'>" +
                this.screenName.abbreviation +
                '</div></li>');
            this.scrollChatWindow();
            $('#messageText').val('');
        }
    }
    scrollChatWindow() {
        $('#messages').animate({
            scrollTop: $('#messages li:last-child').position().top
        }, 500);
        setTimeout(() => {
            let messagesLenght = $('#messages li');
            if (messagesLenght.length > 10) {
                messagesLenght.eq(0).remove();
            }
        }, 500);
    }
    showGame(id) {
        switch (id) {
            case 0:
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel0').delay(100).fadeIn(100);
                break;
            case 1:
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel2').fadeOut(100);
                $('#gamePanel1').delay(100).fadeIn(100);
                break;
            case 2:
                $('#gamePanel1').fadeOut(100);
                $('#gamePanel0').fadeOut(100);
                $('#gamePanel2').delay(100).fadeIn(100);
                break;
        }
    }
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*****************************!*\
  !*** ./src/client/index.ts ***!
  \*****************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _SocketClient__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SocketClient */ "./src/client/SocketClient.ts");

const client = new _SocketClient__WEBPACK_IMPORTED_MODULE_0__.SocketClient();

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDaEZBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7QUNOOEM7QUFDOUMsbUJBQW1CLHVEQUFZIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vd2VicGFja3NvY2tldGlvLy4vc3JjL2NsaWVudC9Tb2NrZXRDbGllbnQudHMiLCJ3ZWJwYWNrOi8vd2VicGFja3NvY2tldGlvL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYnBhY2tzb2NrZXRpby93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vd2VicGFja3NvY2tldGlvL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vd2VicGFja3NvY2tldGlvL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VicGFja3NvY2tldGlvLy4vc3JjL2NsaWVudC9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU29ja2V0Q2xpZW50IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHRoaXMuc29ja2V0ID0gaW8oKTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignY29ubmVjdCcsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2Nvbm5lY3QnKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnNvY2tldC5vbignZGlzY29ubmVjdCcsIGZ1bmN0aW9uIChtZXNzYWdlKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdkaXNjb25uZWN0ICcgKyBtZXNzYWdlKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5pbm5lckhUTUwgKz1cclxuICAgICAgICAgICAgICAgICdEaXNjb25uZWN0ZWQgZnJvbSBTZXJ2ZXIgOiAnICsgbWVzc2FnZSArICc8YnIvPic7XHJcbiAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vZXZlbnRvIGNoYXRNZXNzYWdlXHJcbiAgICAgICAgdGhpcy5zb2NrZXQub24oJ2NoYXRNZXNzYWdlJywgKGNoYXRNZXNzYWdlKSA9PiB7XHJcbiAgICAgICAgICAgICQoJyNtZXNzYWdlcycpLmFwcGVuZChcIjxsaT48c3BhbiBjbGFzcz0nZmxvYXQtcmlnaHQnPjxzcGFuIGNsYXNzPSdjaXJjbGUnPlwiICtcclxuICAgICAgICAgICAgICAgIGNoYXRNZXNzYWdlLmZyb20gK1xyXG4gICAgICAgICAgICAgICAgXCI8c3Bhbj48L3NwYW4+PGRpdiBjbGFzcz0nb3RoZXJNZXNzYWdlJz5cIiArXHJcbiAgICAgICAgICAgICAgICBjaGF0TWVzc2FnZS5tZXNzYWdlICsgXCI8L2Rpdj48L2xpPlwiKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxDaGF0V2luZG93KCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy9ldmVudG8gc2NyZWVuTmFtZVxyXG4gICAgICAgIHRoaXMuc29ja2V0Lm9uKCdzY3JlZW5OYW1lJywgKHNjcmVlbk5hbWUpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5zY3JlZW5OYW1lID0gc2NyZWVuTmFtZTtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ3JjZXZ1dG8gc2NyZWVuTmFtZTonICsgdGhpcy5zY3JlZW5OYW1lLm5hbWUpO1xyXG4gICAgICAgICAgICAkKCcuc2NyZWVuTmFtZScpLnRleHQodGhpcy5zY3JlZW5OYW1lLm5hbWUgKyAnICcgKyB0aGlzLnNjcmVlbk5hbWUuYWJicmV2aWF0aW9uKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAkKCgpID0+IHtcclxuICAgICAgICAgICAgJCgnI21lc3NhZ2VUZXh0Jykua2V5cHJlc3MoKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBrZXkgPSBlLndoaWNoO1xyXG4gICAgICAgICAgICAgICAgaWYgKGtleSA9PSAxMykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgbGV0IG1lc3NhZ2VUZXh0ID0gJCgnI21lc3NhZ2VUZXh0JykudmFsKCk7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VUZXh0LnRvU3RyaW5nKCkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLnNvY2tldC5lbWl0KCdjaGF0TWVzc2FnZScsIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2VUZXh0LFxyXG4gICAgICAgICAgICAgICAgZnJvbTogdGhpcy5zY3JlZW5OYW1lLmFiYnJldmlhdGlvbixcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQoJyNtZXNzYWdlcycpLmFwcGVuZChcIjxsaT48c3BhbiBjbGFzcz0nZmxvYXQtbGVmdCc+PHNwYW4gY2xhc3M9J2NpcmNsZSc+QUI8L3NwYW4+PC9zcGFuPjxkaXYgY2xhc3M9J215TWVzc2FnZSc+XCIgK1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zY3JlZW5OYW1lLmFiYnJldmlhdGlvbiArXHJcbiAgICAgICAgICAgICAgICAnPC9kaXY+PC9saT4nKTtcclxuICAgICAgICAgICAgdGhpcy5zY3JvbGxDaGF0V2luZG93KCk7XHJcbiAgICAgICAgICAgICQoJyNtZXNzYWdlVGV4dCcpLnZhbCgnJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2Nyb2xsQ2hhdFdpbmRvdygpIHtcclxuICAgICAgICAkKCcjbWVzc2FnZXMnKS5hbmltYXRlKHtcclxuICAgICAgICAgICAgc2Nyb2xsVG9wOiAkKCcjbWVzc2FnZXMgbGk6bGFzdC1jaGlsZCcpLnBvc2l0aW9uKCkudG9wXHJcbiAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgbGV0IG1lc3NhZ2VzTGVuZ2h0ID0gJCgnI21lc3NhZ2VzIGxpJyk7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlc0xlbmdodC5sZW5ndGggPiAxMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNMZW5naHQuZXEoMCkucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCA1MDApO1xyXG4gICAgfVxyXG4gICAgc2hvd0dhbWUoaWQpIHtcclxuICAgICAgICBzd2l0Y2ggKGlkKSB7XHJcbiAgICAgICAgICAgIGNhc2UgMDpcclxuICAgICAgICAgICAgICAgICQoJyNnYW1lUGFuZWwxJykuZmFkZU91dCgxMDApO1xyXG4gICAgICAgICAgICAgICAgJCgnI2dhbWVQYW5lbDInKS5mYWRlT3V0KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjZ2FtZVBhbmVsMCcpLmRlbGF5KDEwMCkuZmFkZUluKDEwMCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAxOlxyXG4gICAgICAgICAgICAgICAgJCgnI2dhbWVQYW5lbDAnKS5mYWRlT3V0KDEwMCk7XHJcbiAgICAgICAgICAgICAgICAkKCcjZ2FtZVBhbmVsMicpLmZhZGVPdXQoMTAwKTtcclxuICAgICAgICAgICAgICAgICQoJyNnYW1lUGFuZWwxJykuZGVsYXkoMTAwKS5mYWRlSW4oMTAwKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIDI6XHJcbiAgICAgICAgICAgICAgICAkKCcjZ2FtZVBhbmVsMScpLmZhZGVPdXQoMTAwKTtcclxuICAgICAgICAgICAgICAgICQoJyNnYW1lUGFuZWwwJykuZmFkZU91dCgxMDApO1xyXG4gICAgICAgICAgICAgICAgJCgnI2dhbWVQYW5lbDInKS5kZWxheSgxMDApLmZhZGVJbigxMDApO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgU29ja2V0Q2xpZW50IH0gZnJvbSBcIi4vU29ja2V0Q2xpZW50XCI7XHJcbmNvbnN0IGNsaWVudCA9IG5ldyBTb2NrZXRDbGllbnQoKTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9