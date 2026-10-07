// data.js
const database = {
    eat: [
        // 經典小吃
        { id: 'e1', name: "胖子雞丁", icon: "🍗", category: "小吃", address: "台中市北區一中街20號", phone: "04-2228-3168", hours: "11:30–22:30 (週二公休)" },
        { id: 'e2', name: "打餅舖烙餅", icon: "🌮", category: "小吃", address: "台中市北區一中街83號", phone: "依店家公告", hours: "11:00–22:30" },
        { id: 'e3', name: "天使雞排", icon: "🍗", category: "小吃", address: "台中市北區一中街60號", phone: "依店家公告", hours: "12:00–23:00" },
        { id: 'e4', name: "21臭豆腐", icon: "🧆", category: "小吃", address: "台中市北區一中街21號", phone: "依店家公告", hours: "16:00–22:00 (週一公休)" },
        { id: 'e5', name: "上和園滷味", icon: "🦆", category: "小吃", address: "台中市北區育才街4號", phone: "04-2223-0407", hours: "08:00–23:00" },
        
        // 麵食/義式
        { id: 'e6', name: "王印製麵", icon: "🍜", category: "麵食", address: "台中市北區太平路65號", phone: "04-2223-7758", hours: "11:00–20:00" },
        { id: 'e7', name: "二口美食鐵板麵", icon: "🍝", category: "麵食", address: "台中市北區一中街83-2號", phone: "依店家公告", hours: "10:30–21:00" },
        { id: 'e8', name: "九州豚骨拉麵", icon: "🍜", category: "麵食", address: "台中市北區三民路三段120巷1號", phone: "04-2223-1383", hours: "11:00–20:00" },
        { id: 'e9', name: "HUN 混", icon: "🍝", category: "義式", address: "台中市北區三民路三段114號2樓", phone: "04-2223-1080", hours: "11:00–15:00, 17:00-21:00" },
        
        // 飯食/鍋物/異國
        { id: 'e10', name: "Mr.38 咖哩", icon: "🍛", category: "飯食", address: "台中市北區一中街109號", phone: "04-2223-0866", hours: "11:00–21:30" },
        { id: 'e11', name: "忠武海苔包飯", icon: "🍙", category: "異國", address: "台中市北區育才南街15號", phone: "0980-668-718", hours: "11:00–20:00" },
        { id: 'e12', name: "偈亭泡菜鍋", icon: "🍲", category: "鍋物", address: "台中市北區雙十路一段117-2號", phone: "04-2225-9397", hours: "11:30-22:00" },
        { id: 'e13', name: "輕井澤鍋物", icon: "🍲", category: "鍋物", address: "台中市北區崇德路一段590號", phone: "04-2238-1371", hours: "11:00–02:00" },
        { id: 'e14', name: "先吃肉 Meat First", icon: "🍔", category: "速食", address: "台中市北區一中街112號2樓", phone: "0958-246-569", hours: "11:30-15:00, 17:30-21:30" }
    ],
    drink: [
        // 一級戰區：手搖飲
        { id: 'd1', name: "八曜和茶", icon: "🍵", category: "手搖飲", address: "台中市北區太平路77號", phone: "04-2223-3737", hours: "10:00–22:30" },
        { id: 'd2', name: "得正", icon: "🥤", category: "手搖飲", address: "台中市北區一中街", phone: "依店家公告", hours: "11:00–22:00" },
        { id: 'd3', name: "大茗本位製茶堂", icon: "🍎", category: "手搖飲", address: "台中市北區太平路45號", phone: "依店家公告", hours: "10:00–22:00" },
        { id: 'd4', name: "可不可熟成紅茶", icon: "☕", category: "手搖飲", address: "台中市北區一中街", phone: "依店家公告", hours: "10:00–22:00" },
        { id: 'd5', name: "麻古茶坊", icon: "🥭", category: "手搖飲", address: "台中市北區尊賢街16號", phone: "04-2225-8333", hours: "10:00–22:30" },
        { id: 'd6', name: "迷客夏", icon: "🐄", category: "手搖飲", address: "台中市北區太平路", phone: "依店家公告", hours: "10:00–22:00" },
        { id: 'd7', name: "龜記茗品", icon: "🍊", category: "手搖飲", address: "台中市北區太平路", phone: "依店家公告", hours: "11:00–22:00" },
        { id: 'd8', name: "50嵐", icon: "🟡", category: "手搖飲", address: "台中市北區一中街", phone: "依店家公告", hours: "10:00–22:30" },
        { id: 'd9', name: "老賴紅茶", icon: "🥤", category: "手搖飲", address: "台中市北區一中街96號", phone: "04-2229-0898", hours: "11:00-23:00" },
        { id: 'd10', name: "圓稼嚼感奶茶", icon: "🧋", category: "手搖飲", address: "台中市北區一中街", phone: "依店家公告", hours: "10:30–22:30" },
        { id: 'd11', name: "萬波島嶼紅茶", icon: "🍋", category: "手搖飲", address: "台中市北區一中街", phone: "依店家公告", hours: "11:00–21:30" },
        
        // 冰沙與冰品
        { id: 'd12', name: "豐味綠豆沙牛乳", icon: "🧊", category: "冰沙", address: "台中市北區太平路63巷1號", phone: "依店家公告", hours: "10:00–22:00" },
        { id: 'd13', name: "一中豐仁冰", icon: "🍧", category: "冰品", address: "台中市北區育才街3巷4-6號", phone: "04-2223-0522", hours: "12:00–22:00 (週二公休)" },
        
        // 甜點
        { id: 'd14', name: "王子神谷日式厚鬆餅", icon: "🥞", category: "甜點", address: "台中市北區一中街6號", phone: "依店家公告", hours: "13:30–21:30" },
        { id: 'd15', name: "打鐵豆花", icon: "🍮", category: "甜點", address: "台中市北區一中街29號", phone: "04-2222-7777", hours: "12:00–22:00" },
        { id: 'd16', name: "鯛魚燒 (一中街)", icon: "🐟", category: "甜點", address: "台中市北區一中街商圈", phone: "依店家公告", hours: "15:00–22:00" }
    ]
};