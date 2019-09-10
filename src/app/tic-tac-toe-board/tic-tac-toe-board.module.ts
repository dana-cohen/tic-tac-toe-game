import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TicTacToeBoardComponent } from './tic-tac-toe-board.component';

@NgModule({
  declarations: [TicTacToeBoardComponent],
  exports: [
    TicTacToeBoardComponent
  ],
  imports: [
    CommonModule
  ]
})
export class TicTacToeBoardModule { }
