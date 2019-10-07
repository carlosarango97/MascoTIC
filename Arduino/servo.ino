#include<Servo.h>

Servo dispensador;

void setup() {
  // put your setup code here, to run once:
  dispensador.attach(9);

}

void loop() {
  // put your main code here, to run repeatedly:
  dispensador.write(0);
  delay(3000);
  dispensador.write(90);
  delay(3000);
}
