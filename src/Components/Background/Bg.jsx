import React from 'react'
import './Bg.css'
function Bg() {
    function scripter(){
        document.addEventListener('DOMContentLoaded', function () {
            $(window).on('load', function () {


              function countUp(target, startVal, endVal, decimals, duration) {

                // make sure requestAnimationFrame and cancelAnimationFrame are defined
                // polyfill for browsers without native support
                // by Opera engineer Erik Möller
                var lastTime = 0;
                var vendors = ['webkit', 'moz', 'ms'];
                for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
                  window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
                  window.cancelAnimationFrame =
                    window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
                }
                if (!window.requestAnimationFrame) {
                  window.requestAnimationFrame = function (callback, element) {
                    var currTime = new Date().getTime();
                    var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                    var id = window.setTimeout(function () { callback(currTime + timeToCall); },
                      timeToCall);
                    lastTime = currTime + timeToCall;
                    return id;
                  }
                }
                if (!window.cancelAnimationFrame) {
                  window.cancelAnimationFrame = function (id) {
                    clearTimeout(id);
                  }
                }

                var self = this;

                this.d = document.getElementById(target);

                startVal = Number(startVal);
                endVal = Number(endVal);
                this.countDown = (startVal > endVal) ? true : false;

                // toggle easing
                this.useEasing = false;

                decimals = Math.max(0, decimals || 0);
                this.dec = Math.pow(10, decimals);
                this.duration = duration * 1000 || 2000;

                this.startTime = null;
                this.frameVal = startVal;

                this.rAF = null;

                // Robert Penner's easeOutExpo
                this.easeOutExpo = function (t, b, c, d) {
                  return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
                }
                this.count = function (timestamp) {

                  if (self.startTime === null) self.startTime = timestamp;

                  var progress = timestamp - self.startTime;

                  // to ease or not to ease
                  if (self.useEasing) {
                    if (self.countDown) {
                      var i = self.easeOutExpo(progress, 0, startVal - endVal, self.duration);
                      self.frameVal = startVal - i;
                    } else {
                      self.frameVal = self.easeOutExpo(progress, startVal, endVal - startVal, self.duration);
                    }
                  } else {
                    if (self.countDown) {
                      var i = (startVal - endVal) * (progress / self.duration);
                      self.frameVal = startVal - i;
                    } else {
                      self.frameVal = startVal + (endVal - startVal) * (progress / self.duration);
                    }
                  }

                  // decimal
                  self.frameVal = Math.round(self.frameVal * self.dec) / self.dec;

                  // don't go past endVal since progress can exceed duration in the last frame
                  if (self.countDown) {
                    self.frameVal = (self.frameVal < endVal) ? endVal : self.frameVal;
                  } else {
                    self.frameVal = (self.frameVal > endVal) ? endVal : self.frameVal;
                  }

                  // format and print value
                  self.d.innerHTML = self.addCommas(self.frameVal.toFixed(decimals));

                  // whether to continue
                  if (progress < self.duration) {
                    self.rAF = requestAnimationFrame(self.count);
                  } else {
                    if (self.callback != null) self.callback();
                  }
                }
                this.start = function (callback) {
                  self.callback = callback;
                  // make sure values are valid
                  if (!isNaN(endVal) && !isNaN(startVal)) {
                    requestAnimationFrame(self.count);
                  } else {
                    console.log('countUp error: startVal or endVal is not a number');
                    self.d.innerHTML = '--';
                  }
                  return false;
                }
                this.stop = function () {
                  cancelAnimationFrame(self.rAF);
                }
                this.reset = function () {
                  cancelAnimationFrame(self.rAF);
                  this.d.innerHTML = startVal;
                }
                this.addCommas = function (nStr) {
                  nStr += '';
                  var x, x1, x2, rgx;
                  x = nStr.split('.');
                  x1 = x[0];
                  x2 = x.length > 1 ? '.' + x[1] : '';
                  rgx = /(\d+)(\d{3})/;
                  while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                  }
                  return x1 + x2;
                }
              }

              /*
              
                  countUp.js
                  by @inorganik
                  v 0.0.5
              
              */

              // target = id of Html element where counting occurs
              // startVal = the value you want to begin at
              // endVal = the value you want to arrive at
              // decimals = number of decimal places in number, default 0
              // duration = duration in seconds, default 2

              var numAnim1;

              function mycustomfunction(ele, num, duration) {
                numAnim = new countUp(ele, 0, num, 0, duration)
                numAnim.start();
              }


              //First Counter 'myTargetElement1'
              mycustomfunction('myTargetElement1', 85, .7);
              //observer1
              var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                  //console.log('style changed!');
                  numAnim.reset();
                  mycustomfunction('myTargetElement1', 85, .7);
                });
              });
              var target = document.getElementById('ss-card-1');
              observer.observe(target, { attributes: true, attributeFilter: ['style'] });


              //Second Counter 'myTargetElement2'
              mycustomfunction('myTargetElement2', 25, .5);
              //observer2
              var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                  //console.log('style changed!');
                  numAnim.reset();
                  mycustomfunction('myTargetElement2', 25, .5);
                });
              });
              var target = document.getElementById('ss-card-2');
              observer.observe(target, { attributes: true, attributeFilter: ['style'] });



              //Third Counter 'myTargetElement3'
              mycustomfunction('myTargetElement3', 15, .3);
              //observer3
              var observer = new MutationObserver(function (mutations) {
                mutations.forEach(function (mutationRecord) {
                  //console.log('style changed!');
                  numAnim.reset();
                  mycustomfunction('myTargetElement3', 15, .3);
                });
              });
              var target = document.getElementById('ss-card-3');
              observer.observe(target, { attributes: true, attributeFilter: ['style'] });




              // Example:
              // var numAnim = new countUp("SomeElementYouWantToAnimate", 0, 99.99, .7, 1.5);
              // numAnim.start();
              // with optional callback
              // numAnim.start(someMethodToCallOnComplete);


            });
         }) //END window on load  ); //END DOMContentLoaded
    }
  return (
    <div className="sticky-scroll-section bg-black">
      <div data-w-id="b128fbf9-acf2-7742-13b2-636268f47c3b" className="ss-scroller-new">
        <div className="sss-viewbox"> <img
            src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d23caea3ebf_gradient-bg.svg"
            loading="lazy" alt="" className="ss-gradient-bg" />
          <div className="container stickey-scroll">
            <div className="sss-wrapper padding-top-bottom-120">
              <div className="timeline-wrapper-new">
                <div className="timeline-left">
                  <div className="ss-grey-line-new">
                    <div className="ss-gradient-line bg-primary"> </div>
                  </div>
                  <div className="ss-timeline-icon-wrap">
                    <div className="circle-w-icon-new _1"> <img
                        src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d8009ea3ec5_Avoid%20stockouts-icon.svg"
                        loading="lazy" alt="" className="ss-timeline-icon-new" />
                      <div className="ss-circle-inner-new bg-primary-new"> </div>
                    </div>
                    <div className="circle-w-icon-new _2"> <img
                        src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d16ecea3ef7_reduced-icon.svg"
                        loading="lazy" alt="" className="ss-timeline-icon-new" />
                      <div className="ss-circle-inner-new bg-primary-new"> </div>
                    </div>
                    <div className="circle-w-icon-new _3"> <img
                        src="https://cdn.prod.website-files.com/639b3e775b326dcf7cea3e70/639b3e775b326d83fbea3ef8_Impact-icon.svg"
                        loading="lazy" alt="" className="ss-timeline-icon-new" />
                      <div className="ss-circle-inner-new bg-primary-new"> </div>
                    </div>
                  </div>
                </div>
                <div className="timeline-right"> <a href="#scroll-to-stockouts"
                    className="ss-timeline-steps-new _1 w-inline-block">
                    <div className="ss-timeline-steps-bg-color _1">
                      <div className="ss-timeline-steps-border"> </div>
                    </div>
                    <div className="text-medium-bold">STOCKOUTS </div>
                  </a> <a href="#scroll-to-recovery" className="ss-timeline-steps-new _2 w-inline-block">
                    <div className="ss-timeline-steps-bg-color _2">
                      <div className="ss-timeline-steps-border"> </div>
                    </div>
                    <div className="text-medium-bold">CASH RECOVERY CYCLE </div>
                  </a> <a href="#scroll-to-revenue" className="ss-timeline-steps-new _3 w-inline-block">
                    <div className="ss-timeline-steps-bg-color _3">
                      <div className="ss-timeline-steps-border"> </div>
                    </div>
                    <div className="text-medium-bold">REVENUE </div>
                  </a> </div>
              </div>
              <div className="ss-3block-wrapper-new">
                <div id="ss-card-1" className="ss-card-block-new _1">
                  <div className="ss-slide-content-new">
                    <div className="ss-content-box-new">
                      <div className="h3"> <span id="myTargetElement1" count="up" data-count-duration="2200"
                          className="text-xxl font-weight-700 text-style-gradient"> <strong>0 </strong> </span>% </div>
                      <div className="h4">Reduction in out-of-stock </div>
                    </div>
                  </div>
                </div>
                <div id="ss-card-2" className="ss-card-block-new _2">
                  <div className="ss-slide-content-new">
                    <div className="ss-content-box-new">
                      <div className="h3"> <span id="myTargetElement2"
                          className="text-xxl font-weight-700 text-style-gradient">25 </span>Days </div>
                      <div className="h4">Reduction in cash recovery time </div>
                    </div>
                  </div>
                </div>
                <div id="ss-card-3" className="ss-card-block-new _3">
                  <div className="ss-slide-content-new">
                    <div className="ss-content-box-new">
                      <div className="h3"> <span id="myTargetElement3"
                          className="text-xxl font-weight-700 text-style-gradient">15 </span>% </div>
                      <div className="h4">Growth in revenue </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div id="scroll-to-stockouts" className="scroll-to stockouts"> </div>
      <div id="scroll-to-recovery" className="scroll-to recovery"> </div>
      <div id="scroll-to-revenue" className="scroll-to revenue"> </div>
      <div className="w-embed w-script">
      <script>
         {scripter()}

        </script>
      </div>
    </div>
  )
}

export default Bg