/**
 * Extension to enable sending radio messages up to 251 characters in length
 * Configures the radio buffer size directly, matching Python's radio.config(length=251)
 */

//% weight=100 color=#0fbc11 icon="\uf1eb" block="Long Radio"
namespace longRadio {
    let initialized = false;
    const PACKET_PARAM_BUFFER_SIZE = 1;
    const MAX_BUFFER_SIZE = 251;

    /**
     * Configure radio buffer size using native DAL function
     * This calls the underlying C++ radio.setPacketParam function
     */
    //% shim=longRadio::setRadioBufferSize
    function setRadioBufferSize(param: number, value: number): void {
        // This will be implemented in C++ to call uBit.radio.setPacketParam
        return;
    }

    /**
     * Configure the radio to support messages up to 251 characters
     * This is equivalent to Python's radio.config(length=251)
     */
    function configureRadioBuffer(): void {
        if (initialized) return;
        
        // Configure the radio packet buffer size to 251 bytes
        // This uses a native shim to call the DAL radio.setPacketParam function
        // Note: This may need adjustment based on CODAL vs DAL API differences
        setRadioBufferSize(PACKET_PARAM_BUFFER_SIZE, MAX_BUFFER_SIZE);
        
        initialized = true;
    }

    /**
     * Send a long string message via radio (up to 251 characters)
     * Sends the message in a single transmission, just like Python
     * @param message The message to send, eg: "Hello World"
     */
    //% block="send long radio message %message"
    //% weight=100
    export function sendLongMessage(message: string): void {
        if (!message) return;
        
        // Configure radio buffer size on first use
        configureRadioBuffer();
        
        // Ensure message doesn't exceed 251 characters
        if (message.length > 251) {
            message = message.substr(0, 251);
        }
        
        // Convert string to buffer and send using radio.sendBuffer()
        // With buffer size configured to 251, this will send the full message
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
        // Configure radio buffer size on first use
        configureRadioBuffer();
        
        radio.onReceivedBuffer(function (receivedBuffer: Buffer) {
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

