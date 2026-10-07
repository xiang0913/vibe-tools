let currentMode = 'eat';
let currentResult = null;
let wheelPool = [];
let currentRotation = 0;
let activeFilter = '全部'; 

function switchScreen(screenId, navElement = null) {
    document.querySelectorAll('.screen').forEach(el => el.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    
    if (navElement) {
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
        navElement.classList.add('active');
    }
}

function startLottery(mode) {
    currentMode = mode;
    activeFilter = '全部';
    document.getElementById('lottery-title').innerText = mode === 'eat' ? '🍔 轉動幸運轉盤' : '🧋 轉動幸運轉盤';
    
    generateFilters(); 
    updateWheelPool(); 
    
    document.getElementById('btn-draw').style.display = 'block';
    document.getElementById('result-card').style.display = 'none';
    switchScreen('screen-lottery');
}

function generateFilters() {
    const container = document.getElementById('filter-container');
    const categories = ['全部', ...new Set(database[currentMode].map(item => item.category))];
    
    container.innerHTML = categories.map(cat => 
        `<button class="filter-tag ${cat === activeFilter ? 'active' : ''}" 
                 onclick="setFilter('${cat}')">${cat}</button>`
    ).join('');
}

function setFilter(category) {
    activeFilter = category;
    generateFilters(); 
    updateWheelPool(); 
}

function updateWheelPool() {
    const blacklistIds = UserData.getBlacklist().map(b => b.id);
    wheelPool = database[currentMode].filter(item => {
        const notBlacklisted = !blacklistIds.includes(item.id);
        const matchesFilter = (activeFilter === '全部' || item.category === activeFilter);
        return notBlacklisted && matchesFilter;
    });

    if (wheelPool.length === 0) {
        alert("此分類下沒有店家，或都已經在你的黑名單中了！");
        return;
    }
    
    document.getElementById('wheelCanvas').style.transform = `rotate(0deg)`;
    currentRotation = 0;
    drawWheel();
}

// === 請用這段覆蓋原本的 drawWheel() ===
function drawWheel() {
    const canvas = document.getElementById('wheelCanvas');
    const ctx = canvas.getContext('2d');
    const radius = canvas.width / 2;
    const arc = Math.PI * 2 / wheelPool.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. 美化細節：依據選項數量，動態縮小字體避免擁擠
    let fontSize = 18;
    if (wheelPool.length > 8) fontSize = 14;
    if (wheelPool.length > 12) fontSize = 12;
    
    ctx.font = `bold ${fontSize}px 'Segoe UI'`;
    const colors = ['#ff7e5f', '#feb47b', '#e94560', '#ff9f43', '#4facfe'];

    for (let i = 0; i < wheelPool.length; i++) {
        // 畫扇形色塊
        ctx.beginPath();
        ctx.fillStyle = colors[i % colors.length];
        ctx.moveTo(radius, radius);
        ctx.arc(radius, radius, radius, i * arc, (i + 1) * arc);
        ctx.fill();
        
        // 2. 美化細節：加入白色扇形分隔線，讓視覺更俐落
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();

        ctx.save();
        
        // 調整畫布角度準備寫字
        ctx.translate(radius, radius);
        ctx.rotate(i * arc + arc / 2);
        
        ctx.textAlign = "right"; 
        ctx.textBaseline = "middle"; // 讓文字絕對垂直置中
        ctx.fillStyle = "#fff";
        
        // 3. 美化細節：店名過長時自動加上 ...
        let displayName = wheelPool[i].name;
        if (displayName.length > 9) {
            displayName = displayName.substring(0, 8) + '...';
        }
        let text = wheelPool[i].icon + ' ' + displayName;
        
        // 限制文字最大寬度為 radius - 55，強制留出圓心空間
        ctx.fillText(text, radius - 15, 0, radius - 55);
        
        ctx.restore();
    }
    
    // 4. 美化細節：在轉盤正中央畫一個帶陰影的「白色圓形軸心」，遮住交界死角
    ctx.beginPath();
    ctx.arc(radius, radius, 12, 0, Math.PI * 2);
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.3)";
    ctx.shadowBlur = 6;
    ctx.fill();
    ctx.shadowBlur = 0; // 畫完後重置陰影
}

// === 請用這段覆蓋原本的 executeDraw() ===
function executeDraw() {
    if (wheelPool.length === 0) {
        alert("請先解除一些黑名單或更換分類！");
        return;
    }

    document.getElementById('btn-draw').style.display = 'none';
    document.getElementById('result-card').style.display = 'none';
    
    let targetIndex;
    
    // 🌟 核心新功能：防連續重複機制
    // 如果轉盤上大於 1 家店，且之前已經有抽過結果了
    if (wheelPool.length > 1 && currentResult !== null) {
        do {
            targetIndex = Math.floor(Math.random() * wheelPool.length);
        } while (wheelPool[targetIndex].id === currentResult.id); // 如果抽到一樣的，就繼續重抽
    } else {
        // 第一次抽，或者轉盤上只剩 1 家店，就正常抽
        targetIndex = Math.floor(Math.random() * wheelPool.length);
    }
    
    // 將最終決定好的結果存起來
    currentResult = wheelPool[targetIndex];
    
    const sliceAngle = 360 / wheelPool.length;
    const stopAngle = 270 - (targetIndex * sliceAngle) - (sliceAngle / 2);
    
    currentRotation += (360 * 5) + stopAngle - (currentRotation % 360);
    
    const canvas = document.getElementById('wheelCanvas');
    canvas.style.transform = `rotate(${currentRotation}deg)`;
    
    setTimeout(() => {
        triggerConfetti();
        showResultCard(currentResult);
    }, 4000);
}

function resetAndDraw() { executeDraw(); }

// ＝＝＝ 重點更新：產生內嵌地圖 ＝＝＝
function showResultCard(item) {
    document.getElementById('res-name').innerText = `${item.icon} ${item.name}`;
    document.getElementById('res-address').innerText = `📍 ${item.address}`;
    document.getElementById('res-phone').innerText = `📞 ${item.phone}`;
    document.getElementById('res-hours').innerText = `⏰ ${item.hours}`;
    
    // 把店名和地址打包成搜尋關鍵字
    const mapQuery = encodeURIComponent(`${item.name} ${item.address}`);
    
    // 1. 產生內嵌地圖
    document.getElementById('res-map-frame').src = `https://maps.google.com/maps?q=${mapQuery}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
    
    // 2. 修復假網址 Bug！自動生成真正的 Google Maps App 外部連結
    document.getElementById('res-map-link').href = `https://www.google.com/maps/search/?api=1&query=${mapQuery}`;
    
    updateFavoriteBtn();
    document.getElementById('result-card').style.display = 'flex';
}

function triggerConfetti() {
    confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 }, colors: ['#ff7e5f', '#feb47b', '#ffffff'] });
}

function handleFavorite() {
    UserData.toggleFavorite(currentResult);
    updateFavoriteBtn();
}

function updateFavoriteBtn() {
    const btn = document.getElementById('btn-fav');
    btn.innerText = UserData.isFavorite(currentResult.id) ? "❤️ 已最愛" : "🤍 最愛";
}

function handleBlacklist() {
    if(confirm(`確定把「${currentResult.name}」加入黑名單？`)) {
        UserData.addBlacklist(currentResult);
        alert("已加入黑名單 ❌");
        updateWheelPool(); 
        document.getElementById('result-card').style.display = 'none';
        document.getElementById('btn-draw').style.display = 'block';
    }
}

function handleCheckIn() {
    UserData.addHistory(currentResult);
    alert(`✅ 打卡成功！已將 ${currentResult.name} 寫入歷史紀錄。`);
}

function viewList(type, navElement = null) {
    const listContent = document.getElementById('list-content');
    const listTitle = document.getElementById('list-title');
    listContent.innerHTML = ''; 
    
    let data = [];
    if (type === 'favorites') { data = UserData.getFavorites(); listTitle.innerText = '❤️ 最愛清單'; }
    else if (type === 'blacklist') { data = UserData.getBlacklist(); listTitle.innerText = '❌ 黑名單'; }
    else if (type === 'history') { data = UserData.getHistory(); listTitle.innerText = '📅 打卡紀錄'; }

    if (data.length === 0) {
        listContent.innerHTML = '<p style="text-align: center; color: #888; margin-top: 50px;">目前沒有資料喔！</p>';
    } else {
        data.forEach(item => {
            const card = document.createElement('div');
            card.className = 'info-card';
            
            const extraHTML = type === 'history' 
                ? `<p style="font-size: 12px; color: #888;">🗓️ 打卡時間：${item.date}</p>`
                : `<button class="btn ${type === 'favorites' ? 'btn-outline' : 'btn-danger'}" 
                           style="padding: 8px; margin-top: 10px; font-size: 14px;"
                           onclick="removeFromList('${type}', '${item.id}')">
                       ${type === 'favorites' ? '💔 移除' : '✅ 解除'}
                   </button>`;

            card.innerHTML = `
                <h3 style="margin: 0 0 5px 0; color: var(--primary-color);">${item.icon || ''} ${item.name}</h3>
                <p style="font-size: 14px; margin: 3px 0;">📍 ${item.address}</p>
                ${extraHTML}
            `;
            listContent.appendChild(card);
        });
    }
    
    switchScreen('screen-list', navElement);
}

function removeFromList(type, itemId) {
    if (type === 'favorites') {
        let favs = UserData.getFavorites().filter(f => f.id !== itemId);
        localStorage.setItem('favorites', JSON.stringify(favs));
        viewList('favorites'); 
    } else if (type === 'blacklist') {
        let bl = UserData.getBlacklist().filter(b => b.id !== itemId);
        localStorage.setItem('blacklist', JSON.stringify(bl));
        viewList('blacklist'); 
    }
}