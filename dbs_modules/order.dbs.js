const useOrderRef = () => {
    const prefix = '#663';
    const genRanHex = size => [...Array(size)].map(() => Math.floor(Math.random() * 16).toString(16)).join('');

    let hexID = prefix + genRanHex(21);
    return hexID;
};

const useOrderDate = () => {
    state = new Date();

    let dt = state.toDateString();
    let date = dt;

    var hours = state.getHours();
    var minutes = state.getMinutes();
    var seconds = state.getSeconds();

    let hrs = hours.toString().length < 2 ? hours.toString().padStart(2, "0") : hours;
    let mins = minutes.toString().length < 2 ? minutes.toString().padStart(2, "0") : minutes;
    let secs = seconds.toString().length < 2 ? seconds.toString().padStart(2, "0") : seconds;

    let tm =  hrs+':'+mins+':'+secs;
    var fyr = state.getFullYear();

    var dateTime = dt+' at '+tm;
    var dateTimeYear = date.substr(0, date.length - 4)+' '+tm+' '+fyr

    return dateTime

    /* document.getElementById('date').innerHTML = dateTime; // Receipt Date Format
    localStorage.setItem("currentSessionDate", dateTime);
    localStorage.setItem("currentDate", dateTimeYear); // TX Date Format */
};

// Initialize the iOS modal units
const cupertinoModal = document.getElementById("cupertinoModalMain");
const cupertinoDialog = document.getElementById("cupertinoDialog");
const cupertinoTitle = document.getElementById("cupertinoTitle");
const cupertinoContent = document.getElementById("cupertinoContent");
const cupertinoAlertBtn = document.getElementById("cupertinoModalBtn");

// Initialize the Android modal units
const materialModal = document.getElementById("materialModalMain");
const materialDialog = document.getElementById("materialDialog");
const materialTitle = document.getElementById("materialTitle");
const materialContent = document.getElementById("materialContent");
const materialAlertBtn = document.getElementById("materialModalBtn");

/* HEADER - Modal Code */
function openiOSDialog() {
    const cupertinoModal = document.getElementById("cupertinoModalMain");
    const cupertinoDialog = document.getElementById("cupertinoDialog");
  
    cupertinoModal.classList.add('animate-fadeInBackground');
    cupertinoDialog.classList.add('animate-fadeIn');
    cupertinoModal.classList.remove('hidden');
  
    setTimeout(function() {
      cupertinoModal.classList.remove('animate-fadeInBackground');
      cupertinoDialog.classList.remove('animate-fadeIn');
    }, 1000);
  }
  
  function closeiOSDialog() {
    const cupertinoModal = document.getElementById("cupertinoModalMain");
    const cupertinoDialog = document.getElementById("cupertinoDialog");
    
    cupertinoModal.classList.add('animate-fadeOutBackground');
    cupertinoDialog.classList.add('animate-fadeOut');
  
    setTimeout(function() {
      cupertinoModal.classList.remove('animate-fadeOutBackground');
      cupertinoDialog.classList.remove('animate-fadeOut');
      cupertinoModal.classList.add('hidden');
    }, 100);
  }
  
  function openAndroidDialog() {
    const materialModal = document.getElementById("materialModalMain");
    const materialDialog = document.getElementById("materialDialog");
  
    materialModal.classList.remove('hidden');
  }
  
  function closeAndroidDialog() {
    const materialModal = document.getElementById("materialModalMain");
    const materialDialog = document.getElementById("materialDialog");
    
    materialModal.classList.add('animate-fadeOutBackground');
    materialDialog.classList.add('animate-fadeOut');
  
    setTimeout(function() {
      materialModal.classList.remove('animate-fadeOutBackground');
      materialDialog.classList.remove('animate-fadeOut');
      materialModal.classList.add('hidden');
    }, 100);
  }
  
  cupertinoAlertBtn.addEventListener("click", () => {
    closeiOSDialog();
  });
  
  materialAlertBtn.addEventListener("click", () => {
    closeAndroidDialog();
  });
  
  function useModalState(title, content) {
    // Initialize necessary variables
    let devicePlatform = localStorage.getItem("appPlatform");
  
    if (devicePlatform === "iOS") {
      cupertinoTitle.innerHTML = title;
      cupertinoContent.innerHTML = content;
      openiOSDialog();
  
    } else if (devicePlatform === "AndroidOS") {
      materialTitle.innerHTML = title;
      materialContent.innerHTML = content;
      openAndroidDialog();
    }
    else {
      console.log("No modal to show!");
    }
  }
/* FOOTER - Modal Code */

const exitOrder = document.getElementById("cancelOrderProcess");
const scanQRButton = document.getElementById("order_scan");
const tapQRButton = document.getElementById("order_rescan");
const cancelQROperation = document.getElementById("order_cancel");
const closeOrder = document.getElementById("order_close");
const orderPayment = document.getElementById("order_pay");
const orderVenue = document.getElementById("order_venue");
const orderAmt = document.getElementById("order_amt");

const orderInput = document.getElementById("orderAmtInput");
const orderOTP = document.getElementById("order_otp");
const orderLastOTP = document.getElementById("last_otp");

// Function to restrict input to 4 digits
function enforceFourDigitLimit(event) {
    const input = event.target;
    input.value = input.value.replace(/\D/g, ''); // Remove non-digit characters
    if (input.value.length > 4) {
        input.value = input.value.slice(0, 4); // Limit to 4 characters
    }
}


function createTransaction(txRefID, txDateAtYear, txVenue, txAmount) {
  return {
    refID: txRefID,
    dateAtYear: txDateAtYear,
    venue: txVenue,
    amount: txAmount
  };
}

function addTransaction(usrTransaction) {
    let useTXBase = JSON.parse(localStorage.getItem("transactionBase")) || [];
    if (useTXBase.length === 15) {
        useTXBase.pop();
    }
    useTXBase.unshift(usrTransaction);
    localStorage.setItem("transactionBase", JSON.stringify(useTXBase));
}

orderInput.addEventListener("input", enforceFourDigitLimit);

exitOrder.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
    localStorage.setItem("usrOrderAmt", "");
    localStorage.setItem("usrCafeOption", "");
    localStorage.setItem("usrOrderRef", "");
    localStorage.setItem("usrOrderDT", "");
});

scanQRButton.addEventListener("click", () => {
    usrAmount = orderInput.value;
    
    if (usrAmount > 6000) {
        orderInput.value = '';
        useModalState("Attention", "You can only spend 6000 per transaction!");
        console.error("Cannot be more than 6000");
    } else if (usrAmount < 10) {
        orderInput.value = '';
        useModalState("Attention", "Enter an amount greater than 10");
        console.error("Cannot be less than 10");
    } else {
        localStorage.setItem("usrOrderAmt", usrAmount);
        window.location.hash = "#qrscan";

        console.log(localStorage.getItem("usrOrderAmt"));
    }
});

cancelQROperation.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
    localStorage.setItem("usrOrderAmt", "");
    localStorage.setItem("usrCafeOption", "");
    localStorage.setItem("usrOrderRef", "");
    localStorage.setItem("usrOrderDT", "");
});

closeOrder.addEventListener("click", () => {
    window.location.href = "./dashboard.html";
    localStorage.setItem("usrOrderAmt", "");
    localStorage.setItem("usrCafeOption", "");
    localStorage.setItem("usrOrderRef", "");
    localStorage.setItem("usrOrderDT", "");
});

tapQRButton.addEventListener("click", () => {
    const payAmt = localStorage.getItem("usrOrderAmt");
    const payVenue = localStorage.getItem("usrCafeOption")

    orderVenue.innerHTML = payVenue;
    orderAmt.innerHTML = payAmt;
    orderOTP.focus()
});

orderPayment.addEventListener("click", () => {
    const pinInputs = document.querySelectorAll(".pin-input");
    const pinDigits = [];

    if (pinInputs.length !== 4) {
        console.error("Expected exactly 4 pin input fields");
        return;
    } else {
        for (const input of pinInputs) {
            pinDigits.push(input.value);
        }
    
        const completePin = pinDigits.join("");
        console.log(completePin)
        localStorage.setItem("liveUserOTP", completePin);
    
        const authUserPin = localStorage.getItem("baseUserOTP");

        if (completePin !== authUserPin) {
            useModalState("Attention", "Wrong Pin");
            console.error("The PIN you entered is incorrect!");
            orderLastOTP.focus();

        } else {
            const orderRef = useOrderRef();
            const orderDate = useOrderDate();
            localStorage.setItem("usrOrderRef", orderRef);
            localStorage.setItem("usrOrderDT", orderDate);
    
            const paidAmount = localStorage.getItem("usrOrderAmt");
            const balAtPayment = parseInt(localStorage.getItem("usrChowBal"), 10) - parseInt(paidAmount, 10);
            localStorage.setItem("usrChowBal", balAtPayment.toString());
    
            addTransaction(createTransaction(orderRef, orderDate, localStorage.getItem("usrCafeOption"), paidAmount));
            let useTransBase = localStorage.getItem("transactionBase");

    
            window.location.href = "./verify.html";
        }
    }
});

window.addEventListener("load", () => orderInput.focus());
/* TEST [passed]:
    console.log(usrAmount);
    console.log(localStorage.getItem("usrOrderAmt")); */