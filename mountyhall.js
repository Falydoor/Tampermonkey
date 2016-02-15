$(function() {
    var detailSort = '/mountyhall/View/DetailSort.php?ai_IDSort=';

    // New level PI remaining
    var $level = $('#niv');
    $level.append(' (' + (calcPiFromLevel($level.html()) + (parseIntWithDefault($level.html()) + 1) * 10 - getIntFromId('pitot')) + ' PI pour niveau sup)');

    // Projo
    $('#sortileges').find('a[href="' + detailSort + '1"]').closest('tr').click(function() {
        var $rowDetail = $(this).next();

        if ($rowDetail.hasClass('footable-row-detail') && $rowDetail.find('div.footable-row-detail-row').length === 2) {
            var view = getIntFromId('vue'),
                viewHalf = Math.floor(view / 2),
                range = rangeProjo(getIntFromId('vue_tot')),
                damageM = getIntFromId('deg_m');

            $rowDetail.find('div.footable-row-detail-inner')
                .append(buildRowDetail('Portée:', range))
                .append(buildRowDetail('Attaque:', displayAttack(view, getIntFromId('att_m'))))
                .append(buildRowDetail('Dégâts:', displayDamage(viewHalf, damageM)))
                .append(buildRowDetail('Dégâts proximités:', displayDamage(viewHalf + range, damageM)));
        }
    });
});

function calcPiFromLevel(level) {
    return level > 1 ? level * 10 + calcPiFromLevel(level - 1) : 0;
}

function getIntFromId(id) {
    parseIntWithDefault($('#' + id).html());
}

function parseIntWithDefault(value) {
    value = parseInt(value, 10);
    return isNaN(value) ? 0 : value;
}

function rangeProjo(view, viewMax, range) {
    if (!viewMax) {
        viewMax = 4;
    }
    if (!range) {
        range = 1;
    }
    return view <= viewMax ? range : rangeProjo(view, viewMax + range + 4, range + 1);
}

function buildRowDetail(name, value) {
    return '<div class="footable-row-detail-row"><div class="footable-row-detail-name">' + name + '</div><div class="footable-row-detail-value">' + value + '</div></div>';
}

function displayAttack(attack, bonus) {
    return (attack + bonus) + '-' + (attack * 6 + bonus);
}

function displayDamage(damage, bonus) {
    return (damage + bonus) + '-' + (damage * 3 + bonus) + ' (' + (damage * 1.5 + bonus) + '-' + (damage * 4.5 + bonus) + ')';
}