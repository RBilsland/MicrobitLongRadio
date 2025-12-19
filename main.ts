/**
 * Extension to enable sending radio messages up to 251 characters in length
 * Uses radio.sendBuffer() which supports up to 251 bytes
 */

//% weight=100 color=#0fbc11 icon="\uf1eb" block="Long Radio"
namespace longRadio {
    /**
     * Send a long string message via radio (up to 251 characters)
     * @param message The message to send, eg: "Hello World"
     */
    //% block="send long radio message %message"
    //% weight=100
    export function sendLongMessage(message: string): void {
        if (!message) return;
        
        // Ensure message doesn't exceed 251 characters
        // MakeCode uses substr instead of substring
        if (message.length > 251) {
            message = message.substr(0, 251);
        }
        
        // Convert string to buffer and send using radio.sendBuffer()
        // This supports up to 251 bytes, matching Python's radio.config(length=251)
        let buffer = control.createBufferFromUTF8(message);
        radio.sendBuffer(buffer);
    }

    /**
     * Send a long number message via radio
     * @param value The number to send, eg: 12345
     */
    //% block="send long radio number %value"
    //% weight=90
    export function sendLongNumber(value: number): void {
        // Convert number to string and send
        sendLongMessage(value.toString());
    }

    /**
     * Register code to run when a long radio message is received
     * @param handler Code to run when a message is received
     */
    //% block="on long radio received"
    //% draggableParameters="reporter"
    //% weight=80
    export function onReceivedLongMessage(handler: (receivedString: string) => void): void {
        radio.onReceivedBuffer(function (receivedBuffer) {
            // Convert buffer back to string
            let receivedString = receivedBuffer.toString();
            handler(receivedString);
        });
    }

    /**
     * Get the maximum message length (251 characters)
     */
    //% block="maximum radio message length"
    //% weight=70
    export function getMaxMessageLength(): number {
        return 251;
    }
}

