#!/usr/bin/env python3
"""
VIC Cipher Inspired Spy App Demo

This is an educational demo inspired by the VIC cipher, not a full historical
implementation. The real VIC cipher is a complex hand cipher. This program
keeps the same classroom ideas:

- a secret key controls encryption
- plaintext is converted into cipher text
- the same key is needed to decrypt
- the result hides obvious message patterns

Use only for learning and authorized demonstrations.
"""

import argparse
import hashlib
import string


ALPHABET = string.ascii_uppercase


def clean_message(message: str) -> str:
    """Keep letters and spaces, and normalize to uppercase."""
    cleaned = []
    for char in message.upper():
        if char in ALPHABET or char == " ":
            cleaned.append(char)
    return "".join(cleaned)


def key_stream(key: str, length: int) -> list[int]:
    """
    Build a repeatable stream of numbers from the secret key.

    A real VIC cipher uses manual key generation. For this safe demo, SHA-256
    gives us key-dependent numbers that are easy to explain and reproduce.
    """
    if not key:
        raise ValueError("Key cannot be empty.")

    stream = []
    counter = 0

    while len(stream) < length:
        seed = f"{key}:{counter}".encode("utf-8")
        digest = hashlib.sha256(seed).digest()
        stream.extend(byte % 26 for byte in digest)
        counter += 1

    return stream[:length]


def encrypt(message: str, key: str) -> str:
    """
    Encrypt a message into groups of two-digit numbers.

    Space is encoded as 99. Letters are shifted by key-stream values and then
    written as 00-25 numbers.
    """
    plaintext = clean_message(message)
    shifts = key_stream(key, len(plaintext))
    cipher_numbers = []

    for char, shift in zip(plaintext, shifts):
        if char == " ":
            cipher_numbers.append("99")
            continue

        plain_number = ALPHABET.index(char)
        cipher_number = (plain_number + shift) % 26
        cipher_numbers.append(f"{cipher_number:02d}")

    return " ".join(cipher_numbers)


def decrypt(ciphertext: str, key: str) -> str:
    """Decrypt two-digit number groups back into readable text."""
    groups = ciphertext.split()
    shifts = key_stream(key, len(groups))
    plaintext = []

    for group, shift in zip(groups, shifts):
        if group == "99":
            plaintext.append(" ")
            continue

        if not group.isdigit() or len(group) != 2:
            raise ValueError(f"Invalid cipher group: {group}")

        cipher_number = int(group)
        if cipher_number < 0 or cipher_number > 25:
            raise ValueError(f"Cipher group must be 00-25 or 99: {group}")

        plain_number = (cipher_number - shift) % 26
        plaintext.append(ALPHABET[plain_number])

    return "".join(plaintext)


def run_interactive() -> None:
    print("VIC Cipher Inspired Spy App Demo")
    print("--------------------------------")
    print("1. Encrypt a message")
    print("2. Decrypt a message")

    choice = input("Choose 1 or 2: ").strip()
    key = input("Secret key: ").strip()

    if choice == "1":
        message = input("Message: ")
        print("\nCipher text:")
        print(encrypt(message, key))
    elif choice == "2":
        ciphertext = input("Cipher text numbers: ")
        print("\nPlain text:")
        print(decrypt(ciphertext, key))
    else:
        print("Please choose 1 or 2.")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Educational VIC cipher inspired spy app demo."
    )
    parser.add_argument(
        "mode",
        nargs="?",
        choices=["encrypt", "decrypt"],
        help="Run one command directly instead of interactive mode.",
    )
    parser.add_argument("--key", help="Secret key.")
    parser.add_argument("--text", help="Message or cipher text.")
    args = parser.parse_args()

    if not args.mode:
        run_interactive()
        return

    if not args.key or not args.text:
        parser.error("--key and --text are required with encrypt/decrypt mode.")

    if args.mode == "encrypt":
        print(encrypt(args.text, args.key))
    else:
        print(decrypt(args.text, args.key))


if __name__ == "__main__":
    main()
