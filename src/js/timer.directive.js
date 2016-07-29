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
                var displayPattern = 'hh:mm:ss';
                if(attrs.displayPattern) {
                    displayPattern = attrs.displayPattern;
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
                    var displayTime = displayPattern;
                    var hours = 0;
                    var minutes = 0;
                    if(displayTime.indexOf('hh') >= 0) {
                        hours = Math.floor(inSeconds / 3600).toFixed(0);
                        if(hours < 10) {
                            displayTime = displayTime.replace(/hh/g,'0' + String(hours));
                        } else {
                            displayTime = displayTime.replace(/hh/g,String(hours));
                        }
                    }
                    if(displayTime.indexOf('mm') >= 0) {
                        minutes = Math.floor((inSeconds - (hours * 3600)) / 60).toFixed(0);
                        if(minutes < 10) {
                            displayTime = displayTime.replace(/mm/g,'0' + String(minutes));
                        } else {
                            displayTime = displayTime.replace(/mm/g,String(minutes));
                        }
                    }
                    if(displayTime.indexOf('ss') >= 0) {
                        var seconds = (inSeconds - (hours * 3600) - (minutes * 60).toFixed(0));
                        if(seconds < 10) {
                            displayTime =  displayTime.replace(/ss/g,'0' + String(seconds));
                        } else {
                            displayTime =  displayTime.replace(/ss/g,String(seconds));
                        }
                    }
                    return displayTime;
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
