// ==UserScript==
// @name         ⏱️ Black Russia SLA Timer
// @namespace    https://forum.blackrussia.online
// @version      2.8.0
// @description  Отображает таймер SLA с момента ответа тех. специалиста
// @author       Maras Rofls
// @match        https://forum.blackrussia.online/*
// @grant        none
// @run-at       document-end
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';
    
    const CONFIG = {
        SLA_HOURS: 24,
        CHECK_INTERVAL: 60000,
        MAX_THREAD_AGE_DAYS: 50,
        ENABLE_COLORS: true,
        EXCLUDE_LOCKED: true,
    };

    const COLORS = {
        GREEN: '#4ade80',
        YELLOW: '#facc15',
        RED: '#f87171'
    };

    class SLATimer {
        constructor() {
            this.intervalId = null;
            this.init();
        }

        init() {
            this.run();
            this.intervalId = setInterval(() => {
                if (!document.hidden) this.run();
            }, CONFIG.CHECK_INTERVAL);
            window.addEventListener('beforeunload', () => {
                if (this.intervalId) clearInterval(this.intervalId);
            });
        }

        isCreateForm(row) {
            return row.querySelector('.js-prefixListenContainer') || 
                   row.querySelector('textarea[name="title"]') ||
                   row.querySelector('.js-quickThreadFields');
        }

        isTechSpecialist(element) {
            if (!element) return false;
            const elClasses = element.className || '';
            if (elClasses.indexOf('username--moderator') !== -1 || 
                elClasses.indexOf('username--style18') !== -1) return true;
            const children = element.querySelectorAll('*');
            for (let i = 0; i < children.length; i++) {
                const childClasses = children[i].className || '';
                if (childClasses.indexOf('username--moderator') !== -1 || 
                    childClasses.indexOf('username--style18') !== -1) return true;
            }
            return false;
        }

        getReplyData(row) {
            const lastCell = row.querySelector('.structItem-cell--latest');
            if (!lastCell) return null;
            
            const profileLink = lastCell.querySelector('a[href*="/members/"]');
            if (!profileLink) return null;
            
            const timeEl = lastCell.querySelector('time');
            if (!timeEl || !timeEl.getAttribute('data-time')) return null;
            
            const replyTime = parseInt(timeEl.getAttribute('data-time')) * 1000;
            const isTech = this.isTechSpecialist(profileLink);
            
            // ВСЕГДА возвращаем время последнего ответа
            // isTechReply определяет только наличие иконки ⏱
            return {
                time: replyTime,
                isTechReply: isTech  // true - показываем ⏱, false - без иконки
            };
        }

        formatTime(diff) {
            const days = Math.floor(diff / 86400000);
            const hours = Math.floor((diff % 86400000) / 3600000);
            const minutes = Math.floor((diff % 3600000) / 60000);
            if (days > 0) return `${days}д ${hours}ч`;
            return `${hours}ч ${minutes}м`;
        }

        createTimerElement() {
            const el = document.createElement('li');
            el.className = 'sla-timer-item';
            el.style.cssText = 'display:inline-flex!important;align-items:center!important;font-size:10px!important;font-weight:bold!important;padding:2px 8px!important;border-radius:10px!important;background:rgba(255,255,255,0.1)!important;cursor:help!important;font-family:sans-serif!important;';
            return el;
        }

        run() {
            const now = Date.now();
            const limit = CONFIG.SLA_HOURS * 3600 * 1000;
            const rows = document.querySelectorAll('.structItem--thread');
            
            rows.forEach(row => {
                if (this.isCreateForm(row)) return;
                
                const lockedStatus = row.querySelector('.structItem-status--locked');
                const stickyStatus = row.querySelector('.structItem-status--sticky');
                if (CONFIG.EXCLUDE_LOCKED && lockedStatus && !stickyStatus) return;
                
                const timeEl = row.querySelector('.structItem-startDate time');
                if (!timeEl) return;
                
                const createTime = parseInt(timeEl.getAttribute('data-time')) * 1000;
                if (now - createTime > CONFIG.MAX_THREAD_AGE_DAYS * 24 * 3600 * 1000) return;
                
                const replyData = this.getReplyData(row);
                
                // Если есть ответ (любой) - считаем от него
                // Если ответов нет - от создания темы
                const referenceTime = replyData ? replyData.time : createTime;
                const isTechReply = replyData ? replyData.isTechReply : false;
                const diff = now - referenceTime;
                
                const partsContainer = row.querySelector('.structItem-parts');
                if (!partsContainer) return;
                
                let timerEl = partsContainer.querySelector('.sla-timer-item');
                
                if (!timerEl) {
                    timerEl = this.createTimerElement();
                    const firstChild = partsContainer.firstElementChild;
                    if (firstChild) {
                        partsContainer.insertBefore(timerEl, firstChild);
                    } else {
                        partsContainer.appendChild(timerEl);
                    }
                }
                
                const percent = Math.min(100, (diff / limit) * 100);
                if (CONFIG.ENABLE_COLORS) {
                    if (percent > 85) timerEl.style.color = COLORS.RED;
                    else if (percent > 50) timerEl.style.color = COLORS.YELLOW;
                    else timerEl.style.color = COLORS.GREEN;
                }
                
                const timeText = this.formatTime(diff);
                
                // ⏱ только если техспец ответил последним
                if (isTechReply) {
                    timerEl.innerHTML = '⏱ ' + timeText;
                    timerEl.title = 'Отсчет с ответа тех. специалиста\nЛимит: ' + CONFIG.SLA_HOURS + 'ч';
                } else if (replyData) {
                    // Есть ответ, но не от техспеца
                    timerEl.innerHTML = timeText;
                    timerEl.title = 'Отсчет с последнего ответа\nЛимит: ' + CONFIG.SLA_HOURS + 'ч';
                } else {
                    // Нет ответов
                    timerEl.innerHTML = timeText;
                    timerEl.title = 'Отсчет с момента создания темы\nЛимит: ' + CONFIG.SLA_HOURS + 'ч';
                }
            });
        }

        restart() {
            if (this.intervalId) clearInterval(this.intervalId);
            this.init();
        }

        stop() {
            if (this.intervalId) clearInterval(this.intervalId);
            this.intervalId = null;
            document.querySelectorAll('.sla-timer-item').forEach(el => el.remove());
        }
    }

    setTimeout(() => {
        window.slaTimer = new SLATimer();
    }, 2000);

})();
