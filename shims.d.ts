// Auto-generated. Do not edit.
declare namespace longradio {

    /**
     * Set the maximum packet length for the radio.
     * @param length the maximum length of a radio message, in bytes (up to 251).
     */
    //% weight=90
    //% help=radio/config
    //% shim=longradio::setPacketLength
    function setPacketLength(length: number): void;

    /**
     * Send a string over the radio.
     * @param msg the string to send
     */
    //% weight=80
    //% shim=longradio::sendString
    function sendString(msg: string): void;

    /**
     * Read a string from the radio queue.
     */
    //% weight=70
    //% shim=longradio::readString
    function readString(): string;

    /**
     * Internal use only. Registers the handler for radio reception.
     */
    //% shim=longradio::onReceivedData
    function onReceivedData(handler: () => void): void;
}

// Auto-generated. Do not edit. Really.
