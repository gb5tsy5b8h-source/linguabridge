#!/usr/bin/env python3
"""
Professional VIC-Inspired Cipher Demonstration

This is an educational classroom demo inspired by real VIC cipher techniques.
It is not a complete historical VIC implementation, but it uses two authentic
classical-cipher ideas:

1. Keyed straddling checkerboard substitution
2. Keyed columnar transposition

Use only for learning, presentations, and authorized demonstrations.
"""

from __future__ import annotations

import argparse
import math
import string
from dataclasses import dataclass


ALPHABET = string.ascii_uppercase
ROW_LABELS = ("2", "6")
TOP_DIGITS = ("0", "1", "3", "4", "5", "7", "8", "9")
ALL_DIGITS = ("0", "1", "2", "3", "4", "5", "6", "7", "8", "9")
PAD = "0"


@dataclass
class CipherResult:
    normalized: str
    keyed_alphabet: str
    checkerboard: dict[str, str]
    substituted_digits: str
    transposed_digits: str
    grouped_ciphertext: str


def unique_keyed_alphabet(key: str) -> str:
    """Create a keyed alphabet from the secret key."""
    letters = []
    for char in key.upper():
        if char in ALPHABET and char not in letters:
            letters.append(char)

    for char in ALPHABET:
        if char not in letters:
            letters.append(char)

    return "".join(letters)


def normalize_message(message: str) -> str:
    """Keep letters only, because classical hand ciphers usually normalize text."""
    cleaned = [char for char in message.upper() if char in ALPHABET]
    if not cleaned:
        raise ValueError("Message must contain at least one letter.")
    return "".join(cleaned)


def build_checkerboard(key: str) -> dict[str, str]:
    """
    Build a keyed straddling checkerboard.

    Eight common letters get one digit. The remaining letters get two digits.
    This creates variable-length numeric substitution, a real classical cipher
    idea used in VIC-style systems.
    """
    keyed = unique_keyed_alphabet(key)
    board: dict[str, str] = {}

    for letter, digit in zip(keyed[:8], TOP_DIGITS):
        board[letter] = digit

    remaining = keyed[8:]
    slots = [ROW_LABELS[0] + d for d in ALL_DIGITS]
    slots.extend(ROW_LABELS[1] + d for d in ALL_DIGITS[:8])

    for letter, code in zip(remaining, slots):
        board[letter] = code

    return board


def reverse_checkerboard(board: dict[str, str]) -> dict[str, str]:
    return {code: letter for letter, code in board.items()}


def transposition_order(key: str) -> list[int]:
    """Return column indexes in alphabetical key order, stable for repeated letters."""
    cleaned_key = normalize_message(key)
    return [index for _, index in sorted((char, index) for index, char in enumerate(cleaned_key))]


def columnar_encrypt(digits: str, key: str) -> tuple[str, int]:
    """Read columns in key order after writing digits across rows."""
    order = transposition_order(key)
    width = len(order)
    height = math.ceil(len(digits) / width)
    padded = digits.ljust(width * height, PAD)

    rows = [padded[i : i + width] for i in range(0, len(padded), width)]
    output = []
    for col in order:
        for row in rows:
            output.append(row[col])

    return "".join(output), len(digits)


def columnar_decrypt(transposed: str, key: str, original_length: int) -> str:
    """Reverse the columnar transposition and remove padding."""
    order = transposition_order(key)
    width = len(order)
    height = math.ceil(len(transposed) / width)

    columns = {}
    cursor = 0
    for col in order:
        columns[col] = transposed[cursor : cursor + height]
        cursor += height

    rows = []
    for row_index in range(height):
        row = []
        for col in range(width):
            row.append(columns[col][row_index])
        rows.append("".join(row))

    return "".join(rows)[:original_length]


def substitute(message: str, board: dict[str, str]) -> str:
    return "".join(board[letter] for letter in message)


def unsubstitute(digits: str, board: dict[str, str]) -> str:
    reverse = reverse_checkerboard(board)
    output = []
    cursor = 0

    while cursor < len(digits):
        digit = digits[cursor]
        if digit in ROW_LABELS:
            code = digits[cursor : cursor + 2]
            cursor += 2
        else:
            code = digit
            cursor += 1

        if code not in reverse:
            raise ValueError(f"Cannot decode checkerboard group: {code}")
        output.append(reverse[code])

    return "".join(output)


def group_digits(digits: str, size: int = 5) -> str:
    return " ".join(digits[i : i + size] for i in range(0, len(digits), size))


def ungroup_digits(text: str) -> str:
    digits = "".join(char for char in text if char.isdigit())
    if not digits:
        raise ValueError("Ciphertext must contain digits.")
    return digits


def encrypt(message: str, key: str) -> CipherResult:
    normalized = normalize_message(message)
    keyed_alphabet = unique_keyed_alphabet(key)
    board = build_checkerboard(key)
    substituted = substitute(normalized, board)
    transposed, original_length = columnar_encrypt(substituted, key)
    metadata = f"{original_length:04d}"
    final_digits = metadata + transposed

    return CipherResult(
        normalized=normalized,
        keyed_alphabet=keyed_alphabet,
        checkerboard=board,
        substituted_digits=substituted,
        transposed_digits=final_digits,
        grouped_ciphertext=group_digits(final_digits),
    )


def decrypt(ciphertext: str, key: str) -> str:
    digits = ungroup_digits(ciphertext)
    if len(digits) < 5:
        raise ValueError("Ciphertext is too short.")

    original_length = int(digits[:4])
    transposed = digits[4:]
    substituted = columnar_decrypt(transposed, key, original_length)
    board = build_checkerboard(key)
    return unsubstitute(substituted, board)


def print_checkerboard(board: dict[str, str]) -> None:
    print("\nKeyed straddling checkerboard")
    print("-----------------------------")
    for letter in ALPHABET:
        print(f"{letter}:{board[letter]:>2}", end="  ")
        if letter in ("H", "P", "X"):
            print()
    print()


def print_encrypt_steps(result: CipherResult, key: str) -> None:
    print("VIC-Inspired Professional Demo")
    print("==============================")
    print(f"Secret key:          {key}")
    print(f"Normalized message:  {result.normalized}")
    print(f"Keyed alphabet:      {result.keyed_alphabet}")
    print_checkerboard(result.checkerboard)
    print(f"Substitution digits: {group_digits(result.substituted_digits)}")
    print(f"After transposition: {result.grouped_ciphertext}")
    print("\nCiphertext to send")
    print("------------------")
    print(result.grouped_ciphertext)


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Professional educational VIC-inspired cipher demo."
    )
    subparsers = parser.add_subparsers(dest="command", required=True)

    encrypt_parser = subparsers.add_parser("encrypt", help="Encrypt a message.")
    encrypt_parser.add_argument("--key", required=True, help="Secret key phrase.")
    encrypt_parser.add_argument("--text", required=True, help="Plain message.")
    encrypt_parser.add_argument(
        "--show-steps",
        action="store_true",
        help="Show the substitution and transposition workflow.",
    )

    decrypt_parser = subparsers.add_parser("decrypt", help="Decrypt a message.")
    decrypt_parser.add_argument("--key", required=True, help="Secret key phrase.")
    decrypt_parser.add_argument("--text", required=True, help="Ciphertext digits.")

    args = parser.parse_args()

    if args.command == "encrypt":
        result = encrypt(args.text, args.key)
        if args.show_steps:
            print_encrypt_steps(result, args.key)
        else:
            print(result.grouped_ciphertext)
    else:
        try:
            print(decrypt(args.text, args.key))
        except (IndexError, ValueError):
            print("Decryption failed: wrong key or damaged ciphertext.")


if __name__ == "__main__":
    main()
