import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeGameComponent } from './tic-tac-toe-game.component';
import { TicTacToeBoardModule } from '../tic-tac-toe-board/tic-tac-toe-board.module';

@NgModule({
  declarations: [TicTacToeGameComponent],
  exports: [
    TicTacToeGameComponent
  ],
  imports: [
    CommonModule,
    TicTacToeBoardModule,
  ]
})
export class TicTacToeGameModule { }
