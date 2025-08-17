# main.py

# main.py
from game.board import create_board, print_board,check_winner# type: ignore
from game.player import player_move 
from game.ai import ai_move

def main():
    board = create_board()
    print("Tic-Tac-Toe: You (X) vs AI (O)")
    print_board(board)

    while True:
        # Player move
        player_move(board)
        print_board(board)
        if check_winner(board, "X"):
            print("Anshika win!")
            break
        if is_draw(board):
            print("It's a draw!")
            break

        # AI move
        print("AI is thinking...")
        ai_move(board)
        print_board(board)
        if check_winner(board, "O"):
            print("computer wins!")
            break
        if is_draw(board):
            print("It's a draw!")
            break

if __name__ == "__main__":
    main()