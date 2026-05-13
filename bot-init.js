/**
 * ============================================================
 *  YELLOW AI BOT INITIALIZER
 *  Handles: payload building, geolocation, script injection
 *  Do not edit unless changing init logic.
 *  To change settings → edit js/bot-config.js
 * ============================================================
 */

(function () {
  "use strict";

  // ── Step 1: Build base payload from BotConfig ─────────────
  let payload = BotConfig.buildPayload();

  // ── Step 2: Inject ymConfig with payload ──────────────────
  function initBot(finalPayload) {
    window.ymConfig = {
      bot: BotConfig.botId,
      host: BotConfig.host,
      payload: finalPayload,
      ...BotConfig.theme,
    };

    if (BotConfig.debug) {
      console.group("[YellowAI Bot] Initializing");
      console.log("Bot ID:", BotConfig.botId);
      console.log("Host:", BotConfig.host);
      console.log("Payload:", finalPayload);
      console.groupEnd();
    }

    loadBotScript();
  }

  // ── Step 3: Load Yellow AI widget script ──────────────────
  function loadBotScript() {
    var w = window,
      ic = w.YellowMessenger;

    if ("function" === typeof ic) {
      ic("reattach_activator");
      ic("update", window.ymConfig);
    } else {
      var d = document,
        i = function () { i.c(arguments); };

      i.q = [];
      i.c = function (e) { i.q.push(e); };
      w.YellowMessenger = i;

      function loadScript() {
        var e = d.createElement("script");
        e.type = "text/javascript";
        e.async = true;
        e.src = BotConfig.cdnUrl;
        var t = d.getElementsByTagName("script")[0];
        t.parentNode.insertBefore(e, t);
      }

      if (w.attachEvent) {
        w.attachEvent("onload", loadScript);
      } else {
        w.addEventListener("load", loadScript, false);
      }
    }
  }

  // ── Step 4: Optionally enrich payload with geolocation ────
  if (BotConfig.enableGeolocation && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        // Reverse geocode using a free public API (no key needed)
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;

        fetch("https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon)
          .then(function (res) { return res.json(); })
          .then(function (data) {
            payload.country = data.address.country || null;
            payload.region = data.address.state || null;
            payload.city = data.address.city || data.address.town || data.address.village || null;
            payload.latitude = lat;
            payload.longitude = lon;

            if (BotConfig.debug) {
              console.log("[YellowAI Bot] Geolocation resolved:", payload.city, payload.country);
            }
            initBot(payload);
          })
          .catch(function () {
            // Geolocation fetch failed — init bot without location data
            initBot(payload);
          });
      },
      function () {
        // User denied geolocation — init bot without location data
        initBot(payload);
      },
      { timeout: 5000 }
    );
  } else {
    // Geolocation disabled — init immediately
    initBot(payload);
  }
})();
