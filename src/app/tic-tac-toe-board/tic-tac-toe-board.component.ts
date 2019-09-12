import { Component, Input, OnInit } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe.service';

@Component({
  selector: 'app-tic-tac-toe-board',
  templateUrl: './tic-tac-toe-board.component.html',
  styleUrls: ['./tic-tac-toe-board.component.css']
})
export class TicTacToeBoardComponent implements OnInit {
  @Input() playerName: string;
  $boardObj;

  constructor(private ticTacToeService: TicTacToeService) {
  }

  ngOnInit() {
    this.$boardObj = this.ticTacToeService.getScoresBoardState();
  }

  updateBoard(column, row, value) {
    if (!value) {
      this.ticTacToeService.updateBoard(this.playerName, column, row);
    }
  }

}
