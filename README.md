# angularjs-timer
Simple angular directive for a time ticker

#Usage
"<timer init-duration='{{init time in milliseconds}}'></timer>"
init-duration is optional and if not specified it will start from 00:00:00

#Details
The directive works using the emit events

By default when this directive becomes active, the timer starts ticking
Every time the timer ticks, it emits an event 'timer-updated' and the data emited is the latest duration in milliseconds

To stop the timer emit an event 'stop-timer'
On stopping the timer, the timer emits 'timer-stopped' with the latest time data in milliseconds

To start the timer again emit an event 'start-timer' and the timer starts ticking and emits the event 'timer-updated' periodically (every 1 s approx providing the timer data in milliseconds)

To reset the timer, emit an event 'reset-timer' and on reset an event timer-reset will be emitted back.

On destorying the element / timer, an event 'timer-destroyed' is emitted.
