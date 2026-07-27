// ==UserScript==
// @name    Кураторы Форума GROZNY | Black Russia
// @name:ru Кураторы Форума GROZNY | Black Russia
// @name:uk Кураторы Форума GROZNY | Black Russia
// @description  Предложения по улучшению скрипта писать сюда ---> https://vk.com/salafi_nn
// @description:ru Предложения по улучшению скрипта писать сюда ---> https://vk.com/salafi_nn
// @description:uk Приятного использования ---> https://vk.com/berzloew7
// @version 0.02
// @namespace https://forum.blackrussia.online
// @match        https://forum.blackrussia.online/threads/*
// @include      https://forum.blackrussia.online/threads/
// @match        https://forum.blackrussia.online/forums/*
// @include      https://forum.blackrussia.online/forums/
// @match        https://forum.blackrussia.online/forums/Сервер-№35-grozny.1587/post-thread&inline-mode=1*
// @include      https://forum.blackrussia.online/forums/Сервер-№35-grozny.1587/post-thread&inline-mode=1
// @grant        none
// @license    MIT
// @supportURL https://vk.com/berzloew7
// @icon https://emoji.gg/assets/emoji/9372-blurple-boost-level-9.png
// ==/UserScript==
 
(function () {
  `use strict`;
const UNACCСEPT_PREFIX = 4; // Prefix that will be set when thread closes
const ACCСEPT_PREFIX = 8; // Prefix that will be set when thread accepted
const RESHENO_PREFIX = 6; // Prefix that will be set when solving the problem
const PINN_PREFIX = 2; // Prefix that will be set when thread pins
const GA_PREFIX = 12; // Prefix that will be set when thread send to ga
const COMMAND_PREFIX = 10; // Prefix that will be set when thread send to project team
const WATCHED_PREFIX = 9;
const CLOSE_PREFIX = 7;
const SPECY_PREFIX = 11;
const TEXY_PREFIX = 13;
const OTKAZBIO_PREFIX = 4;
const ODOBRENOBIO_PREFIX = 8;
const NARASSMOTRENIIBIO_PREFIX = 2;
const OTKAZRP_PREFIX = 4;
const ODOBRENORP_PREFIX = 8;
const NARASSMOTRENIIRP_PREFIX = 2;
const OTKAZORG_PREFIX = 4;
const ODOBRENOORG_PREFIX = 8;
const NARASSMOTRENIIORG_PREFIX = 2;
const buttons = [
    {
      title: `Отказано, закрыто`,
      content: `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE]<br><br>`+
               `[CENTER][color=red]Отказано, закрыто.[/CENTER][/color]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Жалоба на рассмотрении (ВАЖНО)`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/CENTER]<br><br>`+
    //     `[CENTER]Ваша жалоба взята на рассмотрение.<br>Просьба ожидать ответа и не создавать дубликаты данной темы.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(251, 160, 38)]На рассмотрении.[/COLOR][/FONT][/SIZE][/CENTER]<br>`,
    //   prefix: PINN_PREFIX,
    //   status: false,
    // },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Правила Role Play процесса ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Нонрп поведение`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.01[/COLOR]. Запрещено поведение, нарушающее нормы процессов Role Play режима игры [Color=Red]| Jail 30 минут [/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Уход от РП`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.02[/COLOR]. Запрещено целенаправленно уходить от Role Play процесса всеразличными способами [Color=Red]| Jail 30 минут / Warn[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нонрп вождение`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.03[/color]. Запрещен NonRP Drive — вождение любого транспортного средства в невозможных для него условиях, а также вождение в неправдоподобной манере [Color=Red]| Jail 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `NonRP Обман`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.05[/color]. Запрещены любые OOC обманы и их попытки, а также любые IC обманы с нарушением Role Play правил и логики [Color=Red]| PermBan[/color].[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Аморал действия`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.08[/color]. Запрещена любая форма аморальных действий сексуального характера в сторону игроков [Color=Red]| Jail 30 минут / Warn[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Слив склада`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.09[/color]. Запрещено сливать склад фракции / семьи путем взятия большого количестве ресурсов, или же брать больше, чем разрешили на самом деле [Color=Red]| Ban 15 - 30 дней / PermBan[/color][/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `РК`,
      content:
      `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
      `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.14[/color]. Запрещен RK (Revenge Kill) — убийство игрока с целью мести, возвращение на место смерти в течение 15-ти минут, а также использование в дальнейшем информации, которая привела Вас к смерти [Color=Red]| Jail 30 минут[/color][/CENTER]<br><br>` +
      `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `ТК`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.15[/color]. Запрещен TK (Team Kill) — убийство члена своей или союзной фракции, организации без наличия какой-либо IC причины [Color=Red]| Jail 60 минут / Warn[/color] ([Color=Orange]за два и более убийства[/color])[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
        prefix: ACCСEPT_PREFIX,
        status: false,
      },
      {
        title: `СК`,
        content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.16[/color]. Запрещен SK (Spawn Kill) — убийство или нанесение урона на титульной территории любой фракции / организации, на месте появления игрока, а также на выходе из закрытых интерьеров и около них [Color=Red]| Jail 60 минут / Warn[/color] ([Color=Orange]за два и более убийства[/color]).[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
        prefix: ACCСEPT_PREFIX,
        status: false,
      },
      {
        title: `ПГ`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.17[/color]. Запрещен PG (PowerGaming) — присвоение свойств персонажу, не соответствующих реальности, отсутствие страха за свою жизнь [Color=Red]| Jail 30 минут[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
        prefix: ACCСEPT_PREFIX,
        status: false,
      },
      {
        title: `MG`,
        content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.18[/color]. Запрещен MG (MetaGaming) — использование ООС информации, которую Ваш персонаж никак не мог получить в IC процессе [Color=Red]| Mute 30 минут[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `ДМ`,
    //   content:
    //   `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //   `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.19[/color]. Запрещен DM (DeathMatch) — убийство или нанесение урона без веской IC причины [Color=Red]| Jail 60 минут[/color].[/CENTER]<br><br>` +
    //   `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
    //   title: `Масс ДМ`,
    //   content:
    //   `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //   `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.20[/color]. Запрещен Mass DM (Mass DeathMatch) — убийство или нанесение урона без веской IC причины трем игрокам и более [Color=Red]| Warn / Ban 3 - 7 дней[/color].[/CENTER]<br><br>` +
    //   `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
    //   title: `ДБ`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.13[/color]. Запрещен DB (DriveBy) — намеренное убийство / нанесение урона без веской IC причины на любом виде транспорта [Color=Red]| Jail 60 минут[/color][/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Масс дм`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по пункту правил:<br> [Color=Red]2.20[/color]. Запрещен Mass DM (Mass DeathMatch) — убийство или нанесение урона без веской IC причины трем игрокам и более [Color=Red]| Warn / Ban 3 - 7 дней[/color]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Реклама сторонние ресурсы`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.31[/color]. Запрещено рекламировать на серверах любые проекты, серверы, сайты, сторонние Discord-серверы, YouTube каналы и тому подобное [Color=Red]| Ban 7 дней / PermBan[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Обман адм`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.32[/color]. Запрещено введение в заблуждение, обман администрации на всех ресурсах проекта [Color=Red]| Ban 7 - 15 дней[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Уяз.правил`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.33[/color]. Запрещено пользоваться уязвимостью правил [Color=Red]| Ban 15 дней / Permban[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Уход от наказания`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.34[/color]. Запрещен уход от наказания [Color=Red]| Ban 15 - 30 дней[/color]([Color=Orange]суммируется к общему наказанию дополнительно[/color])[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Не возврат долга`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.57[/color]. Запрещается брать в долг игровые ценности и не возвращать их [Color=Red]| Ban 30 дней / Pemban[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Арест/Задержание`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.50[/color]. Запрещены задержания, аресты, а также любые действия со стороны игроков, состоящих во фракциях, в интерьере аукциона, казино, а также во время системных мероприятий [Color=Red]| Warn / Ban 10 дней[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
     {
      title: `ООС Угрозы`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.37[/color]. Запрещены OOC угрозы, в том числе и завуалированные, а также угрозы наказанием со стороны администрации [Color=Red]| Mute 120 минут / Ban 7-15 дней [/color]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Злоуп наказаниями`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.39[/color]. Злоупотребление нарушениями правил сервера [Color=Red]| Ban 7 - 15 дней [/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оск проекта`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.40[/color]. Запрещены совершенно любые деструктивные действия по отношению к проекту: неконструктивная критика, призывы покинуть проект, попытки нарушить развитие проекта или любые другие действия, способные привести к помехам в игровом процессе [Color=Red]| Mute 300 минут / Ban 30 дней[/color] ([Color=Cyan]Ban выдается по согласованию с главным администратором[/color])[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Продажа промо`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.43[/color]. Запрещена продажа / обмен / покупка поощрительной составляющей от лица проекта, будь то бонус-код, либо промокод, который выдается безвозмездно игрокам в целях промоакций [Color=Red]| Mute 120 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `ЕПП Фура`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.47[/color]. Запрещено передвигаться по полям на рабочем грузовом транспорте, если это не обусловлено игровым процессом данной работы [Color=Red]| Jail 60 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Покупка фам.репы`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.48[/color]. Продажа или покупка репутации семьи любыми способами, скрытие нарушителей, читеров лидером семьи. [Color=Red]| Обнуление рейтинга семьи / Обнуление игрового аккаунта лидера семьи[/color]<br><br>` +
        `[CENTER][Color=Orange]Примечание[/color]: скрытие информации о продаже репутации семьи приравнивается к [Color=Red]пункту правил 2.24.[/color][/CENTER]<br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Помеха РП процессу`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.04[/color]. Запрещены любые действия способные привести к помехам в игровом процессе, а также выполнению работ, если они этого не предусматривают и если эти действия выходят за рамки игрового процесса данной работы [Color=Red]| Ban 10 дней[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нонрп акс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.52[/color]. Запрещено неадекватное использование аксессуаров: их неестественное расположение (создающее непристойные образы) или чрезмерное увеличение размера, мешающее игровому процессу (огромные объекты, закрывающие персонажа) [Color=Red]| Обнуление аксессуаров / обнуление аксессуаров + JAIL 30 минут (при повторном нарушении)[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `2.53(Названия маты)`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.53[/color]. Запрещено устанавливать названия для внутриигровых ценностей (семей, бизнесов, компаний и др.) с использованием нецензурной лексики, оскорблений, слов политической или религиозной направленности. [Color=Red]| Принудительная смена названия / Ban 1 день / При повторном нарушении обнуление[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оск/Неуваж адм`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.54[/color]. Запрещено неуважительное обращение, оскорбление, неадекватное поведение, угрозы в любом их проявлении по отношению к администрации в любом из чатов [Color=Red]| Mute 180 / 300 минут (при повторном нарушении)[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Багоюз аним`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.55[/color]. Запрещается багоюз связанный с анимацией в любых проявлениях. [Color=Red]| Jail 120 минут [/color]<br>` +
        `[Color=red]Примечание:[/color] наказание применяется в случаях, когда, используя ошибку, игрок получает преимущество перед другими игроками.<br>` +
        `[Color=red]Пример:[/color] если игрок, используя баг, убирает ограничение на использование оружия в зелёной зоне, сбивает темп стрельбы или быстро перемещается используя баг анимации.<br>` +
        `[Color=red]Исключение:[/color] разрешается использование сбива темпа стрельбы в войне за бизнес при согласии обеих сторон и с предварительным уведомлением следящего администратора в соответствующей беседе.<br>` +
        `[Color=red]Исключение:[/color] на семейных активностях (например, захват завода, фермы Гарели и т. п.), а также в зонах криминальной активности допускается сбив анимации стрельбы.<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Игровые чаты ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Транслит`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.20[/color]. Запрещено использование транслита в любом из чатов [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оскорбление в IC`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.24[/color]. Запрещено токсичное поведение в IC чате направленное на унижение чести и достоинства личности игрока. В частности, запрещены оскорбления, затрагивающие половую принадлежность, физические или речевые особенности, в том числе в завуалированной форме [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Мат в вип чат`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил: [COLOR=Red]3.23[/COLOR]. Запрещено использование нецензурных слов, в том числе завуалированных и литературных в VIP чате [COLOR=Red]| Mute 30 минут[/COLOR].<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оскорбление в OOC`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.03[/color]. Любые формы оскорблений, издевательств, расизма, дискриминации, религиозной враждебности, сексизма в OOC чате запрещены [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Оск/Упом родни`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.04[/color]. Запрещено оскорбление или косвенное упоминание родных вне зависимости от чата (IC или OOC) [Color=Red]| Mute 300 минут / Ban 7 дней[/color].[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Флуд`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.05[/color]. Запрещен флуд — 3 и более повторяющихся сообщений от одного и того же игрока [Color=Red]| Mute 30 минут[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Злоуп знаками`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.06[/color]. Запрещено злоупотребление знаков препинания и прочих символов [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Оскорбление`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.07[/color]. Запрещены совершенно любые оскорбления или действия, порочащие честь и достоинства, несущие в себе подтекст сексуального характера вне зависимости от чата [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
    //   prefix: ACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Слив СМИ`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.08[/color]. Запрещены любые формы «слива» посредством использования глобальных чатов [Color=Red]| PermBan[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]` ,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Выдача себя за адм `,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.10[/color]. Запрещена выдача себя за администратора, если игрок таковым не являетется [Color=Red]| Ban 7 - 15 + ЧС Сервера[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Ввод в заблуждение`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.11[/color]. Запрещено введение игроков проекта в заблуждение путем злоупотребления командами [Color=Red]| Ban 15 - 30 дней / PermBan[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
     title: `Репорт Капс + Оффтоп + Транслит`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.12[/color]. Запрещено подавать репорт написанный транслитом, с сообщением не по теме (Offtop), с включенным Caps Lock и повторять обращение (если ответ был уже дан ранее) [Color=Red]| Report Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
     {
      title: `Музыка в войс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.14[/color]. Запрещено включать музыку в Voice Chat [Color=Red]| Mute 60 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Изменение голоса в войс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.19[/color]. Запрещено использование сторонних программ для изменения голоса [Color=Red]| Mute 60 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Шум в войс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.16[/color]. Запрещено создавать посторонние шумы или звуки [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оск Нации и Религии`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.18[/color]. Запрещены споры, конфликты, обсуждения и пропаганда на основе политических, религиозных, расовых, национальных идей, а также провокация игроков к коллективному флуду и токсичным беспорядкам в любом из чатов [Color=Red]| Mute 180 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Реклама промо`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.21[/color]. Запрещается реклама промокодов в игре, а также их упоминание в любом виде во всех чатах. [Color=Red]| Ban 15 дней[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Торговля на тт госс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.22[/color]. Запрещено публиковать любые объявления в помещениях государственных организаций вне зависимости от чата (IC или OOC) [Color=Red]| Mute 30 минут[/color][/CENTER]<br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Нарушение правил казино╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
         title: `Продажа должности`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [B][COLOR=rgb(255, 0, 0)]2.01.[/COLOR] Владельцу и менеджерам казино и ночного клуба [COLOR=rgb(255, 0, 0)][U]запрещено[/U][/COLOR] принимать работников за денежные средства на должность охранника, крупье или механика.[COLOR=rgb(255, 0, 0)] | Ban 3 - 5 дней.[/COLOR][/B]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Положение об игровых аккаунтах ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Мультиаккаунт (3+)`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]4.04[/color]. Разрешается зарегистрировать максимально только три игровых аккаунта на сервере [Color=Red]| PermBan[/color].<br><br>` +
        `[Color=Orange]Примечание[/color]: блокировке подлежат все аккаунты созданные после третьего твинка.[/CENTER]<br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Фейк аккаунт`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]4.10[/color]. Запрещено создавать никнейм, повторяющий или похожий на существующие никнеймы игроков или администраторов по их написанию [Color=Red]| Устное замечание + смена игрового никнейма / PermBan[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    // {
    //  title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Передача жалобы ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    // },
    // {
    //   title: `Техническому специалисту`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/CENTER]<br><br>`+
    //     `[CENTER]Ваша жалоба была передана на рассмотрение техническому специалисту.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(251, 160, 38)]На рассмотрении.[/COLOR][/FONT][/SIZE][/CENTER]<br>`,
    //   prefix: TEXY_PREFIX,
    //   status: true,
    // },
    // {
    //   title: `Главному куратору Форума`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/CENTER]<br><br>`+
    //     `[CENTER]Ваша жалоба была передана на рассмотрение Главному Куратору Форума.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(251, 160, 38)]На рассмотрении.[/COLOR][/FONT][/SIZE][/CENTER]<br>`,
    //   prefix: NARASSMOTRENIIBIO_PREFIX,
    //   status: true,
    // },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Переадресация жалобы ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Жалобу на сотрудника`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/CENTER]<br><br>`+
        `[CENTER]Вы ошиблись с разделом. Обратитесь в раздел жалобы на сотрудников.[/CENTER]<br><br>` +
		`[CENTER][COLOR=rgb(255, 0, 0)]Закрыто.[/COLOR][/CENTER]`,
      prefix: CLOSE_PREFIX,
      status: false,
    },
    {
      title: `Жалобу на лидера`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/CENTER]<br><br>`+
        `[CENTER]Вы ошиблись с разделом. Обратитесь в раздел жалобы на лидеров.[/CENTER]<br><br>` +
		`[CENTER][COLOR=rgb(255, 0, 0)]Закрыто.[/COLOR][/CENTER]`,
      prefix: CLOSE_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Правила Государственных Структур╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Н/П/Р/О (Объявы)`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пунтку правил:<br> [Color=Red]4.01[/color]. Запрещено редактирование объявлений, не соответствующих ПРО [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нон рп ГОСС`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пунтку правил:<br> [Color=Red]6.03[/color]. Запрещено nRP поведение | Warn [Color=Red]| Warn[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Розыск без причины(ГИБДД/МВД/ФСБ)`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пунтку правил:<br> [Color=Red]6.02[/color]. Запрещено выдавать розыск без Role Play причины [Color=Red]| Warn[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Редактирование в личных целях`,
      content:
       `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
       `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]4.04.[/color] Запрещено редактировать поданные объявления в личных целях заменяя текст объявления на несоответствующий отправленному игроком [Color=Red]|  Ban 7 дней + ЧС организации[/color][CENTER]<br><br>` +
       `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
       prefix: ACCСEPT_PREFIX,
       status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Правила ОПГ╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Нарушение правил В/Ч`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пунтку правил: За нарушение правил нападения на [Color=Orange]Войсковую Часть[/color] выдаётся предупреждение [Color=Red]| Jail 30 минут (NonRP нападение) / Warn (Для сотрудников ОПГ)[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нападение на В/Ч через стену`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пунтку правил: Нападение на [Color=Orange]военную часть[/color] разрешено только через блокпост КПП с последовательностью взлома [Color=Red]| Warn NonRP В/Ч[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Похищение/Ограбления нарушение правил`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан за Нонрп Ограбление\Похищениее в соответствии с этими правилами [URL=https://forum.blackrussia.online/threads/Правила-ограблений-и-похищений.29/]Кликабельно[/URL][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Отсутствие пунка жалоб╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
    //   title: `Нарушений не найдено`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Нарушений со стороны данного игрока не было найдено.[/CENTER]<br><br>` +
    //     `[Color=Red][CENTER]Отказано, закрыто.[/CENTER][/color]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
    //   title: `Недостаточно доказательств`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Недостаточно доказательств на нарушение от данного игрока. Доказательства должны быть предоставлены в хорошем качестве и с полным процессом сделки или нарушения от какого-либо игрока.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
    //   title: `Дублирование темы`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Дублироване темы. Если вы дальше будете заниматься данной деятельностью (дублированием тем), то ваш форумный аккаунт будет заблокирован на 3 дня и более.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
      title: `В жалобы на адм`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Вы ошиблись разделом. Обратитесь в раздел [Color=Red]Жалобы на администрацию[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `В обжалования`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Вы ошиблись разделом. Обратитесь в раздел [Color=Red]Обжалование наказаний[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Жалоба не по форме`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Ваша жалоба составлена не по форме. Убедительная просьба ознакомиться [Color=Red]с правилами подачи жалоб на игроков[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Нет /time`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]На ваших доказательствах отсутствует /time.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Таймкоды больше 3 мин`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Ваша жалоба отказана, т.к в ней нету таймкодов.<br>Если видео длится больше 3-ех минут Вы должны указать таймкоды нарушений.[/CENTER]<br><br>` +
        `[Color=Red][CENTER]Отказано[/CENTER][/color]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Более 72 часов`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]С момента нарушения игроком правил серверов прошло более 72 часов[/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Рассмотрению не подлежит.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
      {
      title: `Доква через запрет соц сети`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]3.6. Прикрепление доказательств обязательно. <br>` +
        `[Color=Orange]Примечание[/color]: загрузка доказательств в соц. сети (ВКонтакте, instagram) запрещается, доказательства должны быть загружены на фото/видео хостинги (YouTube, Япикс, imgur).[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нету условий сделки`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]В данных доказательствах отсутствуют условия сделки[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нужен фрапс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]В таких случаях нужнен фрапс[/CENTER]<br><br>`+
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Недостаточно докв`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Недостаточно доказательств на нарушение от данного игрока. Доказательства должны быть предоставлены в хорошем качестве и с полным процессом сделки или нарушения от какого-либо игрока.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    // {
    //   title: `Неполный фрапс`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER][B][I][FONT=georgia]Фрапс обрывается. Загрузите полный фрапс на ютуб.[/CENTER]<br><br>` +
    //     `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    // {
    //   title: `Не работают доква`,
    //   content:
    //     `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
    //     `[CENTER]Не работают доказательства[/CENTER]<br><br>` +
		// `[CENTER][COLOR=rgb(255, 0, 0)]Закрыто.[/COLOR][/CENTER]`,
    //   prefix: UNACCСEPT_PREFIX,
    //   status: false,
    // },
    {
      title: `Доква отредактированы`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]Ваши докозательства отредактированы.[/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Какие либо линии, чёрточки, обводка, ускорение, замедление, обрезка экрана.[/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Всё вышеперечисленное является редактированием доказательств.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `От 3-го лица`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]Жалобы от 3-их лиц не принимаются[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Ответный ДМ`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]В случае ответного ДМ нужен видиозапись. Пересоздайте тему и прекрепите видиозапись.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Фотохостинги`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Доказательства должны быть загружены на Yapx/Imgur/YouTube.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
        {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴РП биографии╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
      {
      title: `био одобрено`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Lime]Одобрено.[/I][/CENTER][/color][/FONT]` +
        `[I][SIZE=1][COLOR=rgb(255, 255, 255)]Приятной игры на[/COLOR][COLOR=rgb(255, 0, 0)][B] Black Russia[/B][/COLOR] [/SIZE][/I][COLOR=rgb(0, 100, 0)][B][SIZE=1]GROZNY [/SIZE][/B][/COLOR]`,
      prefix: ODOBRENOBIO_PREFIX,
      status: false,
    },
    {
      title: `Био отказ (фото)`,
      content:
        `[Color=rgb(255, 0, 0)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]В биографии должны присутствовать фотографии или иные материалы относящиеся к истории персонажа.[/CENTER]<br>` +
        `[CENTER][Color=rgb(255, 0, 0)]Отказано[/CENTER][/color]`,
      prefix: OTKAZBIO_PREFIX,
       status: false,
    },
    {
      title: `Био отказ (не по форме)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус:  [color=red]Отказано.[/color]<br>Причиной отказа могло послужить заполнение биографии не по форме. Ознакомьтесь с правилами подачи.[/CENTER]`,
      prefix: OTKAZBIO_PREFIX,
       status: false,
    },
    {
      title: `Био отказ (лишние пункты)`,
      content:
        `[Color=rgb(222, 0, 0)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]В биографии присутствуют лишние пунты. Ознакомьтесь с правилами подачи.[/CENTER]<br>` +
        `[Color=rgb(222, 0, 0)][FONT=Georgia][CENTER][I]Отказано.[/CENTER]`,
 
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title:`КОПИПАСТА`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[SIZE=4][FONT=times new roman][I][COLOR=rgb(209, 213, 216)]Ваша RolePlay - биография отказана т.к вы ее скопировали у другого человека. [/COLOR]<br><br>` +
       `[COLOR=rgb(209, 213, 216)]Внимательно прочитайте правила создания RP - биографий закрепленные в данном разделе [/COLOR][/I][COLOR=rgb(209, 213, 216)][/COLOR][/FONT][/SIZE]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
 
    },
    {
      title: `био отказ(заголовок темы)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить неправильное заполнение загловка темы. Ознакомьтесь с правилам подачи .[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title: `био отказ(1е лицо)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить создание биографии от 1го лица.[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title: `био отказ(Ошибки)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить большое количество грамматических ошибок.[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title: `био отказ(Возраст и Дата)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить несовпадение возраста и даты рождения.[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title: `био отказ(18 лет)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Причина отказа: минимальный возраст для составления биографии: 18 лет.[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
      title: `био отказ(200-600)`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП биография получает статус: [Color=Red]Отказано.[/color]<br>Минимальный объём RP биографии — 200 слов, максимальный — 600.[/CENTER][/FONT]`,
      prefix: OTKAZBIO_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴РП ситуации╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `РП ситуация одобрено`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП ситуация получает статус: [Color=Lime]Одобрено.[/I][/CENTER][/color][/FONT]` +
        `[I][SIZE=1][COLOR=rgb(255, 255, 255)]Приятной игры на[/COLOR][COLOR=rgb(255, 0, 0)][B] Black Russia[/B][/COLOR] [/SIZE][/I][COLOR=rgb(0, 100, 0)][B][SIZE=1]GROZNY [/SIZE][/B][/COLOR]`,
      prefix: ODOBRENORP_PREFIX,
      status: false,
    },
    {
      title: `РП ситуация на дороботке`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Вам даётся 24 часа на дополнение вашей РП ситуации[/CENTER]`,
      prefix: NARASSMOTRENIIRP_PREFIX,
      status: false,
    },
    {
      title: `РП ситуация отказ`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП ситуация получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить какое-либо нарушение из Правила RP ситуаций[/CENTER][/FONT]`,
      prefix: OTKAZRP_PREFIX,
      status: false,
    },
    {
     title: `╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴Неофициал. орг.╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴╴`,
    },
    {
      title: `Неофициальная Орг Одобрено`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП ситуация получает статус: [Color=Lime]Одобрено.[/I][/CENTER][/color][/FONT]` +
        `[I][SIZE=1][COLOR=rgb(255, 255, 255)]Приятной игры на[/COLOR][COLOR=rgb(255, 0, 0)][B] Black Russia[/B][/COLOR] [/SIZE][/I][COLOR=rgb(0, 100, 0)][B][SIZE=1]GROZNY [/SIZE][/B][/COLOR]`,
      prefix: ODOBRENOORG_PREFIX,
      status: false,
    },
    {
      title: `Неофициальная Орг на дороботке`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Вам даётся 24 часа на дополнение вашей Неофициальная Орг[/CENTER]`,
 
      prefix: NARASSMOTRENIIORG_PREFIX,
      status: false,
    },
    {
      title: `Неофициальная Орг отказ`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER]Ваша РП ситуация получает статус: [Color=Red]Отказано.[/color]<br>Причиной отказа могло послужить какое-либо нарушение из Правила создания неофициальной RolePlay организации.[/CENTER][/FONT]`,
      prefix: OTKAZORG_PREFIX,
      status: false,
    },
      {
      title: `Неофициальная Орг запроси активности`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Ваша неофициальная РП организация может быть закрыта по пункту правил: Неактив в топике организации более недели, он закрывается. Прекрипите отчёт о активности организации в виде скриншотов. Через 24 часа если отчёта не будет или он будет некорректный организация будет закрыта.[/CENTER]`,
      prefix: PINN_PREFIX,
      status: false,
    },
    {
      title: `Неофициальная Орг закрытие активности`,
      content:
        `[Color=rgb(222, 143, 255)][FONT=Georgia][CENTER][I]{{ greeting }}, уважаемый {{ user.mention }}.[/color][/CENTER]<br>` +
        `[CENTER][B][I][FONT=georgia]Активность небыла предоставлена. Организация закрыта.[/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
  ];
 
  let buttons2 = [
    {
      title: `На рассмотрении`,
      content:
        `Ваша жалоба находится на рассмотрении.<br><br>`+
        `Прикрепите доп. фрапс со следующими действиями в этой теме:<br>` +
        `1. Включите фрапс<br>`+
        `2. Пропишите /time<br>`+
        `3. Загрузите транспортное средство которое вам передал игрок<br>`+
        `4. Покажите что в автомобиле нету тех опций которые были указаны в условиях сделки<br>`+
        `5. Выключите фрапс<br>`+
        `6. Загрузите фрапс на один из рабочих видеохостингов<br><br>`+
        `У вас есть 24 часа на предоставление видео доказательства`,
      prefix: PINN_PREFIX,
      status: true,
    },
    {
      title: `Главному куратору Форума`,
      content:
        ``,
      prefix: NARASSMOTRENIIBIO_PREFIX,
      status: true,
    },
    {
      title: `Техническому специалисту`,
      content:
        ``,
      prefix: TEXY_PREFIX,
      status: true,
    },
    {
      title: `NonRP Обман`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.05[/color]. Запрещены любые OOC обманы и их попытки, а также любые IC обманы с нарушением Role Play правил и логики [Color=Red]| Ban 15 - 30 дней / PermBan[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Оск/Упом родни`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.04[/color]. Запрещено оскорбление или косвенное упоминание родных вне зависимости от чата (IC или OOC) [Color=Red]| Mute 300 минут / Ban 7 дней[/color].[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Слив склада`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.09[/color]. Запрещено сливать склад фракции / семьи путем взятия большого количестве ресурсов, или же брать больше, чем разрешили на самом деле [Color=Red]| Ban 15 - 30 дней / PermBan[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `ДМ`,
      content:
      `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
      `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.19[/color]. Запрещен DM (DeathMatch) — убийство или нанесение урона без веской IC причины [Color=Red]| Jail 90 минут[/color].[/CENTER]<br><br>` +
      `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Стороннее ПО`,
      content:
      `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
      `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.22[/color]. Запрещено хранить / использовать / распространять стороннее программное обеспечение или иные средства, позволяющие получить преимущество над другими игроками, включая макросы (в том числе с эмуляторов) [Color=Red]| Ban 15 - 30 дней / Permban[/color][/CENTER]<br><br>` +
      `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `ДБ`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]2.13[/color]. Запрещен DB (DriveBy) — намеренное убийство / нанесение урона без веской IC причины на любом виде транспорта [Color=Red]| Jail 60 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нарушений не найдено`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушений со стороны данного игрока не было найдено.[/CENTER]<br><br>` +
        `[Color=Red][CENTER]Отказано, закрыто.[/CENTER][/color]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нелогир Чат/Действие`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нам не удалось подтвердить нарушение со стороны игрока.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Дублирование темы`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Дублирование темы. Если вы дальше будете заниматься данной деятельностью (дублированием тем), то ваш форумный аккаунт будет заблокирован на 3 дня и более.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Нет /time`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]На ваших доказательствах отсутствует /time.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Неполный фрапс`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER][B][I][FONT=georgia]Фрапс обрывается. Загрузите полный фрапс на ютуб.[/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(255, 0, 0)]Отказано.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `Не работают доква`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Не работают доказательства[/CENTER]<br><br>` +
		`[CENTER][COLOR=rgb(255, 0, 0)]Закрыто.[/COLOR][/CENTER]`,
      prefix: UNACCСEPT_PREFIX,
      status: false,
    },
    {
      title: `CapsLook`,
      content:
        `[CENTER][SIZE=4][FONT=georgia][COLOR=rgb(255, 0, 0)]Доброго времени суток, уважаемый[/COLOR] {{ user.mention }}[/FONT][/SIZE][/CENTER]<br><br>`+
        `[CENTER]Нарушитель будет наказан по данному пункту правил:<br> [Color=Red]3.02[/color]. Запрещено использование верхнего регистра (CapsLock) при написании любого текста в любом чате [Color=Red]| Mute 30 минут[/color][/CENTER]<br><br>` +
        `[CENTER][COLOR=rgb(0, 255, 0)]Одобрено.[/COLOR][/CENTER]`,
      prefix: ACCСEPT_PREFIX,
      status: false,
    },
   ]
 
 $(document).ready(() => {
    // Загрузка скрипта для обработки шаблонов
    $(`body`).append(`<script src="https://cdn.jsdelivr.net/npm/handlebars@latest/dist/handlebars.js"></script>`);
 
    // Добавление кнопок при загрузке страницы
    addButton(`На рассмотрении`, `pin`);
    addButton(`ГКФу`, `gkf`);
    addButton(`Теху`, `texy`);
    addButton(`NonRP Обман`, `obman`);
    addButton(`Оск/Упом родни`, `rodn`);
    addButton(`Слив склада`, `slivskl`);
    addButton(`ДМ`, `dm`);
    addButton(`ДБ`, `db`); // после масс дм
    addButton(`Стороннее ПО`, `soft`);
    addButton(`CapsLook`, `caps`); //последнее
    addButton(`Нарушений нет`, `otkazano`);
    addButton(`Нелогир Чат/Действие`, `malo`);
    addButton(`Дубликат`, `dublikat`);
    addButton(`Нет /time`, `time`);
    addButton(`Неполный фрапс`, `fraps`);
    addButton(`Не работают док-ва`, `opra`);
    addButton(`Нажми`, `selectAnswer`);
 
 
    // Поиск информации о теме
    const threadData = getThreadData();
 
    $(`button#pin`).click(() => pasteContent2(0, threadData, true));
    $(`button#gkf`).click(() => pasteContent2(1, threadData, true));
    $(`button#texy`).click(() => pasteContent2(2, threadData, true));
    $(`button#obman`).click(() => pasteContent2(3, threadData, true));
    $(`button#rodn`).click(() => pasteContent2(4, threadData, true));
    $(`button#slivskl`).click(() => pasteContent2(5, threadData, true));
    $(`button#dm`).click(() => pasteContent2(6, threadData, true));
    $(`button#soft`).click(() => pasteContent2(7, threadData, true));
    $(`button#db`).click(() => pasteContent2(8, threadData, true));
    $(`button#otkazano`).click(() => pasteContent2(9, threadData, true));
    $(`button#malo`).click(() => pasteContent2(10, threadData, true));
    $(`button#dublikat`).click(() => pasteContent2(11, threadData, true));
    $(`button#time`).click(() => pasteContent2(12, threadData, true));
    $(`button#fraps`).click(() => pasteContent2(13, threadData, true));
    $(`button#opra`).click(() => pasteContent2(14, threadData, true));
    $(`button#caps`).click(() => pasteContent2(15, threadData, true));
    /*console.log(buttons2[0])
    console.log(buttons2[1])
    console.log(buttons2[2])
    console.log(buttons2[3])
    console.log(buttons2[4])
    console.log(buttons2[5])
    console.log(buttons2[6])
    console.log(buttons2[7])
    console.log(buttons2[8])
    console.log(buttons2[9])
    console.log(buttons2[10])
    console.log(buttons2[11])
    console.log(buttons2[12])
    console.log(buttons2[13])
    console.log(buttons2[14])
    console.log(buttons2[15])
    console.log(buttons2[16])*/
 
    $(`button#selectAnswer`).click(() => {
      XF.alert(buttonsMarkup(buttons), null, `Выберите ответ:`);
      buttons.forEach((btn, id) => {
        if (id > 0) {
          $(`button#answers-${id}`).click(() => pasteContent(id, threadData, true));
        }
        else {
          $(`button#answers-${id}`).click(() => pasteContent(id, threadData, false));
        }
      });
    });
  });
 
  function addButton(name, id) {
    $(`.button--icon--reply`).before(
      `<button type="button" class="button rippleButton" id="${id}" style="margin: 3px;">${name}</button>`,
    );
  }
 
  function buttonsMarkup(buttons) {
    return `<div class="select_answer">${buttons
  .map(
  (btn, i) =>
    `<button id="answers-${i}" class="button--primary button " +
    "rippleButton" style="margin:5px"><span class="button-text">${btn.title}</span></button>`,
  )
  .join(``)}</div>`;
  }
 
  function pasteContent(id, data = {}, send = false) {
    const template = Handlebars.compile(buttons[id].content);
    if ($(`.fr-element.fr-view p`).text() === ``) $(`.fr-element.fr-view p`).empty();
 
    $(`span.fr-placeholder`).empty();
    $(`div.fr-element.fr-view p`).append(template(data));
    $(`a.overlay-titleCloser`).trigger(`click`);
 
    if (send == true) {
      editThreadData(buttons[id].prefix, buttons[id].status);
      $(`.button--icon.button--icon--reply.rippleButton`).trigger(`click`);
    }
  }
 
  function pasteContent2(id, data = {}, send = false) {
    const template = Handlebars.compile(buttons2[id].content);
    if ($(`.fr-element.fr-view p`).text() === ``) $(`.fr-element.fr-view p`).empty();
 
    $(`span.fr-placeholder`).empty();
    $(`div.fr-element.fr-view p`).append(template(data));
    $(`a.overlay-titleCloser`).trigger(`click`);
 
    if (send == true) {
      editThreadData(buttons2[id].prefix, buttons2[id].status);
      $(`.button--icon.button--icon--reply.rippleButton`).trigger(`click`);
    }
  }
 
  function getThreadData() {
    const authorID = $(`a.username`)[0].attributes[`data-user-id`].nodeValue;
    const authorName = $(`a.username`).html();
    const hours = new Date().getHours();
    return {
      user: {
        id: authorID,
        name: authorName,
        mention: `[USER=${authorID}]${authorName}[/USER]`,
      },
      greeting: () =>
        4 < hours && hours <= 11 ?
        `Доброе утро` :
        11 < hours && hours <= 15 ?
        `Добрый день` :
        15 < hours && hours <= 21 ?
        `Добрый вечер` :
        `Доброй ночи`,
    };
  }
 
    function editThreadData(prefix, pin = false) {
// Получаем заголовок темы, так как он необходим при запросе
    const threadTitle = $(`.p-title-value`)[0].lastChild.textContent;
 
    if(pin == false){
        fetch(`${document.URL}edit`, {
method: `POST`,
body: getFormData({
  prefix_id: prefix,
  title: threadTitle,
  _xfToken: XF.config.csrf,
  _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
  _xfWithData: 1,
  _xfResponseType: `json`,
}),
        }).then(() => location.reload());
    } else  {
        fetch(`${document.URL}edit`, {
method: `POST`,
body: getFormData({
  prefix_id: prefix,
  title: threadTitle,
  pin: 1,
  _xfToken: XF.config.csrf,
  _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
  _xfWithData: 1,
  _xfResponseType: `json`,
}),
        }).then(() => location.reload());
    }
 
 
 
 
 if(pin == false){
        fetch(`${document.URL}edit`, {
method: `POST`,
body: getFormData({
  prefix_id: prefix,
  title: threadTitle,
  _xfToken: XF.config.csrf,
  _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
  _xfWithData: 1,
  _xfResponseType: `json`,
}),
        }).then(() => location.reload());
    } else  {
        fetch(`${document.URL}edit`, {
method: `POST`,
body: getFormData({
  prefix_id: prefix,
  title: threadTitle,
  pin: 1,
  _xfToken: XF.config.csrf,
  _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
  _xfWithData: 1,
  _xfResponseType: `json`,
}),
        }).then(() => location.reload());
 }
 
 
function moveThread(prefix, type) {
// Получаем заголовок темы, так как он необходим при запросе
const threadTitle = $(`.p-title-value`)[0].lastChild.textContent;
 
fetch(`${document.URL}move`, {
  method: `POST`,
  body: getFormData({
    prefix_id: prefix,
    title: threadTitle,
    target_node_id: type,
    redirect_type: `none`,
    notify_watchers: 1,
    starter_alert: 1,
    starter_alert_reason: 1,
    _xfToken: XF.config.csrf,
    _xfRequestUri: document.URL.split(XF.config.url.fullBase)[1],
    _xfWithData: 1,
    _xfResponseType: `json`,
  }),
}).then(() => location.reload());
}
 
function getFormData(data) {
    const formData = new FormData();
    Object.entries(data).forEach(i => formData.append(i[0], i[1]));
    return formData;
  }
    }
})();
