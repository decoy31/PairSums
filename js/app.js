"use strict";

var pairSums;

$(document).ready(function () {
    $('#txtMin, #txtMax, #txtSize').on('change load', function (e) {
        var ctrls = $('#txtMin, #txtMax, #txtSize'),
            ctrlCount = ctrls.length;

        ctrls.each(function (i, ctrl) {
            var result = false;

            if (ctrl.value !== '') {
                result = true;
            } else {
                $('.numbers').empty();
            }

            if (result && i === ctrlCount - 1) {
                populateNumberPool(
                    ctrls.filter('#txtMin').val(),
                    ctrls.filter('#txtMax').val(),
                    ctrls.filter('#txtSize').val());
            }

            return result;
        });
    });

    $('#btnSubmit').on('click', function (e) {
        e.preventDefault();

        if (typeof pairSums !== 'undefined') {
            var pairs = pairSums.findPairs($('#txtSum').val());

            if (pairs.length) {
                $('.solution').text(JSON.stringify(pairs));
            } else {
                $('.solution').text('No pairs found.');
            }
        } else {
            throw new Error('pairSums is undefined');
        }
    });
});

function populateNumberPool(min, max, size) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    size = parseInt(size, 10);

    if (typeof pairSums === 'undefined') {
        pairSums = new PairSums(min, max);
    } else {
        pairSums.min = min;
        pairSums.max = max;
    }

    pairSums.initialize(size);
    $('.numbers').text(JSON.stringify(pairSums.randomNumbers.sort(function (a, b) { return a-b; })));
}