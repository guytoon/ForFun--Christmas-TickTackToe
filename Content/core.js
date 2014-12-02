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
                playerScore: '.score-board .player span',
                aiScore: '.score-board .ai span',
                drawScore: '.score-board .draw span'
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
                        openCells.first().addClass('used');
                        openCells.first().attr('data-selected', 'ai');
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

                        // Horrendus search // Just done for POC
                        var $cells = $('.cell')

                        if ($($cells[0]).attr('data-selected') !== undef)
                        {
                            if ($($cells[0]).attr('data-selected') === $($cells[1]).attr('data-selected') &&
                                $($cells[0]).attr('data-selected') === $($cells[2]).attr('data-selected'))
                            {
                                result = true;
                            }
                            if ($($cells[0]).attr('data-selected') === $($cells[3]).attr('data-selected') &&
                                $($cells[0]).attr('data-selected') === $($cells[6]).attr('data-selected')) {
                                result = true;
                            }
                            if ($($cells[0]).attr('data-selected') === $($cells[4]).attr('data-selected') &&
                                $($cells[0]).attr('data-selected') === $($cells[8]).attr('data-selected')) {
                                alert('horizontal true');
                                result = true;
                            }
                        }
                        if ($($cells[3]).attr('data-selected') !== undef)
                        {
                            if ($($cells[3]).attr('data-selected') === $($cells[4]).attr('data-selected') &&
                                $($cells[3]).attr('data-selected') === $($cells[5]).attr('data-selected')) {
                                alert('middle row matched');
                                result = true;
                            }
                        }

                        if ($($cells[6]).attr('data-selected') !== undef) {
                            if ($($cells[6]).attr('data-selected') === $($cells[7]).attr('data-selected') &&
                                $($cells[6]).attr('data-selected') === $($cells[8]).attr('data-selected')) {
                                alert('middle row matched');
                                result = true;
                            }
                            if ($($cells[6]).attr('data-selected') === $($cells[4]).attr('data-selected') &&
                               $($cells[6]).attr('data-selected') === $($cells[2]).attr('data-selected')) {
                                alert('horizontal true');
                                result = true;
                            }
                        }






                        

                        if (tickTackToe.state.currentTurn === 9)
                        {
                            $('.message').addClass('draw');
                            result = true;
                        }
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
                                $this.attr('data-selected','player');

                                tickTackToe.modules.board.processBoard();
                            }
                        }
                    }
                }
            }
    };
    tickTackToe.init();
}(document, window, jQuery))