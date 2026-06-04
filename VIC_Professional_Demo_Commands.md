# Professional VIC-Inspired Demo Commands

Run these from the project folder:

```bash
cd /Users/jsserver/Desktop/final_project/bk_idk
```

## 1. Show The Full Encryption Workflow

```bash
python3 vic_cipher_professional_demo.py encrypt --key "SECRET 1970" --text "MEET AT NOON" --show-steps
```

Important things to point at:

- Normalized message: `MEETATNOON`
- Keyed alphabet: generated from the secret key
- Straddling checkerboard: letters become one-digit or two-digit codes
- Substitution digits: first encrypted numeric form
- After transposition: final ciphertext

## 2. Decrypt With The Correct Key

```bash
python3 vic_cipher_professional_demo.py decrypt --key "SECRET 1970" --text "00151 88722 59012 02597 20"
```

Expected output:

```text
MEETATNOON
```

## 3. Decrypt With A Wrong Key

```bash
python3 vic_cipher_professional_demo.py decrypt --key "PUBLIC 1970" --text "00151 88722 59012 02597 20"
```

Expected output:

```text
NUUICIOQQPA
```

What to say:

> The wrong key still produces letters, but they are not the original message. That proves the key controls whether the ciphertext can be understood.

## Best Screenshot For Your Slides

Take a screenshot after running all three commands:

1. `encrypt --show-steps`
2. correct-key decrypt
3. wrong-key decrypt

Put that screenshot on your demo slide instead of the older simple demo screenshot.

## More Professional Browser Demo

Open this file in your browser:

```text
/Users/jsserver/Desktop/final_project/bk_idk/vic_spy_console.html
```

Use it during the presentation if you want the demo to look more professional than Terminal.

Presentation flow:

1. Click **Encrypt Message**
2. Point to **Algorithm Steps**
3. Point to **Keyed Checkerboard**
4. Click **Decrypt Ciphertext**
5. Click **Test Wrong Key**

What to say:

> This visual demo uses the same source-code logic: keyed alphabet, checkerboard substitution, and transposition. The correct key recovers the message, while the wrong key cannot recover the original plaintext.
