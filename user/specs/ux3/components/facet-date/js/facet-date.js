(function () {
    var $body = $('body');
    var $document = $(document);

    var facetDate = {
        sliderRanges: [],
        sliderValues: [],
        $rangeStart: $('.range-slider__start'),
        $rangeEnd: $('.range-slider__end'),
        url: location.href,

        init: function () {
            facetDate.initRange();
            facetDate.control();
        },
        initRange: function () {
            $('.range-slider').each(function () {
                var $sliderRange = $(this).find('.range-slider__range');
                var frequencies = $sliderRange.data('frequencies');
                
                var nonLinearSliderSteps = [1, 2, 5, 10];
                var allowedTotalYears = nonLinearSliderSteps.reduce(function (prev, cur) { return prev + cur; }) * 2;
                var maxVal = parseInt($sliderRange.attr('max'), 10);
                var minVal = parseInt($sliderRange.attr('min'), 10);
                var totalYears = maxVal - minVal;
                var linearSlider = $sliderRange.attr('data-slider-type') === 'linear';

                if (totalYears > allowedTotalYears && !linearSlider) { // non-linear slider
                    var displaySteps = nonLinearSliderSteps.slice().reverse();
                    var remaining = totalYears;
                    var startYear = minVal;
                    var startSlice = 0;

                    displaySteps.forEach(function (step, i, all) {
                        var oneThird = Math.floor(remaining / 3);
                        var twoThirds = Math.floor(2 * oneThird);
                        var remainder = twoThirds % step;
                        if (remainder > 0){
                            twoThirds = twoThirds - remainder;
                        }
                        remaining = remaining - twoThirds;

                        if (i == displaySteps.length - 1) {
                            facetDate.sliderRanges.push({
                                'start': startYear,
                                'stop': maxVal,
                                'displayStep': nonLinearSliderSteps[i],
                                'slideStep': step,
                                'freq': frequencies.slice(startSlice, frequencies.length)
                            });
                        } else {
                            facetDate.sliderRanges.push({
                                'start': startYear,
                                'stop': startYear + twoThirds,
                                'displayStep': nonLinearSliderSteps[i],
                                'slideStep': step,
                                'freq': frequencies.slice(startSlice, startSlice + twoThirds)
                            });
                        }
                        startSlice = startSlice + twoThirds;
                        startYear = startYear + twoThirds;
                    });

                    facetDate.sliderRanges.forEach(function (range) {
                        var sliderVal = range.start;
                        while (sliderVal <= range.stop) {
                            if (facetDate.sliderValues.indexOf(sliderVal)<0) {
                                facetDate.sliderValues.push(sliderVal);
                            }
                            sliderVal += range.slideStep;
                        }
                    });
                } else { // linear slider
                    for (var i = minVal; i <= maxVal; i++) {
                        facetDate.sliderValues.push(i);
                    }
                }

                $sliderRange.attr('min', 0);
                $sliderRange.attr('max', facetDate.sliderValues.length - 1);
                var initialValue = facetDate.getSelectedRange($sliderRange);
                facetDate.$rangeStart.val(initialValue[0]);
                facetDate.$rangeEnd.val(initialValue[1]);
                var initialPosition = facetDate.getSelectedRangePosition(initialValue[0], initialValue[1]);
                $sliderRange.attr('value', initialPosition.join(','));
                jcf.replace($sliderRange);

                // render frequencies
                if (frequencies) {
                    var $rangeWrapper = $(this).find('.jcf-range-wrapper');
                    var $rangeFrequencies = $('<span class="jcf-range-frequencies"></span>');

                    if (totalYears > allowedTotalYears && !linearSlider) { // non-linear slider
                        facetDate.sliderRanges.forEach(function (range) {
                            for (var i = 0; i < range.freq.length; i++) {
                                var $rangeSlice = $('<span class="jcf-range-frequencies__slice" style="width: ' + ((100 / range.freq.length) / facetDate.sliderRanges.length) + '%; opacity: ' + range.freq[i] + '"></span>');
                                $rangeFrequencies.append($rangeSlice);
                            }
                        });
                        $rangeWrapper.prepend($rangeFrequencies);
                    } else { // linear slider
                        var rangeSliceWidth = 100 / frequencies.length;
                        for (var i = 0; i < frequencies.length; i++) {
                            var $rangeSlice = $('<span class="jcf-range-frequencies__slice" style="width: ' + rangeSliceWidth + '%; opacity: ' + frequencies[i] + '"></span>');
                            $rangeFrequencies.append($rangeSlice);
                        }
                        $rangeWrapper.prepend($rangeFrequencies);
                    }  
                }
                
            });
        },
        control: function () {
            $body.on('click', '.custom-date', function (e) {
                e.preventDefault();
                facetDate.on.toggle($(this));
            });

            $('.range-slider__range').change(function() {
                facetDate.on.setRange($(this));
            });

            facetDate.$rangeStart.on('change', function() {
                facetDate.on.setStart($(this));
            });

            facetDate.$rangeEnd.on('change', function() {
                facetDate.on.setEnd($(this));
            });

            $('.range-slider__range').on('change change:startend', function() {
                facetDate.updateUrl($(this));
            });
        },
        on: {
            toggle: function (elem) {
                var $toggle = elem.closest('.facet');
                var $target = $toggle.find('.custom-date-form').slideToggle();
                elem.toggleClass('js--open');

            },
            setRange: function (elem) {
                var $toggle = elem.closest('.range-slider');
                var $target = $toggle.find('.jcf-active-handle');

                var tmp = $target.attr("class").match(/jcf-index[\w-]*\b/);
                var tmp2 = tmp.toString().split('-')[2];
                $('input.index-' + tmp2).val(facetDate.getValue(elem));
            },
            setStart: function (elem) {
                var $sliderRange = elem.closest('.range-slider').find('.range-slider__range');
                var minVal = parseInt($sliderRange.attr('min'), 10);
                var thisVal = facetDate.getValueFromInput(elem);
                var sliderInstance = jcf.getInstance($sliderRange);
                if (thisVal >= minVal && thisVal <= sliderInstance.values[1]) {
                    sliderInstance.values[0] = thisVal.toString();
                    sliderInstance.refresh();
                    $sliderRange.trigger('change:startend');
                }
            },
            setEnd: function (elem) {
                var $sliderRange = elem.closest('.range-slider').find('.range-slider__range');
                var maxVal = parseInt($sliderRange.attr('max'), 10);
                var thisVal = facetDate.getValueFromInput(elem);
                var sliderInstance = jcf.getInstance($sliderRange);
                if (thisVal <= maxVal && thisVal >= sliderInstance.values[0]) {
                    sliderInstance.values[1] = thisVal.toString();
                    sliderInstance.refresh();
                    $sliderRange.trigger('change:startend');
                }
            },
            rangeUpdate: function (elem, callbackFn) {
                var $sliderRange = $(elem);
                $sliderRange.on('change change:startend', function () {
                    callbackFn(facetDate.$rangeStart.val(), facetDate.$rangeEnd.val());
                });
            }
        },
        getValue: function (elem) {
            var $sliderRange = elem.closest('.range-slider').find('.range-slider__range');
            var thisValIndex = parseInt(elem.val(), 10);
            var thisVal = facetDate.sliderValues[thisValIndex];

            return thisVal;
        },
        getValueFromInput: function (elem) {
            var $sliderRange = elem.closest('.range-slider').find('.range-slider__range');
            var customVal = parseInt(elem.val(), 10);
            var minVal = parseInt($sliderRange.attr('data-min'), 10);
            var maxVal = parseInt($sliderRange.attr('data-max'), 10);
            var thisVal;

            if (customVal <= maxVal && customVal >= minVal) {
                if (facetDate.sliderValues.indexOf(customVal)>=0) {
                    thisVal = facetDate.sliderValues.indexOf(customVal);
                } else {
                    var closest = facetDate.sliderValues.reduce(function (prev, curr) {
                        return (Math.abs(curr - customVal) < Math.abs(prev - customVal) ? curr : prev);
                    });
                    thisVal = facetDate.sliderValues.indexOf(closest);
                }
            }
            return thisVal;
        },
        removeParam: function (key) {
            var baseUrl = facetDate.url.split('?')[0];
            var queryString = (facetDate.url.indexOf('?') !== -1) ? facetDate.url.split('?')[1] : '';
            var queryStringObj = {};

            if (queryString) {
                queryString.split('&').map(function (value) {
                    var keyVal = value.split('=');
                    queryStringObj[keyVal[0]] = keyVal[1];
                });
                if (queryStringObj[key]) {
                    delete queryStringObj[key];
                }
                queryString = Object.keys(queryStringObj).map(function (value) {
                    return value + '=' + queryStringObj[value];
                }).join('&');
                facetDate.url = baseUrl + (queryString ? '?' + queryString : '');
            }
        },
        getSelectedRange: function (sliderRange) {
            var baseUrl = facetDate.url.split('?')[0];
            var queryString = (facetDate.url.indexOf('?') !== -1) ? facetDate.url.split('?')[1] : '';
            var queryStringObj = {};

            if (queryString) {
                queryString.split('&').map(function (value) {
                    var keyVal = value.split('=');
                    queryStringObj[keyVal[0]] = keyVal[1];
                });
                
                if (queryStringObj.AfterYear && queryStringObj.BeforeYear) {
                    return [queryStringObj.AfterYear, queryStringObj.BeforeYear];
                }
            }

            return [parseInt(sliderRange.attr('data-min'), 10), parseInt(sliderRange.attr('data-max'), 10)];
        },
        getSelectedRangePosition: function (start, end) {
            var closestStart;
            var closestEnd;

            if (facetDate.sliderValues.indexOf(start)<0) {
                closestStart = facetDate.sliderValues.reduce(function (prev, curr) {
                    return (Math.abs(curr - start) < Math.abs(prev - start) ? curr : prev);
                });
            }

            if (facetDate.sliderValues.indexOf(end)<0) {
                closestEnd = facetDate.sliderValues.reduce(function (prev, curr) {
                    return (Math.abs(curr - end) < Math.abs(prev - end) ? curr : prev);
                });
            }

            return [facetDate.sliderValues.indexOf(closestStart || start), facetDate.sliderValues.indexOf(closestEnd || end)];
        },
        updateUrl: function (elem) {
            facetDate.removeParam('AfterYear');
            facetDate.removeParam('BeforeYear');
            facetDate.removeParam('queryID');
            facetDate.url += (facetDate.url.indexOf('?') > -1 ? '&' : '?') + 'AfterYear=' + facetDate.$rangeStart.val() + '&BeforeYear=' + facetDate.$rangeEnd.val() + '&queryID=' + $(elem).attr('data-queryID');
            window.location = facetDate.url;
        }
    };

    UX.facetDate = facetDate; // add to global namespace
})();
