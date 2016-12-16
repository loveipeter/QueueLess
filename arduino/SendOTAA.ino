#include <TheThingsNetwork.h>

// Set your AppEUI and AppKey
const byte appEui[8] = {  }; //for example: {0x70, 0xB3, 0xD5, 0x7E, 0xE0, 0xE0, 0x01, 0x4A1};
const byte appKey[16] = { }; //for example: {0x73, 0x6D, 0x24, 0xD2, 0x69, 0xBE, 0xE3, 0xAE, 0x0E, 0xCE, 0xF0, 0xBB, 0x6C, 0xA4, 0xBA, 0xFE};


#define debugSerial Serial
#define loraSerial Serial1

// Set your message to send
String message = "1"; //sending a string of chars "Hello world"

#define debugPrintLn(...) { if (debugSerial) debugSerial.println(__VA_ARGS__); }
#define debugPrint(...) { if (debugSerial) debugSerial.print(__VA_ARGS__); }

TheThingsNetwork ttn;

const int buttonPin = 2;

// variables will change:
int buttonState = 0;         // variable for reading the pushbutton status
byte numberPresses = 0;

int lastButtonState = 0;  
long startTime = 0;
long finishTime = 0;

void setup() {
  debugSerial.begin(115200);
  loraSerial.begin(57600);

  delay(1000);
  ttn.init(loraSerial, debugSerial);
  ttn.reset();

  //the device will attempt a join every second till the join is successfull
  while(!ttn.join(appEui, appKey)){
      delay(6000);
  }

  digitalWrite(13, HIGH); //turn on LED to confirm join

  delay(6000);
  ttn.showStatus();
  debugPrintLn("Setup for The Things Network complete");
  
  pinMode(buttonPin, INPUT);

  delay(1000);
  startTime = millis();
}

byte payload[2];
unsigned long time;


void loop() {
  
    buttonState = digitalRead(buttonPin);
    time = millis();
    //startTime = millis();
    finishTime = millis();
    Serial.println(startTime);
 // compare the buttonState to its previous state
  if (buttonState != lastButtonState) {
    // if the state has changed, increment the counter
    if (buttonState == HIGH) {
      // if the current state is HIGH then the button
      // wend from off to on:
      numberPresses++;
      Serial.println("on");
      Serial.print("number of button pushes:  ");
      Serial.println(numberPresses);
    } else {
      // if the current state is LOW then the button
      // wend from on to off:
      Serial.println("off");
    }
    // Delay a little bit to avoid bouncing
    delay(50);
  }
  // save the current state as the last state,
  //for next time through the loop
  lastButtonState = buttonState;
  Serial.println(finishTime - startTime);
   if (finishTime - startTime >= 60000 && numberPresses <= 255 && numberPresses >0) {
  
      startTime = finishTime;
      Serial.println("Sending...");
      payload[0] = numberPresses;
      payload[1] = 1;
      ttn.sendBytes(payload, 2);
      Serial.println(String(numberPresses));
      numberPresses = 0;
    }

  
  
   //delay(20000);
  
  
}
