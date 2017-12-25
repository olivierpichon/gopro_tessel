# Gopro_tessel

## Feature
This Tessel program exposes an HTTP server which serves a really _really_ basic website that lets you control your GoPro.
For now the only supported features are:
- Switch off and on the GoPro
- Stream live the content of your GoPro

Additional GoPro controls can be added easily thanks to [this excellent reverse engineering work.](https://github.com/KonradIT/goprowifihack)

## Architecture
To be remotely controlled, GoPro cameras usually expose an ap. Tessel v2 wifi connects to the GoPro ap.
We also use the Ethernet connection of Tessel (the tessel is connected to your modem / router) to expose a Website on the local Network.
When a client visits the website and typically asks for the GoPro live stream, the request is sent to Tessel which forwards the request from its ethernet connection to its wifi connection to reach the GoPro and then pipes it back to the website.

## Known Limitation
The live stream format is HTTP Live Streaming (HLS). Safari provides the best support for this format.

## Possible future development
This PoC can be used as a base to develop more integrated features with Tessel such as using the ambient module to detect the sound level and if reaching a given threshold, send an alert.
This same website could also be exposed on Internet with a basic auth. When receiving an alert, one could connect to this website and stream the content of the GoPro, the whole setup would essentially act as a security device.