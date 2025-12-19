#include "pxt.h"

using namespace pxt;

namespace longRadio {
    /**
     * Configure radio buffer size by calling the DAL radio.setPacketParam function
     * This is equivalent to Python's radio.config(length=251)
     */
    //% shim=longRadio::setRadioBufferSize
    void setRadioBufferSize(int param, int value) {
        // Access the micro:bit DAL radio service
        // PACKET_PARAM_BUFFER_SIZE = 1
        uBit.radio.setPacketParam((PacketParam)param, value);
    }
}

