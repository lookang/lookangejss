//Global functions
var selectedvalue = ""



// Counting of Units:
// Left L units 
var countCL = 0;
var countEL = 0;
var countGL = 0;
var countIL = 0;
var countKL = 0;
var countNL = 0;
var totalL = 0;
var totalR = 0;




// Right L units
var countCR = 0
var countER = 0;
var countGR = 0;
var countIR = 0;
var countKR = 0;
var countNR = 0;


//Selected options:
var selectedOptionL = "";
var selectedOptionL2 = "";
var selectedOptionR1 = "";
var selectedOptionR2 = "";


//Selected Amount:
var amtL = 0;
var amtR = 0;


// spacing
var isopen = !isopen;
var isopenR = !isopenR;

function CheckAns() {

    //left
    var CLC = 0
    var CLE = 0
    var CLG = 0
    var CLI = 0
    var CLK = 0
    var CLN = 0

    //right
    var CRC = 0
    var CRE = 0
    var CRG = 0
    var CRI = 0
    var CRK = 0
    var CRN = 0

    console.log("----------------------------------------------")


    var TotalTransferInL1 = parseInt(document.getElementById("energyamt-L1").value);
    var TotalTransferInL2 = parseInt(document.getElementById("energyamt-L2").value);
    var TotalTransferInR1 = parseInt(document.getElementById("energyamt-R1").value);
    var TotalTransferInR2 = parseInt(document.getElementById("energyamt-R2").value);


    CLC = document.getElementsByClassName("activeC").length;
    CLE = document.getElementsByClassName("activeE").length;
    CLG = document.getElementsByClassName("activeG").length;
    CLI = document.getElementsByClassName("activeI").length;
    CLK = document.getElementsByClassName("activeK").length;
    CLN = document.getElementsByClassName("activeN").length;

    CRC = document.getElementsByClassName("activeRC").length;
    CRE = document.getElementsByClassName("activeRE").length;
    CRG = document.getElementsByClassName("activeRG").length;
    CRI = document.getElementsByClassName("activeRI").length;
    CRK = document.getElementsByClassName("activeRK").length;
    CRN = document.getElementsByClassName("activeRN").length;


    console.log(" Left L ")
    console.log(" ================= ")
    console.log("CLC: " + CLC)
    console.log("CLE: " + CLE)
    console.log("CLG: " + CLG)
    console.log("CLI: " + CLI)
    console.log("CLK: " + CLK)
    console.log("CLN: " + CLN)
    console.log(" ================= ")
    console.log(" Right L ")
    console.log("CRC: " + CRC)
    console.log("CRE: " + CRE)
    console.log("CRG: " + CRG)
    console.log("CRI: " + CRI)
    console.log("CRK: " + CRK)
    console.log("CRN: " + CRN)


    console.log("RT1: " + selectedOptionR1)


    totalL = parseInt(totalL);
    totalR = parseInt(totalR);

    console.log("L1: " + TotalTransferInL1);
    console.log("L2: " + TotalTransferInL2);
    console.log("R1: " + TotalTransferInR1);
    console.log("R2: " + TotalTransferInR2);
    console.log("totalL: " + totalL);
    console.log("totalR: " + totalR);
    console.log(" ================= ")


    var TotalTransferIn = TotalTransferInL1 + TotalTransferInL2;
    var TotalTransferOut = TotalTransferInR1 + TotalTransferInR2;



    var TotalStart = totalL + TotalTransferIn;
    var TotalEnd = totalR + TotalTransferOut;


    console.log("TotalStart: " + TotalStart);
    console.log("TotalEnd: " + TotalEnd);



    //1 Total initial + transferred in = total final + transferred out
    if (TotalStart == TotalEnd) {
        console.log("correct");


        //2 Zero C,E, G and N in the initial and final amount
        if (CLC == false && CLK == false && CLN == false && CRC == false && CRK == false && CRN == false) {



            //3 Zero transfer in
            if (TotalTransferInL1 == 0 && TotalTransferInL2 == 0) {

                //4 Some transfer out mechanically
                if ((selectedOptionR1 == "Mechanic" && TotalTransferInR1 > 0 && (selectedOptionR2 == "" || selectedOptionR2 == "Mechanic")) || (selectedOptionR2 == "Mechanic" && TotalTransferInR2 > 0 && (selectedOptionR1 == "" || selectedOptionR1 == "Mechanic"))) {


                    //5 Initial state only has K
                    if ((CLG >= 1 && (CLI >= 1 || CLI == 0) && CLE == false)) {

                        if (CRI > CLI) {

                            //6 Final state no K but with some I
                            if (CRE >= 1 && CRG >=0) {
                                document.getElementById("check").innerHTML = "<b><u>*Correct*</u></b>";
                                document.getElementById("reply").innerHTML = `<button type="button" onclick="location.href='index10.html'">Next Qns</button>`;

                            }
                            else {
                                console.log("There should be some energy in the elastic store and no energy in the gravitational store in the final state of the system.");
                                document.getElementById("check").innerHTML = "*Incorrect*";
                                document.getElementById("reply").innerHTML = "There should be some energy in the elastic store and no energy in the gravitational store in the final state of the system.<br> OR <br> Some energy in the elastic store and some energy in the gravitational store in the final state of the system.";

                            }
                        }
                        else {
                            console.log("There should be more energy in the internal store in the final state of the system.");
                            document.getElementById("check").innerHTML = "*Incorrect*";
                            document.getElementById("reply").innerHTML = "There should be more energy in the internal store in the final state of the system.";

                        }

                    }
                    else {
                        console.log("There should be energy in the gravitational and internal stores in the initial state of the system. OR There  should be energy in the gravitational store in the initial state of the system.");
                        document.getElementById("check").innerHTML = "*Incorrect*";
                        document.getElementById("reply").innerHTML = "There should be energy in the gravitational and internal stores in the initial state of the system. OR There  should be energy in the gravitational store in the initial state of the system.";

                    }

                }
                else {
                    console.log("There should be some energy transferred out of the system through work done against air resistance. ");
                    document.getElementById("check").innerHTML = "*Incorrect*";
                    document.getElementById("reply").innerHTML = "There should be some energy transferred out of the system through work done against air resistance only. ";

                }
            }
            else {
                console.log("The energy transferred into the system should be zero.");
                document.getElementById("check").innerHTML = "*Incorrect*";
                document.getElementById("reply").innerHTML = "The energy transferred into the system should be zero.";

            }

        }
        else {
            console.log("The amount of energy in the chemical, kinetic and nuclear stores should be zero.");
            document.getElementById("check").innerHTML = "*Incorrect*";
            document.getElementById("reply").innerHTML = "The amount of energy in the chemical, kinetic and nuclear stores should be zero.";

        }
    }
    else {
        console.log("The total energy in the initial state of the system plus the energy transferred into the system should be equal to the total energy in the final state of the system plus the energy transferred out of the system.");
        document.getElementById("check").innerHTML = "*Incorrect*";
        document.getElementById("reply").innerHTML = "The total energy in the initial state of the system plus the energy transferred into the system should be equal to the total energy in the final state of the system plus the energy transferred out of the system.";
    }
}




function NxtQns() {

}
//Left columns

function colorRedL(id) {
    var redL = document.getElementById(id);
    console.log(redL.style.backgroundColor)

    if (redL.style.backgroundColor != "yellow" && selectedvalue == "yellow") {
        console.log("turn yellow")
        redL.style.backgroundColor = "yellow";
        // add class active

        redL.classList.add('active');

    }
    else if (redL.style.backgroundColor != "red" && selectedvalue == "red") {
        console.log("turn red")
        redL.style.backgroundColor = "red";
        // add class active

        redL.classList.add('active');

    }
    else if (redL.style.backgroundColor == selectedvalue) {
        console.log("turn white")
        redL.style.backgroundColor = "white";
        // remove class active
        redL.classList.remove('active');

    }

    var countrl = document.querySelectorAll('.unit-CLR .active').length;
    countRL = countrl
    console.log(countRL);

}
var color
function colorYellowL(id) {
    color = document.getElementById(id);

    if (color.style.backgroundColor == "white") {
        console.log("turn Yellow")
        color.style.backgroundColor = "yellow";
        // add class active

        color.classList.add('active');

        if (color.parentNode.classList.contains("CLC")) {
            console.log("selected box yellow")
            color.classList.add('activeC');
        }
        else if (color.parentNode.classList.contains("CLE")) {
            console.log("selected box yellow")
            color.classList.add('activeE');
        }
        else if (color.parentNode.classList.contains("CLG")) {
            console.log("selected box yellow")
            color.classList.add('activeG');
        }
        else if (color.parentNode.classList.contains("CLI")) {
            console.log("selected box yellow")
            color.classList.add('activeI');
        }
        else if (color.parentNode.classList.contains("CLK")) {
            console.log("selected box yellow")
            color.classList.add('activeK');
        }
        else if (color.parentNode.classList.contains("CLN")) {
            console.log("selected box yellow")
            color.classList.add('activeN');
        }

    } else if (color.style.backgroundColor == "yellow") {
        console.log("turn white")
        color.style.backgroundColor = "white";
        // remove class active
        color.classList.remove('active');

        if (color.parentNode.classList.contains("CLC")) {
            console.log("selected box yellow")
            color.classList.remove('activeC');
        }
        else if (color.parentNode.classList.contains("CLE")) {
            console.log("selected box yellow")
            color.classList.remove('activeE');
        }
        else if (color.parentNode.classList.contains("CLG")) {
            console.log("selected box yellow")
            color.classList.remove('activeG');
        }
        else if (color.parentNode.classList.contains("CLI")) {
            console.log("selected box yellow")
            color.classList.remove('activeI');
        }
        else if (color.parentNode.classList.contains("CLK")) {
            console.log("selected box yellow")
            color.classList.remove('activeK');
        }
        else if (color.parentNode.classList.contains("CLN")) {
            console.log("selected box yellow")
            color.classList.remove('activeN');
        }

    }

    var countlc = document.querySelectorAll('.unit-CLR .active').length;
    var countle = document.querySelectorAll('.unit-CLY .active').length;
    var countlg = document.querySelectorAll('.unit-CLG .active').length;
    var countli = document.querySelectorAll('.unit-CLB .active').length;
    var countlk = document.querySelectorAll('.unit-CLO .active').length;
    var countln = document.querySelectorAll('.unit-CLP .active').length;


    countCL = countlc
    countEL = countle;
    countGL = countlg;
    countIL = countli;
    countKL = countlk;
    countNL = countln;



    console.log("LC: " + countCL);
    console.log("LE: " + countEL);
    console.log("LG: " + countGL);
    console.log("LI: " + countIL);
    console.log("LK: " + countKL);
    console.log("LN: " + countNL);

    totalL = countCL + countEL + countGL + countIL + countKL + countNL

    console.log("=============================================");
    console.log("TotalL: " + totalL);



}

function addSpace() {
    console.log("hello")
    isopen = !isopen;
    console.log(isopen)
    if (!isopen) {
        console.log("123")
        document.getElementById("energyamt-L1").style.marginBottom = "180px";
    }
    else if (isopen) {
        document.getElementById("energyamt-L1").style.marginBottom = "0px";
    }
}

function addSpaceR() {
    // console.log("hello")
    isopenR = !isopenR;
    console.log(isopenR)
    if (!isopenR) {
        console.log("12345")
        document.getElementById("energyamt-R1").style.marginBottom = "180px";
    }
    else if (isopenR) {
        document.getElementById("energyamt-R1").style.marginBottom = "0px";
    }
}


//Right columns

function colorRedR(id) {
    var redR = document.getElementById(id);

    if (redR.style.backgroundColor == "white") {
        console.log("turn red")
        redR.style.backgroundColor = "red";
        // add class active

        redR.classList.add('active');

    } else if (redR.style.backgroundColor == "red") {
        console.log("turn white")
        redR.style.backgroundColor = "white";
        // remove class active
        redR.classList.remove('active');

    }

    var countrr = document.querySelectorAll('.unit-CRR .active').length;
    countRR = countrr;
    console.log(countRR);

}


function colorYellowR(id) {
    var color = document.getElementById(id);

    if (color.style.backgroundColor == "white") {
        console.log("turn Yellow")
        color.style.backgroundColor = "yellow";
        // add class active

        color.classList.add('active');


        if (color.parentNode.classList.contains("CRC")) {
            console.log("selected box yellow")
            color.classList.add('activeRC');
        }
        else if (color.parentNode.classList.contains("CRE")) {
            console.log("selected box yellow")
            color.classList.add('activeRE');
        }
        else if (color.parentNode.classList.contains("CRG")) {
            console.log("selected box yellow")
            color.classList.add('activeRG');
        }
        else if (color.parentNode.classList.contains("CRI")) {
            console.log("selected box yellow")
            color.classList.add('activeRI');
        }
        else if (color.parentNode.classList.contains("CRK")) {
            console.log("selected box yellow")
            color.classList.add('activeRK');
        }
        else if (color.parentNode.classList.contains("CRN")) {
            console.log("selected box yellow")
            color.classList.add('activeRN');
        }



    } else if (color.style.backgroundColor == "yellow") {
        console.log("turn white")
        color.style.backgroundColor = "white";
        // remove class active
        color.classList.remove('active');

        if (color.parentNode.classList.contains("CRC")) {
            console.log("selected box yellow")
            color.classList.remove('activeRC');
        }
        else if (color.parentNode.classList.contains("CRE")) {
            console.log("selected box yellow")
            color.classList.remove('activeRE');
        }
        else if (color.parentNode.classList.contains("CRG")) {
            console.log("selected box yellow")
            color.classList.remove('activeRG');
        }
        else if (color.parentNode.classList.contains("CRI")) {
            console.log("selected box yellow")
            color.classList.remove('activeRI');
        }
        else if (color.parentNode.classList.contains("CRK")) {
            console.log("selected box yellow")
            color.classList.remove('activeRK');
        }
        else if (color.parentNode.classList.contains("CRN")) {
            console.log("selected box yellow")
            color.classList.remove('activeRN');
        }

    }
    var countrc = document.querySelectorAll('.unit-CRR .active').length;
    var countre = document.querySelectorAll('.unit-CRY .active').length;
    var countrg = document.querySelectorAll('.unit-CRG .active').length;
    var countri = document.querySelectorAll('.unit-CRB .active').length;
    var countrk = document.querySelectorAll('.unit-CRO .active').length;
    var countrn = document.querySelectorAll('.unit-CRP .active').length;


    countCR = countrc
    countER = countre;
    countGR = countrg;
    countIR = countri;
    countKR = countrk;
    countNR = countrn;



    console.log("RC: " + countCR);
    console.log("RE: " + countER);
    console.log("RG: " + countGR);
    console.log("RI: " + countIR);
    console.log("RK: " + countKR);
    console.log("RN: " + countNR);

    totalR = countCR + countER + countGR + countIR + countKR + countNR

    console.log("=============================================");
    console.log("TotalR: " + totalR);


}






//----------------------------
//----------------------------


function SelectedEnergyL() {
    var elements = document.querySelectorAll('.options-L1 .option');
    console.log("element")


    elements.forEach(function (element) {

        element.addEventListener('click', (event) => {
            console.log("value");



            console.log(event.target.value);

            selectedOptionL = event.target.value

            if (selectedOptionL == "") {
                var valueamt = document.getElementById("energyamt-L1").value
                document.getElementById("energyamt-L1").style.pointerEvents = 'none'
                console.log(valueamt); //this is the value b4
                for (i = 1; i <= 10; i++) {

                    if (document.getElementById('ET' + i).style.backgroundColor == "red" && valueamt > 0) {

                        document.getElementById('ET' + i).style.backgroundColor = "white"
                        valueamt--
                    }

                }
                document.getElementById("energyamt-L1").selectedIndex = "0"


            }
            else {
                document.getElementById("energyamt-L1").style.pointerEvents = 'auto'

            }

            console.log(selectedOptionL);

        });

    })



}


function SelectedEnergyL2() {
    var elements = document.querySelectorAll('.options-L2 .option');
    console.log("element")


    elements.forEach(function (element) {

        element.addEventListener('click', (event) => {
            console.log("value");



            console.log(event.target.value);

            selectedOptionL2 = event.target.value

            if (selectedOptionL2 == "") {
                var valueamtL2 = document.getElementById("energyamt-L2").value
                document.getElementById("energyamt-L2").style.pointerEvents = 'none'
                console.log(valueamtL2); //this is the value b4
                for (i = 1; i <= 10; i++) {

                    if (document.getElementById('ET' + i).style.backgroundColor == "red" && valueamtL2 > 0) {

                        document.getElementById('ET' + i).style.backgroundColor = "white"
                        valueamtL2--
                    }

                }
                if (document.getElementById("energyamt-L2").value != "0") {
                    document.getElementById("energyamt-L2").selectedIndex = "0"
                }


            }
            else {
                document.getElementById("energyamt-L2").style.pointerEvents = 'auto'

            }

            console.log(selectedOptionL2);

        });

    })



}
//add selected energy right

function SelectedEnergyR() {
    var elements = document.querySelectorAll('.options-R1 .option');
    console.log("element")


    elements.forEach(function (element) {

        element.addEventListener('click', (event) => {
            console.log("value");



            console.log(event.target.value);

            selectedOptionR1 = event.target.value

            if (selectedOptionR1 == "") {
                var valueamtR1 = document.getElementById("energyamt-R1").value
                document.getElementById("energyamt-R1").style.pointerEvents = 'none'
                console.log(valueamtR1); //this is the value b4
                for (i = 1; i <= 10; i++) {

                    if (document.getElementById('ETO' + i).style.backgroundColor == "red" && valueamtR1 > 0) {

                        document.getElementById('ETO' + i).style.backgroundColor = "white"
                        valueamtR1--
                    }

                }
                if (document.getElementById("energyamt-R1").value != "0") {
                    document.getElementById("energyamt-R1").selectedIndex = "0"
                }


            }
            else {
                document.getElementById("energyamt-R1").style.pointerEvents = 'auto'

            }

            console.log(selectedOptionR1);

        });

    })



}




function SelectedEnergyR2() {
    var elements = document.querySelectorAll('.options-R2 .option');
    console.log("element")


    elements.forEach(function (element) {

        element.addEventListener('click', (event) => {
            console.log("value");



            console.log(event.target.value);

            selectedOptionR2 = event.target.value

            if (selectedOptionR2 == "") {
                var valueamtR2 = document.getElementById("energyamt-R2").value
                document.getElementById("energyamt-R2").style.pointerEvents = 'none'
                console.log(valueamtR2); //this is the value b4
                for (i = 1; i <= 10; i++) {

                    if (document.getElementById('ETO' + i).style.backgroundColor == "red" && valueamtR2 > 0) {

                        document.getElementById('ETO' + i).style.backgroundColor = "white"
                        valueamtR2--
                    }

                }
                if (document.getElementById("energyamt-R2").value != "0") {
                    document.getElementById("energyamt-R2").selectedIndex = "0"
                }


            }
            else {
                document.getElementById("energyamt-R2").style.pointerEvents = 'auto'

            }

            console.log(selectedOptionR2);

        });

    })



}




var amtL = 0
var amtR = 0
var ele;
var prefix = 'ET';

function energyIn(l2, l1, parent) {
    let [amtL1, amtL2] = [l1.value, l2.value].map((x) => parseInt(x))
    l1.innerHTML = ""
    for (let i = 0; i <= 10 - amtL2; i++)
        l1.innerHTML += `<option value="${i}">${i}</option>`;
    l1.value = amtL1
    for (var i = 1; i <= 10; i++) {
        document.querySelector(`${parent}`).children[i - 1].style.backgroundColor = i <= amtL1 + amtL2 ? "red" : "white";

    }



}


function energyOut() {
    amtR = document.getElementById("energyamt-R1").value;

    console.log(amtR)
}

function changecolorY() {
    // document.getElementById("floor").style.backgroundColor = "green"
    selectedvalue = "yellow";
    console.log("changed to: " + selectedvalue);

}

function changecolorR() {
    // document.getElementById("floor").style.backgroundColor = "green"
    selectedvalue = "red";
    console.log("changed to: " + selectedvalue);

}

// function Disable(id) {
//     console.log('disable')

//     if (id != "NIL") {
//         document.getElementById(id).style.pointerEvents = 'auto';

//     }
//     else {
//         document.getElementById(id).style.pointerEvents = 'none';
//     }
// }
window.onload = function () {
    SelectedEnergyL2();
    SelectedEnergyL();
    SelectedEnergyR();
    SelectedEnergyR2();
    console.log("loaded")
}
