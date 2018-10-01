# Raven-client
P2P Audio/Video web conference

# Prerequisites
- Node LTS
- yarn

# Getting started
1. Clone repo:
```
$ git clone https://github.com/interviewr/raven-client.git
```
2. Install dependencies:
```
$ yarn install
```
3. Run the app:
```
$ yarn start
```
**Note**: To run this app you should have signalling server running ([raven-signal](https://github.com/interviewr/raven-signal)).
You can run it separately or via following commands:
```
$ make pull-signal
$ make run-signal
```

4. Navigate to `https://localhost:3333/${roomId}`
