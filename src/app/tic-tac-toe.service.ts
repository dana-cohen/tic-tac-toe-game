import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import _ from 'lodash';
import { UserName } from './tic-tac-toe-game/tic-tac-toe-game.component';

const EmptyBoardState = [['', '', ''], ['', '', ''], ['', '', '']];

@Injectable({
  providedIn: 'root'
})
export class TicTacToeService {
  totalScore = new BehaviorSubject({ player1: 0, player2: 0 });
  private currentBoardState = _.cloneDeep(EmptyBoardState);
  boardState = new BehaviorSubject(this.currentBoardState);
  private totalScoreObj = { player1: 0, player2: 0 };
  private stateOfCurrentGame =  [0, 0, 0, 0, 0, 0, 0, 0];

  updateBoard(playerName, column, row) {
    const mark = playerName === UserName.PLAYER1 ? 'X' : 'O';
    this.currentBoardState[column][row] = mark;
    this.boardState.next(this.currentBoardState);
    this.isGameOver(playerName, column, row);
  }

  getScoresBoardState() {
    return this.boardState.asObservable();
  }

  getTotalScore() {
    return this.totalScore.asObservable();
  }

  isThereAWinner(playerName, column, row) {
    const num = playerName === UserName.PLAYER1 ? 1 : -1;
    this.stateOfCurrentGame[column] += num;
    this.stateOfCurrentGame[3 + row] += num;
    if (row === column) {
      this.stateOfCurrentGame[6] += num;
      if (column === 1) {
        this.stateOfCurrentGame[7] += num;
      }
    } else if (row + column === 2) {
      this.stateOfCurrentGame[7] += num;
    }

    const i = this.stateOfCurrentGame.indexOf(3);
    const j = this.stateOfCurrentGame.indexOf(-3);
    return i >= 0 || j >= 0;
  }

  updateScores(playerName) {
    this.totalScoreObj = playerName === UserName.PLAYER1 ?
      { player1: this.totalScoreObj.player1 + 1, player2: this.totalScoreObj.player2 } :
      { player1: this.totalScoreObj.player1, player2: this.totalScoreObj.player2 + 1};
    this.totalScore.next(this.totalScoreObj);
    return true;
  }

  noMoreMoves() {
    return !this.currentBoardState[0].includes('') &&
      !this.currentBoardState[1].includes('') && !this.currentBoardState[2].includes('');
  }

  isGameOver(playerName, column, row) {
    const isThereAWinner = this.isThereAWinner(playerName, column, row);
    if (isThereAWinner) {
      this.updateScores(playerName);
    }
    if (this.noMoreMoves() || isThereAWinner) {
      this.stateOfCurrentGame =  [0, 0, 0, 0, 0, 0, 0, 0];
      this.currentBoardState = _.cloneDeep(EmptyBoardState);
      this.boardState.next(this.currentBoardState);
    }
  }
}
