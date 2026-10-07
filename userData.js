// userData.js
const UserData = {
    getTheme: function() { return localStorage.getItem('theme') || 'light'; },
    toggleTheme: function() {
        const newTheme = this.getTheme() === 'light' ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);
        this.applyTheme();
    },
    applyTheme: function() { document.documentElement.setAttribute('data-theme', this.getTheme()); },

    getFavorites: function() { return JSON.parse(localStorage.getItem('favorites')) || []; },
    getBlacklist: function() { return JSON.parse(localStorage.getItem('blacklist')) || []; },
    
    // ======== 新增：歷史紀錄功能 ========
    getHistory: function() { return JSON.parse(localStorage.getItem('history')) || []; },
    addHistory: function(item) {
        let history = this.getHistory();
        // 加上打卡時間
        const record = { ...item, date: new Date().toLocaleDateString('zh-TW') };
        history.unshift(record); // 加到陣列最前面 (最新的在上面)
        localStorage.setItem('history', JSON.stringify(history));
    },
    // ===================================

    toggleFavorite: function(item) {
        let favs = this.getFavorites();
        const index = favs.findIndex(f => f.id === item.id);
        if (index > -1) favs.splice(index, 1);
        else favs.push(item);
        localStorage.setItem('favorites', JSON.stringify(favs));
    },
    isFavorite: function(id) { return this.getFavorites().some(f => f.id === id); },

    addBlacklist: function(item) {
        let bl = this.getBlacklist();
        if (!bl.some(b => b.id === item.id)) {
            bl.push(item);
            localStorage.setItem('blacklist', JSON.stringify(bl));
        }
    }
};

UserData.applyTheme();