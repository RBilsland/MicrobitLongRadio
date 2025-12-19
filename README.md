# Micro:bit Long Radio Extension

This extension allows you to send radio messages up to 251 characters in length when using MakeCode Blocks, matching the functionality available in Python.

## Features

- **Send Long Messages**: Send text messages up to 251 characters (using `radio.sendBuffer()`)
- **Send Long Numbers**: Send numeric values as long messages
- **Receive Long Messages**: Receive and handle long radio messages
- **Maximum Length Support**: Full support for the 251-character limit available in Python

## Usage

### Send Long Messages

Use the `send long radio message` block to send text messages up to 251 characters in length. The extension automatically handles the conversion to a buffer format that supports the full 251-byte limit.

### Send Long Numbers

Use the `send long radio number` block to send numeric values as radio messages.

### Receive Long Messages

Use the `on long radio received` block to handle incoming long messages. This block provides a `receivedString` parameter containing the received message.

## Example

**Sending:**
1. Use the `send long radio message` block with your message (up to 251 characters)
2. Example: "This is a very long message that can be up to 251 characters long and will work perfectly with this extension!"

**Receiving:**
1. Use the `on long radio received` block
2. Access the received message using the `receivedString` parameter
3. Display or process the message as needed

## Installation

### From GitHub

1. Open [MakeCode for micro:bit](https://makecode.microbit.org/)
2. Click on "Extensions" in the block menu
3. Paste the GitHub repository URL: `https://github.com/YOUR_USERNAME/MicrobitLongRadio`
4. The extension will be added to your project

### Local Development

1. Clone this repository
2. Open [MakeCode for micro:bit](https://makecode.microbit.org/)
3. Click on "Extensions" → "Create new extension"
4. Import the files from this repository

## Technical Details

This extension uses `radio.sendBuffer()` and `radio.onReceivedBuffer()` which support up to 251 bytes, matching the Python `radio.config(length=251)` functionality. The standard `radio.sendString()` in MakeCode Blocks is limited to 19 characters, but this extension bypasses that limitation by using the buffer API.

The extension automatically:
- Converts strings to buffers using `control.createBufferFromUTF8()`
- Converts received buffers back to strings
- Enforces the 251-character maximum limit

## License

MIT

