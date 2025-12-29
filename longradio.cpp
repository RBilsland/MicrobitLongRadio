#include "pxt.h"

using namespace pxt;

/**
 * Support for longer radio messages.
 */
namespace longradio {

/**
 * Set the maximum packet length for the radio.
 */
//%
void setPacketLength(int length) {
  uBit.radio.enable();
  if (length < 0)
    length = 0;
  if (length > 251)
    length = 251;
  uBit.radio.setPacketSize(length);
}

/**
 * Send a string over the radio.
 */
//%
void sendString(String msg) {
  if (!msg)
    return;
  uBit.radio.enable();

  int len = msg->length();
  if (len > 241)
    len = 241;

  uint8_t *buf = (uint8_t *)malloc(len + 10);
  if (!buf)
    return;

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
  uBit.radio.enable();
  PacketBuffer p = uBit.radio.datagram.recv();
  if (p == PacketBuffer::EmptyPacket)
    return mkString("");

  uint8_t *data = p.getBytes();
  int len = p.length();

  if (len < 10 || data[0] != 2)
    return mkString("");

  int stringLen = data[9];
  // Ensure we don't read past the end of the packet
  if (stringLen > len - 10)
    stringLen = len - 10;
  if (stringLen < 0)
    stringLen = 0;

  return mkString((char *)(data + 10), stringLen);
}

/**
 * Internal use only. Registers the handler for radio reception.
 */
//%
void onReceivedData(Action handler) {
  uBit.radio.enable();
  registerWithDal(DEVICE_ID_RADIO, DEVICE_RADIO_EVT_DATAGRAM, handler);
}
} // namespace longradio
