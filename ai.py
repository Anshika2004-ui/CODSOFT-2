import random

def ai_move(board, ai_player, human_player):
    # Try to win
    for row in range(4):
        for col in range(4):
            if board[row][col] == " ":
                board[row][col] = ai_player
                if check_temp_winner(board, ai_player):
                    return
                board[row][col] = " "

    # Block human from winning
    for row in range(4):
        for col in range(4):
            if board[row][col] == " ":
                board[row][col] = human_player
                if check_temp_winner(board, human_player):
                    board[row][col] = ai_player
                    return
                board[row][col] = " "

    # Otherwise, pick random empty spot
    empty_cells = [(r, c) for r in range(4) for c in range(4) if board[r][c] == " "]
    if empty_cells:
        row, col = random.choice(empty_cells)
        board[row][col] = ai_player


def check_temp_winner(board, player):
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