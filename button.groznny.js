// ==UserScript==
// @name         BR Panel (Integrated Header)
// @namespace    http://tampermonkey.net/
// @version      3.3
// @description  Плавающая панель заменена кнопками в заголовке. Динамический выбор сервера, инструмент сравнения IP-адресов.
// @author       Black Russia & kumiho
// @match        https://forum.blackrussia.online/*
// @grant        none
// @connect      2ip.ru
// @connect      ipapi.co
// @connect      ipwhois.app
// @connect      ip.sb
// @connect      freeipapi.com
// @connect      ip-api.com
// @connect      reallyfreegeoip.org
// @connect      jsonip.com
// ==/UserScript==

(function() {
    'use strict';

    // --- Предотвращение двойной загрузки ---
    if (document.body.getAttribute('data-br-script-injected-header')) {
        return;
    }
    document.body.setAttribute('data-br-script-injected-header', 'true');

    try {
        (function() {
            const STORAGE_PREFIX = 'br_panel_header_';

            // --- ДАННЫЕ О РАЗДЕЛАХ (восстановлены, теперь 35 серверов с заглушками) ---
            const DATA_TECH = [];
            const DATA_TECH_COMPLAINT = [];
            const DATA_PLAYER_COMPLAINT = [];

            // Генерируем данные для 35 серверов (можно заменить на реальные ссылки)
            for (let i = 1; i <= 35; i++) {
                const serverName = `Сервер ${i}`;
                DATA_TECH.push({
                    text: `${serverName} (${i})`,
                    link: `https://forum.blackrussia.online/forums/РП-биографии.${1500 + i}/`,
                    color: '#8B008B'
                });
                DATA_TECH_COMPLAINT.push({
                    text: `${serverName} (${i})`,
                    link: `https://forum.blackrussia.online/forums/РП-ситуации.${1500 + i}/`,
                    color: '#0000CD'
                });
                DATA_PLAYER_COMPLAINT.push({
                    text: `${serverName} (${i})`,
                    link: `https://forum.blackrussia.online/forums/Жалобы-на-игроков.${1500 + i}/`,
                    color: '#DC143C'
                });
            }

            const OPS_LINK = {
                text: 'ОПС',
                href: 'https://forum.blackrussia.online/threads/%D0%9E%D0%B1%D1%89%D0%B8%D0%B5-%D0%BF%D1%80%D0%B0%D0%B2%D0%B8%D0%BB%D0%B0-%D1%81%D0%B5%D1%80%D0%B2%D0%B5%D1%80%D0%BE%D0%B2.312571/',
                color: '#f59e0b',
                glow: true
            };

            const SERVER_LIST = DATA_TECH.map((item, index) => {
                const match = item.text.match(/(.*?) \((\d+)\)/);
                return {
                    id: index + 1,
                    name: match ? match[1] : `Сервер ${index + 1}`,
                    fullName: item.text
                };
            });

            // --- Функции для работы с выбранными серверами ---
            function getSelectedServers() {
                const saved = localStorage.getItem(STORAGE_PREFIX + 'servers');
                return saved ? JSON.parse(saved) : [35];
            }

            // --- Функция создания кнопок ---
            function createButtonsContainer() {
                const container = document.createElement('div');
                container.className = 'bgButtonsContainer';

                const selectedIds = getSelectedServers();

                const createButton = (text, link, color = '#2563eb', isGlow = false) => {
                    const btn = document.createElement('button');
                    btn.textContent = text;
                    btn.className = 'bgButton';
                    if (isGlow) {
                        btn.style.background = 'rgba(245, 158, 11, 0.15)';
                        btn.style.color = '#fbbf24';
                        btn.style.borderColor = 'rgba(245, 158, 11, 0.3)';
                    } else {
                        btn.style.borderBottom = `2px solid ${color}`;
                    }
                    btn.addEventListener('click', () => {
                        window.location.href = link;
                    });
                    return btn;
                };

                selectedIds.forEach(id => {
                    const serverData = DATA_TECH_COMPLAINT[id - 1];
                    if (serverData) {
                        const btn = createButton(`ОДБР БИОГ ${id}`, serverData.link, serverData.color);
                        container.appendChild(btn);
                    }
                });

                selectedIds.forEach(id => {
                    const serverData = DATA_TECH[id - 1];
                    if (serverData) {
                        const btn = createButton(`РП БИОГ ${id}`, serverData.link, serverData.color);
                        container.appendChild(btn);
                    }
                });

                selectedIds.forEach(id => {
                    const serverData = DATA_PLAYER_COMPLAINT[id - 1];
                    if (serverData) {
                        const btn = createButton(`ЖБИ ${id}`, serverData.link, serverData.color);
                        container.appendChild(btn);
                    }
                });

                const opsBtn = createButton('ОПС', OPS_LINK.href, OPS_LINK.color, OPS_LINK.glow);
                container.appendChild(opsBtn);

                const ipBtn = document.createElement('button');
                ipBtn.textContent = 'IP';
                ipBtn.className = 'bgButton';
                ipBtn.style.borderBottom = '2px solid #888';
                ipBtn.addEventListener('click', openIPModal);
                container.appendChild(ipBtn);

                const settingsBtn = document.createElement('button');
                settingsBtn.textContent = '⚙️';
                settingsBtn.className = 'bgButton';
                settingsBtn.style.borderBottom = '2px solid #aaa';
                settingsBtn.style.fontSize = '14px';
                settingsBtn.addEventListener('click', openSettings);
                container.appendChild(settingsBtn);

                return container;
            }

            function initializeScript() {
                const pageContent = document.querySelector(".pageContent");
                if (pageContent && !document.querySelector('.bgButtonsContainer')) {
                    const buttonsContainer = createButtonsContainer();
                    pageContent.appendChild(buttonsContainer);
                }
            }

            // --- Функция настроек (две колонки) ---
            function openSettings() {
                let overlay = document.querySelector('.fnp-modal-overlay');
                if (!overlay) {
                    overlay = document.createElement('div');
                    overlay.className = 'fnp-modal-overlay';
                    overlay.innerHTML = `
                        <div class="fnp-modal">
                            <div class="fnp-modal-header">Выбор серверов (${SERVER_LIST.length})</div>
                            <div class="fnp-modal-body"></div>
                            <div class="fnp-modal-footer">
                                <button class="fnp-btn fnp-btn-secondary" id="fnp-cancel">Отмена</button>
                                <button class="fnp-btn fnp-btn-primary" id="fnp-save">Сохранить</button>
                            </div>
                        </div>
                    `;
                    document.body.appendChild(overlay);

                    overlay.querySelector('#fnp-cancel').onclick = () => overlay.classList.remove('open');
                    overlay.querySelector('#fnp-save').onclick = () => {
                        const checked = Array.from(overlay.querySelectorAll('input:checked')).map(el => +el.value).sort((a, b) => a - b);
                        localStorage.setItem(STORAGE_PREFIX + 'servers', JSON.stringify(checked));
                        const oldContainer = document.querySelector('.bgButtonsContainer');
                        if (oldContainer) oldContainer.remove();
                        const pageContent = document.querySelector(".pageContent");
                        if (pageContent) {
                            const buttonsContainer = createButtonsContainer();
                            pageContent.appendChild(buttonsContainer);
                        }
                        overlay.classList.remove('open');
                    };
                }

                const body = overlay.querySelector('.fnp-modal-body');
                body.innerHTML = '';
                const current = getSelectedServers();

                // Две колонки
                for (let i = 1; i <= SERVER_LIST.length; i++) {
                    const server = SERVER_LIST[i - 1];
                    const lbl = document.createElement('label');
                    lbl.className = 'fnp-checkbox-label ' + (current.includes(i) ? 'checked' : '');
                    lbl.innerHTML = `<input type="checkbox" value="${i}" ${current.includes(i) ? 'checked' : ''}> ${i} | ${server.name}`;
                    lbl.querySelector('input').onchange = function() {
                        this.parentElement.classList.toggle('checked', this.checked);
                    };
                    body.appendChild(lbl);
                }

                setTimeout(() => overlay.classList.add('open'), 10);
            }

            // --- СТИЛИ (все свойства исправлены на английские) ---
            const style = document.createElement('style');
            style.textContent = `
                .bgButton {
                    background: #1a1a1a;
                    color: #ffffff;
                    border: 1px solid #333;
                    border-radius: 4px;
                    padding: 6px 8px;
                    margin: 2px;
                    font-size: 11px;
                    font-weight: 500;
                    cursor: pointer;
                    transition: all 0.2s ease;
                    text-align: center;
                    min-width: 50px;
                    max-width: 55px;
                    height: 32px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    line-height: 1.1;
                    word-break: break-word;
                    white-space: normal;
                    flex-shrink: 0;
                }

                .bgButton:hover {
                    background: #2a2a2a;
                    border-color: #555;
                }

                .bgButtonsContainer {
                    display: flex;
                    gap: 2px;
                    flex-wrap: nowrap;
                    overflow-x: auto;
                    padding: 5px 0;
                    margin-bottom: 10px;
                    -webkit-overflow-scrolling: touch;
                    scrollbar-width: none;
                }

                .bgButtonsContainer::-webkit-scrollbar {
                    display: none;
                }

                /* Модальное окно настроек (две колонки) */
                .fnp-modal-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0,0,0,0.7);
                    z-index: 2147483648;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    opacity: 0;
                    visibility: hidden;
                    transition: 0.3s;
                }
                .fnp-modal-overlay.open {
                    opacity: 1;
                    visibility: visible;
                }
                .fnp-modal {
                    background: #1a1a1a;
                    border: 1px solid #333;
                    border-radius: 12px;
                    width: 90%;
                    max-width: 600px;
                    max-height: 85vh;
                    display: flex;
                    flex-direction: column;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.8);
                }
                .fnp-modal-header {
                    padding: 15px;
                    border-bottom: 1px solid #333;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    color: #fff;
                    font-weight: bold;
                }
                .fnp-modal-body {
                    padding: 15px;
                    overflow-y: auto;
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 8px;
                }
                .fnp-modal-footer {
                    padding: 15px;
                    border-top: 1px solid #333;
                    display: flex;
                    justify-content: flex-end;
                    gap: 10px;
                }
                .fnp-checkbox-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: #222;
                    padding: 6px;
                    border-radius: 6px;
                    cursor: pointer;
                    user-select: none;
                    color: #ccc;
                    font-size: 11px;
                    border: 1px solid #333;
                }
                .fnp-checkbox-label:hover {
                    background: #2a2a2a;
                }
                .fnp-checkbox-label input {
                    accent-color: #2563eb;
                }
                .fnp-checkbox-label.checked {
                    border-color: #2563eb;
                    background: rgba(37, 99, 235, 0.1);
                    color: #fff;
                }
                .fnp-btn {
                    padding: 8px 16px;
                    border-radius: 6px;
                    border: none;
                    cursor: pointer;
                    font-weight: bold;
                    transition: 0.2s;
                }
                .fnp-btn-primary {
                    background: #2563eb;
                    color: #fff;
                }
                .fnp-btn-primary:hover {
                    background: #1d4ed8;
                }
                .fnp-btn-secondary {
                    background: #333;
                    color: #ccc;
                }
                .fnp-btn-secondary:hover {
                    background: #444;
                    color: #fff;
                }

                /* Модальное окно IP */
                .ip-modal {
                    display: none;
                    position: fixed;
                    z-index: 10000;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0,0,0,0.7);
                }
                .ip-modal-content {
                    background-color: #000;
                    color: #fff;
                    margin: 5% auto;
                    padding: 20px;
                    border: 1px solid #333;
                    border-radius: 8px;
                    width: 90%;
                    max-width: 700px;
                    max-height: 85vh;
                    overflow-y: auto;
                    position: relative;
                }
                .ip-modal-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 20px;
                    padding-bottom: 10px;
                    border-bottom: 1px solid #333;
                }
                .ip-modal-title {
                    font-size: 18px;
                    font-weight: bold;
                    color: #fff;
                }
                .ip-modal-close {
                    color: #fff;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                    background: none;
                    border: none;
                    padding: 0;
                    width: 30px;
                    height: 30px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                .ip-modal-close:hover {
                    background-color: #333;
                    border-radius: 50%;
                }
                .ip-inputs-row {
                    display: flex;
                    gap: 15px;
                    margin-bottom: 20px;
                }
                .ip-input-container {
                    flex: 1;
                    min-width: 0;
                }
                .ip-input-label {
                    display: block;
                    margin-bottom: 8px;
                    color: #fff;
                    font-weight: bold;
                    font-size: 16px;
                    line-height: 1.2;
                }
                .ip-input {
                    width: 100%;
                    background-color: #1a1a1a;
                    color: #fff;
                    border: 1px solid #333;
                    border-radius: 4px;
                    padding: 6px 8px;
                    font-size: 12px;
                    box-sizing: border-box;
                    height: 32px;
                }
                .ip-input:focus {
                    outline: none;
                    border-color: #555;
                }
                .ip-result-section {
                    margin-top: 20px;
                    padding: 0;
                    border-radius: 4px;
                    background-color: transparent;
                    border: none;
                }
                .ip-comparison-result {
                    background: #0a0a0a;
                    border: 1px solid #333;
                    border-radius: 6px;
                    overflow: hidden;
                }
                .ip-comparison-header {
                    background: #1a1a1a;
                    padding: 15px 20px;
                    font-size: 16px;
                    font-weight: bold;
                    border-bottom: 1px solid #333;
                    color: #fff;
                }
                .ip-comparison-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                }
                .ip-comparison-item {
                    padding: 15px 20px;
                    border-right: 1px solid #333;
                }
                .ip-comparison-item:last-child {
                    border-right: none;
                }
                .ip-comparison-title {
                    font-size: 14px;
                    font-weight: bold;
                    margin-bottom: 12px;
                    color: #fff;
                    padding-bottom: 8px;
                    border-bottom: 1px solid #333;
                }
                .ip-comparison-details {
                    font-size: 12px;
                }
                .ip-detail-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    padding: 4px 0;
                }
                .ip-detail-label {
                    color: #888;
                    font-weight: 500;
                    min-width: 80px;
                }
                .ip-detail-value {
                    color: #fff;
                    text-align: right;
                    font-weight: 400;
                }
                .ip-distance-result {
                    background: #1a1a1a;
                    padding: 20px;
                    text-align: center;
                    border-top: 1px solid #333;
                    border-bottom: 1px solid #333;
                }
                .ip-distance-header {
                    font-size: 14px;
                    color: #888;
                    margin-bottom: 8px;
                }
                .ip-distance-value {
                    font-size: 24px;
                    font-weight: bold;
                    color: #fff;
                    margin-bottom: 8px;
                }
                .ip-distance-description {
                    font-size: 12px;
                    color: #aaa;
                    font-style: italic;
                }
                .ip-comparison-summary {
                    padding: 15px 20px;
                    background: #0a0a0a;
                }
                .ip-summary-row {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    margin-bottom: 8px;
                    padding: 6px 0;
                }
                .ip-summary-label {
                    color: #888;
                    font-size: 12px;
                }
                .ip-summary-value {
                    font-size: 12px;
                    font-weight: 500;
                }
                .ip-match {
                    color: #4CAF50;
                }
                .ip-no-match {
                    color: #f44336;
                }
                .ip-loading {
                    color: #2196F3;
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                }
                .ip-error {
                    color: #f44336;
                    text-align: center;
                    padding: 20px;
                    font-size: 14px;
                }
                .ip-buttons-section {
                    display: flex;
                    gap: 10px;
                    justify-content: flex-end;
                    margin-top: 20px;
                }
                .ip-button {
                    padding: 8px 16px;
                    border: 1px solid #333;
                    border-radius: 4px;
                    background-color: #1a1a1a;
                    color: #fff;
                    cursor: pointer;
                    font-size: 14px;
                }
                .ip-button:hover {
                    background-color: #2a2a2a;
                }
                .ip-button-primary {
                    background-color: #007cba;
                    border-color: #007cba;
                }
                .ip-button-primary:hover {
                    background-color: #0069a4;
                }

                /* Мобильная версия */
                @media (max-width: 768px) {
                    .bgButton {
                        min-width: 48px;
                        max-width: 52px;
                        font-size: 10px;
                        padding: 5px 6px;
                    }
                    .ip-inputs-row {
                        flex-direction: column;
                        gap: 15px;
                    }
                    .ip-comparison-grid {
                        grid-template-columns: 1fr;
                    }
                    .ip-comparison-item {
                        border-right: none;
                        border-bottom: 1px solid #333;
                    }
                    .ip-comparison-item:last-child {
                        border-bottom: none;
                    }
                    .fnp-modal-body {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                /* ПК – перенос на новые строки */
                @media (min-width: 769px) {
                    .bgButtonsContainer {
                        flex-wrap: wrap;
                        overflow-x: visible;
                    }
                }
            `;
            document.head.appendChild(style);

            // --- Функции IP (исправлены ключевые слова) ---
            function openIPModal() {
                let modal = document.getElementById('ipModal');
                if (!modal) {
                    modal = createIPModal();
                    document.body.appendChild(modal);
                }
                loadIPSavedData();
                const resultSection = document.getElementById('ipResult');
                if (resultSection) {
                    resultSection.style.display = 'none';
                }
                modal.style.display = 'block';
            }

            function createIPModal() {
                const modal = document.createElement('div');
                modal.id = 'ipModal';
                modal.className = 'ip-modal';
                modal.innerHTML = `
                    <div class="ip-modal-content">
                        <div class="ip-modal-header">
                            <div class="ip-modal-title">Сравнение IP-адресов</div>
                            <button class="ip-modal-close">×</button>
                        </div>
                        <div class="ip-inputs-row">
                            <div class="ip-input-container">
                                <label class="ip-input-label" for="ipAddress1">Первый IP-адрес:</label>
                                <input type="text" class="ip-input" id="ipAddress1" placeholder="Введите первый IP-адрес">
                            </div>
                            <div class="ip-input-container">
                                <label class="ip-input-label" for="ipAddress2">Второй IP-адрес:</label>
                                <input type="text" class="ip-input" id="ipAddress2" placeholder="Введите второй IP-адрес">
                            </div>
                        </div>
                        <div class="ip-result-section" id="ipResult" style="display: none;">
                            <div class="ip-result-text" id="ipResultText"></div>
                        </div>
                        <div class="ip-buttons-section">
                            <button class="ip-button" id="ipClearBtn">Очистить</button>
                            <button class="ip-button ip-button-primary" id="ipCompareBtn">Сравнить</button>
                        </div>
                    </div>
                `;
                modal.querySelector('.ip-modal-close').addEventListener('click', closeIPModal);
                modal.querySelector('#ipClearBtn').addEventListener('click', clearIPData);
                modal.querySelector('#ipCompareBtn').addEventListener('click', compareIPAddresses);
                modal.querySelector('#ipAddress1').addEventListener('input', saveIPData);
                modal.querySelector('#ipAddress2').addEventListener('input', saveIPData);
                modal.addEventListener('click', (e) => {
                    if (e.target === modal) closeIPModal();
                });
                return modal;
            }

            function closeIPModal() {
                const modal = document.getElementById('ipModal');
                if (modal) modal.style.display = 'none';
            }

            async function compareIPAddresses() {
                const ip1 = document.getElementById('ipAddress1').value.trim();
                const ip2 = document.getElementById('ipAddress2').value.trim();
                const resultSection = document.getElementById('ipResult');
                const resultText = document.getElementById('ipResultText');

                if (!ip1 || !ip2) {
                    showIPResult('Пожалуйста, введите оба IP-адреса', 'error');
                    return;
                }
                if (!isValidIP(ip1) || !isValidIP(ip2)) {
                    showIPResult('Один или оба IP-адреса имеют неверный формат', 'error');
                    return;
                }

                showIPResult('<div class="ip-loading">🔄 Получаем геоданные...</div>', 'loading');

                try {
                    const [geo1, geo2] = await Promise.all([
                        getGeoData(ip1),
                        getGeoData(ip2)
                    ]);

                    if (!geo1 || !geo2) {
                        showIPResult('<div class="ip-error">❌ Не удалось получить геоданные для одного из IP-адресов</div>', 'error');
                        return;
                    }

                    const distance = calculateDistance(geo1, geo2);

                    const result = `
                        <div class="ip-comparison-result">
                            <div class="ip-comparison-header">📊 Результат сравнения IP-адресов</div>
                            <div class="ip-comparison-grid">
                                <div class="ip-comparison-item">
                                    <div class="ip-comparison-title">📍 Первый IP-адрес</div>
                                    <div class="ip-comparison-details">
                                        <div class="ip-detail-row"><span class="ip-detail-label">IP:</span><span class="ip-detail-value">${ip1}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Страна:</span><span class="ip-detail-value">${geo1.country}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Город:</span><span class="ip-detail-value">${geo1.city}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Регион:</span><span class="ip-detail-value">${geo1.region}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Провайдер:</span><span class="ip-detail-value">${geo1.isp}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Координаты:</span><span class="ip-detail-value">${typeof geo1.latitude === 'number' ? geo1.latitude.toFixed(6) : geo1.latitude}, ${typeof geo1.longitude === 'number' ? geo1.longitude.toFixed(6) : geo1.longitude}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Часовой пояс:</span><span class="ip-detail-value">${geo1.timezone}</span></div>
                                    </div>
                                </div>
                                <div class="ip-comparison-item">
                                    <div class="ip-comparison-title">📍 Второй IP-адрес</div>
                                    <div class="ip-comparison-details">
                                        <div class="ip-detail-row"><span class="ip-detail-label">IP:</span><span class="ip-detail-value">${ip2}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Страна:</span><span class="ip-detail-value">${geo2.country}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Город:</span><span class="ip-detail-value">${geo2.city}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Регион:</span><span class="ip-detail-value">${geo2.region}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Провайдер:</span><span class="ip-detail-value">${geo2.isp}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Координаты:</span><span class="ip-detail-value">${typeof geo2.latitude === 'number' ? geo2.latitude.toFixed(6) : geo2.latitude}, ${typeof geo2.longitude === 'number' ? geo2.longitude.toFixed(6) : geo2.longitude}</span></div>
                                        <div class="ip-detail-row"><span class="ip-detail-label">Часовой пояс:</span><span class="ip-detail-value">${geo2.timezone}</span></div>
                                    </div>жб
                                </div>
                            </div>
                            <div class="ip-distance-result">
                                <div class="ip-distance-header">📏 Расстояние между точками</div>
                                <div class="ip-distance-value">${distance} км</div>
                                <div class="ip-distance-description">${getDistanceDescription(distance)}</div>
                            </div>
                            <div class="ip-comparison-summary">
                                <div class="ip-summary-row"><span class="ip-summary-label">Совпадение стран:</span><span class="ip-summary-value ${geo1.country === geo2.country ? 'ip-match' : 'ip-no-match'}">${geo1.country === geo2.country ? ' ✅ Да' : '❌ Нет'}</span></div>
                                <div class="ip-summary-row"><span class="ip-summary-label">Совпадение города:</span><span class="ip-summary-value ${geo1.city === geo2.city ? 'ip-match' : 'ip-no-match'}">${geo1.city === geo2.city ? ' ✅ Да' : '❌ Нет'}</span></div>
                            </div>
                        </div>
                    `;
                    showIPResult(result, 'success');
                } catch (error) {
                    showIPResult(`<div class="ip-error">❌ Ошибка при получении данных: ${error.message}</div>`, 'error');
                }
            }

            function getDistanceDescription(distance) {
                const dist = parseFloat(distance);
                if (isNaN(dist)) return 'Не удалось вычислить расстояние';
                if (dist < 1) return 'IP-адреса находятся практически в одном месте';
                if (dist < 10) return 'IP-адреса в пределах одного квартала';
                if (dist < 50) return 'IP-адреса в одном городе/районе';
                if (dist < 200) return 'IP-адреса в одном регионе';
                if (dist < 500) return 'IP-адреса в соседних регионах';
                if (dist < 1000) return 'IP-адреса на значительном расстоянии';
                if (dist < 3000) return 'IP-адреса в разных странах';
                return 'IP-адреса на разных континентах или очень далеко друг от друга';
            }

            function getValue(obj, keys) {
                for (let key of keys) {
                    if (key.includes('.')) {
                        const nestedKeys = key.split('.');
                        let value = obj;
                        for (let nestedKey of nestedKeys) {
                            value = value?.[nestedKey];
                            if (value === undefined) break;
                        }
                        if (value !== undefined) return value;
                    } else {
                        if (obj?.[key] !== undefined) return obj[key];
                    }
                }
                return undefined;
            }

            function normalizeGeoData(data, endpoint) {
                let normalized = {
                    ip: getValue(data, ['ip', 'query', 'ipAddress']),
                    country: getValue(data, ['country_name', 'country', 'countryName']),
                    city: getValue(data, ['city', 'cityName']),
                    region: getValue(data, ['region', 'regionName', 'region_code', 'state', 'state_prov']),
                    latitude: getValue(data, ['latitude', 'lat']),
                    longitude: getValue(data, ['longitude', 'lon']),
                    timezone: getValue(data, ['timezone', 'time_zone']),
                    isp: getValue(data, ['isp', 'org', 'asn', 'connection.isp']),
                };
                Object.keys(normalized).forEach(key => {
                    if (normalized[key] === undefined || normalized[key] === null || normalized[key] === '') {
                        normalized[key] = 'Неизвестно';
                    }
                });
                if (normalized.latitude !== 'Неизвестно') normalized.latitude = parseFloat(normalized.latitude);
                if (normalized.longitude !== 'Неизвестно') normalized.longitude = parseFloat(normalized.longitude);
                return normalized;
            }

            async function getGeoData(ip) {
                const endpoints = [
                    { url: `https://ipapi.co/${ip}/json/`, name: 'ipapi.co' },
                    { url: `https://ipwhois.app/json/${ip}`, name: 'ipwhois.app' },
                    { url: `http://ip-api.com/json/${ip}`, name: 'ip-api.com' },
                    { url: `https://freeipapi.com/api/json/${ip}`, name: 'freeipapi.com' }
                ];
                for (const endpoint of endpoints) {
                    try {
                        const response = await fetch(endpoint.url, { method: 'GET', headers: { 'Accept': 'application/json' } });
                        if (response.ok) {
                            const data = await response.json();
                            if (data.country || data.country_name || data.countryName) {
                                return normalizeGeoData(data, endpoint.url);
                            }
                        }
                    } catch (error) {
                        continue;
                    }
                }
                return null;
            }

            function calculateDistance(geo1, geo2) {
                if (!geo1.latitude || !geo1.longitude || !geo2.latitude || !geo2.longitude ||
                    geo1.latitude === 'Неизвестно' || geo1.longitude === 'Неизвестно' ||
                    geo2.latitude === 'Неизвестно' || geo2.longitude === 'Неизвестно') {
                    return 'Недостаточно данных для расчета';
                }
                const R = 6371;
                const dLat = (geo2.latitude - geo1.latitude) * Math.PI / 180;
                const dLon = (geo2.longitude - geo1.longitude) * Math.PI / 180;
                const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                          Math.cos(geo1.latitude * Math.PI / 180) * Math.cos(geo2.latitude * Math.PI / 180) *
                          Math.sin(dLon / 2) * Math.sin(dLon / 2);
                const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
                return (R * c).toFixed(2);
            }

            function showIPResult(message, type) {
                const resultSection = document.getElementById('ipResult');
                const resultText = document.getElementById('ipResultText');
                if (resultSection && resultText) {
                    resultSection.style.display = 'block';
                    resultText.innerHTML = message;
                }
            }

            function isValidIP(ip) {
                const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/;
                if (!ipRegex.test(ip)) return false;
                const parts = ip.split('.');
                return parts.every(part => {
                    const num = parseInt(part, 10);
                    return num >= 0 && num <= 255;
                });
            }

            function saveIPData() {
                const ip1 = document.getElementById('ipAddress1')?.value || '';
                const ip2 = document.getElementById('ipAddress2')?.value || '';
                localStorage.setItem('forum_ip_data_1', ip1);
                localStorage.setItem('forum_ip_data_2', ip2);
            }

            function loadIPSavedData() {
                const savedIP1 = localStorage.getItem('forum_ip_data_1');
                const savedIP2 = localStorage.getItem('forum_ip_data_2');
                const ipInput1 = document.getElementById('ipAddress1');
                const ipInput2 = document.getElementById('ipAddress2');
                if (ipInput1 && savedIP1) ipInput1.value = savedIP1;
                if (ipInput2 && savedIP2) ipInput2.value = savedIP2;
            }

            function clearIPData() {
                localStorage.removeItem('forum_ip_data_1');
                localStorage.removeItem('forum_ip_data_2');
                const ipInput1 = document.getElementById('ipAddress1');
                const ipInput2 = document.getElementById('ipAddress2');
                const resultSection = document.getElementById('ipResult');
                if (ipInput1) ipInput1.value = '';
                if (ipInput2) ipInput2.value = '';
                if (resultSection) resultSection.style.display = 'none';
            }

            // --- Инициализация ---
            if (document.readyState === 'loading') {
                document.addEventListener('DOMContentLoaded', initializeScript);
            } else {
                initializeScript();
            }

            const observer = new MutationObserver(() => {
                if (!document.querySelector('.bgButtonsContainer')) {
                    initializeScript();
                }
            });
            observer.observe(document.body, { childList: true, subtree: true });

        })();
    } catch (e) {
        console.error('[BR Script] Panel Error:', e);
    }
})();
