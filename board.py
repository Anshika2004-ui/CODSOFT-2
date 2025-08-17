def create_board():
    return [[" " for _ in range(4)] for _ in range(4)]  

def print_board(board):
    for row in board:
        print("|".join(row))
        print("-" * 7)

def check_winner(board, player):
    # Check rows
    for row in board:
        if all(cell == player for cell in row):
            return True

    # Check columns
    for col in range(4):
        if all(board[row][col] == player for row in range(4)):
            return True

    # Check diagonals
    if all(board[i][i] == player for i in range(4)):
        return True
    if all(board[i][3 - i] == player for i in range(4)):
        return True

    return False