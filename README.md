# Long Radio Extension for micro:bit

This extension allows the micro:bit to send and receive radio messages much longer than the standard 19-character limit in MakeCode. 

By default, the micro:bit radio in MakeCode is configured for compatibility with older versions and imposes a strict limit on string length. This extension unlocks the full 251-byte payload capability of the radio hardware (similar to Python's `radio.config(length=251)`).

## Features

- Set radio packet length up to 251 bytes.
- Send strings up to 241 characters long.
- Receive long strings using a dedicated block.
- Maintain compatibility with standard MakeCode radio headers (Serial Number, Time, Packet Type).

## Blocks

### `long radio set packet length`
Sets the maximum length of a radio message.
- Default: 32 bytes
- Max: 251 bytes

### `long radio send string`
Sends a string over the radio. The maximum length of the string is (packet length - 10).
If the packet length is set to 251, you can send up to 241 characters.

### `long radio on received string`
Runs code when a long string is received. Provides the full string as a parameter.

## Examples

### Sending a very long message
```blocks
input.onButtonPressed(Button.A, function () {
    longRadio.setPacketLength(251)
    longRadio.sendString("This is a very long message that would normally be truncated to 19 characters in standard MakeCode radio blocks.")
})
```

### Receiving a long message
```blocks
longRadio.onReceivedString(function (receivedString) {
    serial.writeLine(receivedString)
})
```

## Compatibility
This extension uses the same packet type as the standard `radio.sendString` block but allows for larger payloads. Other micro:bits using this extension will be able to receive the full message. Standard `radio.onReceivedString` blocks on other micro:bits might truncate the message or fail to receive it if they are not configured for the larger packet size.

## Supported targets
* for PXT/microbit
