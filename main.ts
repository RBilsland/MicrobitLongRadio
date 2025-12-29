/**
 * Long Radio extension for messages longer than 19 characters.
 * This version uses a single namespace for both blocks and shims.
 */
//% color=#E3008C weight=96 icon="\uf012" block="Long Radio"
namespace longradio {
    let onReceivedStringHandler: (receivedString: string) => void;

    /**
     * Set the maximum length of a radio message.
     * @param length the maximum length of a message in bytes. Default 32, max 251. eg: 251
     */
    //% blockId=long_radio_set_packet_length block="long radio set packet length %length"
    //% length.min=1 length.max=251
    //% weight=100
    //% help=radio/config
    //% shim=longradio::setPacketLength
    export function setPacketLength(length: number): void {
        // This is a placeholder for the simulator.
        console.log("Long Radio: Packet length set to " + length);
    }

    /**
     * Sends a string over the radio. 
     * @param msg the string to send
     */
    //% blockId=long_radio_send_string block="long radio send string %msg"
    //% msg.shadow="text"
    //% weight=90
    //% shim=longradio::sendString
    export function sendString(msg: string): void {
        // This is a placeholder for the simulator.
        console.log("Long Radio: Sending string: " + msg);
    }

    /**
     * Read a string from the radio queue.
     */
    //% shim=longradio::readString
    export function readString(): string {
        // This is a placeholder for the simulator.
        return "";
    }

    /**
     * Internal use only. Registers the handler for radio reception.
     */
    //% shim=longradio::onReceivedData
    export function onReceivedData(handler: () => void): void {
        // This is a placeholder for the simulator.
    }

    /**
     * Registers a piece of code to run when the radio receives a string.
     */
    //% blockId=long_radio_on_received_string block="long radio on received string"
    //% weight=80
    //% draggableParameters=reporter
    export function onReceivedString(handler: (receivedString: string) => void): void {
        onReceivedStringHandler = handler;
        onReceivedData(() => {
            while (true) {
                const msg = readString();
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
