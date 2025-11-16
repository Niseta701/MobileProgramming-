function openMenu() {
    document.getElementById("sideMenu").style.width = "250px";
    document.getElementById("mainContent").style.marginLeft = "250px";
}

function closeMenu() {
    document.getElementById("sideMenu").style.width = "0";
    document.getElementById("mainContent").style.marginLeft = "0";
}

function loadHome() {
    document.getElementById("mainContent").innerHTML = `
        <h1>Home</h1>
        <p>Welcome to SafeZone. Tap SOS when you feel unsafe.</p>
        <button style="background:red;color:white;padding:12px 20px;border:none;border-radius:10px;font-size:20px;">SOS</button>
    `;
    closeMenu();
}

function loadContacts() {
    document.getElementById("mainContent").innerHTML = `
        <h1>Emergency Contacts</h1>
        <p>Mother: 9800000000</p>
        <p>Friend: 9812345678</p>
        <p>Police: 100</p>
    `;
    closeMenu();
}

function loadAbout() {
    document.getElementById("mainContent").innerHTML = `
        <h1>About SafeZone</h1>
        <p>SafeZone is a women’s safety app offering SOS and live location tracking.</p>
    `;
    closeMenu();
}

function loadSettings() {
    document.getElementById("mainContent").innerHTML = `
        <h1>Settings</h1>
        <p>Enable notifications, update contacts, and manage privacy.</p>
    `;
    closeMenu();
}
