// ==UserScript==
// @name         OgameScript
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Ogame script showing extra
// @author       Theo LEBRUN
// @match        http://s127-us.ogame.gameforge.com/game/index.php*
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(document).ajaxSuccess(function(a, b, c) {
    // Display amount of ressources from attacks
    if (c.url === window.eventlistLink) {
        var metal = 0,
            crystal = 0,
            deuterium = 0;

        $('body').find('tr.eventFleet[data-mission-type="1"],tr.eventFleet[data-mission-type="8"]').each(function() {
            var $event = $(this);
            if ($event.find('td.hostile').length) {
                return;
            }
            var values = $('<div/>').html($event.find('span.tooltip').attr('title')).find('td.value');
            metal += parseInt(values.eq(-3).text().replace('.', ''), 10);
            crystal += parseInt(values.eq(-2).text().replace('.', ''), 10);
            deuterium += parseInt(values.eq(-1).text().replace('.', ''), 10);
        });
        metal /= 1000;
        crystal /= 1000;
        deuterium /= 1000;
        $('#eventHeader').find('h2').html('Events ' + metal.toFixed(3) + 'M, ' + crystal.toFixed(3) + 'C, ' + deuterium.toFixed(3) + 'D');
    }

    // Display infos on galaxy view
    if (c.url === window.contentLink) {
        var galaxytable = $('#galaxytable');

        // Display rank
        galaxytable.find('li.rank').each(function() {
            var rank = $(this);
            rank.closest('td').append('<span style="color:red;">' + rank.find('a').text() + '</span>');
        });

        // Display debris icon with color depending on recyclers needed
        galaxytable.find('li.debris-recyclers').each(function() {
            var debris = $(this),
                number = parseInt(debris.text().replace('Recyclers needed: ', ''), 10),
                link;

            if (number > 4 && number < 26) {
                link = 'https://raw.githubusercontent.com/Falydoor/Tampermonkey/master/resources/low-debris.png';
            } else if (number > 25 && number < 51) {
                link = 'https://raw.githubusercontent.com/Falydoor/Tampermonkey/master/resources/medium-debris.png';
            } else if (number > 50) {
                link = 'https://raw.githubusercontent.com/Falydoor/Tampermonkey/master/resources/high-debris.png';
            }
            if (link) {
                debris.closest('td').find('img').get(1).src = link;
            }
        });
    }
});