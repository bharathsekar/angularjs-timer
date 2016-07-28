/**
 * Created by Bharath on 2016-06-21.
 */
(function() {
    'use strict';

    angular.module('angularjs-timer',[])
        .directive('timer', ['$interval', timer]);
    function timer($interval) {
        return {
            restrict: "E",
            link: function(scope, element, attrs) {
                var interval;
                var duration = 0;
                if(attrs.initDuration) {
                    duration = attrs.initDuration;
                }
                setHtml();
                function setHtml() {
                    element.html(getHumanizedDuration());
                }
                function startTimer() {
                    interval = $interval(function() {
                        duration = Number(duration) + Number(1000);
                        setHtml();
                        scope.$broadcast('timer-updated',duration);
                    },1000);
                }

                function stopTimer() {
                    $interval.cancel(interval);
                    scope.$broadcast('timer-stopped',duration);
                    setHtml();
                    interval = undefined;
                }

                function resetTimer() {
                    $interval.cancel(interval);
                    duration = 0;
                    setHtml();
                    scope.$broadcast('timer-reset');
                    interval = undefined;
                }

                function destroyTimer() {
                    $interval.cancel(interval);
                    duration = 0;
                    scope.$broadcast('timer-destroyed');
                    interval = undefined;
                }

                function getHumanizedDuration() {
                    var inSeconds = duration/1000;
                    var hours   = Math.floor(inSeconds / 3600).toFixed(0);
                    var minutes = Math.floor((inSeconds - (hours * 3600)) / 60).toFixed(0);
                    var seconds = inSeconds - (hours * 3600) - (minutes * 60).toFixed(0);

                    if (hours   < 10) {hours   = "0"+hours;}
                    if (minutes < 10) {minutes = "0"+minutes;}
                    if (seconds < 10) {seconds = "0"+seconds;}
                    return hours+':'+minutes+':'+seconds;
                }

                element.on('$destroy', function() {
                    destroyTimer();
                });


                scope.$on('start-timer', function(event) {
                    startTimer();
                });

                scope.$on('stop-timer', function(event) {
                    stopTimer();
                });

                scope.$on('reset-timer', function(event) {
                    resetTimer();
                });
            }
        };
    }
})();
