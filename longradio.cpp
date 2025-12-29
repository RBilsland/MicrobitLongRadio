#include "pxt.h"

using namespace pxt;

/**
 * Support for longer radio messages.
 */
namespace longradio {

    /**
     * Set the maximum packet length for the radio.
     * @param length the maximum length of a radio message, in bytes (up to 251).
     */
    //%
    void setPacketLength(int length) {
        // Hardware limit on nRF52 is 255. 
        // We allow up to 251 to be safe and match Python's limit.
        if (length < 0) length = 0;
        if (length > 251) length = 251;
        uBit.radio.setPacketSize(length);
    }

    /**
     * Send a string over the radio.
     * @param msg the string to send
     */
    //%
    void sendString(String msg) {
        if (!msg) return;
        
        int len = msg->length();
        // MakeCode Packet Format:
        // Byte 0: Type (2 for string)
        // Byte 1-4: Time
        // Byte 5-8: Serial
        // Byte 9: String length
        // Byte 10+: String data
        
        // Max packet size is usually configured by setPacketLength.
        // If length is 251, max string data is 251 - 10 = 241.
        if (len > 241) len = 241;

        uint8_t *buf = (uint8_t *)malloc(len + 10);
        if (!buf) return;

        buf[0] = 2; // PACKET_TYPE_STRING
        uint32_t t = uBit.systemTime();
        memcpy(buf + 1, &t, 4);
        uint32_t sn = microbit_serial_number();
        memcpy(buf + 5, &sn, 4);
        buf[9] = (uint8_t)len;
        memcpy(buf + 10, msg->getUTF8Data(), len);

        uBit.radio.datagram.send(buf, len + 10);
        free(buf);
    }

    /**
     * Read a string from the radio queue.
     */
    //%
    String readString() {
        PacketBuffer p = uBit.radio.datagram.recv();
        if (p == PacketBuffer::EmptyPacket) return mkString("");
        
        uint8_t *data = p.getBytes();
        int len = p.length();
        
        // Compatibility check: must be a string packet and have enough data
        if (len < 10 || data[0] != 2) return mkString("");
        
        int stringLen = data[9];
        // Ensure we don't read past the end of the packet
        if (stringLen > len - 10) stringLen = len - 10;
        if (stringLen < 0) stringLen = 0;
        
        return mkString((char *)(data + 10), stringLen);
    }

    /**
     * Internal use only. Registers the handler for radio reception.
     */
    //%
    void onReceivedData(Action handler) {
        registerWithDal(DEVICE_ID_RADIO, DEVICE_RADIO_EVT_DATAGRAM, handler);
    }
}
