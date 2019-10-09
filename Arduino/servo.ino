#include<Servo.h>
#include <EtherCard.h>

static byte mymac[] = {0xDD,0xDD,0xDD,0x00,0x01,0x05};
static byte myip[] = {192,168,1,177};
byte Ethernet::buffer[700];

Servo dispensador;

void setup() {
  // put your setup code here, to run once:
  dispensador.attach(9);

  Serial.begin(9600);
  Serial.println("Test del Modulo  ENC28J60");
 
  if (!ether.begin(sizeof Ethernet::buffer, mymac, 10))
    Serial.println( "No se ha podido acceder a la controlador Ethernet");
  else
    Serial.println("Controlador Ethernet inicializado");
 
  if (!ether.staticSetup(myip))
    Serial.println("No se pudo establecer la dirección IP");

  Serial.println();
}
  
void loop() {
 
  word len = ether.packetReceive();
  word pos = ether.packetLoop(len);
  
  if(pos) {
    
    if(strstr((char *)Ethernet::buffer + pos, "GET /") != 0) {
      Serial.println("Comando recivido");
      dispensador.write(0);
      delay(2000);
      dispensador.write(90);
      delay(2000);
      dispensador.write(0);
      delay(2000);
      dispensador.write(90);
      delay(2000);
    }
  }
}