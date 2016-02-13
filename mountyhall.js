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
                damageM = parseIntWithDefault($('#deg_m').html()),
                damage = displayDamage(viewHalf, damageM) + ' (' + displayDamage(Math.floor(viewHalf * 1.5), damageM) + ')',
                damageClose = displayDamage(viewHalf + range, damageM) + ' (' + displayDamage(Math.floor((viewHalf + range) * 1.5), damageM) + ')';

            $tr.data('details', true).next().find('div.footable-row-detail-inner')
                .append(buildRowDetail('Portée:', range))
                .append(buildRowDetail('Attaque:', displayAttack(view, attackM)))
                .append(buildRowDetail('Dégâts:', damage))
                .append(buildRowDetail('Dégâts proximités:', damageClose));
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
    } else if (view < 23) {
        return 4;
    } else if (view < 31) {
        return 5;
    } else if (view < 40) {
        return 6;
    } else if (view < 50) {
        return 7;
    } else if (view < 61) {
        return 8;
    }
    return 'TROP GROSSE VUE';
}

function buildRowDetail(name, value) {
    return '<div class="footable-row-detail-row"><div class="footable-row-detail-name">' + name + '</div><div class="footable-row-detail-value">' + value + '</div></div>';
}

function displayAttack(attack, bonus) {
    return (attack + bonus) + '-' + (attack * 6 + bonus);
}

function displayDamage(damage, bonus) {
    return (damage + bonus) + '-' + (damage * 3 + bonus);
}