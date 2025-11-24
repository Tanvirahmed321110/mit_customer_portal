//document.addEventListener('DOMContentLoaded', function() {
//    let countdownInterval;
//
//  // অফার শেষ হওয়ার সময়: এখন থেকে ৩ দিন পরে
//  const offerEndDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000);
//
//  function updateCountdown() {
//    const now = new Date();
//    const timeDiff = offerEndDate - now;
//
//    if (timeDiff <= 0) {
//      clearInterval(countdownInterval);
//      document.querySelector('.time-end').innerHTML = "Offer Ended";
//      return;
//    }
//
//    const totalSeconds = Math.floor(timeDiff / 1000);
//    const days = Math.floor(totalSeconds / (60 * 60 * 24));
//    const hours = Math.floor((totalSeconds / (60 * 60)) % 24);
//    const minutes = Math.floor((totalSeconds / 60) % 60);
//    const seconds = totalSeconds % 60;
//
//    document.getElementById('day-1').textContent = Math.floor(days / 10);
//    document.getElementById('day-2').textContent = days % 10;
//
//    document.getElementById('hour-1').textContent = Math.floor(hours / 10);
//    document.getElementById('hour-2').textContent = hours % 10;
//
//    document.getElementById('minute-1').textContent = Math.floor(minutes / 10);
//    document.getElementById('minute-2').textContent = minutes % 10;
//
//    document.getElementById('sec-1').textContent = Math.floor(seconds / 10);
//    document.getElementById('sec-2').textContent = seconds % 10;
//  }
//
//  function startCountdown() {
//    updateCountdown();
//    countdownInterval = setInterval(updateCountdown, 1000); // ১ সেকেন্ড অন্তর আপডেট হবে
//  }
//
//  startCountdown();
//});
//
//
