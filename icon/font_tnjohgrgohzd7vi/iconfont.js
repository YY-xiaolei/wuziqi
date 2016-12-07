;(function(window) {

var svgSprite = '<svg>' +
  ''+
    '<symbol id="icon-yinle" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M903.15896 64.97892l-558.802315 125.7234c0 0-41.908153 9.530051-41.908153 41.912575L302.448492 800.60714c-20.954076-5.835915-44.675286-9.216919-69.84965-9.216919-84.883657 0-153.671072 37.519522-153.671072 83.812871 0 46.297442 68.787414 83.816964 153.671072 83.816964 84.882634 0 153.672095-37.519522 153.672095-83.816964L386.270937 429.916517l474.97987-103.569844 0 348.56572c-20.9551-5.840008-44.675286-9.221012-69.84965-9.221012-84.88161 0-153.672095 37.519522-153.672095 83.816964 0 46.293349 68.790484 83.817987 153.672095 83.817987s153.670048-37.524638 153.670048-83.817987L945.071206 106.915032c0-23.161512-18.776391-41.907459-41.911223-41.907459L903.159983 64.97892zM903.15896 64.97892"  ></path>'+
      ''+
    '</symbol>'+
  ''+
    '<symbol id="icon-laba" viewBox="0 0 1024 1024">'+
      ''+
      '<path d="M527.808 103.712l-255.808 164.288-127.616 0c-70.912 0-128.384 56.768-128.384 127.872l0 256.256c0 70.656 56.768 127.872 128.384 127.872l127.616 0 255.808 164.16c36.16 15.68 64.192-1.088 64.192-36.672l0-767.104c0-35.648-28.736-51.968-64.192-36.672zM743.36 310.176c-12.032-12.928-32.32-13.632-45.184-1.536-12.928 12.096-13.568 32.32-1.536 45.248 5.952 6.4 16.128 20.544 26.624 41.92 17.92 36.48 28.736 79.296 28.736 128.192s-10.816 91.776-28.736 128.192c-10.496 21.376-20.672 35.52-26.624 41.92-12.096 12.928-11.392 33.152 1.536 45.248 12.928 12.096 33.152 11.392 45.248-1.536 10.048-10.752 23.872-29.952 37.312-57.408 22.08-44.928 35.264-97.28 35.264-156.48s-13.184-111.552-35.264-156.48c-13.504-27.328-27.328-46.592-37.376-57.28zM939.584 270.56c-25.856-43.776-51.968-74.112-70.272-90.432-13.184-11.776-33.408-10.624-45.184 2.624s-10.624 33.408 2.624 45.184c3.008 2.688 9.024 8.704 17.088 18.048 13.824 16 27.648 35.072 40.64 57.088 37.184 63.104 59.52 136.896 59.52 220.928s-22.336 157.824-59.584 220.992c-12.992 22.016-26.88 41.088-40.64 57.088-8.064 9.344-14.08 15.36-17.088 18.048-13.184 11.776-14.336 32-2.624 45.184s32 14.336 45.184 2.624c18.304-16.32 44.416-46.592 70.272-90.432 42.752-72.512 68.416-157.312 68.416-253.504 0.064-96.128-25.6-180.928-68.352-253.44z"  ></path>'+
      ''+
    '</symbol>'+
  ''+
'</svg>'
var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
var shouldInjectCss = script.getAttribute("data-injectcss")

/**
 * document ready
 */
var ready = function(fn){
  if(document.addEventListener){
      document.addEventListener("DOMContentLoaded",function(){
          document.removeEventListener("DOMContentLoaded",arguments.callee,false)
          fn()
      },false)
  }else if(document.attachEvent){
     IEContentLoaded (window, fn)
  }

  function IEContentLoaded (w, fn) {
      var d = w.document, done = false,
      // only fire once
      init = function () {
          if (!done) {
              done = true
              fn()
          }
      }
      // polling for no errors
      ;(function () {
          try {
              // throws errors until after ondocumentready
              d.documentElement.doScroll('left')
          } catch (e) {
              setTimeout(arguments.callee, 50)
              return
          }
          // no errors, fire

          init()
      })()
      // trying to always fire before onload
      d.onreadystatechange = function() {
          if (d.readyState == 'complete') {
              d.onreadystatechange = null
              init()
          }
      }
  }
}

/**
 * Insert el before target
 *
 * @param {Element} el
 * @param {Element} target
 */

var before = function (el, target) {
  target.parentNode.insertBefore(el, target)
}

/**
 * Prepend el to target
 *
 * @param {Element} el
 * @param {Element} target
 */

var prepend = function (el, target) {
  if (target.firstChild) {
    before(el, target.firstChild)
  } else {
    target.appendChild(el)
  }
}

function appendSvg(){
  var div,svg

  div = document.createElement('div')
  div.innerHTML = svgSprite
  svg = div.getElementsByTagName('svg')[0]
  if (svg) {
    svg.setAttribute('aria-hidden', 'true')
    svg.style.position = 'absolute'
    svg.style.width = 0
    svg.style.height = 0
    svg.style.overflow = 'hidden'
    prepend(svg,document.body)
  }
}

if(shouldInjectCss && !window.__iconfont__svg__cssinject__){
  window.__iconfont__svg__cssinject__ = true
  try{
    document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
  }catch(e){
    console && console.log(e)
  }
}

ready(appendSvg)


})(window)
