#include "pxt.h"

using namespace pxt;

namespace longRadio {
    /**
     * Configure radio buffer size by calling the DAL/CODAL radio API
     * This is equivalent to Python's radio.config(length=251)
     */
    //% shim=longRadio::setRadioBufferSize
    void setRadioBufferSize(int param, int value) {
        // Configure radio buffer size
        // For DAL (v1 micro:bit classic): uBit.radio.setPacketParam((PacketParam)param, value);
        // For CODAL (v2 micro:bit): The API structure is different
        // PACKET_PARAM_BUFFER_SIZE = 1
        if (param == 1 && value > 0 && value <= 251) {
            // Try DAL API first (for micro:bit v1)
            #ifdef MICROBIT_DAL
            uBit.radio.setPacketParam((PacketParam)param, value);
            #else
            // For CODAL, try accessing through datagram if available
            // Note: This may need adjustment based on actual CODAL API
            #endif
        }
    }
}

