$(function() { 
    var toneStart = false;
    var restart  = false;
    var displayLowRange = 0;
    var workLowRange = 0;
    var displayHiRange = 87;
    var workHiRange = 87;
    var workNoteCount = 5;
    var displayNoteCount = 5;
    var workPauseCount = 5;
    var displayPauseCount = 5;    
    var workKey = 0;
    var displayKey = 0;
    var workScale = 0;
    var displayScale = 0;
    var workBPM = 120;
    var displayBPM = 120;
    var workVolume = 25;
    var displayVolume = 25;
    var workReps = 1;
    var displayReps = 1;
    var displayInstrument = 0;
    var workInstrument = 0;
    
    
    var blink = false;
    var keepRange = false;
    var newInstrument = false;
    var instrumentloaded = false;
    var repeatFlag = false;
    var octaveFlag = false;

    var Loops;
    
    var phraseInterval = 4000;
    
    var BPMOffset = .5;
    
    var differential = 0;
    
    var blocker = 1;
    var noteString;
    var buttonString;
    
     
    var scaleHold;
    var currentScale = [];
    var adjustedScale = [];
    var adjustedScale2 = [];    
    var finalAdjustedScale = [];

    var scaleNames = ['Major', 'Minor', 'Harmonic Minor', 'Pentatonic', 'Pentatonic Plus', 'Chromatic', 'Whole Tone', 'Tetratonic'];
    var scaleNotes = [[0, 2, 4, 5, 7, 9, 11],[0, 2, 3, 5, 7, 8, 10], [0, 2, 3, 5, 7, 9, 11], [0, 3, 5, 7, 10], [0, 3, 5, 6, 7, 10], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], [0, 2, 4, 6, 8, 10], [0, 3, 6, 9]];   
    const keys = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];
    var instrumentNames = ['    Piano', ' Spanish Guitar', '     Bass', ' Electric Clean', ' Acoustic Guitar'];
    

    const arrNoteBuild = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B' ];
    var arrNoteNames = ['A0', 'A#0', 'B0'];

    var placer;
    for (var x=0; x<8; x++) {   
        for (var i=0; i<12; i++) {
            placer = (((12 * x) + i) +3);
            arrNoteNames[placer] = arrNoteBuild[i] + (x + 1);            
        };
    };

    intervalStop = window.setInterval(moreNotes2,phraseInterval);
    clearInterval(intervalStop);

    newKey();

    $("#repeatNotes").prop('checked',false);
    $("#octaveLimit").prop('checked',false);

    $('.accordion-panel').each( function() {
        $(this).slideDown(800);
    });
    $('.accordion-panel').each( function() {
            $(this).slideUp(800);
    });

    postUpdate();

    // var elLowEnd = document.getElementById('lowRangeDisplay');
    // elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
    // buttonString = '+ Low Range:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayLowRange].toString();
    // $('#acLowRange').html(buttonString);

    // var elHiEnd = document.getElementById('hiRangeDisplay');
    // elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
    // buttonString = '+ HighRange:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayHiRange].toString();
    // $('#acHiRange').html(buttonString);
    

    // var elNoteCount = document.getElementById('noteCountDisplay');
    // elNoteCount.innerHTML = '<span>Note Count: ' + displayNoteCount + '</span>';
    // buttonString = '+ Note Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayNoteCount + ' Notes';
    // $('#acNoteCount').html(buttonString);

    // var elPauseCount = document.getElementById('pauseCountDisplay');
    // elPauseCount.innerHTML = '<span>Pause Count: ' + displayPauseCount + '</span>';
    // buttonString = '+ Pause Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayPauseCount + ' Notes';
    // $('#acPauseCount').html(buttonString);

    // var elKey = document.getElementById('keyDisplay');
    // elKey.innerHTML = '<span>Key: ' + keys[displayKey] + '</span>';
    // buttonString = '+ Key:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + keys[displayKey];
    // $('#acKey').html(buttonString);

    // var elScale = document.getElementById('scaleDisplay');
    // elScale.innerHTML = '<span>Scale: ' + scaleNames[displayScale] + '</span>';
    // buttonString = '+ Scale:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + scaleNames[displayScale];
    // $('#acScale').html(buttonString);

    // var elReps = document.getElementById('repsDisplay');
    // elReps.innerHTML = '<span>Playback: ' + displayReps + 'x</span>';
    // buttonString = '+ Repeat Phrase:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayReps + 'x';
    // $('#acReps').html(buttonString);

    // var elInstrument = document.getElementById('itext');
    // elInstrument.textContent = instrumentNames[displayInstrument];
    // buttonString = '+ Intstrument:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + instrumentNames[displayInstrument];
    // $('#acInstrument').html(buttonString);

    // document.getElementById('bpmRange').value = workBPM;
    // document.getElementById('volume').value = workVolume;

    // var elBpmLabel = document.getElementById('bpmLabel');
    // elBpmLabel.textContent = 'BPM:  ' + displayBPM;
    // buttonString = '+ BPM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayBPM;
    // $('#acBPM').html(buttonString);

    // var elVolLabel = document.getElementById('vLabel');
    // elVolLabel.textContent = 'Volume:  ' + displayVolume;
    // buttonString = '+ Volume:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayVolume;
    // $('#acVol').html(buttonString);

    $('button#keepButton').on('click', function() {
        if ($('button#keepButton').hasClass('redback')) {
            $('button#keepButton').removeClass('redback').addClass('greenback');
            $('button#keepButton2').removeClass('greenback').addClass('redback');
            keepRange = true;
        } else { 
            if ($('button#keepButton').hasClass('greenback')) {
                $('button#keepButton').removeClass('greenback').addClass('redback');
                $('button#keepButton2').removeClass('redback').addClass('greenback');
                keepRange = false;
            };
        }
    });

    $('button#keepButton2').on('click', function() {
        if ($('button#keepButton2').hasClass('redback')) {
            $('button#keepButton2').removeClass('redback').addClass('greenback');
            $('button#keepButton').removeClass('greenback').addClass('redback');
            keepRange = false;
        } else { 
            if ($('button#keepButton2').hasClass('greenback')) {
                $('button#keepButton2').removeClass('greenback').addClass('redback');
                $('button#keepButton').removeClass('redback').addClass('greenback');
                keepRange = true;
            };
        }
    });

    $('button#start-stop').on('click', function() {
        if (!toneStart) {       
            InstrumentLoad();
            intervalStop = window.setInterval(moreNotes2,phraseInterval);
            updateCheck();
            $(this).html('Stop');
        } else {
            if (toneStart) {
                toneStart = false;   
                samplerB.dispose(); 
                instrumentloaded = false;
                window.clearInterval(intervalStop); 
                $(this).html('Start');  
            };
        };    
    });

    $('button#stop').on('click', function() {
        if (toneStart) {
            toneStart = false;   
            samplerB.dispose(); 
            instrumentloaded = false;
            window.clearInterval(intervalStop); 
        };
    });

    $('#downLowRange').on('click', function() {
        if (displayLowRange !== 0) {
            displayLowRange = displayLowRange - 1;
            var elLowEnd = document.getElementById('lowRangeDisplay');
            elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
            $('#acLowRange').find('.redx').remove();
            if (displayLowRange !== workLowRange) {
                $('#acLowRange').append('<span class="redx">  |  ' + arrNoteNames[displayLowRange].toString() + '</span>');                        
            };
            updateCheck();
        };
    });

    $('#downLowRangePlus').on('click', function() {
        if ((displayLowRange - 12) <= 0) {
            displayLowRange = 0;
        } else {
                displayLowRange = displayLowRange - 12;
        }
        var elLowEnd = document.getElementById('lowRangeDisplay');
        elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
        $('#acLowRange').find('.redx').remove();
        if (displayLowRange !== workLowRange) {
            $('#acLowRange').append('<span class="redx">  |  ' + arrNoteNames[displayLowRange].toString() + '</span>');                        
        };
        updateCheck();
    })

    $('#upLowRange').on('click', function() {
        if (displayLowRange !== 83) {
            displayLowRange = displayLowRange + 1;
            if ((displayHiRange - displayLowRange) < 4) {$('#upHiRange').click();};
            var elLowEnd = document.getElementById('lowRangeDisplay');
            elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
            $('#acLowRange').find('.redx').remove();
            if (displayLowRange !== workLowRange) {
                $('#acLowRange').append('<span class="redx">  |  ' + arrNoteNames[displayLowRange].toString() + '</span>');                        
            };
            updateCheck();
        };
    });

    $('#upLowRangePlus').on('click', function() {
        if ((displayHiRange - displayLowRange) > 15) {
                displayLowRange = displayLowRange + 12;
                var elLowEnd = document.getElementById('lowRangeDisplay');
                elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
                $('#acLowRange').find('.redx').remove();
                if (displayLowRange !== workLowRange) {
                    $('#acLowRange').append('<span class="redx">  |  ' + arrNoteNames[displayLowRange].toString() + '</span>');                        
                };
                updateCheck();
        };
    });

    $('#downHiRange').on('click', function() {
        if (displayHiRange !== 4) {
            displayHiRange = displayHiRange - 1;
            if ((displayHiRange - displayLowRange) < 4) {$('#downLowRange').click();};
            var elHiEnd = document.getElementById('hiRangeDisplay');
            elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
            $('#acHiRange').find('.redx').remove();
            if (displayHiRange !== workHiRange) {
                $('#acHiRange').append('<span class="redx">  |  ' + arrNoteNames[displayHiRange].toString() + '</span>');                        
            };
            updateCheck();
        };
    });    

    $('#downHiRangePlus').on('click', function() {
        if ((displayHiRange - displayLowRange) > 15) {
            displayHiRange = displayHiRange - 12;
            var elHiEnd = document.getElementById('hiRangeDisplay');
            elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
            $('#acHiRange').find('.redx').remove();
            if (displayHiRange !== workHiRange) {
                $('#acHiRange').append('<span class="redx">  |  ' + arrNoteNames[displayHiRange].toString() + '</span>');                        
            };
            updateCheck();
        };
    });

    $('#upHiRange').on('click', function() {
        if (displayHiRange !== 87) {
            displayHiRange = displayHiRange + 1;
            var elHiEnd = document.getElementById('hiRangeDisplay');
            elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
            $('#acHiRange').find('.redx').remove();
            if (displayHiRange !== workHiRange) {
                $('#acHiRange').append('<span class="redx">  |  ' + arrNoteNames[displayHiRange].toString() + '</span>');                        
            }
            updateCheck();
        };
    });

    $('#upHiRangePlus').on('click', function() {
        if ((displayHiRange + 12) >= 87) {
            displayHiRange = 87;
        } else {
                displayHiRange = displayHiRange + 12;
        }
        var elHiEnd = document.getElementById('hiRangeDisplay');
        elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
        $('#acHiRange').find('.redx').remove();
        if (displayHiRange !== workHiRange) {
            $('#acHiRange').append('<span class="redx">  |  ' + arrNoteNames[displayHiRange].toString() + '</span>');                        
        }
        updateCheck();
    });

    $('#downNoteCount').on('click', function() {
        if (displayNoteCount !== 0) {
            displayNoteCount = displayNoteCount - 1;
            var elNoteCount = document.getElementById('noteCountDisplay');
            elNoteCount.innerHTML = '<span>Note Count: ' + displayNoteCount + '</span>';
            $('#acNoteCount').find('.redx').remove();
            if (displayNoteCount !== workNoteCount) {
                $('#acNoteCount').append('<span class="redx">  |  ' +  displayNoteCount + ' Notes</span>');                        
            }
            updateCheck();
        };
    });

    

    $('#upNoteCount').on('click', function() {
        if (displayNoteCount !== 21) {
            displayNoteCount++;
            var elNoteCount = document.getElementById('noteCountDisplay');
            elNoteCount.innerHTML = '<span>Note Count: ' + displayNoteCount + '</span>';
            $('#acNoteCount').find('.redx').remove();
            if (displayNoteCount !== workNoteCount) {
                $('#acNoteCount').append('<span class="redx">  |  ' +  displayNoteCount + ' Notes</span>');                        
            }
            updateCheck();
        };
    });

    $('#upPauseCount').on('click', function() {
        if (displayPauseCount !==21) {
            displayPauseCount++;
            var elPauseCount = document.getElementById('pauseCountDisplay');
            elPauseCount.innerHTML = '<span>Pause Count: ' + displayPauseCount + '</span>';
            $('#acPauseCount').find('.redx').remove();
            if (displayPauseCount !== workPauseCount) {
                $('#acPauseCount').append('<span class="redx">  |  ' +  displayPauseCount + ' Notes</span>');                        
            }
            updateCheck();
        };
    });

    $('#downPauseCount').on('click', function() {
        if (displayPauseCount !== 0) {
            displayPauseCount--;
            var elPauseCount = document.getElementById('pauseCountDisplay');
            elPauseCount.innerHTML = '<span>Pause Count: ' + displayPauseCount + '</span>';
            $('#acPauseCount').find('.redx').remove();
            if (displayPauseCount !== workPauseCount) {
                $('#acPauseCount').append('<span class="redx">  |  ' +  displayPauseCount + ' Notes</span>');                        
            }
            updateCheck();
        };
    });    

    $('#upKey').on('click', function() {
        if (displayKey !== 11) {
            displayKey++;
            var elKey = document.getElementById('keyDisplay');
            elKey.innerHTML = '<span>Key: ' + keys[displayKey] + '</span>';
            $('#acKey').find('.redx').remove();
            if (displayKey !== workKey) {
                $('#acKey').append('<span class="redx">   | ' +   keys[displayKey] + '</span>');
            };
            updateCheck();
        };
    });

    $('#downKey').on('click', function() {
        if (displayKey !== 0) {
            displayKey--;
            var elKey = document.getElementById('keyDisplay');
            elKey.innerHTML = '<span>Key: ' + keys[displayKey] + '</span>';
            $('#acKey').find('.redx').remove();
            if (displayKey !== workKey) {
                $('#acKey').append('<span class="redx">   | ' +   keys[displayKey] + '</span>');
            };
            updateCheck();
        };
    });   

    $('#upScale').on('click', function() {
        if (displayScale !== 7) {
            displayScale++;
            var elScale = document.getElementById('scaleDisplay');
            elScale.innerHTML = '<span>Scale: ' + scaleNames[displayScale] + '</span>';
            updateCheck();
            $('#acScale').find('.redx').remove();
            if (displayScale !== workScale) {
                $('#acScale').html('&nbsp;&nbsp;&nbsp;' + scaleNames[workScale] +'&nbsp;&nbsp;&nbsp;' + '<span class="redx"> | ' + '&nbsp;&nbsp;&nbsp;' +  scaleNames[displayScale] + '</span>');
            };
        };
    });

    $('#downScale').on('click', function() {
        if (displayScale !== 0) {
            displayScale--;
            var elScale = document.getElementById('scaleDisplay');
            elScale.innerHTML = '<span>Scale: ' + scaleNames[displayScale] + '</span>';
            updateCheck();
            $('#acScale').find('.redx').remove();
            if (displayScale !== workScale) {
                $('#acScale').html('&nbsp;&nbsp;&nbsp;' + scaleNames[workScale] +'&nbsp;&nbsp;&nbsp;' + '<span class="redx"> | ' + '&nbsp;&nbsp;&nbsp;' +  scaleNames[displayScale] + '</span>');
            };
        };
    }); 

    $('#upReps').on('click', function() {
        if (displayReps !== 5) {
            displayReps++;
            var elReps = document.getElementById('repsDisplay');
            elReps.innerHTML = '<span>Playback: ' + displayReps + 'x</span>';
            $('#acReps').find('.redx').remove();
            if (displayReps !== workReps) {
                $('#acReps').append('<span class="redx">  |  ' +  displayReps + 'x</span>');                        
            }
            updateCheck();
        };
    }); 

    $('#downReps').on('click', function() {
        if (displayReps !== 1) {
            displayReps--;
            var elReps = document.getElementById('repsDisplay');
            elReps.innerHTML = '<span>Playback: ' + displayReps + 'x</span>';
            $('#acReps').find('.redx').remove();
            if (displayReps !== workReps) {
                $('#acReps').append('<span class="redx">  |  ' +  displayReps + 'x</span>');                        
            }
            updateCheck();
        };
    }); 

    $('#upInstrument').on('click', function() {
        if (displayInstrument !== 4) {
            displayInstrument++;
            var elInstrument = document.getElementById('itext');
            elInstrument.textContent = instrumentNames[displayInstrument];
            keepRange = true;
            updateCheck();
            if (displayInstrument !== workInstrument) {
                $('button#keepButton').removeClass('redback').removeClass('greenback');
                $('button#keepButton').addClass('greenback');
                $('button#keepButton2').removeClass('redback').removeClass('greenback');
                $('button#keepButton2').addClass('redback');
            } else {
                $('button#keepButton').removeClass('redback').removeClass('greenback');
                $('button#keepButton2').removeClass('redback').removeClass('greenback');
            };
            $('#acInstrument').find('.redx').remove();
            if (displayInstrument !== workInstrument) {
                $('#acInstrument').html('&nbsp;&nbsp;&nbsp;' + instrumentNames[workInstrument] +'&nbsp;&nbsp;&nbsp;' + '<span class="redx"> | ' + '&nbsp;&nbsp;&nbsp;' +  instrumentNames[displayInstrument] + '</span>');
            };
        };
    }); 

    $('#downInstrument').on('click', function() {
        if (displayInstrument !== 0) {
            displayInstrument--;
            var elInstrument = document.getElementById('itext');
            elInstrument.textContent = instrumentNames[displayInstrument];
            keepRange = true;
            updateCheck();
            if (displayInstrument !== workInstrument) {
                $('button#keepButton').removeClass('redback').removeClass('greenback');
                $('button#keepButton').addClass('greenback');
                $('button#keepButton2').removeClass('redback').removeClass('greenback');
                $('button#keepButton2').addClass('redback');
            } else {
                $('button#keepButton').removeClass('redback').removeClass('greenback');
                $('button#keepButton2').removeClass('redback').removeClass('greenback');
            };
            $('#acInstrument').find('.redx').remove();
            if (displayInstrument !== workInstrument) {
                $('#acInstrument').html('&nbsp;&nbsp;&nbsp;' + instrumentNames[workInstrument] +'&nbsp;&nbsp;&nbsp;' + '<span class="redx"> | ' + '&nbsp;&nbsp;&nbsp;' +  instrumentNames[displayInstrument] + '</span>');
            };
        };
    });

    $('#bpmRange').on('change', function() {
        displayBPM = $(this).val();
        var elBPMLabel = document.getElementById('bpmLabel');
        elBPMLabel.textContent = 'BPM:  ' + displayBPM;
        $('#acBPM').find('.redx').remove();
        if (displayBPM.toString() !== workBPM.toString()) {
                $('#acBPM').append('<span class="redx">   | ' +   displayBPM + '</span>');
        }
        updateCheck();
    });

    $('#volume').on('change', function() {
        displayVolume = $(this).val();
        var elVolLabel = document.getElementById('vLabel');
        elVolLabel.textContent = 'Volume:  ' + displayVolume;
        $('#acVol').find('.redx').remove();
        if (displayVolume.toString() !== workVolume.toString()) {
                $('#acVol').append('<span class="redx">   | ' +   displayVolume + '</span>');
        }
        updateCheck();
    });    

    $("#repeatNotes").change( function() {
        if (($("#repeatNotes").prop('checked') === true ) && (repeatFlag === false)) {
                $('#i2').text(' | ON       ');
        } else if (($("#repeatNotes").prop('checked') === false ) && (repeatFlag === true)) {
                    $('#i2').text(' | OFF      ');
        } else  {
            $('#i2').text('            ');
        };
        updateCheck();
    });

    $("#octaveLimit").change( function() {
        if (($("#octaveLimit").prop('checked') === true ) && (octaveFlag === false)) {
                $('#i4').text(' | ON       ');
        } else if (($("#octaveLimit").prop('checked') === false) && (octaveFlag === true)) {
                    $('#i4').text(' | OFF      ');
        } else {
            $('#i4').text('            ');
        };
        updateCheck();
    });
    
    $('#update').on('click', function (){
        if (blink === true) {
            window.clearInterval(intervalStop); 
            if (toneStart) {
                restart = true;
                $('button#start-stop').click();
            };
            if ((displayKey !== workKey) || (displayScale !== workScale)) {
                workKey = displayKey;
                workScale = displayScale;
                newKey();
            };
            workReps = displayReps;
            blocker = workReps;
            if (workInstrument !== displayInstrument) {
                newInstrument = true;
                workInstrument = displayInstrument;
            } 
            if ($("#repeatNotes").prop('checked') === true) {
                repeatFlag = true;
            } else {
                repeatFlag = false;
            };
            if ($("#octaveLimit").prop('checked') === true) {
                octaveFlag = true;
            } else {
                octaveFlag = false;
            };
            workLowRange = displayLowRange;
            workHiRange = displayHiRange;
            workNoteCount = displayNoteCount;
            workPauseCount = displayPauseCount;
            workBPM = displayBPM;
            BPMOffset = 60 / workBPM;
            BPMOffset = BPMOffset * 1000;            
            BPMOffset = Math.round(BPMOffset);
            BPMOffset = BPMOffset / 1000;
            phraseInterval = ((workNoteCount + workPauseCount) * 1000) * BPMOffset;
            workVolume = displayVolume;           
            window.clearInterval(intervalStop);            
            $('#update').removeClass('redBlink').addClass('noBlink');
            $('button#keepButton').removeClass('redback').removeClass('greenback');
            $('button#keepButton2').removeClass('redback').removeClass('greenback');
            blink = false;  
            toneStart = false;
            postUpdate();
            if (restart) {
                $('button.start').click();
                restart = false;
            };
        }
    });

    function updateCheck() {
        if ((displayLowRange !== workLowRange) || (displayHiRange !== workHiRange) || (displayNoteCount !== workNoteCount) || (displayPauseCount !== workPauseCount) || (displayBPM.toString() !== workBPM.toString()) ||  (displayKey !== workKey) || (displayScale !== workScale) ||(displayReps !== workReps) || (displayInstrument !== workInstrument) || (displayVolume.toString() !== workVolume.toString())
        || (($("#repeatNotes").prop('checked') === true ) && (repeatFlag === false)) || (($("#repeatNotes").prop('checked') === false ) && (repeatFlag === true)) || (($("#octaveLimit").prop('checked') === true ) && (octaveFlag === false)) || (($("#octaveLimit").prop('checked') === false) && (octaveFlag === true))){
            $('#update').removeClass('noBlink').addClass('redBlink');
            blink = true;
            //console.log(displayLowRange + ' ' + workLowRange + ' ' + displayHiRange + ' ' + workHiRange + ' ' +displayNoteCount + ' ' + workNoteCount + ' ' + displayPauseCount + ' ' + workPauseCount + ' ' + displayBPM + ' ' + workBPM + ' ' + displayVolume  + ' ' +  workVolume + ' ' + displayKey  + ' ' +  workKey + ' ' + displayScale + ' ' + workScale + ' ' + displayReps  + ' ' +  workReps + ' ' + displayInstrument  + ' ' +  workInstrument);
        } else {
            $('#update').removeClass('redBlink').addClass('noBlink');
            blink = false;
        };        
    };  

    function newKey() {
        
        var rawAdjustedScale = [];
        var oneOctaveKeyOfA = [];
        var eightOctavesKeyofA = [];

        oneOctaveKeyOfA = scaleNotes[workScale];   // The lowest octave of the selected scale in the key of A.

        // Turn the low octave in A into 8 octaves in A of the selected Scale.
        for (var i=0; i<8; i++) {
            for (var x=0; x < oneOctaveKeyOfA.length; x++) {
                eightOctavesKeyofA[x + (i * oneOctaveKeyOfA.length)] = (oneOctaveKeyOfA[x] + (i * 12));
            };        
        };

        // Raw adjust the notes from A to the selected Key.
        for (var i=0; i < eightOctavesKeyofA.length; i++) {
            rawAdjustedScale[i] = (eightOctavesKeyofA[i] + workKey);
        };


        // Recover notes that may have been lost on the low end of the keyboard when the scale was adjusted. (Put them at the low end of the final array).
        var x1 = 0;
        var x2 = 0;
        for (var i=0; i<currentScale.length; i++) {
            if (((rawAdjustedScale[i] - 84) >= 0) && ((rawAdjustedScale[i] - 84) < workKey)) {
                finalAdjustedScale[x2] = (rawAdjustedScale[i] - 84);
                x2++;
            }
        };

        //Start after the recovered low notes and copy in the Key adjusted notes. Also lops off any notes that went over 87.        
        while (rawAdjustedScale[x1] < 88) {
            finalAdjustedScale[x2+x1] = rawAdjustedScale[x1];
            x1++;
        };
    };

    function moreNotes2 () {
        if (!toneStart) {return;};
        var playBackNotes = [];
        var randomNote;
        if (blocker < workReps) {
            blocker = blocker + 1;
            return;
        };
        var repeatPass = true;
        var octavePass = true;
        var previousNote = Math.random() * (workHiRange - workLowRange + 1) + workLowRange;
        previousNote = Math.floor(previousNote);
        var timex = Tone.now();
        for (var i=0; i<workNoteCount; i++) {
            do {
                randomNote = Math.random() * (workHiRange - workLowRange + 1) + workLowRange;  
                randomNote = Math.floor(randomNote);
                if (repeatFlag === true) {
                    if (randomNote !== previousNote) {
                        repeatPass = true;
                    } else {
                        repeatPass = false;
                    };
                };
                if (octaveFlag === true) {
                    if (Math.abs(previousNote - randomNote) < 13) {
                        octavePass = true;
                    } else {
                        octavePass = false;
                    };
                }
            } while ((finalAdjustedScale.indexOf(randomNote) === -1) || (octavePass === false) || (repeatPass === false));
            previousNote = randomNote;
            samplerB.triggerAttackRelease(arrNoteNames[randomNote], "8n", timex);
            playBackNotes[i] = arrNoteNames[randomNote];
            timex += BPMOffset;
        };
        for (var i=0; i<workPauseCount; i++) {
            timex += BPMOffset;
        }; 
        for (var i=1; i<workReps; i++) {
            for (var x=0; x<playBackNotes.length; x++) {
                noteString = playBackNotes[x].toString();
                samplerB.triggerAttackRelease(noteString, "8n", timex);
                timex += BPMOffset;
            };
            for (var y=0; y<workPauseCount; y++) {
                timex += BPMOffset;
            }
        };        
        blocker = 1;
    };

    function InstrumentLoad() {    
        instrumentloaded = true;
        switch (workInstrument) {
            case 0:  
                if ((!keepRange) && (newInstrument === true)){
                    displayLowRange = 0;
                    workLowRange = 0;
                    displayHiRange = 87;
                    workHiRange = 87;
                };
                samplerB = new Tone.Sampler({
                    urls: {
                        "C1": "C2.wav",
                        "C3": "C4.wav",
                        "C5": "C6.wav",
                    },
                    release: 1,
                    baseUrl: "/instruments/piano/",
                }).toDestination(); 
                Tone.loaded().then(() => {toneStart = true; moreNotes2();});
                break;
            case 1:
                if ((!keepRange) && (newInstrument === true)) {
                    displayLowRange = 31;
                    workLowRange = 31;
                    displayHiRange = 75;
                    workHiRange = 75;
                };
                samplerB = new Tone.Sampler({
                    urls: {
                        "C3": "C3.wav",
                        "C4": "C4.wav",
                        "C5": "C5.wav",
                    },
                    release: 1,
                    baseUrl: "/instruments/spanishguitar/",
                }).toDestination(); 
                Tone.loaded().then(() => {toneStart = true; moreNotes2();});
                break;
            case 2:
                if ((!keepRange) && (newInstrument === true)) {
                    displayLowRange = 7;                    
                    workLowRange = 7;
                    displayHiRange = 39;
                    workHiRange = 39;
                };
                samplerB = new Tone.Sampler({
                    urls: {
                        "C3": "C4.wav",
                        "E2": "E3.wav",
                        "G#0": "G#1.wav",
                        "G#1": "G#2.wav",
                    },
                    release: 1,
                    baseUrl: "/instruments/bass/",
                }).toDestination();
                Tone.loaded().then(() => {toneStart = true; moreNotes2();});
                break;
                case 3:
                    if ((!keepRange) && (newInstrument === true)) {
                        displayLowRange = 31;                    
                        workLowRange = 31;
                        displayHiRange = 75;
                        workHiRange = 75;
                    };
                    samplerB = new Tone.Sampler({
                        urls: {
                            "A2": "A3.wav",
                            "A3": "A4.wav",
                            "D2": "D3.wav",
                            "D3": "D4.wav",
                            "D4": "D5.wav",
                            "E3": "E4.wav",
                        },
                        release: 1,
                        baseUrl: "/instruments/electric_clean/",
                    }).toDestination();
                    Tone.loaded().then(() => {toneStart = true; moreNotes2();});
                    break;
                    case 4:
                        if ((!keepRange) && (newInstrument === true)) {
                            displayLowRange = 31;                    
                            workLowRange = 31;
                            displayHiRange = 75;
                            workHiRange = 75;
                        };
                        samplerB = new Tone.Sampler({
                            urls: {
                                "E2": "E3.wav",
                                "A2": "A3.wav",
                                "D3": "D4.wav",
                                "G3": "G4.wav",
                                "B3": "B4.wav",
                                "E4": "E5.wav",
                            },
                            release: 1,
                            baseUrl: "/instruments/acoustic_guitar/",
                        }).toDestination();
                        Tone.loaded().then(() => {toneStart = true; moreNotes2();});
                        break;
        };           
        var elLowEnd = document.getElementById('lowRangeDisplay');
        elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>'; 
        var elHiEnd = document.getElementById('hiRangeDisplay');
        elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
        newInstrument = false;
        buttonString = '+ Low Range:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayLowRange].toString();
        $('#acLowRange').html(buttonString);
        buttonString = '+ HighRange:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayHiRange].toString();
        $('#acHiRange').html(buttonString);
        Tone.Master.volume.value = workVolume;             
    };

    function postUpdate() {
        var elLowEnd = document.getElementById('lowRangeDisplay');
        elLowEnd.innerHTML = '<span>Range Low End: ' + arrNoteNames[displayLowRange].toString() + '</span>';
        buttonString = '+ Low Range:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayLowRange].toString();
        $('#acLowRange').html(buttonString);

        var elHiEnd = document.getElementById('hiRangeDisplay');
        elHiEnd.innerHTML = '<span>Range Hi End: ' + arrNoteNames[displayHiRange].toString() + '</span>';
        buttonString = '+ HighRange:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + arrNoteNames[displayHiRange].toString();
        $('#acHiRange').html(buttonString);
        

        var elNoteCount = document.getElementById('noteCountDisplay');
        elNoteCount.innerHTML = '<span>Note Count: ' + displayNoteCount + '</span>';
        buttonString = '+ Note Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayNoteCount + ' Notes';
        $('#acNoteCount').html(buttonString);

        var elPauseCount = document.getElementById('pauseCountDisplay');
        elPauseCount.innerHTML = '<span>Pause Count: ' + displayPauseCount + '</span>';
        buttonString = '+ Pause Count:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayPauseCount + ' Notes';
        $('#acPauseCount').html(buttonString);

        var elKey = document.getElementById('keyDisplay');
        elKey.innerHTML = '<span>Key: ' + keys[displayKey] + '</span>';
        buttonString = '+ Key:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + keys[displayKey];
        $('#acKey').html(buttonString);

        var elScale = document.getElementById('scaleDisplay');
        elScale.innerHTML = '<span>Scale: ' + scaleNames[displayScale] + '</span>';
        buttonString = '+ Scale:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + scaleNames[displayScale];
        $('#acScale').html(buttonString);

        var elReps = document.getElementById('repsDisplay');
        elReps.innerHTML = '<span>Playback: ' + displayReps + 'x</span>';
        buttonString = '+ Repeat Phrase:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayReps + 'x';
        $('#acReps').html(buttonString);

        var elInstrument = document.getElementById('itext');
        elInstrument.textContent = instrumentNames[displayInstrument];
        buttonString = '+ Intstrument: ' + instrumentNames[displayInstrument];
        $('#acInstrument').html(buttonString);

        document.getElementById('bpmRange').value = workBPM;
        document.getElementById('volume').value = workVolume;

        var elBpmLabel = document.getElementById('bpmLabel');
        elBpmLabel.textContent = 'BPM:  ' + displayBPM;
        buttonString = '+ BPM:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayBPM;
        $('#acBPM').html(buttonString);

        var elVolLabel = document.getElementById('vLabel');
        elVolLabel.textContent = 'Volume:  ' + displayVolume;
        buttonString = '+ Volume:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;' + displayVolume;
        $('#acVol').html(buttonString);

        if ($("#repeatNotes").prop('checked') === true ) {
                $('#i1').text('      ON');
        } else {
                $('#i1').text('      OFF');
        }

        if ($("#octaveLimit").prop('checked') === true ) {
                $('#i3').text('      ON');
        } else {
                $('#i3').text('      OFF');
        }

        $('#i2').text('');
        $('#i4').text('');
        
        $('.accordion-panel').each( function() {
                $(this).slideUp(450);
        });
        
    };
});