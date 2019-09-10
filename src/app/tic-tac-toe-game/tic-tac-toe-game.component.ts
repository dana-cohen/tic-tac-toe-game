import { Component, OnDestroy, OnInit } from '@angular/core';
import { TicTacToeService } from '../tic-tac-toe.service';

export enum UserName {
  PLAYER1 = 'dana',
  PLAYER2 = 'nir',
}
@Component({
  selector: 'app-tic-tac-toe-game',
  templateUrl: './tic-tac-toe-game.component.html',
  styleUrls: ['./tic-tac-toe-game.component.css']
})
export class TicTacToeGameComponent implements OnInit, OnDestroy {

  score;
  subscriber;
  userName = UserName;
  constructor(private ticTacToeService: TicTacToeService) { }

  ngOnInit() {
    this.subscriber = this.ticTacToeService.getTotalScore()
      .subscribe(score => {
        this.score = score;
      });
  }

  ngOnDestroy(): void {
    this.subscriber.unsubscribe();
  }

}
