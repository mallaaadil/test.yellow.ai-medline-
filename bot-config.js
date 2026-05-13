/**
 * ============================================================
 *  YELLOW AI BOT CONFIGURATION
 *  Edit this file to change bot settings, payload, and behavior
 * ============================================================
 */

const BotConfig = {

  // ── Core Bot Settings ──────────────────────────────────────
  botId: "x1777284338518",
  host: "https://r4.cloud.yellow.ai",
  cdnUrl: "https://cdn.yellowmessenger.com/plugin/widget-v2/latest/dist/main.min.js",

  // ── Widget Appearance ──────────────────────────────────────
  // Uncomment and set any of these to override default widget styling
  theme: {
    // primaryColor: "#0057A8",   // Medline brand blue
    // secondaryColor: "#ffffff",
    // botName: "Medline Assistant",
    // botDescription: "Your medical supply expert",
  },

  // ── Payload Builder ────────────────────────────────────────
  // This function runs at page load and builds the dynamic payload
  // sent to the bot. Add/remove fields as needed.
  buildPayload: function () {
    return {
      // -- Device / Location context --
      userAgent: navigator.userAgent,
      deviceType: /Mobi|Android/i.test(navigator.userAgent) ? "mobile" : "desktop",
      language: navigator.language || "en-US",
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      screenWidth: window.screen.width,

      // -- Page context --
      pageUrl: window.location.href,
      pageTitle: document.title,
      referrer: document.referrer || "direct",

      // -- User session (replace with real auth data if available) --
      isLoggedIn: BotConfig.getUserSession().isLoggedIn,
      userId: BotConfig.getUserSession().userId,
      userName: BotConfig.getUserSession().userName,
      userEmail: BotConfig.getUserSession().userEmail,
      userRole: BotConfig.getUserSession().userRole,        // e.g. "healthcare", "admin", "guest"
      accountType: BotConfig.getUserSession().accountType,  // e.g. "enterprise", "individual"

      // -- Geolocation (populated async if user grants permission) --
      country: null,   // filled in by initGeolocation()
      region: null,
      city: null,
    };
  },

  // ── User Session Helper ────────────────────────────────────
  // Replace this stub with real session/auth logic.
  // Return null values for guests.
  getUserSession: function () {
    // EXAMPLE: read from localStorage or a global auth object
    // const auth = window.__APP_AUTH__ || {};
    return {
      isLoggedIn: false,
      userId: null,
      userName: null,
      userEmail: null,
      userRole: "guest",
      accountType: "individual",
    };
  },

  // ── Geolocation ────────────────────────────────────────────
  // Set to true to request browser geolocation and reverse-geocode
  enableGeolocation: true,

  // ── Debug Mode ─────────────────────────────────────────────
  // Set to true to log payload and config to browser console
  debug: true,
};
