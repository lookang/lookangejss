export const SessionManager = {
    KEY: 'session_start_time',
    EXPIRY_MS: 30 * 24 * 60 * 60 * 1000,
    init() {
        if (!localStorage.getItem(this.KEY)) {
            localStorage.setItem(this.KEY, new Date().getTime());
        }
        this.validate();
    },

    getTimeRemaining() {
        const startTime = localStorage.getItem(this.KEY);
        if (!startTime) return 0;
        const elapsed = new Date().getTime() - parseInt(startTime);
        const remaining = this.EXPIRY_MS - elapsed;
        return remaining > 0 ? remaining : 0;
    },

    validate() {
        if (this.getTimeRemaining() <= 0 && localStorage.getItem(this.KEY)) {
            this.clear();
            return false;
        }
        return true;
    }, 
    
    reset() {
        localStorage.removeItem(this.KEY);
        this.init();
    },

    hasData() {
        return localStorage.length > 0;
    },

    clear() {
        localStorage.clear();
    }
};

