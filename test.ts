// Tests for longRadio extension

// Set max length
longRadio.setPacketLength(251)

// Handler for long strings
longRadio.onReceivedString(function (receivedString) {
    serial.writeLine("Received (" + receivedString.length + "): " + receivedString)
    // Show first part of the message to confirm reception
    basic.showString(receivedString.substring(0, 5))
})

// Send a long message on button A
input.onButtonPressed(Button.A, function () {
    // 200 character string
    let longMsg = "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"
    longMsg += "1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890"

    serial.writeLine("Sending msg of length: " + longMsg.length)
    longRadio.sendString(longMsg)
    basic.showIcon(IconNames.Yes)
})
