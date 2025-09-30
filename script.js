function showAccount(bankName, accountNumber, fees) {
  console.log('showAccount called:', { bankName, accountNumber, fees }); // Debug log
  const accountDisplay = document.getElementById('accountDisplay');
  const screenshotSection = document.getElementById('screenshotSection');
  accountDisplay.style.display = 'block';
  
  // Use bilingual bank name for CBE
  const displayBankName = bankName === "Commercial Bank of Ethiopia" 
    ? "Commercial Bank of Ethiopia / Baanki daldala Ethiopia" 
    : bankName;
  
  // Check if fees object exists
  const feesDisplay = fees && fees.application && fees.expediting
    ? `
      <strong>Passport Fees / Kaffalti passportii:</strong><br>
      Application Fee / Kaffalti galmee: ${fees.application.amount} ${fees.application.currency}<br>
      Expediting Fee (faster processing) / Dafee akka siniif raawwatuuf: ${fees.expediting.amount} ${fees.expediting.currency}
    `
    : '<strong>Passport Fees / Kaffalti passportii:</strong><br>Error: Fee information unavailable';
  
  accountDisplay.innerHTML = `
    Send money via <strong>${displayBankName}</strong> to / Ergi <strong>${displayBankName}</strong>:<br>
    Account Number: ${accountNumber}<br>
    Bank: ${displayBankName}<br><br>
    ${feesDisplay}
  `;
  screenshotSection.style.display = 'block';
  document.getElementById('screenshotUpload').value = '';
  document.getElementById('screenshotPreview').style.display = 'none';
  document.getElementById('successTransfer').style.display = 'none';
}

// Handle camera and file input for photo
const videoPhoto = document.getElementById('videoPhoto');
const canvasPhoto = document.getElementById('canvasPhoto');
const photoPreview = document.getElementById('photoPreview');
const captureButtonPhoto = document.getElementById('captureButtonPhoto');
const photoUpload = document.getElementById('photoUpload');
let streamPhoto = null;

captureButtonPhoto.addEventListener('click', () => {
  if (!streamPhoto) {
    navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } })
      .then(mediaStream => {
        streamPhoto = mediaStream;
        videoPhoto.style.display = 'block';
        videoPhoto.srcObject = streamPhoto;
        captureButtonPhoto.textContent = 'Capture Photo';
      })
      .catch(err => alert('Error accessing camera for photo: ' + err.message));
  } else {
    canvasPhoto.getContext('2d').drawImage(videoPhoto, 0, 0, canvasPhoto.width, canvasPhoto.height);
    photoPreview.src = canvasPhoto.toDataURL('image/png');
    photoPreview.style.display = 'block';
    videoPhoto.style.display = 'none';
    streamPhoto.getTracks().forEach(track => track.stop());
    streamPhoto = null;
    captureButtonPhoto.textContent = 'Capture Photo';
  }
});

photoUpload.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      photoPreview.src = reader.result;
      photoPreview.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Handle camera and file input for front ID
const videoFront = document.getElementById('videoFront');
const canvasFront = document.getElementById('canvasFront');
const idPreviewFront = document.getElementById('idPreviewFront');
const captureButtonFront = document.getElementById('captureButtonFront');
const idUploadFront = document.getElementById('idUploadFront');
let streamFront = null;

captureButtonFront.addEventListener('click', () => {
  if (!streamFront) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        streamFront = mediaStream;
        videoFront.style.display = 'block';
        videoFront.srcObject = streamFront;
        captureButtonFront.textContent = 'Capture Front Image';
      })
      .catch(err => alert('Error accessing camera for front ID: ' + err.message));
  } else {
    canvasFront.getContext('2d').drawImage(videoFront, 0, 0, canvasFront.width, canvasFront.height);
    idPreviewFront.src = canvasFront.toDataURL('image/png');
    idPreviewFront.style.display = 'block';
    videoFront.style.display = 'none';
    streamFront.getTracks().forEach(track => track.stop());
    streamFront = null;
    captureButtonFront.textContent = 'Capture Front ID';
  }
});

idUploadFront.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      idPreviewFront.src = reader.result;
      idPreviewFront.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Handle camera and file input for back ID
const videoBack = document.getElementById('videoBack');
const canvasBack = document.getElementById('canvasBack');
const idPreviewBack = document.getElementById('idPreviewBack');
const captureButtonBack = document.getElementById('captureButtonBack');
const idUploadBack = document.getElementById('idUploadBack');
let streamBack = null;

captureButtonBack.addEventListener('click', () => {
  if (!streamBack) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(mediaStream => {
        streamBack = mediaStream;
        videoBack.style.display = 'block';
        videoBack.srcObject = streamBack;
        captureButtonBack.textContent = 'Capture Back Image';
      })
      .catch(err => alert('Error accessing camera for back ID: ' + err.message));
  } else {
    canvasBack.getContext('2d').drawImage(videoBack, 0, 0, canvasBack.width, canvasBack.height);
    idPreviewBack.src = canvasBack.toDataURL('image/png');
    idPreviewBack.style.display = 'block';
    videoBack.style.display = 'none';
    streamBack.getTracks().forEach(track => track.stop());
    streamBack = null;
    captureButtonBack.textContent = 'Capture Back ID';
  }
});

idUploadBack.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      idPreviewBack.src = reader.result;
      idPreviewBack.style.display = 'block';
    };
    reader.readAsDataURL(file);
  }
});

// Handle screenshot upload
document.getElementById('screenshotUpload').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = () => {
      document.getElementById('screenshotPreview').src = reader.result;
      document.getElementById('screenshotPreview').style.display = 'block';
      document.getElementById('successTransfer').style.display = 'block';
      document.getElementById('successTransfer').innerHTML = 'Successful / Milkaa\'eera';
    };
    reader.readAsDataURL(file);
  }
});

// Handle reset
document.getElementById('resetButton').addEventListener('click', () => {
  document.getElementById('userInfoForm').style.display = 'block';
  document.getElementById('successMessage').style.display = 'none';
  document.getElementById('passportForm').style.display = 'none';
  document.getElementById('results').style.display = 'none';
  document.getElementById('userInfoForm').reset();
  document.getElementById('passportForm').reset();
  photoPreview.src = '';
  photoPreview.style.display = 'none';
  idPreviewFront.src = '';
  idPreviewFront.style.display = 'none';
  idPreviewBack.src = '';
  idPreviewBack.style.display = 'none';
  videoPhoto.style.display = 'none';
  videoFront.style.display = 'none';
  videoBack.style.display = 'none';
  if (streamPhoto) {
    streamPhoto.getTracks().forEach(track => track.stop());
    streamPhoto = null;
    captureButtonPhoto.textContent = 'Capture Photo';
  }
  if (streamFront) {
    streamFront.getTracks().forEach(track => track.stop());
    streamFront = null;
    captureButtonFront.textContent = 'Capture Front ID';
  }
  if (streamBack) {
    streamBack.getTracks().forEach(track => track.stop());
    streamBack = null;
    captureButtonBack.textContent = 'Capture Back ID';
  }
  document.getElementById('screenshotUpload').value = '';
  document.getElementById('screenshotPreview').style.display = 'none';
  document.getElementById('successTransfer').style.display = 'none';
});

// Handle user info form submission
document.getElementById('userInfoForm').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value;
  const motherName = document.getElementById('motherName').value;
  const age = parseInt(document.getElementById('age').value);
  const sex = document.getElementById('sex').value;
  const photoImage = photoPreview.src;
  const idImageFront = idPreviewFront.src;
  const idImageBack = idPreviewBack.src;

  // Validate inputs
  if (!name) {
    alert('Please enter your full name. / Maqaa keessan guutuu guutuu bitte.');
    return;
  }
  if (!motherName) {
    alert('Please enter your full mother name. / Maqaa haadha keessan guutuu guutuu bitte.');
    return;
  }
  if (!age || age <= 18) {
    alert('You must be over 18 years old. / Umuriin keessan 18 irraa ol haadha.');
    return;
  }
  if (!sex) {
    alert('Please select your sex. / Saala keessan filadhaa.');
    return;
  }
  if (!photoImage || photoImage === window.location.href) {
    alert('Please capture or upload your personal photo. / Phooto keessan kaasuun ykn ergi.');
    return;
  }
  if (!idImageFront || idImageFront === window.location.href) {
    alert('Please capture or upload the front of your national ID. / National ID fuula duraan kaasuun ykn ergi.');
    return;
  }
  if (!idImageBack || idImageBack === window.location.href) {
    alert('Please capture or upload the back of your national ID. / National ID fuula duubaan kaasuun ykn ergi.');
    return;
  }

  // Show success message and passport form
  document.getElementById('userInfoForm').style.display = 'none';
  document.getElementById('successMessage').style.display = 'block';
  document.getElementById('successMessage').innerHTML = `
    <h3>Successful / Milkaa'eera</h3>
    <p>Please proceed to select your passport country. / Passport biyya keessan filadhaa.</p>
  `;
  setTimeout(() => {
    document.getElementById('successMessage').style.display = 'none';
    document.getElementById('passportForm').style.display = 'block';
  }, 2000);
  document.getElementById('resultPhotoPreview').src = photoImage;
  document.getElementById('resultPhotoPreview').style.display = 'block';
  document.getElementById('resultIdPreviewFront').src = idImageFront;
  document.getElementById('resultIdPreviewFront').style.display = 'block';
  document.getElementById('resultIdPreviewBack').src = idImageBack;
  document.getElementById('resultIdPreviewBack').style.display = 'block';
});

// Load data and handle passport form
fetch('data.json')
  .then(response => response.json())
  .then(data => {
    const passportData = data.passports;
    
    document.getElementById('passportForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const passport = document.getElementById('passport').value;
      if (!passport) {
        alert('Please select a passport country. / Biyya passport filadhaa.');
        return;
      }

      const resultsDiv = document.getElementById('results');
      const resultTitle = document.getElementById('resultTitle');
      const mobilityBadge = document.getElementById('mobilityBadge');
      const tableBody = document.getElementById('requirementsBody');
      const banksList = document.getElementById('banksList');
      const currencyNote = document.getElementById('currencyNote');
      const accountDisplay = document.getElementById('accountDisplay');
      const screenshotSection = document.getElementById('screenshotSection');

      // Show results
      resultsDiv.style.display = 'block';
      resultTitle.textContent = `${passport} Passport Dashboard`;
      
      // Mobility score badge
      const score = passportData[passport].mobilityScore;
      mobilityBadge.innerHTML = `<span class="badge">Mobility Score: ${score} countries</span>`;
      
      // Populate table
      tableBody.innerHTML = '';
      const requirements = passportData[passport].requirements;
      for (const [destination, requirement] of Object.entries(requirements)) {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${destination}</td><td>${requirement}</td>`;
        tableBody.appendChild(row);
      }

      // Populate banking list and currency note
      banksList.innerHTML = '';
      const banks = passportData[passport].banks;
      const currencies = [...new Set(banks.map(bank => bank.currency))].join(', ');
      currencyNote.textContent = `Preferred currencies for transfers: ${currencies}`;
      banks.forEach(bank => {
        const li = document.createElement('li');
        const span = document.createElement('span');
        const displayBankName = bank.name === "Commercial Bank of Ethiopia" 
          ? "Commercial Bank of Ethiopia / Baanki daldala Ethiopia" 
          : bank.name;
        span.textContent = `${displayBankName}: ${bank.description}`;
        const link = document.createElement('a');
        link.textContent = 'Send Now / Ergi';
        link.href = '#';
        link.className = 'send-now-link';
        link.dataset.bankName = bank.name;
        link.dataset.accountNumber = bank.accountNumber;
        link.dataset.fees = JSON.stringify(passportData[passport].fees);
        li.appendChild(span);
        li.appendChild(link);
        banksList.appendChild(li);
      });

      // Add event listeners to Send Now links
      document.querySelectorAll('.send-now-link').forEach(link => {
        link.addEventListener('click', (e) => {
          e.preventDefault();
          const bankName = link.dataset.bankName;
          const accountNumber = link.dataset.accountNumber;
          const fees = JSON.parse(link.dataset.fees);
          console.log('Send Now clicked:', { bankName, accountNumber, fees });
          showAccount(bankName, accountNumber, fees);
        });
      });

      // Clear account display and screenshot section
      accountDisplay.style.display = 'none';
      accountDisplay.innerHTML = '';
      screenshotSection.style.display = 'none';
      document.getElementById('screenshotUpload').value = '';
      document.getElementById('screenshotPreview').style.display = 'none';
      document.getElementById('successTransfer').style.display = 'none';
    });
  })
  .catch(error => {
    console.error('Error loading data:', error);
    alert('Failed to load passport data. Please check if data.json is present and try again.');
  });