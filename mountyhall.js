// ==UserScript==
// @name         Mountyhall
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://games.mountyhall.com/mountyhall/MH_Play/Play_profil2.php
// @grant        none
// ==/UserScript==
/* jshint -W097 */
'use strict';

$(function() {
    var detailSort = '/mountyhall/View/DetailSort.php?ai_IDSort=';

    // Projo
    $('#sortileges').find('a[href="' + detailSort + '1"]').closest('tr').click(function() {
        var $tr = $(this);
        if ($tr.hasClass('footable-detail-show') && !$tr.data('details')) {
            var view = parseIntWithDefault($('#vue').html()),
                viewHalf = Math.floor(view / 2),
                viewTot = parseIntWithDefault($('#vue_tot').html()),
                range = rangeProjo(viewTot),
                attackM = parseIntWithDefault($('#att_m').html()),
                attack = (view + attackM) + '-' + (view * 6 + attackM),
                damageM = parseIntWithDefault($('#deg_m').html()),
                damage = (viewHalf + damageM) + '-' + (viewHalf * 3 + damageM) + ' (' + (viewHalf + Math.floor(viewHalf / 2) + damageM) + '-' + ((viewHalf + Math.floor(viewHalf / 2)) * 3 + damageM) + ')';

            $tr.data('details', true).next().find('div.footable-row-detail-inner')
                .append(buildRowDetail('Portée:', range))
                .append(buildRowDetail('Attaque:', attack))
                .append(buildRowDetail('Dégâts:', damage));
        }
    });
});

function parseIntWithDefault(v) {
    v = parseInt(v, 10);
    return isNaN(v) ? 0 : v;
}

function rangeProjo(view) {
    if (view < 5) {
        return 1;
    } else if (view < 10) {
        return 2;
    } else if (view < 16) {
        return 3;
    }
    return 'TROP GROSSE VUE';
}

function buildRowDetail(name, value) {
    return '<div class="footable-row-detail-row">' + $('<div class="footable-row-detail-name"></div>').html(name)[0].outerHTML + $('<div class="footable-row-detail-value"></div>').html(value)[0].outerHTML + '</div>';
}