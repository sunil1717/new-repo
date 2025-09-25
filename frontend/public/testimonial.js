/*!
 * 
 * 	elfsight.com
 * 	
 * 	Copyright (c) 2025 Elfsight, LLC. ALL RIGHTS RESERVED
 * 
 */
!
function(e) {
  function t(i) {
    if (n[i]) return n[i].exports;
    var r = n[i] = {
      exports: {},
      id: i,
      loaded: !1
    };
    return e[i].call(r.exports, r, r.exports, t),
    r.loaded = !0,
    r.exports
  }
  var n = {};
  return t.m = e,
  t.c = n,
  t.p = "/dev/",
  t(0)
} ([function(e, t, n) {
  n(1),
  n(2)(window),
  n(14)
},
function(e, t, n) {
  e.exports = n.p + "index.html"
},
function(e, t, n) {
  function i(e) {
    if (!e.eapps) {
      var t = {},
      n = new o,
      i = new r(e, e.document.body, n);
      t.platform = i.facade(),
      t.apps = n.facade(),
      e.eapps = t
    }
  }
  var r = n(3),
  o = n(10);
  e.exports = i
},
function(e, t, n) {
  var i = n(4),
  r = n(5),
  o = n(8),
  a = n(9),
  s = "eapps.Platform",
  l = "disabled",
  c = "enabled",
  p = "first-activity",
  d = "in-viewport",
  f = [l, c, p, d],
  u = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&/ /= ] * ) / , g = "https://core.service.elfsight.com", h = function(e, t, n) {
    t = t || e.document;
    var h, b = this,
    v = {},
    w = [],
    m = [],
    y = [],
    x = [];
    b.initialize = function() {
      b.logError = o.withModule(s),
      b.establishPreconnections(),
      b.collectWidgets(t),
      b.revise(),
      i(function() {
        b.collectWidgets(t),
        b.revise(),
        b.observe(),
        b.watchWidgetReset()
      })
    },
    b.establishPreconnections = function() {
      b.preconnect(b.getPlatformUrl()),
      b.preconnect("https://static.elfsight.com"),
      b.preconnect("https://service-reviews-ultimate.elfsight.com"),
      b.preconnect("https://storage.elfsight.com")
    },
    b.preconnect = function(e) {
      var t = document.createElement("link");
      t.href = e,
      t.rel = "preconnect",
      t.crossOrigin = "",
      document.head.appendChild(t)
    },
    b.facade = function() {
      return new a(b)
    },
    b.requireWidget = function(e) {
      "string" != typeof e && b.logError("Widget Public ID required and should be a string", {
        pid: e
      }),
      ~w.indexOf(e) || w.push(e)
    },
    b.getEappsClass = function(e) {
      var t = e.className.split(" ");
      return 1 === t.length ? e.className: t.length > 1 ? (t.filter(function(e) {
        return /elfsight-app-[\S]+/.test(e)
      }), t[0]) : void 0
    },
    b.getWidgetIdByElement = function(e) {
      return "div" === e.tagName.toLowerCase() ? b.getEappsClass(e).replace("elfsight-app-", "") : e.getAttribute("data-id")
    },
    b.getLazyMode = function(e) {
      var t = e.getAttribute("data-elfsight-app-lazy");
      return "" === t ? c: null !== t && f.includes(t) ? t: l
    },
    b.getWidgetsElements = function(e) {
      if (e = e || t, !e || "function" != typeof e.getElementsByTagName || "function" != typeof e.querySelectorAll) return [];
      var n = Array.prototype.slice.call(e.getElementsByTagName("elfsight-app")),
      i = Array.prototype.slice.call(e.querySelectorAll('*[class^="elfsight-app"]')),
      r = i.concat(n);
      return e instanceof HTMLElement && ~e.className.indexOf("elfsight-app") && r.push(e),
      r
    },
    b.collectWidgets = function(e) {
      b.getWidgetsElements(e).forEach(function(e) {
        if (!m.includes(e)) {
          var t = b.getWidgetIdByElement(e);
          if (t) {
            var n = b.getLazyMode(e);
            n === l ? b.requireWidget(t) : b.bootWidgetDeferredly(e, t, n),
            m.push(e)
          }
        }
      })
    },
    b.bootWidgetDeferredly = function(e, t, n) {
      function i() {
        s.splice(0, s.length).forEach(function(e) {
          e()
        })
      }
      function r() {
        i(),
        b.requireWidget(t),
        b.revise()
      }
      function o() {
        var e = ["scroll", "mousemove", "touchstart", "keydown", "click"],
        t = {
          capture: !0,
          passive: !0
        };
        return e.forEach(function(e) {
          window.addEventListener(e, r, t)
        }),
        function() {
          e.forEach(function(e) {
            window.removeEventListener(e, r, t)
          })
        }
      }
      function a() {
        if ("undefined" == typeof window.IntersectionObserver) return function() {};
        var t = new IntersectionObserver(function(e) {
          for (var t = 0; t < e.length; ++t) if (e[t].isIntersecting) {
            r();
            break
          }
        });
        return t.observe(e),
        function() {
          t.disconnect()
        }
      }
      var s = [],
      l = [c, d].includes(n);
      l && s.push(a());
      var f = [c, p].includes(n);
      f && s.push(o())
    },
    b.watchWidgetReset = function() {
      window.addEventListener("message",
      function(e) {
        var t = e.data;
        t.action && "EappsPlatform.widgetReset" === t.action && b.resetWidget(t.widgetId)
      })
    },
    b.resetWidget = function(e) {
      var t = function e(t) {
        var e = document.createElement("div");
        return e.className = "elfsight-app-" + t,
        e
      };
      b.getWidgetsElements().forEach(function(n) {
        b.getWidgetIdByElement(n) === e && (delete v[e], n.parentNode.replaceChild(t(e), n))
      })
    },
    b.initWidget = function(e) {
      var t = b.getWidgetIdByElement(e),
      i = v[t];
      if (i) {
        if (!i.status || !i.data) return void b.logError('Widget "' + t + '" can`t be initialized because ' + i.reason, e);
        i.data.id = t,
        i.data.platform = !0;
        var r = i.user || i.data.user;
        r && (i.data.isOwner = r.owner),
        n.initWidget(e, i.data)
      }
    },
    b.boot = function(e, t) {
      var n = t || w,
      i = [];
      if (n.forEach(function(e) {
        x.includes(e) || (x.push(e), i.push(e))
      }), i.length) {
        var o = new XMLHttpRequest,
        a = b.getPlatformUrl();
        a += "/p/boot/";
        var s = r.stringify({
          w: i.join(","),
          page: b.getPage()
        });
        o.open("get", a + "?" + s),
        o.withCredentials = !0,
        o.onload = function() {
          var t = JSON.parse(o.response);
          t.status || b.logError("Boot failed because " + t.reason, t.data),
          v = Object.assign({},
          v, t.data.widgets),
          b.loadAssets(t.data.assets),
          m.forEach(b.initWidget.bind(b)),
          x = x.filter(function(e) {
            return ! i.includes(e)
          }),
          e && e()
        },
        o.send()
      }
    },
    b.getPage = function() {
      try {
        var e = document.location.href;
        if (u.test(e)) return new URL(e).toString()
      } catch(e) {}
    },
    b.getPlatformUrl = function() {
      return e.eappsCustomPlatformUrl ? e.eappsCustomPlatformUrl: g
    },
    b.revise = function() {
      var e = w.filter(function(e) {
        return ! (e in v)
      });
      e.length > 0 ? b.boot(null, e) : m.forEach(b.initWidget.bind(b))
    },
    b.loadAssets = function(t) {
      t && t.length && t.filter(function(e) {
        return y.indexOf(e) === -1
      }).forEach(function(t) {
        var n = e.document.createElement("script");
        n.src = t,
        n.async = !0,
        n.charset = "UTF-8",
        e.document.head.appendChild(n),
        y.push(t)
      })
    },
    b.observe = function() {
      if (e.MutationObserver && !h) {
        var t = {
          childList: !0,
          subtree: !0,
          characterData: !0
        },
        n = null;
        h = new MutationObserver(function(e) {
          var t = function(e) {
            b.requireWidget(b.getWidgetIdByElement(e)),
            m.includes(e) || m.push(e)
          };
          e.forEach(function(e) {
            var i = function(e) {
              var i = b.getWidgetsElements(e);
              i.forEach(t),
              i.length > 0 && (n && clearTimeout(n), n = setTimeout(function() {
                b.revise()
              },
              1e3))
            };
            Array.prototype.forEach.call(e.addedNodes, i)
          })
        }),
        h.observe(e.document, t)
      }
    },
    b.initialize()
  }; e.exports = h
},
function(e, t, n) {
  /*!
	  * domready (c) Dustin Diaz 2014 - License MIT
	  */
  !
  function(t, n) {
    e.exports = n()
  } ("domready",
  function() {
    var e, t = [],
    n = document,
    i = n.documentElement.doScroll,
    r = "DOMContentLoaded",
    o = (i ? /^loaded|^c/: /^loaded|^i|^c/).test(n.readyState);
    return o || n.addEventListener(r, e = function() {
      for (n.removeEventListener(r, e), o = 1; e = t.shift();) e()
    }),
    function(e) {
      o ? setTimeout(e, 0) : t.push(e)
    }
  })
},
function(e, t, n) {
  "use strict";
  function i(e) {
    "@babel/helpers - typeof";
    return (i = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ?
    function(e) {
      return typeof e
    }: function(e) {
      return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol": typeof e
    })(e)
  }
  function r(e) {
    switch (e.arrayFormat) {
    case "index":
      return function(t, n, i) {
        return null === n ? [a(t, e), "[", i, "]"].join("") : [a(t, e), "[", a(i, e), "]=", a(n, e)].join("")
      };
    case "bracket":
      return function(t, n) {
        return null === n ? a(t, e) : [a(t, e), "[]=", a(n, e)].join("")
      };
    default:
      return function(t, n) {
        return null === n ? a(t, e) : [a(t, e), "=", a(n, e)].join("")
      }
    }
  }
  function o(e) {
    var t;
    switch (e.arrayFormat) {
    case "index":
      return function(e, n, i) {
        return t = /\[(\d*)\]$/.exec(e),
        e = e.replace(/\[\d*\]$/, ""),
        t ? (void 0 === i[e] && (i[e] = {}), void(i[e][t[1]] = n)) : void(i[e] = n)
      };
    case "bracket":
      return function(e, n, i) {
        return t = /(\[\])$/.exec(e),
        e = e.replace(/\[\]$/, ""),
        t ? void 0 === i[e] ? void(i[e] = [n]) : void(i[e] = [].concat(i[e], n)) : void(i[e] = n)
      };
    default:
      return function(e, t, n) {
        return void 0 === n[e] ? void(n[e] = t) : void(n[e] = [].concat(n[e], t))
      }
    }
  }
  function a(e, t) {
    return t.encode ? t.strict ? l(e) : encodeURIComponent(e) : e
  }
  function s(e) {
    return Array.isArray(e) ? e.sort() : "object" === i(e) ? s(Object.keys(e)).sort(function(e, t) {
      return Number(e) - Number(t)
    }).map(function(t) {
      return e[t]
    }) : e
  }
  var l = n(6),
  c = n(7);
  t.extract = function(e) {
    return e.split("?")[1] || ""
  },
  t.parse = function(e, t) {
    t = c({
      arrayFormat: "none"
    },
    t);
    var n = o(t),
    r = Object.create(null);
    return "string" != typeof e ? r: (e = e.trim().replace(/^(\?|#|&)/, "")) ? (e.split("&").forEach(function(e) {
      var t = e.replace(/\+/g, " ").split("="),
      i = t.shift(),
      o = t.length > 0 ? t.join("=") : void 0;
      o = void 0 === o ? null: decodeURIComponent(o),
      n(decodeURIComponent(i), o, r)
    }), Object.keys(r).sort().reduce(function(e, t) {
      var n = r[t];
      return Boolean(n) && "object" === i(n) && !Array.isArray(n) ? e[t] = s(n) : e[t] = n,
      e
    },
    Object.create(null))) : r
  },
  t.stringify = function(e, t) {
    var n = {
      encode: !0,
      strict: !0,
      arrayFormat: "none"
    };
    t = c(n, t);
    var i = r(t);
    return e ? Object.keys(e).sort().map(function(n) {
      var r = e[n];
      if (void 0 === r) return "";
      if (null === r) return a(n, t);
      if (Array.isArray(r)) {
        var o = [];
        return r.slice().forEach(function(e) {
          void 0 !== e && o.push(i(n, e, o.length))
        }),
        o.join("&")
      }
      return a(n, t) + "=" + a(r, t)
    }).filter(function(e) {
      return e.length > 0
    }).join("&") : ""
  }
},
function(e, t) {
  "use strict";
  e.exports = function(e) {
    return encodeURIComponent(e).replace(/[!'()*]/g,
    function(e) {
      return "%" + e.charCodeAt(0).toString(16).toUpperCase()
    })
  }
},
function(e, t) {
  /*
	object-assign
	(c) Sindre Sorhus
	@license MIT
	*/
  "use strict";
  function n(e) {
    if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(e)
  }
  function i() {
    try {
      if (!Object.assign) return ! 1;
      var e = new String("abc");
      if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return ! 1;
      for (var t = {},
      n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
      var i = Object.getOwnPropertyNames(t).map(function(e) {
        return t[e]
      });
      if ("0123456789" !== i.join("")) return ! 1;
      var r = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(e) {
        r[e] = e
      }),
      "abcdefghijklmnopqrst" === Object.keys(Object.assign({},
      r)).join("")
    } catch(e) {
      return ! 1
    }
  }
  var r = Object.getOwnPropertySymbols,
  o = Object.prototype.hasOwnProperty,
  a = Object.prototype.propertyIsEnumerable;
  e.exports = i() ? Object.assign: function(e, t) {
    for (var i, s, l = n(e), c = 1; c < arguments.length; c++) {
      i = Object(arguments[c]);
      for (var p in i) o.call(i, p) && (l[p] = i[p]);
      if (r) {
        s = r(i);
        for (var d = 0; d < s.length; d++) a.call(i, s[d]) && (l[s[d]] = i[s[d]])
      }
    }
    return l
  }
},
function(e, t) {
  function n(e, t, n) {
    var i = [n + ' throws: "' + e + '"'];
    t && (i.push("with \n\t ->"), i.push(t)),
    console.error.apply(console, i)
  }
  n.withModule = function(e) {
    return function(t, i) {
      return n(t, i, e)
    }
  },
  e.exports = n
},
function(e, t) {
  var n = function(e) {
    var t = this;
    t.initialize = function() {},
    t.requireWidget = function(t) {
      return e.requireWidget(t)
    },
    t.resetWidget = function(t) {
      return e.resetWidget(t)
    },
    t.initialize()
  };
  e.exports = n
},
function(e, t, n) {
  var i = n(8),
  r = n(11),
  o = n(12),
  a = n(13),
  s = a.findLegacyOrModernAlias,
  l = "eapps.AppsManager",
  c = function() {
    var e = this,
    t = {},
    n = [],
    a = [];
    e.initialize = function() {
      e.logError = i.withModule(l)
    },
    e.facade = function() {
      return new r(e)
    },
    e.register = function(n, i) {
      if (t.name) return void e.logError('Application "' + n + '" is already registered');
      t[n] = new o(new i),
      e.initWidgetsFromBuffer(n);
      var r = s(n);
      r && (t[r] = new o(new i), e.initWidgetsFromBuffer(r))
    },
    e.app = function(e) {
      return t[e]
    },
    e.initWidget = function(t, i) {
      var r = e.app(i.app);
      if (r) {
        if (a.indexOf(t) !== -1) return;
        a.push(t),
        r.initWidget(t, i),
        e.sendExtensionPostMessage(t, i)
      } else n.push({
        element: t,
        config: i,
        initialized: !1
      })
    },
    e.initWidgetsFromBuffer = function(t) {
      n && n.length && n.forEach(function(n) {
        t !== n.config.app || n.initialized || (n.initialized = !0, e.initWidget(n.element, n.config))
      })
    },
    e.sendExtensionPostMessage = function(e, t) {
      var n = {
        settings: t.settings,
        app_slug: t.app,
        public_id: t.id,
        platform: "core",
        widget_name: t.meta.widget_name,
        app_version: t.meta.app_version,
        thumbnail_url: t.meta.thumbnail_url
      };
      window.postMessage({
        method: "postMessagePlatformWidget",
        data: n
      },
      "*")
    },
    e.initialize()
  };
  e.exports = c
},
function(e, t) {
  var n = function(e) {
    var t = this;
    t.initialize = function() {},
    t.register = function(t, n) {
      return e.register(t, n)
    },
    t.initialize()
  };
  e.exports = n
},
function(e, t) {
  var n = "https://dash.elfsight.com",
  i = function(e) {
    var t = this,
    i = !1,
    r = [];
    t.initialize = function() {
      e.whenReady(t.ready.bind(t))
    },
    t.ready = function() {
      i = !0,
      t.initWidgetsFromBuffer()
    },
    t.initWidget = function(n, o) {
      if (i) {
        o.websiteUrl = window.location.host || "undefined";
        var a = {
          widgetId: o.id || null,
          widgetToken: o.public_widget_token || null,
          widgetOrigin: "apps.elfsight.com",
          websiteUrl: o.websiteUrl,
          deactivate: 1 === o.preferences.disable_widget,
          deactivatedWidgetUrl: o.preferences.deactivated_widget_url,
          showElfsightLogo: !o.preferences.hide_elfsight_logo,
          owner: o.isOwner,
          platform: o.platform,
          
          displayDeactivation: !!o.preferences.display_deactivation,
          deactivationURL: o.preferences.deactivation_url
        },
        s = t.getAttributeSettings(n),
        l = [o.settings, a, s].reduce(function(e, t) {
          return Object.keys(t).forEach(function(n) {
            e[n] = t[n]
          }),
          e
        },
        {});
        e.initWidget(n, l, o),
        o.isOwner && setTimeout(function() {
          t.initToolbar(n, o)
        },
        500)
      } else r.push({
        element: n,
        config: o,
        initialized: !1
      })
    },
    t.initToolbar = function(e, t) {
      var i = 0;
      t.usageStatus = function() {
        var e = "green";
        return i = 100 * t.percentage,
        i >= 100 && (e = "red"),
        i >= 90 && i < 100 && (e = "orange"),
        e
      };
      var r = document.implementation.createHTMLDocument(),
      o = "".concat(n, "/apps/").concat(t.app),
      a = "".concat(n, "/apps/").concat(t.app, "/pricing"),
      s = "".concat(n, "/widget/").concat(t.id),
      l = function(e, n) {
        var i = new URLSearchParams({
          utm_source: "clients",
          utm_medium: "user-panel",
          utm_campaign: n,
          utm_content: t.app,
          utm_term: t.websiteUrl
        }),
        r = e.includes("?") ? "&": "?";
        return "".concat(e).concat(r).concat(i.toString())
      };
      
      var c = r.body.children[0];
      e.classList.add("eapps-widget", "eapps-widget-show-toolbar"),
      e.appendChild(c)
    },
    t.initWidgetsFromBuffer = function() {
      r && r.length && r.forEach(function(e) {
        e.initialized || (e.initialized = !0, t.initWidget(e.element, e.config))
      })
    },
    t.initialize(),
    t.getAttributeSettings = function(e) {
      var t = {},
      n = "elfsightApp";
      for (var i in e.dataset) if (i.startsWith(n)) {
        var r = "attribute".concat(i.replace(n, ""));
        t[r] = e.dataset[i]
      }
      return t
    }
  };
  e.exports = i
},
function(e, t) {
  function n(e, t) {
    return s(e) || a(e, t) || r(e, t) || i()
  }
  function i() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")
  }
  function r(e, t) {
    if (e) {
      if ("string" == typeof e) return o(e, t);
      var n = Object.prototype.toString.call(e).slice(8, -1);
      return "Object" === n && e.constructor && (n = e.constructor.name),
      "Map" === n || "Set" === n ? Array.from(e) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? o(e, t) : void 0
    }
  }
  function o(e, t) { (null == t || t > e.length) && (t = e.length);
    for (var n = 0,
    i = new Array(t); n < t; n++) i[n] = e[n];
    return i
  }
  function a(e, t) {
    var n = null == e ? null: "undefined" != typeof Symbol && e[Symbol.iterator] || e["@@iterator"];
    if (null != n) {
      var i, r, o, a, s = [],
      l = !0,
      c = !1;
      try {
        if (o = (n = n.call(e)).next, 0 === t) {
          if (Object(n) !== n) return;
          l = !1
        } else for (; ! (l = (i = o.call(n)).done) && (s.push(i.value), s.length !== t); l = !0);
      } catch(e) {
        c = !0,
        r = e
      } finally {
        try {
          if (!l && null != n.
          return && (a = n.
          return (), Object(a) !== a)) return
        } finally {
          if (c) throw r
        }
      }
      return s
    }
  }
  function s(e) {
    if (Array.isArray(e)) return e
  }
  function l(e) {
    return c[e] ? c[e] : p[e] ? p[e] : void 0
  }
  var c = {
    instashow: "instagram-feed",
    yottie: "youtube-gallery",
    "events-calendar": "event-calendar",
    "social-icons": "social-media-icons",
    "g2crowd-reviews": "g2-reviews",
    "appleappstore-reviews": "apple-app-store-reviews",
    "ali-express-reviews": "aliexpress-reviews",
    "google-play-store-reviews": "google-play-reviews",
    "dealer-rater-reviews": "dealerrater-reviews",
    "ed-munds-reviews": "edmunds-reviews",
    "open-table-reviews": "opentable-reviews"
  },
  p = Object.fromEntries(Object.entries(c).map(function(e) {
    var t = n(e, 2),
    i = t[0],
    r = t[1];
    return [r, i]
  }));
  e.exports = {
    LEGACY_ALIAS_MAP: c,
    LEGACY_ALIAS_MAP_VICE_VERSA: p,
    findLegacyOrModernAlias: l
  }
},
function(e, t, n) {
  var i = n(15);
  "string" == typeof i && (i = [[e.id, i, ""]]);
  n(17)(i, {});
  i.locals && (e.exports = i.locals)
},
function(e, t, n) {
  t = e.exports = n(16)(),
  t.push
},
function(e, t) {
  e.exports = function() {
    var e = [];
    return e.toString = function() {
      for (var e = [], t = 0; t < this.length; t++) {
        var n = this[t];
        n[2] ? e.push("@media " + n[2] + "{" + n[1] + "}") : e.push(n[1])
      }
      return e.join("")
    },
    e.i = function(t, n) {
      "string" == typeof t && (t = [[null, t, ""]]);
      for (var i = {},
      r = 0; r < this.length; r++) {
        var o = this[r][0];
        "number" == typeof o && (i[o] = !0)
      }
      for (r = 0; r < t.length; r++) {
        var a = t[r];
        "number" == typeof a[0] && i[a[0]] || (n && !a[2] ? a[2] = n: n && (a[2] = "(" + a[2] + ") and (" + n + ")"), e.push(a))
      }
    },
    e
  }
},
function(e, t, n) {
  function i(e, t) {
    for (var n = 0; n < e.length; n++) {
      var i = e[n],
      r = u[i.id];
      if (r) {
        r.refs++;
        for (var o = 0; o < r.parts.length; o++) r.parts[o](i.parts[o]);
        for (; o < i.parts.length; o++) r.parts.push(c(i.parts[o], t))
      } else {
        for (var a = [], o = 0; o < i.parts.length; o++) a.push(c(i.parts[o], t));
        u[i.id] = {
          id: i.id,
          refs: 1,
          parts: a
        }
      }
    }
  }
  function r(e) {
    for (var t = [], n = {},
    i = 0; i < e.length; i++) {
      var r = e[i],
      o = r[0],
      a = r[1],
      s = r[2],
      l = r[3],
      c = {
        css: a,
        media: s,
        sourceMap: l
      };
      n[o] ? n[o].parts.push(c) : t.push(n[o] = {
        id: o,
        parts: [c]
      })
    }
    return t
  }
  function o(e, t) {
    var n = b(),
    i = m[m.length - 1];
    if ("top" === e.insertAt) i ? i.nextSibling ? n.insertBefore(t, i.nextSibling) : n.appendChild(t) : n.insertBefore(t, n.firstChild),
    m.push(t);
    else {
      if ("bottom" !== e.insertAt) throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
      n.appendChild(t)
    }
  }
  function a(e) {
    e.parentNode.removeChild(e);
    var t = m.indexOf(e);
    t >= 0 && m.splice(t, 1)
  }
  function s(e) {
    var t = document.createElement("style");
    return t.type = "text/css",
    o(e, t),
    t
  }
  function l(e) {
    var t = document.createElement("link");
    return t.rel = "stylesheet",
    o(e, t),
    t
  }
  function c(e, t) {
    var n, i, r;
    if (t.singleton) {
      var o = w++;
      n = v || (v = s(t)),
      i = p.bind(null, n, o, !1),
      r = p.bind(null, n, o, !0)
    } else e.sourceMap && "function" == typeof URL && "function" == typeof URL.createObjectURL && "function" == typeof URL.revokeObjectURL && "function" == typeof Blob && "function" == typeof btoa ? (n = l(t), i = f.bind(null, n), r = function() {
      a(n),
      n.href && URL.revokeObjectURL(n.href)
    }) : (n = s(t), i = d.bind(null, n), r = function() {
      a(n)
    });
    return i(e),
    function(t) {
      if (t) {
        if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
        i(e = t)
      } else r()
    }
  }
  function p(e, t, n, i) {
    var r = n ? "": i.css;
    if (e.styleSheet) e.styleSheet.cssText = y(t, r);
    else {
      var o = document.createTextNode(r),
      a = e.childNodes;
      a[t] && e.removeChild(a[t]),
      a.length ? e.insertBefore(o, a[t]) : e.appendChild(o)
    }
  }
  function d(e, t) {
    var n = t.css,
    i = t.media;
    if (i && e.setAttribute("media", i), e.styleSheet) e.styleSheet.cssText = n;
    else {
      for (; e.firstChild;) e.removeChild(e.firstChild);
      e.appendChild(document.createTextNode(n))
    }
  }
  function f(e, t) {
    var n = t.css,
    i = t.sourceMap;
    i && (n += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(i)))) + " */");
    var r = new Blob([n], {
      type: "text/css"
    }),
    o = e.href;
    e.href = URL.createObjectURL(r),
    o && URL.revokeObjectURL(o)
  }
  var u = {},
  g = function(e) {
    var t;
    return function() {
      return "undefined" == typeof t && (t = e.apply(this, arguments)),
      t
    }
  },
  h = g(function() {
    return /msie [6-9]\b/.test(self.navigator.userAgent.toLowerCase())
  }),
  b = g(function() {
    return document.head || document.getElementsByTagName("head")[0]
  }),
  v = null,
  w = 0,
  m = [];
  e.exports = function(e, t) {
    t = t || {},
    "undefined" == typeof t.singleton && (t.singleton = h()),
    "undefined" == typeof t.insertAt && (t.insertAt = "bottom");
    var n = r(e);
    return i(n, t),
    function(e) {
      for (var o = [], a = 0; a < n.length; a++) {
        var s = n[a],
        l = u[s.id];
        l.refs--,
        o.push(l)
      }
      if (e) {
        var c = r(e);
        i(c, t)
      }
      for (var a = 0; a < o.length; a++) {
        var l = o[a];
        if (0 === l.refs) {
          for (var p = 0; p < l.parts.length; p++) l.parts[p]();
          delete u[l.id]
        }
      }
    }
  };
  var y = function() {
    var e = [];
    return function(t, n) {
      return e[t] = n,
      e.filter(Boolean).join("\n")
    }
  } ()
}]);