/**
 * Long Radio extension for messages longer than 19 characters.
 * This extension allows sending strings up to 241 characters long
 * by reconfiguring the underlying radio hardware.
 */
//% color=#E3008C weight=96 icon="\uf012" block="Long Radio"
namespace longRadio {
    let onReceivedStringHandler: (receivedString: string) => void;

    /**
     * Set the maximum length of a radio message.
     * The standard micro:bit limit is effectively 19 characters for strings.
     * This extension can increase it up to 241 characters.
     * @param length the maximum length of a message in bytes. Default 32, max 251. eg: 251
     */
    //% blockId=long_radio_set_packet_length block="long radio set packet length %length"
    //% length.min=1 length.max=251
    //% weight=100
    //% help=radio/config
    export function setPacketLength(length: number): void {
        longradio.setPacketLength(length);
    }

    /**
     * Sends a string over the radio. 
     * The string can be up to (packet length - 10) characters long.
     * If packet length is 251, the string can be 241 characters.
     * @param msg the string to send
     */
    //% blockId=long_radio_send_string block="long radio send string %msg"
    //% msg.shadow="text"
    //% weight=90
    export function sendString(msg: string): void {
        longradio.sendString(msg);
    }

    /**
     * Registers a piece of code to run when the radio receives a string.
     */
    //% blockId=long_radio_on_received_string block="long radio on received string"
    //% weight=80
    //% draggableParameters=reporter
    export function onReceivedString(handler: (receivedString: string) => void): void {
        onReceivedStringHandler = handler;
        longradio.onReceivedData(() => {
            while (true) {
                const msg = longradio.readString();
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
