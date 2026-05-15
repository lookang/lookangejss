// xAPI Integration Glue for SLS
(function(window) {
  var xAPI = {
    initialized: false,
    config: null,
    sessionStart: Date.now(),
    interactionLog: [],
    
    init: function() {
      var urlParams = new URLSearchParams(window.location.search);
      
      this.config = {
        endpoint: urlParams.get('endpoint'),
        auth: urlParams.get('auth'),
        actor: urlParams.get('actor') || urlParams.get('agent'),
        stateId: urlParams.get('stateId'),
        activityId: urlParams.get('activityId')
      };
      
      if (!this.config.endpoint || !this.config.auth) {
        console.warn('xAPI: Missing required parameters (endpoint, auth)');
        return false;
      }
      
      if (this.config.actor) {
        try {
          this.config.actor = JSON.parse(decodeURIComponent(this.config.actor));
        } catch(e) {
          console.error('xAPI: Invalid actor/agent parameter');
          return false;
        }
      }
      
      ADL.XAPIWrapper.changeConfig(this.config);
      this.initialized = true;
      console.log('xAPI initialized successfully');
      return true;
    },
    
    trackAction: function(verb, data) {
      if (!this.initialized) return;
      
      this.interactionLog.push({
        verb: verb,
        data: data,
        timestamp: new Date().toISOString()
      });
      
      var stmt = {
        actor: this.config.actor,
        verb: {
          id: 'http://adlnet.gov/expapi/verbs/' + verb,
          display: { 'en-US': verb }
        },
        object: {
          id: this.config.activityId,
          definition: {
            type: 'http://adlnet.gov/expapi/activities/interaction'
          }
        },
        timestamp: new Date().toISOString(),
        result: {
          extensions: {
            'http://example.com/interaction-data': data
          }
        }
      };
      
      return ADL.XAPIWrapper.sendStatement(stmt);
    },
    
    saveState: function() {
      if (!this.initialized) return;
      
      var state = {
        interactionLog: this.interactionLog,
        sessionDuration: Date.now() - this.sessionStart,
        timestamp: new Date().toISOString()
      };
      
      console.log('Saving state:', state);
      this.trackAction('saved', state);
    }
  };
  
  xAPI.init();
  window.xAPI = xAPI;
})(window);