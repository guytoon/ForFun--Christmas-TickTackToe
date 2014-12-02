// This code is not at all production ready.
// Its written under a 45m time limit including 
// the html markup and css NEEDS SERIOUS REFACTORING
// Oh I used background instead of css class. Shoot me :(

(function (document, window, $, undef) {
    var $Dom = $('html'),
        tickTackToe = {
            state: {
                currentTurn: 0,
                nextTurn: function () {
                    tickTackToe.state.currentTurn += 1;
                },
                isPlayersTurn: function () {
                    return ((tickTackToe.state.currentTurn % 2) === 0);
                },
                score: {
                    player: 0,
                    ai: 0,
                    draws: 0,
                    playerWin: function () {
                        tickTackToe.state.score.player += 1;
                    },
                    aiWin: function () {
                        tickTackToe.state.score.ai += 1;
                    },
                    draw: function ()
                    {
                        tickTackToe.state.score.draw += 1;
                    }
                }
            },
            selectors: {
                board: '.board',
                boardCell: '.cell',
                scoreBoard: '.score-board',
                playerScore: tickTackToe.selectors.scoreBoard + ' .player span',
                aiScore: tickTackToe.selectors.scoreBoard + ' .ai span',
                drawScore: tickTackToe.selectors.scoreBoard + ' .draw span'
            },
            init: function () {
                tickTackToe.modules.ui.init(tickTackToe.modules.ui);
            },
            start: function () {

            },
            modules: {
                ai: {
                    takeTurn: function ()
                    {
                        //Ai Compution to make for an intresting game
                        //Very rough go just to get the turns moving
                        // Need to add some calculation logic here,
                        // would be good to reuse game win condition functionlity
                        var openCells = $Dom.find('.cell:not(.used)');
                        console.log(openCells.first());
                        openCells.first().addClass('used');
                        openCells.first().attr('selected', 'ai');
                        openCells.first().css('background', 'red');
                        tickTackToe.state.nextTurn();
                        tickTackToe.modules.board.processBoard();
                    }
                },
                board: {
                    processBoard: function ()
                    {
                        if (!tickTackToe.modules.board.checkForWin())
                        {
                            if (tickTackToe.state.isPlayersTurn()) {
                                tickTackToe.modules.ai.takeTurn();
                            } else {
                                tickTackToe.state.nextTurn();
                            }
                        }
                    },
                    checkForWin: function ()
                    {
                        var result = false;
                        if (tickTackToe.state.currentTurn === 9)
                        {
                            $('.message').addClass('draw');
                            result = true;
                        }
                            
                        var $cells = $('.cell');
                        // check for win x axis
                        // check for win y axis
                        // check for win horz
                        // Not really the most eff
                        // should use smart check alg,
                        // but not sure if its needed for this small calc
                        return result;
                    }
                },
                ui: {
                    init: function (self) {
                        self.CellClick.Add(self);
                    },
                    CellClick: {
                        Add: function (self) {
                            $Dom.find('.cell').on('click', self.CellClick.OnClick);
                            $Dom.find('.btn').on('click', function () {
                                $Dom.find('.cell').removeClass('used');
                                $Dom.find('.cell').removeClass('player1');
                                $Dom.find('.cell').removeClass('player2');
                                $Dom.find('.cell').css('background', 'white');
                                tickTackToe.state.currentTurn = 0;
                                $('.message').attr('class', 'message');
                            });
                        },
                        OnClick: function ()
                        {
                            var $this = $(this);

                            if (tickTackToe.state.isPlayersTurn() &&
                                !$this.hasClass('used'))
                            {
                                $this.addClass('used');
                                $this.addClass('player1');
                                $this.css('background', 'green');

                                tickTackToe.modules.board.processBoard();
                            }
                        }
                    }
                }
            }
    };
    tickTackToe.init();
}(document, window, jQuery))