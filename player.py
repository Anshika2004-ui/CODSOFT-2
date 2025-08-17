def player_move(board, player):
    while True:
        try:
            row = int(input("Enter row (0-3): "))
            col = int(input("Enter col (0-3): "))

            if 0 <= row < 4 and 0 <= col < 4 and board[row][col] == " ":
                board[row][col] = player
                break
            else:
                print("Invalid move. Try again.")
        except ValueError:
            print("Please enter a number.")