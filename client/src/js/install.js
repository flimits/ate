const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the triggered events
    window.deferredPrompt = event;

    // Remove the hidden class from the button.
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
        return;
    }

    // Show prompt
    promptEvent.prompt();

    // Wait for the user to respond to the prompt
    const userChoice = await promptEvent.userChoice;

    // Check if the user accepted the prompt
    if (userChoice.outcome === 'accepted') {
        // User accepted the prompt, hide the install button
        butInstall.classList.toggle('hidden', true);
    }

    // Reset the deferred prompt variable, it can only be used once.
    window.deferredPrompt = null;
});

// TODO: Add a handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear prompt
    window.deferredPrompt = null;

    // Hide the install button after the app is installed
    butInstall.classList.toggle('hidden', true);
});
