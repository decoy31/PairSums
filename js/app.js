"use strict";

var pairSums;

$(document).ready(function () {
    $('#txtMin, #txtMax, #txtSize').on('change load', function (e) {
        var ctrls = $('#txtMin, #txtMax, #txtSize'),
            ctrlCount = ctrls.length;

        clearSolution();

        ctrls.each(function (i, ctrl) {
            var result = false;

            if (ctrl.value !== '') {
                result = true;
            } else {
                clearNumberPool();
            }

            if (result && i === ctrlCount - 1) {
                populateNumberPool(
                    getRandomNumbers(
                        $('#chkSorted').is(':checked'),
                        ctrls.filter('#txtMin').val(),
                        ctrls.filter('#txtMax').val(),
                        ctrls.filter('#txtSize').val()
                    )
                );
            }

            return result;
        });
    });

    $('#chkSorted').on('change load', function (e) {
        var chkBox = $(e.target);
        var sort = chkBox.is(':checked');

        if (pairSums) {
            populateNumberPool(sort ? pairSums.randomNumbersSorted : pairSums.randomNumbers);
        } else {
            $('#txtMin').change();
        }
    });

    $('#btnSubmit').on('click', function (e) {
        e.preventDefault();

        if (typeof pairSums !== 'undefined') {
            var targetSum = $('#txtSum').val();
            var isSorted = $('#chkSorted').is(':checked');
            var pairs = isSorted ? pairSums.findPairsSorted(targetSum) : pairSums.findPairs(targetSum);

            if (pairs.length) {
                $('.solution').text(JSON.stringify(pairs));
                $('.solutionCount').text(pairs.length);
                $('.solutionTime').text(pairs.timeToComplete.getMilliseconds());
            } else {
                clearSolution(true);
            }
        } else {
            throw new Error('pairSums is undefined');
        }
    });

    $('#btnReset').on('click', function (e) {
        pairSums = undefined;
        clearSolution();
        clearNumberPool();
    });
});

function getRandomNumbers (sorted, min, max, size) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);
    size = parseInt(size, 10);

    if (typeof pairSums === 'undefined') {
        pairSums = new PairSums(min, max);
    } else {
        pairSums.min = min;
        pairSums.max = max;
    }

    var randomNumbers = [];

    pairSums.initialize(size);

    if (sorted) {
        randomNumbers = pairSums.randomNumbersSorted;
    } else {
        randomNumbers = pairSums.randomNumbers;
    }

    return randomNumbers;
}

function populateNumberPool (randomNumbers) {
    $('.numberPool').text(randomNumbers.length ? JSON.stringify(randomNumbers) : '');
    $('.numberPoolCount').text(randomNumbers.length);
    $('.numberPoolTime').text(randomNumbers.timeToComplete.getMilliseconds());
}

/**
 *
 * @param {boolean} [showNoPairsFound]
 */
function clearSolution (showNoPairsFound) {
    $('.solution').text(showNoPairsFound ? 'No pairs found.' : '');
    $('.solutionCount').text(0);
    $('.solutionTime').text(0);
}

function clearNumberPool () {
    $('.numberPool').empty();
    $('.numberPoolCount').text(0);
    $('.numberPoolTime').text(0);
}