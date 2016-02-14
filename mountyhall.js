$(function() {
    var detailSort = '/mountyhall/View/DetailSort.php?ai_IDSort=';

    // New level PI remaining
    var $level = $('#niv');
    $level.append(' (' + (calcPiFromLevel($level.html()) + (parseIntWithDefault($level.html()) + 1) * 10 - parseIntWithDefault($('#pitot').html())) + ' PI pour niveau sup)');

    // Projo
    $('#sortileges').find('a[href="' + detailSort + '1"]').closest('tr').click(function() {
        var $rowDetail = $(this).next();

        if ($rowDetail.hasClass('footable-row-detail') && $rowDetail.find('div.footable-row-detail-row').length === 2) {
            var view = parseIntWithDefault($('#vue').html()),
                viewHalf = Math.floor(view / 2),
                viewTot = parseIntWithDefault($('#vue_tot').html()),
                range = rangeProjo(viewTot),
                attackM = parseIntWithDefault($('#att_m').html()),
                damageM = parseIntWithDefault($('#deg_m').html());

            $rowDetail.find('div.footable-row-detail-inner')
                .append(buildRowDetail('Portée:', range))
                .append(buildRowDetail('Attaque:', displayAttack(view, attackM)))
                .append(buildRowDetail('Dégâts:', displayDamage(viewHalf, damageM)))
                .append(buildRowDetail('Dégâts proximités:', displayDamage(viewHalf + range, damageM)));
        }
    });
});

function calcPiFromLevel(level) {
    return level > 1 ? level * 10 + calcPiFromLevel(level - 1) : 0;
}

function parseIntWithDefault(value) {
    value = parseInt(value, 10);
    return isNaN(value) ? 0 : value;
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
    return (damage + bonus) + '-' + (damage * 3 + bonus) + ' (' + (damage * 1.5 + bonus) + '-' + (damage * 4.5 + bonus) + ')';
}