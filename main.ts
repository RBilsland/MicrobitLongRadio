/**
 * Long Radio extension for messages longer than 19 characters.
 * This namespace holds both the blocks and the simulator implementations.
 */
//% color=#E3008C weight=96 icon="\uf012" block="Long Radio"
export namespace longradio {
    let onReceivedStringHandler: (receivedString: string) => void;

    /**
     * Set the maximum length of a radio message.
     * @param length the maximum length of a message in bytes. Default 32, max 251. eg: 251
     */
    //% blockId=long_radio_set_packet_length block="long radio set packet length %length"
    //% length.min=1 length.max=251
    //% weight=100
    //% help=radio/config
    export function setPacketLength(length: number): void {
        setPacketLengthShim(length);
    }

    /**
     * Internal shim for setting packet length.
     */
    //% shim=longradio::setPacketLengthShim
    export function setPacketLengthShim(length: number): void {
        // Simulator implementation
        console.log("Long Radio Simulator: setPacketLength(" + length + ")");
    }

    /**
     * Sends a string over the radio. 
     * @param msg the string to send
     */
    //% blockId=long_radio_send_string block="long radio send string %msg"
    //% msg.shadow="text"
    //% weight=90
    export function sendString(msg: string): void {
        sendStringShim(msg);
    }

    /**
     * Internal shim for sending a string.
     */
    //% shim=longradio::sendStringShim
    export function sendStringShim(msg: string): void {
        // Simulator implementation
        console.log("Long Radio Simulator: sendString(" + msg + ")");
    }

    /**
     * Read a string from the radio queue.
     */
    //% shim=longradio::readStringShim
    export function readStringShim(): string {
        // Simulator implementation
        return "";
    }

    /**
     * Internal use only. Registers the handler for radio reception.
     */
    //% shim=longradio::onReceivedDataShim
    export function onReceivedDataShim(handler: () => void): void {
        // Simulator implementation
        // No-op in simulator
    }

    /**
     * Registers a piece of code to run when the radio receives a string.
     */
    //% blockId=long_radio_on_received_string block="long radio on received string"
    //% weight=80
    //% draggableParameters=reporter
    export function onReceivedString(handler: (receivedString: string) => void): void {
        onReceivedStringHandler = handler;
        onReceivedDataShim(() => {
            while (true) {
                const msg = readStringShim();
                if (msg && msg.length > 0) {
                    if (onReceivedStringHandler) {
                        onReceivedStringHandler(msg);
                    }
                } else {
                    break;
                }
            }
        });
    }
}
